/* ============================================================
 * 《诸神愚戏 · 信仰试炼》核心游戏引擎
 * ============================================================ */

/* ===== 全局可配置参数（运营调参入口）=====
 * 觐神触发频率、单局试炼数量、抽取权重等均可在此统一调节，
 * 后续根据实际运营数据动态平衡，无需改动逻辑代码。
 * ============================================================ */
const GAME_CONFIG = {
  jinshen: {
    // 觐神触发概率：欺诈主信仰区间更高（爱找乐子的神更爱召见祂的信徒）
    chanceFraudMin: 0.3,       // 欺诈信仰基础触发率
    chanceFraudMax: 0.8,       // 欺诈信仰触发率上限
    chanceFraudPerScore: 0.05, // 每点觐见积分带来的触发率增量
    chanceOtherMin: 0.1,       // 其他信仰基础触发率
    chanceOtherMax: 0.4,       // 其他信仰触发率上限
    chanceOtherPerScore: 0.04  // 每点觐见积分带来的触发率增量
  },
  trials: {
    perRunMin: 9,   // 单局试炼数量下限
    perRunMax: 12,  // 单局试炼数量上限（打满触发终局结算）
    // 难度权重：随玩家进度（进度=已完成场次/单局目标）动态倾斜，可整体缩放
    earlyWeights:  { A: 0.7, B: 1.2, C: 1.3 },  // 进度 < 50%：偏中低难度
    lateWeights:   { A: 1.5, B: 1.2, C: 0.6 }   // 进度 >= 50%：偏高难度
  }
};

/* ===== 试炼数据库（可扩展）=====
 * 支持分类（难度/命途/神明）、标签检索、关键词搜索，
 * 以及带权随机抽取（调用历史试炼记录时按玩家进度做难度适配）。
 * 新增试炼只需往 DATA_TRIALS 添加条目并填写 difficulty/path/god/tags 即可入库。
 * ============================================================ */
const TrialDB = {
  // 全量列表
  list() {
    return Object.keys(DATA_TRIALS).map(k => ({
      id: k,
      name: DATA_TRIALS[k].name,
      difficulty: DATA_TRIALS[k].difficulty,
      path: DATA_TRIALS[k].path,
      god: DATA_TRIALS[k].god,
      tags: DATA_TRIALS[k].tags || [DATA_TRIALS[k].path, DATA_TRIALS[k].difficulty]
    }));
  },
  // 按难度分类（A/B/C）
  byDifficulty(d) { return this.list().filter(t => t.difficulty === d); },
  // 按命途分类
  byPath(p) { return this.list().filter(t => t.path === p); },
  // 按神明分类
  byGod(g) { return this.list().filter(t => t.god === g); },
  // 关键词检索（名称/命途/标签）
  search(keyword) {
    const kw = String(keyword || '').trim();
    if (!kw) return this.list();
    return this.list().filter(t =>
      t.name.includes(kw) || (t.path || '').includes(kw) ||
      t.tags.some(tag => String(tag).includes(kw)) || t.id.includes(kw)
    );
  },
  // 带权随机抽取：同一轮回内无重复（available 已过滤），难度随进度适配
  pickWeighted(availableKeys, done, target) {
    const pool = availableKeys.filter(k => DATA_TRIALS[k]);
    if (pool.length === 0) return null;
    const progress = target > 0 ? Math.min(1, (done || 0) / target) : 0;
    const w = progress < 0.5 ? GAME_CONFIG.trials.earlyWeights : GAME_CONFIG.trials.lateWeights;
    const weights = pool.map(k => {
      const d = DATA_TRIALS[k].difficulty || 'B';
      return Math.max(0.05, w[d] !== undefined ? w[d] : 1.0);
    });
    const total = weights.reduce((s, x) => s + x, 0);
    let roll = Math.random() * total;
    for (let i = 0; i < pool.length; i++) {
      roll -= weights[i];
      if (roll <= 0) return pool[i];
    }
    return pool[pool.length - 1];
  }
};

const Game = {
  /* ===== 游戏状态 ===== */
  state: {
    // 程实状态
    chengshi: {
      name: '程实',
      age: 22,
      faith: 'fraud', // 当前信仰
      faithName: '欺诈',
      pathName: '虚无',
      charClass: '牧师',
      charClassName: '小丑牧师',
      hp: 100, hpMax: 100,
      mp: 100, mpMax: 100,
      trust: 50, // 可信度（队友对你的信任基准）
      fear: 0,   // 恐惧值（觐神场景）
      talentList: [],
      itemList: []
    },
    // 队友列表
    teammates: [],
    // 分数
    score_dengshen: 0,
    score_jinshen: 0,
    // 试炼进度
    trialCount: 0,
    completedTrials: [], // 已完成的试炼ID（用于去重）
    // 当前场景
    currentScene: null,
    currentTrial: null,
    // 游戏日志
    storyLog: [],
    // 觐神状态
    jinshen: {
      active: false,
      god: null,
      patience: 70,   // 神明耐心值
      appreciation: 30 // 神明欣赏值
    },
    // 愚戏之唇（失控谎言）状态
    autoLie: {
      active: false,
      source: null,      // 触发来源（哪个选择/场景）
      nextSceneId: null, // 谎言后要跳转的场景
      cooldownUntil: 0   // 冷却（时间戳），避免连续触发
    },
    // 成就 & 彩蛋
    achievements: [],
    achievementTimes: {}, // 成就解锁时间戳（id -> 时间戳），跨轮回保留
    easterEggs: [],
    // 已触发天赋冷却记录
    cooldowns: {},
    // 谎言编织面板的上下文
    lieContext: null,
    // 游戏版本
    version: '0.2'
  },

  /* ===== 初始化 ===== */
  init() {
    // 初始化程实天赋
    this.state.chengshi.talentList = DATA_CHENGSHI_TALENTS.map(t => ({...t, cooldown: 0}));
    // 初始化道具
    this.state.chengshi.itemList = DATA_CHENGSHI_ITEMS.map(i => ({...i}));
  },

  /* ===== 存档 ===== */
  save() {
    try {
      localStorage.setItem('zs_game_save', JSON.stringify(this.state));
      return true;
    } catch(e) {
      return false;
    }
  },

  load() {
    try {
      const save = localStorage.getItem('zs_game_save');
      if (save) {
        this.state = JSON.parse(save);
        // 兼容旧存档：补齐单局流程参数（9-12 场 + 终局结算）
        if (!this._runTrialTarget) {
          this._runTrialTarget = GAME_CONFIG.trials.perRunMin +
            Math.floor(Math.random() * (GAME_CONFIG.trials.perRunMax - GAME_CONFIG.trials.perRunMin + 1));
        }
        if (this._runTrialsDone === undefined) this._runTrialsDone = 0;
        return true;
      }
    } catch(e) {}
    return false;
  },

  hasSave() {
    return !!localStorage.getItem('zs_game_save');
  },

  /* ===== 开始游戏 ===== */
  startGame() {
    // 确保 data 已加载
    if (typeof DATA_CHENGSHI_TALENTS === 'undefined') {
      this.toast('游戏数据加载中，请稍候...', 'warning');
      setTimeout(() => this.startGame(), 500);
      return;
    }
    this.init();
    this.showScreen('main-screen');
    this.trialCount = 0;
    // 单局流程：开局随机 roll 本轮试炼总数（9-12 场），打满触发终局结算
    this._runTrialTarget = GAME_CONFIG.trials.perRunMin +
      Math.floor(Math.random() * (GAME_CONFIG.trials.perRunMax - GAME_CONFIG.trials.perRunMin + 1));
    this._runTrialsDone = 0;
    this.state.completedTrials = []; // 新轮回清空去重池
    // 清空剧情区域
    const content = document.getElementById('story-content');
    if (content) content.innerHTML = '';
    this.enterPrologue();
  },

  /* ===== 主界面开始新试炼 ===== */
  startTrial() {
    try {
      // URL 参数过滤（测试用）
      const urlParams = new URLSearchParams(window.location.search);
      const expandedOnly = urlParams.get('expanded') === '1';
      const expandedList = ['order_1', 'genesis_1', 'death_1'];

      // 过滤掉本场轮回已完成的试炼（无重复抽取）
      let allKeys = Object.keys(DATA_TRIALS);
      if (expandedOnly) {
        allKeys = allKeys.filter(k => expandedList.includes(k));
      }
      let available = allKeys.filter(k => !this.state.completedTrials.includes(k));

      // 如果全部都玩过了，重置去重池（兜底：正常单局 9-12 场不会耗尽 12 个试炼）
      if (available.length === 0) {
        this.state.completedTrials = [];
        available = allKeys.slice();
        this.addStoryLine('旁白', '……轮回重置。旧的试炼被清空，新的考验开始了。', 'narration');
      }

      // 带权随机抽取（难度随进度适配，权重可配置）
      const pick = TrialDB.pickWeighted(available, this._runTrialsDone || 0, this._runTrialTarget || GAME_CONFIG.trials.perRunMax);
      this.enterTrial(pick);
    } catch(e) {
      console.error('[Game] startTrial crash:', e);
      this.toast('试炼启动异常，正在重试...', 'error');
      setTimeout(() => this.startTrial(), 1000);
    }
  },

  /* ===== 序章 ===== */
  enterPrologue() {
    this.state.storyLog = [];
    this.addStoryLine('程实', '自我介绍一下，我叫程实。', 'cs-speaker');
    this.addStoryLine('程实', '我做人有两个原则——从不骗人，从不相信任何人说的话。', 'cs-speaker');
    this.addStoryLine('旁白', '……', 'narration');
    this.addStoryLine('旁白', '这是一场【信仰游戏】。十六位神明降临，将地球切成碎片，每个人必须选择一位神明供奉，在试炼中求生。', 'narration');
    this.addStoryLine('旁白', '而你，选择了最荒谬的那一位——【欺诈】。', 'narration');
    this.addStoryLine('程实', '很好笑，对吧？一个从不骗人的人，去信仰一个骗子。', 'cs-speaker');
    this.addStoryLine('程实', '……有些事，不需要理由。', 'cs-speaker');
    this.addStoryLine('旁白', '你的队友已经随机匹配完毕。今天的试炼即将开始……', 'narration');
    
    UI.setSceneTitle('序章 · 信仰降临');
    UI.setScenePhase('准备就绪');
    
    // 序章结束后的引导
    setTimeout(() => {
      this.showModal(
        '信仰试炼',
        '试炼即将开始！\n\n你的信仰是【欺诈】，职业是【小丑牧师】。\n作为从不骗人的骗子，你的核心玩法是：\n\n🎭 <b>谎言编织</b>：在关键时刻编织谎言，欺骗队友或敌人\n✨ <b>天赋触发</b>：用【谎如昨日】临时切换信仰，用【欺骗大师】识破谎言\n🎲 <b>选择导向</b>：每个选择都会影响属性、信任度，甚至生死\n\n准备好了吗？点击【开始试炼】踏上今天的信仰考验！',
        [
          { text: '开始试炼', action: () => { Game.startTrial(); UI.closeModal(); } },
          { text: '查看天赋', action: () => { Game.showTalents(); } }
        ]
      );
    }, 2000);
  },

  /* ===== 随机生成队友 ===== */
  generateTeammates() {
    const faiths = Object.keys(DATA_FAITHS);
    const classes = DATA_CLASSES.slice(); // 6种职业
    const personalities = DATA_TEAMMATE_PERSONALITIES.slice();
    const usedNames = new Set();
    
    const count = 5; // 加上程实共6人
    
    for (let i = 0; i < count; i++) {
      // 选名字
      let name;
      do {
        name = DATA_TEAMMATE_NAMES[Math.floor(Math.random() * DATA_TEAMMATE_NAMES.length)];
      } while (usedNames.has(name));
      usedNames.add(name);
      
      // 选信仰（避开程实的欺诈，避开对立信仰）
      let faith;
      do {
        faith = faiths[Math.floor(Math.random() * faiths.length)];
      } while (
        faith === 'fraud' || // 不要欺诈
        (this.state.teammates.some(t => DATA_OPPOSITES[t.faith] === faith)) // 避免对立队友
      );
      
      // 选职业
      const charClass = classes[Math.floor(Math.random() * classes.length)];
      const charClassName = DATA_CLASS_COMBOS[faith][charClass];
      
      // 选性格
      const personality = personalities[Math.floor(Math.random() * personalities.length)];
      
      const faithInfo = DATA_FAITHS[faith];
      
      this.state.teammates.push({
        id: 'tm_' + i,
        name: name,
        faith: faith,
        faithName: faithInfo.name,
        pathName: faithInfo.path,
        charClass: charClass,
        charClassName: charClassName,
        personality: personality.id,
        personalityName: personality.name,
        personalityTrait: personality.trait,
        hp: 80 + Math.floor(Math.random() * 30),
        hpMax: 100,
        mp: 80 + Math.floor(Math.random() * 30),
        mpMax: 100,
        trust: 50 + personality.trustMod + Math.floor(Math.random() * 10 - 5), // 对程实的信任
        doubt: 0,
        alive: true,
        remark: this.generateTeammateRemark(faith, charClass, personality)
      });
    }
  },

  generateTeammateRemark(faith, charClass, personality) {
    const remarks = {
      // 根据信仰生成个性标签
      order: '为人正直守序，是团队里的规矩人',
      truth: '求知若渴，喜欢分析一切',
      war: '胆小却好战，总在最后关头冲锋',
      chaos: '混乱无序，总让人摸不着头脑',
      folly: '高傲嘲讽，鼻孔朝天',
      silence: '沉默寡言，但话一出口就直击要害',
      genesis: '对"创造"有强烈执念',
      prosperity: '慷慨大方，愿意分享',
      death: '冷酷理性，不带感情',
      defilement: '眼神让人不安，似乎藏着秘密',
      decay: '阴沉寡欢，但有自己的坚持',
      annihilation: '沉默寡言，存在感极低',
      time: '说话总像在说谜语',
      memory: '记忆力惊人，过目不忘'
    };
    return remarks[faith] || '神秘莫测的存在';
  },

  /* ===== 进入试炼 ===== */
  enterTrial(trialId) {
    try {
      // 每场试炼自动换全新队友组合
      this.generateTeammates();
      
      const trial = DATA_TRIALS[trialId];
      if (!trial) {
        console.error('[Game] enterTrial: trial not found:', trialId);
        this.startTrial();
        return;
      }
      
      this._currentTrialId = trialId;
      this.state.currentTrial = trial;
      this.state.currentScene = trial.scenes.find(s => s.title && !s.outcome);
      
      this.visitedScenes = new Set();
      this._choiceSteps = 0;
      this._pendingEnding = null;
      this.state.storyLog = [];
      
      const content = document.getElementById('story-content');
      if (content) content.innerHTML = '';
      
      this.trialCount++;
      
      UI.setSceneTitle(trial.name);
      UI.setScenePhase(`难度: ${trial.difficulty} | 命途: ${trial.path}`);
      
      this.addStoryLine('旁白', trial.summary, 'narration');
      this.addStoryLine('旁白', `【目标】${trial.objective}`, 'narration');
      
      const firstScene = trial.scenes.find(s => s.title && !s.outcome);
      if (firstScene) {
        this.loadScene(firstScene);
      }
    } catch(e) {
      console.error('[Game] enterTrial crash:', e);
      this.toast('试炼加载异常', 'error');
    }
  },

  /* ===== 加载场景 ===== */
  loadScene(sceneData) {
    // 防止重复加载同一ID
    if (sceneData.id) {
      if (this.visitedScenes.has(sceneData.id)) return;
      this.visitedScenes.add(sceneData.id);
    }
    
    this.currentSceneData = sceneData;
    
    // 清除旧的选择
    UI.clearChoices();
    
    // 显示剧情文本
    sceneData.text.forEach((line, idx) => {
      setTimeout(() => {
        this.addStoryLine('旁白', line, 'narration');
      }, idx * 800);
    });
    
    // 延迟显示选择
    setTimeout(() => {
      if (sceneData.choices && sceneData.choices.length > 0) {
        // 有些选择可能需要条件检查
        const availableChoices = sceneData.choices.filter(c => !c.condition || c.condition(this.state));
        UI.showChoices(availableChoices);
      }
    }, sceneData.text.length * 800 + 500);
  },

  /* ===== 处理选择 ===== */
  makeChoice(choice) {
    try {
      // —— 愚戏之唇：仅当当前试炼场景明确标记允许触发时才会发生（不是所有场景都有）——
      if (this.currentSceneData && this.currentSceneData.allowLieTrigger && !this.state.autoLie.active) {
        const lie = this.checkAutoLie();
        if (lie) {
          this.triggerAutoLie(lie);
        }
      }
      
      // —— 统计谎言连击 ——
      if (choice.tag === 'lie') {
        this._lieStreak = (this._lieStreak || 0) + 1;
      } else {
        this._lieStreak = 0;
      }
      
      // 隐藏选择按钮
      UI.clearChoices();
      this._choiceSteps = (this._choiceSteps || 0) + 1;
      
      // 显示选择的文本反馈
      this.addStoryLine('程实', `（你选择了："${choice.text.replace(/[""""]/g, '')}"）`, 'cs-speaker');
      
      // 应用效果
      if (choice.effects) {
        this.applyEffects(choice.effects);
      }
      
      // 检查血量是否为1成就
      if (this.state.chengshi.hp === 1) {
        this.checkAchievements({ hpOneAlive: true });
      }
      
      // 检查恐惧值彩蛋
      if (this.state.chengshi.fear >= 100) {
        this.unlockEasterEgg('fear_100_secret', '深渊凝视');
      }
      
      // 检查是否需要谎言编织
      if (choice.tag === 'lie') {
        // 自动触发谎言效果
        this.addStoryLine('程实', '你深吸一口气，启动了【欺骗大师】——你必须让这个谎言"成真"。', 'cs-speaker');
      }
    
      // —— 幕间场景选择：结算后回到被暂存的结局 ——
      if (this.currentSceneData && this.currentSceneData.interlude) {
        if (choice.resolve) this.addStoryLine('旁白', choice.resolve, 'narration');
        const pending = this._pendingEnding;
        this._pendingEnding = null;
        setTimeout(() => {
          if (pending && this.state.chengshi.hp > 0) this.finishTrial(pending);
        }, 1500);
        return;
      }

    // 跳转到下一个场景
      if (choice.next) {
        const nextScene = this.findSceneByKey(choice.next);
        if (nextScene) {
          if (nextScene.outcome) {
            this.finishTrial(nextScene);
          } else {
            this.loadScene(nextScene);
          }
        }
      } else if (choice.next === null) {
        this.finishTrial(null);
      }
    } catch(e) {
      console.error('[Game] makeChoice crash:', e, 'choice:', choice);
      this.toast('选择处理异常', 'error');
    }
  },

  /* ===== 按key查找场景 ===== */
  findSceneByKey(key) {
    if (!this.state.currentTrial) return null;
    return this.state.currentTrial.scenes.find(s => s.id === key);
  },

  /* ===== 应用效果 ===== */
  applyEffects(effects) {
    if (!effects) return;
    const cs = this.state.chengshi;
    
    // 程实属性变化
    if (effects.hpCost) {
      cs.hp = Math.max(0, Math.min(cs.hpMax, cs.hp - effects.hpCost));
      if (effects.hpCost > 0) this.toast(`血量 -${effects.hpCost}`, 'error');
      else this.toast(`血量 +${-effects.hpCost}`, 'success');
    }
    if (effects.mpCost) {
      cs.mp = Math.max(0, Math.min(cs.mpMax, cs.mp - effects.mpCost));
      if (effects.mpCost > 0) this.toast(`精神 -${effects.mpCost}`, 'warning');
      else this.toast(`精神 +${-effects.mpCost}`, 'success');
    }
    if (effects.csTrust) {
      cs.trust = Math.max(0, Math.min(100, cs.trust + effects.csTrust));
    }
    if (effects.fear) {
      cs.fear = Math.max(0, Math.min(100, cs.fear + effects.fear));
    }
    
    // 队友属性变化（按性格差异化）
    if (effects.trust || effects.doubt) {
      const personalityMods = {
        paranoid:   { trustMod: 0.6, doubtMod: 1.8 },
        loyal:      { trustMod: 1.5, doubtMod: 0.5 },
        reckless:   { trustMod: 1.2, doubtMod: 1.0 },
        cunning:    { trustMod: 0.8, doubtMod: 1.3 },
        steady:     { trustMod: 1.0, doubtMod: 0.8 },
        greedy:     { trustMod: 0.7, doubtMod: 1.2 },
        altruistic: { trustMod: 1.3, doubtMod: 0.6 },
        cowardly:   { trustMod: 0.9, doubtMod: 1.5 }
      };
      this.state.teammates.forEach(t => {
        if (!t.alive) return;
        const mod = personalityMods[t.personality || t.personalityId] || { trustMod: 1, doubtMod: 1 };
        if (effects.trust) t.trust = Math.max(0, Math.min(100, t.trust + Math.round(effects.trust * mod.trustMod)));
        if (effects.doubt) {
          const inc = Math.round(effects.doubt * mod.doubtMod);
          t.doubt = Math.max(0, Math.min(100, t.doubt + inc));
          if (inc > 0) this.toast(`${t.name} 怀疑 +${inc}`, 'error');
        }
      });
      if (effects.trust) this.toast('队友信任变化', 'success');
    }
    
    UI.updateAllBars();
    
    // 程实死亡检测
    if (cs.hp <= 0) {
      this.triggerDeath();
      return;
    }
    
    // 队友死亡检测
    this.state.teammates.forEach(t => {
      if (t.alive && t.hp <= 0) {
        t.alive = false;
        this.toast(`${t.name} 倒下了...`, 'error');
        this.addStoryLine('旁白', `${t.name} 倒下了。【${t.faithName}】的权柄未能保住他们……`, 'narration');
      }
    });
    
    UI.updateAllBars();
  },

  /* ===== 程实死亡 ===== */
  triggerDeath() {
    const cs = this.state.chengshi;
    this.addStoryLine('旁白', '你的视线开始模糊……程实，从不骗人的程实，这次真的骗不过死亡了。', 'narration');
    this.addStoryLine('旁白', '——试炼失败。', 'narration');
    
    const finalScore = this.state.score_dengshen;
    
    setTimeout(() => {
      this.showModal(
        '💀 你死了',
        `在这场信仰试炼中，【欺诈】信徒程实倒下了。\n\n但这不是终点——在【信仰游戏】中，死亡只是暂时的。\n\n【最终积分】\n登神之路：${finalScore}\n累计试炼：${this.trialCount}\n\n你可以选择重新开始，带着这次的记忆继续前行。`,
        [
          { text: '重新开始', action: () => { UI.closeModal(); localStorage.removeItem('zs_game_save'); location.reload(); } },
          { text: '返回标题', action: () => { location.reload(); } }
        ]
      );
    }, 2000);
  },

  /* ===== 幕间场景抽取（为选择次数不足的试炼补足机会）===== */
  pickInterlude() {
    try {
      if (typeof DATA_INTERLUDES === 'undefined') return null;
      const god = (this.state.currentTrial && this.state.currentTrial.god) || null;
      const pool = DATA_INTERLUDES.filter(i =>
        !this.visitedScenes.has(i.id) && (i.god === 'any' || i.god === god)
      );
      if (pool.length === 0) return null;
      return pool[Math.floor(Math.random() * pool.length)];
    } catch (e) {
      console.error('[Game] pickInterlude crash:', e);
      return null;
    }
  },

  /* ===== 完成试炼 ===== */
  finishTrial(outcomeScene) {
    // —— 幕间补足：本场选择次数不足 5 时，插入突发幕间场景，保证每次试炼至少 5 次选择机会 ——
    if (outcomeScene && (this._choiceSteps || 0) < 5) {
      const itl = this.pickInterlude();
      if (itl) {
        this._pendingEnding = outcomeScene;
        UI.setScenePhase('幕间 · 突发状况');
        this.loadScene(itl);
        return;
      }
    }
    this._pendingEnding = null;

    try {
      // 记录已完成的试炼ID
      const trialId = this._currentTrialId || null;
      if (trialId && !this.state.completedTrials.includes(trialId)) {
        this.state.completedTrials.push(trialId);
      }
      // 单局试炼计数（打满 _runTrialTarget 触发终局结算）
      this._runTrialsDone = (this._runTrialsDone || 0) + 1;
      
      // —— 试炼完成类成就（基于 trialCount 递增）——
      this.checkAchievements({});
      
      // 更新队友死亡追踪
      const alive = this.state.teammates.filter(t => t.alive).length;
      const diedThisTrial = this.state.teammates.some(t => !t.alive);
      if (!diedThisTrial) {
        this._safeStreak = (this._safeStreak || 0) + 1;
      } else {
        this._safeStreak = 0;
      }
      
      let reward = { dengshen: 3, jinshen: 1 };
      let summary = '试炼结束。';
      let outcomeName = '及格';
      let isBest = false;
    
    if (outcomeScene) {
      reward = outcomeScene.reward || reward;
      summary = outcomeScene.summary || summary;
      
      const outcomeMap = {
        best: { name: '完美通关', color: 'success' },
        good: { name: '良好', color: 'success' },
        mid: { name: '及格', color: 'warning' },
        bad: { name: '失败', color: 'error' }
      };
      outcomeName = outcomeMap[outcomeScene.outcome]?.name || outcomeName;
      isBest = outcomeScene.outcome === 'best';
      
      // —— 检查结局相关成就 ——
      if (isBest) {
        this.checkAchievements({ outcome: 'best' });
      }
    }
    
    // 累加分数
    this.state.score_dengshen = Math.max(0, this.state.score_dengshen + (reward.dengshen || 0));
    this.state.score_jinshen += (reward.jinshen || 0);
    // 恢复部分资源
    this.state.chengshi.hp = Math.min(this.state.chengshi.hpMax, this.state.chengshi.hp + 20);
    this.state.chengshi.mp = Math.min(this.state.chengshi.mpMax, this.state.chengshi.mp + 30);
    
    // 自动保存成绩到排行榜（实时排名更新）
    const rank = this.saveToLeaderboard();
    
    UI.updateAllBars();
    
    // 显示结果
    setTimeout(() => {
      try {
        this.showModal(
          `试炼结果：${outcomeName}`,
          `${summary}\n\n` +
          `🏆 登神之路 +${reward.dengshen}分\n` +
          `⭐ 觐见之梯 +${reward.jinshen}分\n\n` +
          `【当前积分】\n登神之路：${this.state.score_dengshen}\n觐见之梯：${this.state.score_jinshen}\n` +
          `🏆 天梯排名：第 ${rank || '—'} 名（共 50 名）` +
          `\n\n【本轮进度】${this._runTrialsDone} / ${this._runTrialTarget} 场试炼`,
          [
            { text: '继续', action: () => { UI.closeModal(); this.afterTrial(); } }
          ]
        );
      } catch(e) {
        console.error('[Game] finishTrial modal crash:', e);
      }
    }, 1500);
    } catch(e) {
      console.error('[Game] finishTrial crash:', e);
      this.toast('试炼结算异常', 'error');
      setTimeout(() => this.prepareNextTrial(), 2000);
    }
  },

  /* ===== 试炼后触发觐神或继续 ===== */
  afterTrial() {
    // 觐神概率：参数集中在 GAME_CONFIG.jinshen，便于后续按运营数据动态平衡
    const cfg = GAME_CONFIG.jinshen;
    const mainFaith = this.state.chengshi?.faith || 'fraud';
    let chance;
    if (mainFaith === 'fraud') {
      chance = Math.min(cfg.chanceFraudMax, cfg.chanceFraudMin + this.state.score_jinshen * cfg.chanceFraudPerScore);
    } else {
      chance = Math.min(cfg.chanceOtherMax, cfg.chanceOtherMin + this.state.score_jinshen * cfg.chanceOtherPerScore);
    }
    if (Math.random() < chance) {
      this.triggerJinshen();
    } else {
      this.prepareNextTrial();
    }
  },

  /* ===== 触发觐神 ===== */
  triggerJinshen() {
    // 选择觐见神明（可能是试炼对应的神，也可能是程实的主信神）
    const trialGod = this.state.currentTrial?.god;
    const allGods = Object.keys(DATA_JINSHEN);
    
    // 50%概率是试炼神，50%是主信神或随机
    let targetGod;
    if (trialGod && allGods.includes(trialGod) && Math.random() < 0.5) {
      targetGod = trialGod;
    } else {
      // 主信神概率更高
      if (allGods.includes(this.state.chengshi.faith) && Math.random() < 0.5) {
        targetGod = this.state.chengshi.faith;
      } else {
        targetGod = allGods[Math.floor(Math.random() * allGods.length)];
      }
    }
    
    this.state.jinshen = {
      active: true,
      god: targetGod,
      patience: 70 + Math.floor(Math.random() * 20),
      appreciation: 30 + Math.floor(Math.random() * 20)
    };
    
    // 觐神时显示恐惧值
    document.getElementById('cs-fear-wrap').classList.remove('hidden');
    UI.updateFear(0);
    
    UI.setScenePhase('🌟 觐见神明');
    this.addStoryLine('旁白', '空间开始扭曲，空气变得沉重而压抑——', 'narration');
    this.addStoryLine('旁白', '你感觉有一道目光穿透了虚空，落在你身上。', 'narration');
    
    setTimeout(() => {
      this.enterJinshenScene(targetGod);
    }, 1500);
  },

  enterJinshenScene(godId) {
    const godData = DATA_GODS[godId];
    const jinshenData = DATA_JINSHEN[godId];
    if (!godData || !jinshenData) return;
    
    // 显示神明展示弹窗
    UI.showGodModal(godData, () => {
      // 显示对话
      this.playJinshenDialogue(godId);
    });
  },

  playJinshenDialogue(godId) {
    const jinshenData = DATA_JINSHEN[godId];
    if (!jinshenData || !jinshenData.dialogues) return;
    
    // 顺序播放对话
    let idx = 0;
    
    const showDialogue = () => {
      if (idx >= jinshenData.dialogues.length) {
        this.finishJinshen(godId);
        return;
      }
      
      const d = jinshenData.dialogues[idx];
      
      // 应用效果
      if (d.effects) {
        if (d.effects.appreciation) {
          this.state.jinshen.appreciation += d.effects.appreciation;
          this.state.jinshen.appreciation = Math.max(0, Math.min(100, this.state.jinshen.appreciation));
        }
        if (d.effects.patience) {
          this.state.jinshen.patience += d.effects.patience;
          this.state.jinshen.patience = Math.max(0, Math.min(100, this.state.jinshen.patience));
        }
        if (d.effects.fear) {
          this.state.chengshi.fear = Math.max(0, Math.min(100, this.state.chengshi.fear + d.effects.fear));
          UI.updateFear(this.state.chengshi.fear);
        }
      }
      
      // 显示对话文本
      this.addStoryLine(d.speaker, d.text, d.speaker.includes('程实') ? 'cs-speaker' : 'speaker');
      
      // 如果有选项
      if (d.choices && d.choices.length > 0) {
        setTimeout(() => {
          UI.showJinshenChoices(d.choices, (choice) => {
            // 应用选择效果
            if (choice.effects) {
              if (choice.effects.appreciation) {
                this.state.jinshen.appreciation += choice.effects.appreciation;
                this.state.jinshen.appreciation = Math.max(0, Math.min(100, this.state.jinshen.appreciation));
              }
              if (choice.effects.fear) {
                this.state.chengshi.fear = Math.max(0, Math.min(100, this.state.chengshi.fear + choice.effects.fear));
                UI.updateFear(this.state.chengshi.fear);
              }
            }
            this.addStoryLine('程实', choice.text, 'cs-speaker');
            idx++;
            showDialogue();
          });
        }, 1500);
      } else {
        idx++;
        setTimeout(showDialogue, 1000);
      }
    };
    
    showDialogue();
  },

  finishJinshen(godId) {
    const jinshenData = DATA_JINSHEN[godId];
    const godData = DATA_GODS[godId];
    
    // 根据 appreciation 决定赐福
    let giftText = '';
    const appreciation = this.state.jinshen.appreciation;
    
    if (appreciation >= 80) {
      // 高好感：有概率获得随机赐福
      const possibleGifts = jinshenData.gifts || [];
      const randomGift = possibleGifts[Math.floor(Math.random() * possibleGifts.length)];
      if (randomGift) {
        giftText = `\n\n🎁 ${godData.name}赐予你：【${randomGift.name}】\n${randomGift.desc}`;
        
        // 应用赐福效果
        this.applyGift(godId, randomGift);
      }
    } else if (appreciation >= 50) {
      giftText = `\n\n✨ ${godData.name}对你表示了一定的认可。你获得了精神力恢复。`;
      this.state.chengshi.mp = this.state.chengshi.mpMax;
    } else {
      giftText = `\n\n😐 ${godData.name}对你的表现……没有明显不满，也没有赞赏。你安全离开了觐见空间。`;
      // 恐惧残留
      this.state.chengshi.hp = Math.max(10, this.state.chengshi.hp - 15);
    }
    
    UI.updateAllBars();
    
    // 隐藏恐惧值
    setTimeout(() => {
      UI.closeGodModal();
      this.state.jinshen.active = false;
      document.getElementById('cs-fear-wrap').classList.add('hidden');
      
      this.showModal(
        `觐见结束：${godData.name}`,
        `【欣赏值：${appreciation}】\n【耐心值：${this.state.jinshen.patience}】\n\n${godData.name}的形象逐渐消散……${giftText}`,
        [
          { text: '继续试炼', action: () => { UI.closeModal(); this.prepareNextTrial(); } }
        ]
      );
    }, 1000);
  },

  applyGift(godId, gift) {
    const cs = this.state.chengshi;
    
    switch (gift.name) {
      case '谎如昨日（天赋碎片）':
      case '谎如昨日':
        // 简化处理：临时降低一次对面信徒的信任
        this.buffNextTrial = '谎言强化';
        break;
      case '众生假面 ×1':
      case '众生假面':
        const maskItem = cs.itemList.find(i => i.id === 'mask_stock');
        if (maskItem) maskItem.count = (maskItem.count || 2) + 1;
        break;
      case '精神力恢复':
        cs.mp = cs.mpMax;
        break;
      case '血线回满':
        cs.hp = cs.hpMax;
        break;
      case '恐惧养料（额外）':
      case '死亡权柄碎片':
      case '骨仆充能':
        const ringItem = cs.itemList.find(i => i.id === 'bone_ring');
        if (ringItem) ringItem.charges = (ringItem.charges || 0) + 1;
        break;
      case '混乱扮演法（碎片）':
        this.buffNextTrial = '混乱伪装';
        break;
      default:
        this.buffNextTrial = gift.name;
    }
  },

  /* ===== 准备下一场试炼 ===== */
  prepareNextTrial() {
    // —— 终局结算：本轮试炼打满（9-12 场），触发大结局 ——
    if ((this._runTrialsDone || 0) >= (this._runTrialTarget || 0)) {
      this.showEnding();
      return;
    }
    UI.setScenePhase('准备中...');
    this.addStoryLine('旁白', '又度过了无所事事的七天。直到下一场信仰游戏再次降临。', 'narration');

    // 检查队友信任度
    const lowTrustTeammate = this.state.teammates.find(t => t.alive && t.trust < 30);
    if (lowTrustTeammate) {
      this.addStoryLine('旁白', `【警告】${lowTrustTeammate.name}对你的信任度很低……下次试炼可能会出问题。`, 'narration');
    }

    setTimeout(() => {
      this.showModal(
        '下一场试炼',
        `是否继续参加下一场【信仰试炼】？\n\n累计试炼次数：${this.trialCount}（本轮进度 ${this._runTrialsDone}/${this._runTrialTarget}）\n登神之路积分：${this.state.score_dengshen}\n觐见之梯积分：${this.state.score_jinshen}\n\n提示：每次试炼都会消耗精神力，也会获得回报。`,
        [
          { text: '继续试炼', action: () => { UI.closeModal(); this.startTrial(); } },
          { text: '查看状态', action: () => { Game.showCharacterStatus(); } },
          { text: '休息存档', action: () => {
              const saved = this.save();
              UI.closeModal();
              if (saved) this.toast('游戏已保存 ✅', 'success');
              else this.toast('保存失败 ❌', 'error');
            }
          }
        ]
      );
    }, 1500);
  },

  /* ===== 终局结算：本轮试炼打满后的大结局 ===== */
  showEnding() {
    try {
      UI.setScenePhase('终局 · 结算');
      this.addStoryLine('旁白', '最后一场试炼的余音散去，【欺诈】的笑声在虚空里回荡了很久，很久。', 'narration');
      this.addStoryLine('旁白', '——这一轮的信仰游戏，结束了。', 'narration');

      // 实时计算天梯最终排名
      const rank = this.saveToLeaderboard();
      this.save();

      const total = 2544 + (this.state.score_dengshen || 0) * 3 + (this.state.score_jinshen || 0) * 8;
      const earned = this.state.achievements || [];
      const achCount = earned.length;
      const achTotal = this.DATA_ACHIEVEMENTS.length;
      const achLines = earned.slice(-5).map(id => {
        const a = this.DATA_ACHIEVEMENTS.find(x => x.id === id);
        const t = this.state.achievementTimes?.[id];
        const timeStr = t ? `（${this.formatTime(t)}）` : '';
        return `　✅ ${a ? a.name : id}${timeStr}`;
      }).join('\n');

      setTimeout(() => {
        this.showModal(
          '🎭 终局结算 · 信仰游戏落幕',
          `本轮共经历 <b>${this._runTrialTarget}</b> 场试炼，你的天梯之路到此为止——\n\n` +
          `【总积分】${total}（登神 ${this.state.score_dengshen} + 觐见 ${this.state.score_jinshen}）\n` +
          `【天梯最终排名】第 ${rank || '—'} 名 / 50\n` +
          `【成就回顾】已解锁 ${achCount}/${achTotal} 项${achLines ? '\n' + achLines : ''}\n\n` +
          `欺诈神在远处呵呵直笑："这场乐子，吾记下了。下一轮，继续来骗吾啊。"\n\n` +
          `※ 成就与天梯记录将保留，开启新的轮回吧。`,
          [
            { text: '开启新轮回', style: 'primary', action: () => { UI.closeModal(); this.startNewCycle(); } },
            { text: '查看天梯', action: () => { Game.showLeaderboard(); } },
            { text: '查看成就', action: () => { Game.showAchievements(); } }
          ]
        );
      }, 1800);
    } catch(e) {
      console.error('[Game] showEnding crash:', e);
      this.toast('终局结算异常', 'error');
    }
  },

  /* ===== 开启新轮回（保留成就与天梯，重置单局数据）===== */
  startNewCycle() {
    // 重置单局数据
    this.trialCount = 0;
    this._safeStreak = 0;
    this._noDeathStreak = 0;
    this._lieStreak = 0;
    this.state.score_dengshen = 0;
    this.state.score_jinshen = 0;
    this.state.teammates = [];
    this.state.storyLog = [];
    this.state.chengshi.hp = this.state.chengshi.hpMax;
    this.state.chengshi.mp = this.state.chengshi.mpMax;
    this.state.chengshi.fear = 0;
    this.state.chengshi.trust = 50;
    // 重新 roll 单局试炼总数，开始新一轮
    this._runTrialTarget = GAME_CONFIG.trials.perRunMin +
      Math.floor(Math.random() * (GAME_CONFIG.trials.perRunMax - GAME_CONFIG.trials.perRunMin + 1));
    this._runTrialsDone = 0;
    this.state.completedTrials = [];
    // 成就与 achievementTimes 保留（跨轮回）
    this.showScreen('main-screen');
    const content = document.getElementById('story-content');
    if (content) content.innerHTML = '';
    this.toast('新轮回已开启 🎭', 'success');
    this.enterPrologue();
  },

  formatTime(ts) {
    try {
      const d = new Date(ts);
      const p = n => String(n).padStart(2, '0');
      return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
    } catch(e) { return ''; }
  },

  /* ===== 显示角色状态/天赋 ===== */
  showCharacterStatus() {
    this.showTalents();
  },

  showTalents() {
    const cs = this.state.chengshi;
    let html = `
      <div style="margin-bottom:16px;">
        <h4 style="color:var(--accent-gold);margin-bottom:8px;">基础信息</h4>
        <p>信仰：【${cs.faithName}】（${cs.pathName}命途）</p>
        <p>职业：${cs.charClass} · ${cs.charClassName}</p>
        <p>血量：${cs.hp}/${cs.hpMax}</p>
        <p>精神力：${cs.mp}/${cs.mpMax}</p>
        <p>可信度：${cs.trust}/100</p>
      </div>
      <div style="margin-bottom:16px;">
        <h4 style="color:var(--accent-purple);margin-bottom:8px;">天赋列表</h4>
    `;
    
    cs.talentList.forEach(t => {
      html += `
        <div style="background:var(--bg-panel-alt);padding:8px;border-radius:4px;margin-bottom:8px;">
          <div><b>${t.name}</b> <span style="color:${t.rank === 'SSS' ? '#f1c40f' : t.rank === 'SS' ? '#e67e22' : '#3498db'}">[${t.rank}]</span> <span style="color:var(--text-muted);font-size:11px;">${t.type === 'active' ? '主动' : '被动'}</span></div>
          <p style="font-size:12px;color:var(--text-secondary);margin-top:4px;">${t.desc}</p>
        </div>
      `;
    });
    
    html += `</div><div><h4 style="color:var(--accent-gold);margin-bottom:8px;">道具</h4>`;
    cs.itemList.forEach(i => {
      html += `
        <div style="background:var(--bg-panel-alt);padding:8px;border-radius:4px;margin-bottom:8px;">
          <div><b>${i.name}</b> <span style="color:#d4a843;">[${i.rank}]</span></div>
          <p style="font-size:12px;color:var(--text-secondary);margin-top:4px;">${i.desc}</p>
        </div>
      `;
    });
    
    html += `</div>`;
    
    this.showModal('角色状态', html, [
      { text: '关闭', action: () => UI.closeModal() }
    ]);
  },

  /* ===== 队友详情 ===== */
  showTeammateDetail() {
    let html = '';
    this.state.teammates.forEach((t, idx) => {
      const faithInfo = DATA_FAITHS[t.faith];
      html += `
        <div style="background:var(--bg-panel-alt);padding:10px;border-radius:4px;margin-bottom:10px;border-left:3px solid ${faithInfo.pathColor};">
          <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
            <b style="color:var(--text-primary);">${t.name}</b>
            <span style="font-size:11px;color:${faithInfo.pathColor};">【${faithInfo.name}】${t.charClassName}</span>
          </div>
          <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px;">
            性格：${t.personalityName} — ${t.personalityTrait}
          </div>
          <div style="font-size:11px;color:var(--text-secondary);">${t.remark}</div>
          <div style="margin-top:6px;">
            <span style="font-size:11px;">信任 ${t.trust}/100 · 怀疑 ${t.doubt}/100 · 血 ${t.hp}/${t.hpMax}</span>
          </div>
        </div>
      `;
    });
    
    this.showModal('队友详情', html, [
      { text: '关闭', action: () => UI.closeModal() }
    ]);
  },

  /* ===== 天赋按钮点击 ===== */
  useTalent() {
    const activeTalents = this.state.chengshi.talentList.filter(t => t.type === 'active');
    
    if (activeTalents.length === 0) {
      this.toast('没有可用的主动天赋', 'warning');
      return;
    }
    
    let html = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:10px;">选择要使用的天赋（注意精神力消耗）：</p>';
    activeTalents.forEach(t => {
      const cost = t.effect?.mpCost || 15;
      html += `
        <div style="background:var(--bg-panel-alt);padding:10px;border-radius:4px;margin-bottom:8px;border:1px solid var(--border-dark);">
          <div><b>${t.name}</b> <span style="color:#d4a843;font-size:11px;">[${t.rank}]</span></div>
          <p style="font-size:11px;color:var(--text-secondary);margin:4px 0;">${t.desc}</p>
          <div style="text-align:right;font-size:11px;color:#e74c3c;">精神消耗: ${cost}</div>
        </div>
      `;
    });
    
    this.showModal('✨ 使用天赋', html, [
      { text: '谎如昨日（临时切换信仰）', action: () => {
          UI.closeModal();
          this.addStoryLine('程实', '我启动了【谎如昨日】——我的信仰，暂时变成了刚才被我骗过的那个人的信仰。', 'cs-speaker');
          this.applyEffects({ mpCost: 15 });
          this.toast('信仰已临时切换（1场试炼有效）', 'success');
        } },
      { text: '献往虚无的祭品（让虚构成真）', action: () => {
          UI.closeModal();
          this.addStoryLine('程实', '【献往虚无的祭品】发动——我选择相信某个大家都假装存在的东西……', 'cs-speaker');
          this.applyEffects({ mpCost: 25 });
          this.toast('某个虚构物品变成了现实（效果由当前场景决定）', 'success');
        } },
      { text: '欺骗大师（识破现场谎言）', action: () => {
          UI.closeModal();
          this.addStoryLine('程实', '【欺骗大师】发动！我感知到周围的谎言……有人在说谎？', 'cs-speaker');
          this.applyEffects({ mpCost: 10 });
          this.toast('你识破了一些谎言', 'success');
        } },
      { text: '关闭', action: () => UI.closeModal() }
    ]);
  },

  /* ===== 谎言编织面板 ===== */
  openLiePanel() {
    UI.openLiePanel();
  },

  closeLiePanel() {
    UI.closeLiePanel();
  },

  /* ===== 道具按钮 ===== */
  inventory() {
    let html = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:10px;">选择要使用的道具：</p>';
    this.state.chengshi.itemList.forEach(i => {
      html += `
        <div style="background:var(--bg-panel-alt);padding:10px;border-radius:4px;margin-bottom:8px;border:1px solid rgba(212,168,67,0.3);">
          <div><b>${i.name}</b> <span style="color:#d4a843;font-size:11px;">[${i.rank}]</span> ${i.count ? `<span style="font-size:10px;color:var(--text-muted);">×${i.count}</span>` : ''}</div>
          <p style="font-size:11px;color:var(--text-secondary);margin:4px 0;">${i.desc}</p>
          ${i.effects ? i.effects.map(e => `<div style="font-size:10px;color:var(--text-muted);">· ${e.name}：${e.desc}</div>`).join('') : ''}
        </div>
      `;
    });
    
    this.showModal('🎒 道具背包', html, [
      { text: '使用骨仆戒指（吸收恐惧）', action: () => {
          UI.closeModal();
          this.state.chengshi.mp = Math.min(this.state.chengshi.mpMax, this.state.chengshi.mp + 25);
          this.addStoryLine('程实', '【骨仆乐乐尔之戒】开始吸收周围的恐惧能量……精神力恢复了！', 'cs-speaker');
          UI.updateAllBars();
          this.toast('精神 +25', 'success');
        } },
      { text: '关闭', action: () => UI.closeModal() }
    ]);
  },

  /* ===== 菜单 ===== */
  showMenu() {
    this.showModal('游戏菜单', '', [
      { text: '查看角色状态', action: () => { UI.closeModal(); this.showCharacterStatus(); } },
      { text: '查看队友', action: () => { UI.closeModal(); this.showTeammateDetail(); } },
      { text: '保存游戏', action: () => { 
          const saved = this.save();
          UI.closeModal();
          this.toast(saved ? '游戏已保存 ✅' : '保存失败 ❌', saved ? 'success' : 'error');
        } 
      },
      { text: '游戏说明', action: () => { UI.closeModal(); this.showHelp(); } },
      { text: '返回标题', action: () => { 
          if (confirm('确定返回标题界面？当前进度将丢失（如果未保存）')) {
            localStorage.removeItem('zs_game_save');
            location.reload();
          }
        } 
      },
      { text: '关闭', action: () => UI.closeModal() }
    ]);
  },

  /* ===== 游戏说明 ===== */
  showHelp() {
    const html = `
      <h4 style="color:var(--accent-gold);margin-bottom:8px;">🎮 核心玩法</h4>
      <p style="font-size:12px;line-height:1.8;">你将扮演程实，每次试炼都是一场随机生成的信仰考验。通过<span style="color:var(--accent-purple);">选择</span>和<span style="color:var(--accent-gold);">谎言</span>在试炼中生存下来。</p>
      
      <h4 style="color:var(--accent-gold);margin-top:12px;margin-bottom:8px;">📖 属性说明</h4>
      <p style="font-size:12px;line-height:1.8;">
        <b>血量</b>：归零则死亡<br>
        <b>精神力</b>：使用天赋和谎言的代价<br>
        <b>可信度</b>：你在队友心中的诚实指数<br>
        <b>恐惧值</b>：只在觐神时出现，过高会导致精神崩溃
      </p>
      
      <h4 style="color:var(--accent-gold);margin-top:12px;margin-bottom:8px;">🎭 标签含义</h4>
      <p style="font-size:12px;line-height:1.8;">
        <span style="color:#d4a843;">谎言</span>：编织谎言，可能触发【欺骗大师】天赋<br>
        <span style="color:#3498db;">真相</span>：说出真话<br>
        <span style="color:#9b59b6;">天赋</span>：使用【谎如昨日】【献往虚无的祭品】【欺骗大师】等<br>
        <span style="color:#e74c3c;">危险</span>：高风险选择
      </p>
      
      <h4 style="color:var(--accent-gold);margin-top:12px;margin-bottom:8px;">🌟 觐神机制</h4>
      <p style="font-size:12px;line-height:1.8;">试炼结束后有概率触发觐神。你会面对某位神明，需要通过对话获得其认可。<br><b>耐心值</b>：归零则神明失去兴趣<br><b>欣赏值</b>：越高越容易获得神赐</p>
      
      <h4 style="color:var(--accent-gold);margin-top:12px;margin-bottom:8px;">💾 自动存档</h4>
      <p style="font-size:12px;line-height:1.8;">每次关键节点会自动提示保存，也可手动保存。</p>
    `;
    
    this.showModal('📖 游戏说明', html, [
      { text: '我知道了', action: () => UI.closeModal() }
    ]);
  },

  /* ===== 剧情辅助 ===== */
  addStoryLine(speaker, text, type) {
    UI.addStoryLine(speaker, text, type);
  },

  /* ===== Toast ===== */
  toast(msg, type = 'info') {
    UI.showToast(msg, type);
  },

  /* ===== 弹窗 ===== */
  showModal(title, body, buttons) {
    UI.showModal(title, body, buttons);
  },

  closeModal(event) {
    this.stopForumPush();
    UI.closeModal(event);
  },

  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id)?.classList.add('active');
  },

  /* ============================================================
   * 【愚戏之唇】失控谎言系统
   * ============================================================ */
  // 预设谎言（与情境相关 + 带来负面后果）
  AUTO_LIE_CONFIG: {
    chance: 0.12,  // 12% 触发概率（仅在场景标记 allowLieTrigger 时生效）
    cooldownMs: 30000, // 30秒冷却，避免连续触发
    lies: [
      {
        text: '【失控】程实突然咧嘴笑了："其实……这一切都是我策划的。你们全都是我的棋子。"',
        effects: { trust: -15, csTrust: -20, doubt: 15 },
        consequence: '队友们看向程实的目光变了。不信任像瘟疫一样蔓延开来……'
      },
      {
        text: '【失控】程实指着身边一位队友："就是他！他是叛徒！我亲眼看到他和对面的神明使者交谈！"',
        effects: { trust: -10, csTrust: -15, hpCost: 10 },
        consequence: '那位队友难以置信地看着程实。其他队友开始窃窃私语……'
      },
      {
        text: '【失控】程实对着空气大喊："我根本不是什么【欺诈】信徒！我是【命运】的弃子！我恨这一切！"',
        effects: { trust: -12, csTrust: -18, fear: 10, doubt: 10 },
        consequence: '这句话在风中飘散。你能感觉到，队友们离你更远了。'
      },
      {
        text: '【失控】程实突然跪下来，对着地面磕头："求求你放过我……我不该信仰欺诈……我不该……"',
        effects: { trust: -8, csTrust: -25, fear: 15, mpCost: 15 },
        consequence: '你在地上颤抖，不知道自己刚才说了什么。但你知道——有些东西已经收不回来了。'
      },
      {
        text: '【失控】程实转向队友们："你们所有人……都只是试炼的消耗品。神明根本不在乎你们的死活。"',
        effects: { trust: -20, csTrust: -10, doubt: 20 },
        consequence: '沉默。一阵令人窒息的沉默。然后，有人开始后退。'
      },
      {
        text: '【失控】程实笑了笑："你知道吗？其实我是来杀你们的。信仰游戏的真正规则……是最后只能活一个。"',
        effects: { trust: -25, csTrust: -30, doubt: 25, hpCost: 20 },
        consequence: '有人握紧了武器。有人开始逃跑。你，为这句话付出了代价。'
      }
    ]
  },

  checkAutoLie() {
    const cfg = this.AUTO_LIE_CONFIG;
    // 冷却中跳过
    if (Date.now() < this.state.autoLie.cooldownUntil) return null;
    if (Math.random() >= cfg.chance) return null;
    // 触发！
    const lie = cfg.lies[Math.floor(Math.random() * cfg.lies.length)];
    this.state.autoLie.active = true;
    this.state.autoLie.cooldownUntil = Date.now() + cfg.cooldownMs;
    return lie;
  },

  triggerAutoLie(lie) {
    try {
      // 插叙谎言文本
      this.addStoryLine('旁白', '⚠️ 【愚戏之唇】——你失去了控制……', 'narration');
      this.addStoryLine('程实', lie.text, 'cs-speaker');
      this.addStoryLine('旁白', lie.consequence, 'narration');
      
      // 应用负面后果
      if (lie.effects) this.applyEffects(lie.effects);
      
      this.toast('⚠️ 你失控了！愚戏之唇被触发', 'error');
      
      // 解锁彩蛋
      this.unlockEasterEgg('auto_lie_triggered', '愚戏之唇：你让程实失控说谎');
    } catch(e) {
      console.error('[Game] triggerAutoLie crash:', e);
    } finally {
      // 谎言自然结束，下一个选择恢复正常
      setTimeout(() => {
        this.state.autoLie.active = false;
      }, 1000);
    }
  },

  /* ============================================================
   * 【成就 & 彩蛋】系统
   * ============================================================ */
  DATA_ACHIEVEMENTS: [
    // —— 剧情推进类 ——
    { id: 'trial_3',    name: '初入试炼',     desc: '完成第 3 场试炼',       check: (g) => g.trialCount >= 3 },
    { id: 'trial_5',    name: '熟练的试炼者', desc: '完成第 5 场试炼',       check: (g) => g.trialCount >= 5 },
    { id: 'trial_10',   name: '试炼老兵',     desc: '完成 10 场试炼',       check: (g) => g.trialCount >= 10 },
    { id: 'score_50',   name: '登神之路',     desc: '登神之路积分达到 50',   check: (g) => g.state.score_dengshen >= 50 },
    { id: 'score_100',  name: '觐见之梯',     desc: '觐见之梯积分达到 30',   check: (g) => g.state.score_jinshen >= 30 },
    // —— 特殊行为类 ——
    { id: 'best_clear', name: '完美通关',     desc: '以 best 结局完成试炼',  check: (g,ctx) => ctx?.outcome === 'best' },
    { id: 'jinshen_3',  name: '神明的注视',   desc: '累计觐神 3 次',         check: (g) => g.state.score_jinshen >= 3 },
    { id: 'lie_master', name: '谎言大师',     desc: '连续 3 次选择带"谎言"标签的选项', check: (g,ctx) => (g._lieStreak || 0) >= 3 },
    { id: 'fear_50',    name: '恐惧的囚徒',   desc: '恐惧值达到 50',         check: (g) => g.state.chengshi.fear >= 50 },
    { id: 'no_teammate_death', name: '可靠的队长', desc: '连续 3 场试炼无队友死亡', check: (g) => (g._safeStreak || 0) >= 3 },
    { id: 'trust_high', name: '众望所归',     desc: '所有队友信任度同时 ≥ 70', check: (g) => g.state.teammates.every(t => t.alive && t.trust >= 70) },
    // —— 隐藏挑战类 ——
    { id: 'doubt_100',  name: '孤家寡人',     desc: '队友怀疑度之和达到 100', check: (g) => g.state.teammates.reduce((s,t) => s + t.doubt, 0) >= 100 },
    { id: 'hp_1',       name: '九死一生',     desc: '血量降到 1 点还活着',   check: (g,ctx) => ctx?.hpOneAlive },
    { id: 'jinshen_best', name: '神明宠儿',   desc: '在觐神中获得最高评价',  check: (g,ctx) => ctx?.jinshenBest },
    { id: 'all_trials', name: '试炼探险家',   desc: '至少玩过每一种试炼',    check: (g) => g.state.completedTrials.length >= Object.keys(DATA_TRIALS).length },
    { id: 'no_death_run', name: '金身不灭',   desc: '连续 5 场试炼没死亡',   check: (g) => (g._noDeathStreak || 0) >= 5 }
  ],

  DATA_EASTER_EGGS: [
    { id: 'auto_lie_triggered',  name: '愚戏之唇',   hint: '触发一次失控谎言' },
    { id: 'fear_100_secret',     name: '深渊凝视',   hint: '让恐惧值达到极限（触发秘密结局）' },
    { id: 'faith_combo_fraud_mem', name: '背叛记忆', hint: '信仰欺诈 + 遇到记忆神信徒队友时触发特殊对话' },
    { id: 'all_lie_choices',     name: '谎言之王',   hint: '一次试炼中所有选择都是谎言' },
    { id: 'teammate_truth',     name: '队友的真相', hint: '连续三场试炼让同类型队友都活到最后' }
  ],

  /* ============================================================
   * 【欺诈与记忆的天梯】合并排行榜（前50）
   * 命名体系：
   *   欺诈信徒 —— 跳脱、戏谑的网名风（体现欺诈信仰的戏谑跳脱）
   *   记忆信徒 —— 沉稳、内敛的雅号风（体现记忆信仰的沉静守藏）
   * ID 体系：前缀反映信仰（QZ=欺诈 / JY=记忆）+ 4 位编号，格式统一
   * 分数体系：第 1-50 名相邻分差严格控制在 4-8 分（前 5 名为传说固定档）
   * 主控："我从不骗人"（QZ-0047），初始排名 46-48 区间
   * ============================================================ */
  NPC_LEADERBOARD_COMBINED: [
    { id: 'QZ-0001', name: '李景明',              score: 2816, trials: 46, winRate: 0.96, faith: '欺诈' },
    { id: 'QZ-0002', name: '坏了，这是真龙王',    score: 2802, trials: 44, winRate: 0.95, faith: '欺诈' },
    { id: 'JY-0003', name: '还如一梦中',          score: 2799, trials: 45, winRate: 0.94, faith: '记忆' },
    { id: 'QZ-0004', name: '差2分包揽金银铜，好气', score: 2797, trials: 43, winRate: 0.93, faith: '欺诈' },
    { id: 'JY-0005', name: '此情可待',            score: 2794, trials: 42, winRate: 0.93, faith: '记忆' },
    { id: 'QZ-0006', name: '今天也在骗着呢',      score: 2787, trials: 42, winRate: 0.93, faith: '欺诈' },
    { id: 'JY-0007', name: '一纸旧信笺',          score: 2782, trials: 43, winRate: 0.92, faith: '记忆' },
    { id: 'QZ-0008', name: '别信我第二句',        score: 2776, trials: 40, winRate: 0.92, faith: '欺诈' },
    { id: 'JY-0009', name: '墨痕未干',            score: 2772, trials: 41, winRate: 0.91, faith: '记忆' },
    { id: 'QZ-0010', name: '谎话张口就来',        score: 2764, trials: 39, winRate: 0.91, faith: '欺诈' },
    { id: 'JY-0011', name: '灯下拾遗',            score: 2758, trials: 40, winRate: 0.90, faith: '记忆' },
    { id: 'QZ-0012', name: '骗你我是小狗',        score: 2753, trials: 38, winRate: 0.90, faith: '欺诈' },
    { id: 'JY-0013', name: '旧事枕边书',          score: 2746, trials: 39, winRate: 0.89, faith: '记忆' },
    { id: 'QZ-0014', name: '一本正经胡说',        score: 2742, trials: 37, winRate: 0.89, faith: '欺诈' },
    { id: 'JY-0015', name: '沉壁怀光',            score: 2736, trials: 38, winRate: 0.88, faith: '记忆' },
    { id: 'QZ-0016', name: '快乐撒谎机',          score: 2728, trials: 36, winRate: 0.88, faith: '欺诈' },
    { id: 'JY-0017', name: '檐下听雨人',          score: 2723, trials: 37, winRate: 0.87, faith: '记忆' },
    { id: 'QZ-0018', name: '嘴比脑子快',          score: 2716, trials: 35, winRate: 0.87, faith: '欺诈' },
    { id: 'JY-0019', name: '残卷校书郎',          score: 2712, trials: 36, winRate: 0.86, faith: '记忆' },
    { id: 'QZ-0020', name: '笑里藏刀专业户',      score: 2706, trials: 34, winRate: 0.86, faith: '欺诈' },
    { id: 'JY-0021', name: '半盏茶凉',            score: 2698, trials: 35, winRate: 0.85, faith: '记忆' },
    { id: 'QZ-0022', name: '满嘴跑火车',          score: 2693, trials: 33, winRate: 0.85, faith: '欺诈' },
    { id: 'JY-0023', name: '守阁老人',            score: 2687, trials: 34, winRate: 0.84, faith: '记忆' },
    { id: 'QZ-0024', name: '聊斋在逃狐狸',        score: 2680, trials: 32, winRate: 0.84, faith: '欺诈' },
    { id: 'JY-0025', name: '拾贝于汐',            score: 2676, trials: 33, winRate: 0.83, faith: '记忆' },
    { id: 'QZ-0026', name: '夸张大师本人',        score: 2670, trials: 31, winRate: 0.83, faith: '欺诈' },
    { id: 'JY-0027', name: '静水流深处',          score: 2665, trials: 32, winRate: 0.82, faith: '记忆' },
    { id: 'QZ-0028', name: '越离谱越真',          score: 2657, trials: 30, winRate: 0.82, faith: '欺诈' },
    { id: 'JY-0029', name: '一字一春秋',          score: 2653, trials: 31, winRate: 0.81, faith: '记忆' },
    { id: 'QZ-0030', name: '戏精本精',            score: 2646, trials: 29, winRate: 0.81, faith: '欺诈' },
    { id: 'JY-0031', name: '尘封札记',            score: 2640, trials: 30, winRate: 0.80, faith: '记忆' },
    { id: 'QZ-0032', name: '蹦迪骗徒',            score: 2635, trials: 28, winRate: 0.80, faith: '欺诈' },
    { id: 'JY-0033', name: '暗香浮动客',          score: 2627, trials: 29, winRate: 0.79, faith: '记忆' },
    { id: 'QZ-0034', name: '鬼话连篇君',          score: 2623, trials: 27, winRate: 0.79, faith: '欺诈' },
    { id: 'JY-0035', name: '缄口藏珠',            score: 2617, trials: 28, winRate: 0.78, faith: '记忆' },
    { id: 'QZ-0036', name: '谎言脱口秀',          score: 2610, trials: 26, winRate: 0.78, faith: '欺诈' },
    { id: 'JY-0037', name: '烛影摇红录',          score: 2605, trials: 27, winRate: 0.77, faith: '记忆' },
    { id: 'QZ-0038', name: '骗子打假办',          score: 2601, trials: 25, winRate: 0.77, faith: '欺诈' },
    { id: 'JY-0039', name: '薄雾渡口',            score: 2593, trials: 26, winRate: 0.76, faith: '记忆' },
    { id: 'QZ-0040', name: '假话十级学者',        score: 2587, trials: 24, winRate: 0.76, faith: '欺诈' },
    { id: 'JY-0041', name: '长夜秉烛者',          score: 2582, trials: 25, winRate: 0.75, faith: '记忆' },
    { id: 'QZ-0042', name: '抖机灵冠军',          score: 2575, trials: 23, winRate: 0.75, faith: '欺诈' },
    { id: 'JY-0043', name: '折枝记事',            score: 2571, trials: 24, winRate: 0.74, faith: '记忆' },
    { id: 'QZ-0044', name: '瞪眼说瞎话',          score: 2565, trials: 22, winRate: 0.74, faith: '欺诈' },
    { id: 'JY-0045', name: '苔痕上阶绿',          score: 2557, trials: 23, winRate: 0.73, faith: '记忆' },
    { id: 'QZ-0046', name: '彩虹屁制造机',        score: 2552, trials: 21, winRate: 0.73, faith: '欺诈' },
    { id: 'JY-0047', name: '闲敲棋子',            score: 2545, trials: 22, winRate: 0.72, faith: '记忆' },
    { id: 'QZ-0048', name: '反正你也不信',        score: 2541, trials: 20, winRate: 0.72, faith: '欺诈' },
    { id: 'JY-0049', name: '落笔为记',            score: 2535, trials: 21, winRate: 0.71, faith: '记忆' },
    { id: 'QZ-0050', name: '瞎话篓子',            score: 2527, trials: 19, winRate: 0.71, faith: '欺诈' }
  ],

  // 主控天梯参数：初始 2544 分落在第 48 名（2545 与 2541 之间，满足 46-48 区间）
  PLAYER_LADDER_BASE: 2544,
  PLAYER_LADDER_ID: 'QZ-0047',
  PLAYER_LADDER_NAME: '我从不骗人',

  // Fisher-Yates 洗牌
  _shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  // 获取合并后的排行榜（前50）
  // 展示规则：前 5 名固定；第 6-50 名 NPC 顺序每次随机打乱；主控名次保持真实位置
  getLeaderboard(sortBy = 'score') {
    const npcs = [...this.NPC_LEADERBOARD_COMBINED.map(n => ({ ...n, isNPC: true, change: '—' }))];
    // 从 localStorage 取玩家记录
    let players = [];
    try {
      const raw = localStorage.getItem('zs-leaderboard-combined');
      if (raw) players = JSON.parse(raw);
    } catch(e) {}
    const merged = [...npcs, ...players];
    const sortFn = {
      score:   (a, b) => b.score - a.score,
      winRate: (a, b) => b.winRate - a.winRate,
      trials:  (a, b) => b.trials - a.trials
    }[sortBy] || ((a, b) => b.score - a.score);
    const full = merged.sort(sortFn).slice(0, 50);
    // —— 第 6-50 名随机打乱（主控除外，主控名次按真实分数位置显示）——
    const playerIdx = full.findIndex(r => r.isPlayer);
    const restNpc = [];
    for (let i = 5; i < full.length; i++) {
      if (!full[i].isPlayer) restNpc.push(full[i]);
    }
    this._shuffle(restNpc);
    const out = full.slice(0, 5);
    let k = 0;
    for (let i = 5; i < full.length; i++) {
      if (i === playerIdx) out.push(full[i]);
      else out.push(restNpc[k++] || full[i]);
    }
    return out;
  },

  // 保存玩家成绩到合并排行榜（每次试炼结算后实时调用，返回当前排名）
  saveToLeaderboard() {
    let list = [];
    try {
      const raw = localStorage.getItem('zs-leaderboard-combined');
      if (raw) list = JSON.parse(raw);
    } catch(e) {}
    // 清掉旧的玩家条目
    list = list.filter(r => !r.isPlayer);
    // 玩家积分模型：初始基线 2544（第 46-48 名区间）+ 试炼表现加成
    const score = Math.min(4000, Math.max(this.PLAYER_LADDER_BASE,
      this.PLAYER_LADDER_BASE + (this.state.score_dengshen || 0) * 3 + (this.state.score_jinshen || 0) * 8));
    const record = {
      name: this.PLAYER_LADDER_NAME,
      id: this.PLAYER_LADDER_ID,
      score,
      trials: this.trialCount || this.state.trialCount || 1,
      winRate: 0.65,
      faith: '欺诈',
      isPlayer: true,
      change: 0,
      ts: Date.now()
    };
    list.push(record);
    // 只存前50
    list.sort((a, b) => b.score - a.score);
    list = list.slice(0, 50);
    localStorage.setItem('zs-leaderboard-combined', JSON.stringify(list));
    // 排名变动记录（与上次结算的名次差）
    const rank = list.findIndex(r => r.isPlayer) + 1;
    const lastRank = parseInt(localStorage.getItem('zs-lb-last-rank') || '0', 10);
    record.change = lastRank > 0 ? (lastRank - rank) : 0;
    localStorage.setItem('zs-lb-last-rank', String(rank));
    localStorage.setItem('zs-leaderboard-combined', JSON.stringify(list));
    this._playerRank = rank;
    this._playerChange = record.change;
    return rank;
  },

  // 显示合并排行榜（主控专属视觉：金框+发光+👑）
  showLeaderboard() {
    const list = this.getLeaderboard('score');
    const rows = list.map((r, i) => {
      const rank = i + 1;
      const faithColor = r.faith === '欺诈' ? '#e74c3c' : '#3498db';
      const faithTag = `<span style="color:${faithColor};">【${r.faith}】</span>`;
      if (r.isPlayer) {
        // 主控专属行：金色边框 + 发光 + 王冠（不显示 ID 括号）
        const chg = r.change > 0 ? `<span style="color:#2ecc71;">▲${r.change}</span>`
          : r.change < 0 ? `<span style="color:#e74c3c;">▼${-r.change}</span>` : '';
        return `<div style="border:1px solid var(--accent-gold,#e6b450);border-radius:6px;padding:6px 10px;margin:3px 0;` +
          `background:rgba(230,180,80,0.10);box-shadow:0 0 14px rgba(230,180,80,0.45),inset 0 0 8px rgba(230,180,80,0.15);` +
          `color:var(--accent-gold,#e6b450);font-weight:bold;">` +
          `👑 第${rank}名：${r.name}&nbsp;&nbsp;${r.score}&nbsp;&nbsp;${faithTag}${chg}` +
          ` <span style="color:var(--accent-gold,#e6b450);">◀ 我</span></div>`;
      }
      // 普通行：仅显示 名称 + 分数 + 信仰（隐藏 ID 括号）
      return `<div style="padding:2px 10px;margin:1px 0;">第${rank}名：${r.name}&nbsp;&nbsp;${r.score}&nbsp;&nbsp;${faithTag}</div>`;
    }).join('');

    this.showModal(
      '🏆 欺诈与记忆的天梯 · TOP 50',
      rows + '<br><span style="font-size:11px;color:var(--text-muted);">※ 欺诈与记忆双榜合并 · 每场试炼结算后实时更新你的排名 · 第6-50名次序随机轮换</span>',
      [
        { text: '关闭', action: () => UI.closeModal() }
      ]
    );
  },

  /* ===== 王者荣耀风格论坛（实时消息流）===== */
  // 过滤掉涉及主控的内容
  FORUM_FILTER: ['程实', '主角', '主控', '本尊', '老甲'],
  
  FORUM_CHANNELS: [
    '⚔️ 试炼经验',
    '🎭 欺诈信徒圈',
    '📖 记忆信徒圈',
    '🗡️ 战斗技巧',
    '💀 死亡闲聊',
    '🌪️ 混乱脑洞',
    '🍂 腐朽吐槽',
    '😱 恐魔日常'
  ],
  
  FORUM_MESSAGES: [
    { ch: '🎭 欺诈信徒圈', user: '今天也在骗着呢', msg: '新人注意！欺诈神讨厌毫无技术含量的谎言。你至少要编一个让自己都信的。', time: '3分钟前' },
    { ch: '📖 记忆信徒圈', user: '一纸旧信笺', msg: '有人用记忆天赋回溯到过上一个循环吗？我试过一次，看到了不该看的东西……', time: '8分钟前' },
    { ch: '⚔️ 试炼经验', user: '别信我第二句', msg: '秩序神的试炼，别直接否认指控。承认一半，编另一半，通过率翻三倍。', time: '12分钟前' },
    { ch: '💀 死亡闲聊', user: '旧事枕边书', msg: '墓碑试炼真的不选自己选的队友吗？选自己死了就没了啊……', time: '18分钟前' },
    { ch: '🌪️ 混乱脑洞', user: '越离谱越真', msg: '有没有可能所有神都是同一个东西的不同侧面？细思极恐', time: '25分钟前' },
    { ch: '🍂 腐朽吐槽', user: '半盏茶凉', msg: '腐朽镇那关真的太压抑了，我玩到一半差点卸载游戏……', time: '33分钟前' },
    { ch: '⚔️ 试炼经验', user: '谎话张口就来', msg: '给新人推荐天赋搭配：欺骗大师+谎如昨日，献祭流的核心组合', time: '42分钟前' },
    { ch: '😱 恐魔日常', user: '笑里藏刀专业户', msg: '恐魔怕不怕自己？上次试炼里恐魔互相咬起来了，笑死', time: '51分钟前' },
    { ch: '🎭 欺诈信徒圈', user: '嘴比脑子快', msg: '愚戏之唇那个失控效果谁触发过？我听说是随机场景触发的，不是所有人都有', time: '1小时前' },
    { ch: '📖 记忆信徒圈', user: '墨痕未干', msg: '用记忆天赋"翻阅"队友的记忆会怎样？试过的人说看到了很黑暗的东西……', time: '1小时前' },
    { ch: '🗡️ 战斗技巧', user: '一本正经胡说', msg: '骨仆戒指充能满了一个雷刑能秒恐魔，记住！', time: '1小时前' },
    { ch: '💀 死亡闲聊', user: '灯下拾遗', msg: '死亡神给我保管了一段我自己不记得的记忆……不知道该不该问', time: '2小时前' },
    { ch: '🌪️ 混乱脑洞', user: '戏精本精', msg: '混乱试炼可以同时扮演多个身份！我试过欺诈+污堕+秩序，爽到爆炸', time: '2小时前' },
    { ch: '⚔️ 试炼经验', user: '鬼话连篇君', msg: '每次试炼之间间隔七天，这七天真的只能等吗？有没有办法跳过？', time: '3小时前' },
    { ch: '🍂 腐朽吐槽', user: '薄雾渡口', msg: '腐朽和繁荣的关系我现在才想明白——没有腐朽就没有繁荣，没有繁荣也就没有腐朽', time: '3小时前' },
    { ch: '😱 恐魔日常', user: '瞎话篓子', msg: '恐魔的恐惧值溢出的时候会发生什么？有人试过吗？', time: '4小时前' },
    { ch: '🎭 欺诈信徒圈', user: '越离谱越真', msg: '刚通关一个用谎如昨日切换到记忆信仰的试炼，欺诈+记忆真的太bug了', time: '5小时前' },
    { ch: '⚔️ 试炼经验', user: '守阁老人', msg: '给大家一个忠告：不要在觐神的时候对神说谎。真的会扣欣赏值', time: '6小时前' },
    { ch: '📖 记忆信徒圈', user: '残卷校书郎', msg: '有人知道"被保管的记忆"到底是怎么回事吗？死亡神到底替我们藏了什么？', time: '8小时前' },
    { ch: '🌪️ 混乱脑洞', user: '旧事枕边书', msg: '突然想到：如果所有试炼的神都是同一个存在的不同人格？', time: '10小时前' }
  ],
  
  /* ===== 王者荣耀风格论坛（实时推送 · 去重 · 仅浏览）===== */
  showForum() {
    this.stopForumPush();
    // 过滤掉涉及主控的消息
    const filtered = this.FORUM_MESSAGES.filter(m =>
      !this.FORUM_FILTER.some(f => m.msg.includes(f) || m.user.includes(f))
    );
    // 消息队列：洗牌后逐条推送，用 Set 记录已显示消息实现去重
    this._forumQueue = [...filtered].sort(() => Math.random() - 0.5);
    this._forumSeen = new Set();
    const initial = this._forumQueue.splice(0, 8);
    initial.forEach(m => this._forumSeen.add(m.msg));
    const online = 12 + Math.floor(Math.random() * 60);

    const html = `
      <div id="forum-container" style="max-height:400px;overflow-y:auto;padding-right:6px;">
        <div style="background:linear-gradient(90deg,#1a1a2e,#16213e);padding:8px 12px;border-radius:6px;margin-bottom:10px;text-align:center;font-size:12px;color:var(--accent-gold);">
          📡 信仰世界 · 实时消息大厅 · 在线 ${online} 人
        </div>
        <div id="forum-feed">
          ${initial.map((m, i) => this._forumMsgHtml(m, i)).join('')}
        </div>
      </div>
      <div style="text-align:center;font-size:11px;color:var(--text-muted);margin-top:8px;padding:6px;border-top:1px solid rgba(255,255,255,0.05);">
        ※ 仅浏览 · 新消息实时自动推送 · 同一条消息不会重复出现
      </div>
    `;

    this.showModal(
      '💬 信仰世界交流大厅',
      html,
      [
        { text: '关闭', action: () => { this.stopForumPush(); UI.closeModal(); } }
      ]
    );

    // 启动实时推送：每 4 秒自动出现一条新消息
    this._forumTimer = setInterval(() => this.pushForumMessage(), 4000);
  },

  _forumMsgHtml(m, i) {
    return `
      <div style="padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);animation:fadeIn 0.3s ease ${Math.min(i, 8) * 0.05}s both;">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
          <span style="font-size:11px;color:#e67e22;">${m.ch}</span>
          <span style="font-size:12px;color:#d4a843;font-weight:bold;">${m.user}</span>
          <span style="font-size:10px;color:var(--text-muted);margin-left:auto;">${m.time}</span>
        </div>
        <div style="font-size:13px;color:var(--text-primary);line-height:1.7;padding-left:2px;">${m.msg}</div>
      </div>
    `;
  },

  pushForumMessage() {
    try {
      const feed = document.getElementById('forum-feed');
      if (!feed) { this.stopForumPush(); return; }
      // 队列耗尽：重新洗牌并清空去重记录（一轮之内绝不重复）
      if (!this._forumQueue || this._forumQueue.length === 0) {
        const filtered = this.FORUM_MESSAGES.filter(m =>
          !this.FORUM_FILTER.some(f => m.msg.includes(f) || m.user.includes(f))
        );
        this._forumQueue = [...filtered].sort(() => Math.random() - 0.5);
        this._forumSeen = new Set();
      }
      const m = this._forumQueue.shift();
      if (!m || this._forumSeen.has(m.msg)) return;
      this._forumSeen.add(m.msg);
      const wrap = document.createElement('div');
      wrap.innerHTML = this._forumMsgHtml({ ...m, time: '刚刚' }, 0);
      feed.appendChild(wrap.firstElementChild);
      const box = document.getElementById('forum-container');
      if (box) box.scrollTop = box.scrollHeight;
    } catch (e) {
      console.error('[Game] pushForumMessage crash:', e);
      this.stopForumPush();
    }
  },

  stopForumPush() {
    if (this._forumTimer) {
      clearInterval(this._forumTimer);
      this._forumTimer = null;
    }
  },

  checkAchievements(ctx = {}) {
    const newlyUnlocked = [];
    this.DATA_ACHIEVEMENTS.forEach(a => {
      if (!this.state.achievements.includes(a.id) && a.check(this, ctx)) {
        this.state.achievements.push(a.id);
        // 记录解锁时间（跨轮回保留）
        if (!this.state.achievementTimes) this.state.achievementTimes = {};
        this.state.achievementTimes[a.id] = Date.now();
        newlyUnlocked.push(a);
      }
    });
    newlyUnlocked.forEach(a => this.showAchievementToast(a));
    return newlyUnlocked;
  },

  /* ===== 成就系统界面（三类展示 + 筛选/排序/搜索）===== */
  _achFilter: 'all',   // all | earned | locked
  _achSort: 'default', // default | name | time
  _achSearch: '',

  showAchievements() {
    const earned = this.state.achievements || [];
    const times = this.state.achievementTimes || {};
    const kw = (this._achSearch || '').trim();

    let list = this.DATA_ACHIEVEMENTS.filter(a => {
      if (this._achFilter === 'earned' && !earned.includes(a.id)) return false;
      if (this._achFilter === 'locked' && earned.includes(a.id)) return false;
      if (kw && !(a.name.includes(kw) || a.desc.includes(kw))) return false;
      return true;
    });

    if (this._achSort === 'name') {
      list = list.slice().sort((a, b) => a.name.localeCompare(b.name, 'zh'));
    } else if (this._achSort === 'time') {
      list = list.slice().sort((a, b) => (times[b.id] || 0) - (times[a.id] || 0));
    }

    const rows = list.map(a => {
      const got = earned.includes(a.id);
      if (got) {
        // 已获得：图标 + 名称 + 获取时间 + 描述
        const t = times[a.id] ? this.formatTime(times[a.id]) : '时间未知';
        return `<div style="border:1px solid rgba(230,180,80,0.5);border-radius:6px;padding:6px 10px;margin:4px 0;background:rgba(230,180,80,0.08);">` +
          `<span style="color:var(--accent-gold,#e6b450);">🏆 <b>${a.name}</b></span>` +
          `<span style="font-size:11px;color:var(--text-muted);margin-left:8px;">⏰ ${t}</span><br>` +
          `<span style="font-size:12px;color:var(--text-main,#ccc);">${a.desc}</span></div>`;
      }
      // 未获得：灰色图标 + 名称 + 详细解锁条件
      return `<div style="border:1px dashed rgba(255,255,255,0.18);border-radius:6px;padding:6px 10px;margin:4px 0;background:rgba(255,255,255,0.03);">` +
        `<span style="color:#7f8c8d;">🔒 <b>${a.name}</b></span><br>` +
        `<span style="font-size:12px;color:var(--text-muted);">解锁条件：${a.desc}</span></div>`;
    }).join('');

    const achBody =
      `<div style="display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap;align-items:center;">` +
      `<button onclick="Game._achFilter='all';Game.showAchievements();" style="flex:0 0 auto;" class="${this._achFilter==='all'?'btn-primary':'btn-secondary'}">全部</button>` +
      `<button onclick="Game._achFilter='earned';Game.showAchievements();" style="flex:0 0 auto;" class="${this._achFilter==='earned'?'btn-primary':'btn-secondary'}">已获得(${earned.length})</button>` +
      `<button onclick="Game._achFilter='locked';Game.showAchievements();" style="flex:0 0 auto;" class="${this._achFilter==='locked'?'btn-primary':'btn-secondary'}">未获得(${this.DATA_ACHIEVEMENTS.length-earned.length})</button>` +
      `<select onchange="Game._achSort=this.value;Game.showAchievements();" style="background:#1a1a2e;color:#eee;border:1px solid #444;border-radius:4px;padding:4px 6px;">` +
      `<option value="default"${this._achSort==='default'?' selected':''}>默认排序</option>` +
      `<option value="name"${this._achSort==='name'?' selected':''}>按名称</option>` +
      `<option value="time"${this._achSort==='time'?' selected':''}>按解锁时间</option>` +
      `</select>` +
      `<input type="text" placeholder="搜索成就…" value="${this._achSearch||''}" ` +
      `oninput="Game._achSearch=this.value;" onchange="Game.showAchievements();" ` +
      `style="flex:1;min-width:100px;background:#1a1a2e;color:#eee;border:1px solid #444;border-radius:4px;padding:4px 8px;">` +
      `</div>` +
      `<div style="max-height:44vh;overflow-y:auto;">` +
      (rows || '<div style="color:var(--text-muted);padding:12px;text-align:center;">没有符合条件的成就</div>') +
      `</div>`;

    this.showModal(
      `🏆 成就殿堂（${earned.length}/${this.DATA_ACHIEVEMENTS.length}）`,
      achBody,
      [{ text: '关闭', action: () => UI.closeModal() }]
    );
  },

  unlockEasterEgg(id, name) {
    if (!this.state.easterEggs.includes(id)) {
      this.state.easterEggs.push(id);
      console.log('[EGG] 解锁彩蛋:', id, name);
    }
  },

  showAchievementToast(a) {
    // 简短弹出成就解锁提示
    try {
      this.showModal(
        `🏆 成就解锁：${a.name}`,
        `【${a.desc}】\n\n你已获得此项成就。继续探索，还有更多秘密等你发现……`,
        [{ text: '好的', action: () => UI.closeModal() }]
      );
    } catch(e) {}
  },

  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id)?.classList.add('active');
  }
};

// 启动
window.addEventListener('DOMContentLoaded', () => {
  // 检查是否有存档
  if (Game.hasSave()) {
    // 在开始界面显示"继续上次游戏"时有效
  }
});
