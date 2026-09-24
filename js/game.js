/* ===========================================================
 * 《诸神愚戏 · 信仰试炼》核心游戏引擎
 * =========================================================== */

/* ===== 全局可配置参数（运营调参入口）===== */
const GAME_CONFIG = {
  jinshen: {
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

/* ===== 试炼数据库（可扩展）===== */
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
