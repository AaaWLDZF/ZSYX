# -*- coding: utf-8 -*-
# 临时拼接脚本：将远端旧版 js/game.js 与本轮修复代码块拼接为目标版本
# 自校验：最终 git blob SHA1 必须等于本地文件，否则报错退出
import hashlib
import re
import sys

P = 'js/game.js'
EXPECTED = '90f94b0b676a9b80d83ec9df254da6a5f37813f4'


def fail(msg):
    print('SPLICE_FAIL:', msg)
    sys.exit(1)


raw = open(P, 'rb').read()
if b'\r' in raw:
    fail('CR found in source')
s = raw.decode('utf-8')

cur = hashlib.sha1(b'blob %d\x00' % len(raw) + raw).hexdigest()
if cur == EXPECTED:
    print('ALREADY_SPLICED')
    sys.exit(0)

# ---------- 块A：存档系统（save/_deepMerge/load/hasSave/loadGame/bindAutosave） ----------
BLOCK_A = r'''  /* ===== 存档 ===== */
  save() {
    try {
      // 控制存档体积：剧情日志只保留最近 60 条
      if (Array.isArray(this.state.storyLog) && this.state.storyLog.length > 60) {
        this.state.storyLog = this.state.storyLog.slice(-60);
      }
      // 单局流程参数一并入档，避免读档后随机重掷
      this.state.runTarget = this._runTrialTarget;
      this.state.runDone = this._runTrialsDone;
      // 累计试炼计数同步入档（存在实例上，读档后由 loadGame 恢复）
      this.state.trialCount = this.trialCount || this.state.trialCount || 0;
      this.state.savedAt = Date.now();
      localStorage.setItem('zs_game_save', JSON.stringify(this.state));
      return true;
    } catch(e) {
      console.warn('[Game] 存档写入失败:', e);
      return false;
    }
  },

  // 深合并：以默认结构为底、存档数据覆盖，自动补齐旧版本缺失字段
  _deepMerge(base, over) {
    if (over === undefined) return base;
    if (Array.isArray(base) || Array.isArray(over)) return over;
    if (typeof base !== 'object' || base === null || typeof over !== 'object' || over === null) return over;
    const out = Object.assign({}, base);
    for (const k of Object.keys(over)) {
      out[k] = (k in base) ? this._deepMerge(base[k], over[k]) : over[k];
    }
    return out;
  },

  load() {
    let save = null;
    try { save = localStorage.getItem('zs_game_save'); } catch(e) {}
    if (!save) return false;
    let parsed = null;
    try {
      parsed = JSON.parse(save);
    } catch(e) {
      console.warn('[Game] 存档损坏（JSON 解析失败），已自动清除');
      try { localStorage.removeItem('zs_game_save'); } catch(e2) {}
      return false;
    }
    if (!parsed || typeof parsed !== 'object') {
      try { localStorage.removeItem('zs_game_save'); } catch(e2) {}
      return false;
    }
    // 用默认结构兜底：修复旧档缺字段/字段损坏导致的读档后崩溃
    try {
      const defaults = JSON.parse(JSON.stringify(this._defaults || this.state));
      this.state = this._deepMerge(defaults, parsed);
    } catch(e) {
      this.state = parsed;
    }
    // 兼容旧存档：恢复单局流程参数（9-12 场 + 终局结算）
    if (typeof parsed.runTarget === 'number' && parsed.runTarget > 0) {
      this._runTrialTarget = parsed.runTarget;
    } else if (!this._runTrialTarget) {
      this._runTrialTarget = GAME_CONFIG.trials.perRunMin +
        Math.floor(Math.random() * (GAME_CONFIG.trials.perRunMax - GAME_CONFIG.trials.perRunMin + 1));
    }
    this._runTrialsDone = (typeof parsed.runDone === 'number') ? parsed.runDone : (this._runTrialsDone || 0);
    return true;
  },

  hasSave() {
    try {
      const s = localStorage.getItem('zs_game_save');
      if (!s) return false;
      JSON.parse(s); // 可解析才算有效存档
      return true;
    } catch(e) { return false; }
  },

  /* ===== 读档入口（首页"继续上次游戏"按钮） ===== */
  loadGame() {
    if (!this.hasSave()) {
      this.toast('暂无存档，请先开启新的试炼', 'warning');
      return;
    }
    if (!this.load()) {
      this.toast('存档已损坏，无法读取', 'error');
      return;
    }
    this._started = true;
    this.bindAutosave();
    this.showScreen('main-screen');
    try {
      UI.updateAllBars();
      UI.renderChengshiInfo();
      UI.renderTeammates();
      UI.setSceneTitle('存档恢复');
      UI.setScenePhase('读档 · 继续');
      const trialCount = this.trialCount || this.state.trialCount || 0;
      this.trialCount = trialCount; // 恢复累计试炼计数（否则继续游玩后计数变 NaN、成就失效）
      UI.addStoryLine('旁白', '意识在虚空中重新凝聚——存档读取成功。', 'narration');
      UI.addStoryLine('旁白', `当前进度：累计试炼 ${trialCount} 场 · 本轮 ${this._runTrialsDone}/${this._runTrialTarget} · 登神 ${this.state.score_dengshen} / 觐神 ${this.state.score_jinshen}。`, 'narration');
      const list = document.getElementById('choices-list');
      if (list) list.innerHTML = '<button class="choice-btn" onclick="Game.startTrial()">▶ 继续下一场试炼</button>';
    } catch(e) {
      console.error('[Game] 读档界面恢复异常:', e);
    }
    this.toast('存档读取成功，欢迎回来 ✅', 'success');
  },

  /* ===== 自动存档：切后台/关闭页面/每 30 秒 ===== */
  bindAutosave() {
    if (this._autosaveBound) return;
    this._autosaveBound = true;
    window.addEventListener('beforeunload', () => { if (this._started) this.save(); });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden' && this._started) this.save();
    });
    setInterval(() => { if (this._started) this.save(); }, 30000);
  },

'''

# ---------- 拼接1：替换整个存档块 ----------
A = '  /* ===== 存档 ===== */'
B = '  /* ===== 开始游戏 ===== */'
i1 = s.find(A)
i2 = s.find(B)
if i1 < 0 or i2 <= i1:
    fail('save anchors: i1=%d i2=%d' % (i1, i2))
if s.find(A, i1 + 1) >= 0:
    fail('save header not unique')
if s.find(B, i2 + 1) >= 0:
    fail('start header not unique')
s = s[:i1] + BLOCK_A + s[i2:]

# ---------- 拼接2：startGame 加入自动存档绑定 ----------
OLD_SG = "    this.init();\n    this.showScreen('main-screen');\n    this.trialCount = 0;"
NEW_SG = "    this.init();\n    this.showScreen('main-screen');\n    this._started = true;\n    this.bindAutosave();\n    this.trialCount = 0;"
if s.count(OLD_SG) != 1:
    j = s.find('this.init();')
    fail('startGame anchor x%d ctx=%r' % (s.count(OLD_SG), s[max(0, j - 150):j + 260]))
s = s.replace(OLD_SG, NEW_SG)

# ---------- 块B：榜单注释尾 + NPC 榜单 + 天梯参数 + 动态天梯系统 ----------
LADDER_MIDDLE = r'''   * 分数体系：第 1-50 名相邻分差严格控制在 4-8 分
   * 动态天梯：以主控真实分数为锚点实时重建，前 5 名为固定传说档 NPC
   * 主控："我从不骗人"（QZ-0047），初始排名 46-48 区间
   * ============================================================ */
  NPC_LEADERBOARD_COMBINED: [
    { id: 'QZ-0001', name: '李景明',              score: 2816, trials: 46, winRate: 0.96, faith: '欺诈' },
    { id: 'QZ-0002', name: '坏了，这是真龙王',    score: 2810, trials: 44, winRate: 0.95, faith: '欺诈' },
    { id: 'JY-0003', name: '还如一梦中',          score: 2805, trials: 45, winRate: 0.94, faith: '记忆' },
    { id: 'QZ-0004', name: '差2分包揽金银铜，好气', score: 2799, trials: 43, winRate: 0.93, faith: '欺诈' },
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

  /* ===== 动态天梯：以主控真实分数为锚点，重建 1-50 名分数链 =====
   * 规则：相邻名次分差严格 4-8 分；前 5 名为固定传说档 NPC；
   * 第 6-50 名每次展示随机轮换（分数链不变，只换人）；
   * 主控名次由分数实时决定，随试炼结算动态适配。 */
  _currentPlayerLadderScore() {
    return Math.min(4000, Math.max(this.PLAYER_LADDER_BASE,
      this.PLAYER_LADDER_BASE + (this.state.score_dengshen || 0) * 3 + (this.state.score_jinshen || 0) * 8));
  },

  // 平均梯度约 6 分/名：2527 分 = 第 50 名，分数越高名次越靠前
  _playerRankFromScore(p) {
    const r = 50 - Math.floor((p - 2527) / 6);
    return Math.min(50, Math.max(1, r));
  },

  // 构建严格 4-8 分差的 50 人分数链（锚定主控名次）
  _buildLadderScores(playerScore, playerRank) {
    const gap = () => 4 + Math.floor(Math.random() * 5); // 4-8
    const scores = new Array(50).fill(0);
    scores[playerRank - 1] = playerScore;
    for (let i = playerRank - 2; i >= 0; i--) scores[i] = scores[i + 1] + gap();
    for (let i = playerRank; i < 50; i++) scores[i] = scores[i - 1] - gap();
    return scores;
  },

  // 重建整条天梯并写入缓存（每次试炼结算后调用）
  rebuildLadder() {
    const p = this._currentPlayerLadderScore();
    const rank = this._playerRankFromScore(p);
    const scores = this._buildLadderScores(p, rank);
    const npcs = this.NPC_LEADERBOARD_COMBINED.map(n => ({ ...n, isNPC: true, change: '—' }));
    const pinned = npcs.slice(0, 5);
    const rows = new Array(50).fill(null);
    let pool;
    if (rank > 5) {
      for (let i = 0; i < 5; i++) rows[i] = pinned[i];
      pool = this._shuffle(npcs.slice(5)); // 45 人
      const freeSlots = [];
      for (let i = 5; i < 50; i++) if (i !== rank - 1) freeSlots.push(i); // 44 个
      freeSlots.forEach((s, i) => { rows[s] = pool[i]; }); // 池末 1 人落榜
    } else {
      // 主控杀入前 5：被挤掉的传说 NPC 进入轮换池
      const topSlots = [0, 1, 2, 3, 4].filter(i => i !== rank - 1);
      topSlots.forEach((s, i) => { rows[s] = pinned[i]; });
      pool = this._shuffle([pinned[rank - 1], ...npcs.slice(5, 49)]); // 45 人
      for (let i = 5; i < 50; i++) rows[i] = pool[i - 5];
    }
    const playerRow = {
      name: this.PLAYER_LADDER_NAME,
      id: this.PLAYER_LADDER_ID,
      score: p,
      trials: this.trialCount || this.state.trialCount || 1,
      winRate: 0.65,
      faith: '欺诈',
      isPlayer: true,
      change: 0,
      ts: Date.now()
    };
    rows[rank - 1] = playerRow;
    // 排名变动记录（与上次结算的名次差）
    const lastRank = parseInt(localStorage.getItem('zs-lb-last-rank') || '0', 10);
    playerRow.change = lastRank > 0 ? (lastRank - rank) : 0;
    localStorage.setItem('zs-lb-last-rank', String(rank));
    const ladder = { rows, scores, playerRank: rank, playerScore: p, builtAt: Date.now() };
    try { localStorage.setItem('zs-lb-ladder', JSON.stringify(ladder)); } catch(e) {}
    this._playerRank = rank;
    this._playerChange = playerRow.change;
    return rank;
  },

  // 获取合并后的排行榜（前 50，相邻分差严格 4-8，主控动态适配）
  getLeaderboard(sortBy = 'score') {
    let ladder = null;
    try {
      const raw = localStorage.getItem('zs-lb-ladder');
      if (raw) ladder = JSON.parse(raw);
    } catch(e) {}
    const p = this._currentPlayerLadderScore();
    if (!ladder || !Array.isArray(ladder.scores) || ladder.scores.length !== 50 || ladder.playerScore !== p) {
      this.rebuildLadder();
      try { ladder = JSON.parse(localStorage.getItem('zs-lb-ladder')); } catch(e) { ladder = null; }
    }
    if (!ladder || !Array.isArray(ladder.rows) || !Array.isArray(ladder.scores)) {
      // 兜底：纯 NPC 静态榜（分数已修复为 4-8 梯度）
      return this.NPC_LEADERBOARD_COMBINED.map(n => ({ ...n, isNPC: true, change: '—' }));
    }
    // 展示规则：前 5 名固定；第 6-50 名 NPC 每次随机轮换；主控保持真实名次
    const rank = ladder.playerRank;
    const rows = ladder.rows.map(r => r ? { ...r } : null);
    const playerRow = rows.find(r => r && r.isPlayer);
    const top5Npcs = rows.slice(0, 5).filter(r => r && !r.isPlayer);
    const pool = rows.filter((r, i) => r && !r.isPlayer && i >= 5);
    this._shuffle(pool);
    const out = new Array(50).fill(null);
    if (rank > 5) {
      for (let i = 0; i < 5; i++) out[i] = top5Npcs[i] || null;
      const freeSlots = [];
      for (let i = 5; i < 50; i++) if (i !== rank - 1) freeSlots.push(i);
      freeSlots.forEach((s, i) => { out[s] = pool[i] || null; });
    } else {
      const topSlots = [0, 1, 2, 3, 4].filter(i => i !== rank - 1);
      topSlots.forEach((s, i) => { out[s] = top5Npcs[i] || null; });
      for (let i = 5; i < 50; i++) out[i] = pool[i - 5] || null;
    }
    out[rank - 1] = playerRow || {
      name: this.PLAYER_LADDER_NAME, id: this.PLAYER_LADDER_ID, score: p,
      trials: this.trialCount || 1, winRate: 0.65, faith: '欺诈', isPlayer: true, change: 0
    };
    // 分数以名次链为准（主控行为真实分数）
    return out
      .map((r, i) => r ? { ...r, score: r.isPlayer ? p : ladder.scores[i] } : null)
      .filter(Boolean);
  },

  // 保存玩家成绩到天梯（每次试炼结算后实时调用，返回当前排名）
  saveToLeaderboard() {
    const rank = this.rebuildLadder();
    this.save(); // 结算即存档，防止进度丢失
    return rank;
  },

  // 显示合并排行榜（主控专属视觉：金框+发光+👑）'''

# ---------- 拼接3：注释尾 + 榜单 + 天梯系统整体替换 ----------
pat = re.compile(r'(   \* ID 体系：前缀反映信仰（QZ=欺诈 / JY=记忆）\+ 4 位编号，格式统一\n)[\s\S]*?(\n  showLeaderboard\(\) \{)')
if not pat.search(s):
    k = s.find('ID 体系')
    k2 = s.find('showLeaderboard')
    fail('ladder regex miss; idctx=%r lbctx=%r' % (s[k:k + 160], s[max(0, k2 - 60):k2 + 60]))
s = pat.sub(lambda m: m.group(1) + LADDER_MIDDLE + m.group(2), s, count=1)

# ---------- 拼接4：文件尾插入 _defaults 快照 ----------
OLD_TAIL = '\n};\n\n// 启动\n'
NEW_TAIL = '\n};\n\n// 存档合并用：捕获初始默认状态快照（必须在任何逻辑改动 state 之前执行）\nGame._defaults = JSON.parse(JSON.stringify(Game.state));\n\n// 启动\n'
if s.count(OLD_TAIL) != 1:
    k = s.rfind('\n};\n')
    fail('tail anchor x%d tailctx=%r' % (s.count(OLD_TAIL), s[k:k + 400]))
s = s.replace(OLD_TAIL, NEW_TAIL)

data = s.encode('utf-8')
blob = hashlib.sha1(b'blob %d\x00' % len(data) + data).hexdigest()
print('SPLICE_OK len=%d blob=%s' % (len(data), blob))
if blob != EXPECTED:
    fail('blob mismatch: got %s expected %s' % (blob, EXPECTED))
open(P, 'wb').write(data)
print('SPLICE_WRITTEN')
