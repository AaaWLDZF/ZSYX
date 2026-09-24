/* ============================================================
 * 《诸神愚戏 · 信仰试炼》游戏数据
 * 基于前248章设定
 * ============================================================ */

/* ===== 六大命途与对应信仰 ===== */
const DATA_FAITHS = {
  order:    { id: 'order',    name: '秩序',  path: '文明', pathColor: '#3498db', desc: '守序、公约、铁律' },
  truth:    { id: 'truth',    name: '真理',  path: '文明', pathColor: '#3498db', desc: '洞窥本质、行见真理' },
  war:      { id: 'war',      name: '战争',  path: '文明', pathColor: '#3498db', desc: '以战止戈、恐惧冲锋' },
  chaos:    { id: 'chaos',    name: '混乱',  path: '混沌', pathColor: '#e67e22', desc: '无序、异变、一切皆可' },
  folly:    { id: 'folly',    name: '痴愚',  path: '混沌', pathColor: '#e67e22', desc: '高傲、嘲讽、愚弄众生' },
  silence:  { id: 'silence',  name: '沉默',  path: '混沌', pathColor: '#e67e22', desc: '缄默、无声、不可名状' },
  genesis:  { id: 'genesis',  name: '诞育',  path: '生命', pathColor: '#27ae60', desc: '孕育、繁衍、生生不息' },
  prosperity:{ id: 'prosperity', name: '繁荣', path: '生命', pathColor: '#27ae60', desc: '繁茂、馈赠、万物生长' },
  death:    { id: 'death',    name: '死亡',  path: '生命', pathColor: '#27ae60', desc: '终结、收割、归于沉寂' },
  defilement:{ id: 'defilement', name: '污堕',path: '沉沦', pathColor: '#8e44ad', desc: '恐惧、欲望、扭曲' },
  decay:    { id: 'decay',    name: '腐朽',  path: '沉沦', pathColor: '#8e44ad', desc: '衰败、凋零、侵蚀万物' },
  annihilation:{ id: 'annihilation', name: '湮灭', path: '沉沦', pathColor: '#8e44ad', desc: '毁灭、虚无、存在的终点' },
  time:     { id: 'time',     name: '时间',  path: '存在', pathColor: '#1abc9c', desc: '流变、刻度、过去未来' },
  memory:   { id: 'memory',   name: '记忆',  path: '存在', pathColor: '#1abc9c', desc: '铭记、回响、存在的证明' },
  fate:     { id: 'fate',     name: '命运',  path: '虚无', pathColor: '#d4a843', desc: '轨迹、骰子、冥冥之中' },
  fraud:    { id: 'fraud',    name: '欺诈',  path: '虚无', pathColor: '#d4a843', desc: '谎言、伪装、愚弄众生' }
};

/* ===== 对立关系 ===== */
const DATA_OPPOSITES = {
  order: 'chaos', chaos: 'order',
  truth: 'folly', folly: 'truth',
  war: 'silence', silence: 'war',
  genesis: 'defilement', defilement: 'genesis',
  prosperity: 'decay', decay: 'prosperity',
  death: 'annihilation', annihilation: 'death',
  time: 'fate', fate: 'time',
  memory: 'fraud', fraud: 'memory'
};

/* ===== 六大职业 ===== */
const DATA_CLASSES = ['战士', '法师', '牧师', '刺客', '猎人', '歌者'];

/* ===== 职业特性 ===== */
const DATA_CLASS_INFO = {
  '战士': { desc: '近战防御，抗伤输出兼备', icon: '⚔️' },
  '法师': { desc: '远程施法，元素操控', icon: '🔮' },
  '牧师': { desc: '治疗恢复，祝福增益', icon: '✝️' },
  '刺客': { desc: '爆发偷袭，一击致命', icon: '🗡️' },
  '猎人': { desc: '远程弓箭，灵敏追踪', icon: '🏹' },
  '歌者': { desc: '增益祝福，吟唱共鸣', icon: '🎵' }
};

/* ===== 信仰职业组合（6职业×16信仰=96职业）===== */
const DATA_CLASS_COMBOS = {
  order: { '战士': '秩序骑士', '法师': '元素法官', '牧师': '公正官', '刺客': '行刑官', '猎人': '搜查官', '歌者': '律者' },
  truth: { '战士': '格斗专家', '法师': '博识学者', '牧师': '外科医生', '刺客': '暗杀博士', '猎人': '陷阱大师', '歌者': '博闻诗人' },
  war: { '战士': '陷阵勇士', '法师': '炼狱主教', '牧师': '督战官', '刺客': '隙光铁刺', '猎人': '鹰眼斥候', '歌者': '风暴之嗓' },
  chaos: { '战士': '异血同袍', '法师': '灾祸之源', '牧师': '理智蚀者', '刺客': '疯癫刺客', '猎人': '混乱猎手', '歌者': '无律琴师' },
  folly: { '战士': '痴愚狂战士', '法师': '戏谑法师', '牧师': '愚弄祭司', '刺客': '嘲讽刺客', '猎人': '笑料猎手', '歌者': '疯癫诗人' },
  silence: { '战士': '静默守卫', '法师': '无声术士', '牧师': '缄默祭司', '刺客': '隐声刺客', '猎人': '无声猎手', '歌者': '寂语诵者' },
  genesis: { '战士': '酋长', '法师': '生命贤者', '牧师': '子嗣牧师', '刺客': '借诞之婴', '猎人': '创生猎人', '歌者': '孕育歌者' },
  prosperity: { '战士': '德鲁伊', '法师': '木精灵', '牧师': '园丁', '刺客': '荆棘之冠', '猎人': '美食家', '歌者': '繁茂歌者' },
  death: { '战士': '死亡骑士', '法师': '死灵法师', '牧师': '守墓人', '刺客': '死亡编织者', '猎人': '猩红猎手', '歌者': '撞钟人' },
  defilement: { '战士': '尖啸伯爵', '法师': '欲望主宰', '牧师': '悲悯领主', '刺客': '恶孽', '猎人': '感官追猎者', '歌者': '塞壬' },
  decay: { '战士': '木乃伊', '法师': '瘟疫枢机', '牧师': '凋零祭司', '刺客': '疮痍之目', '猎人': '黄昏猎人', '歌者': '腐烂颂唱者' },
  annihilation: { '战士': '清道夫', '法师': '烬灭者', '牧师': '焚化工', '刺客': '寂灭使徒', '猎人': '终焉行者', '歌者': '毁灭宣告' },
  time: { '战士': '时空战士', '法师': '时间行者', '牧师': '时序祭司', '刺客': '刹那刺客', '猎人': '流时猎手', '歌者': '时之诵者' },
  memory: { '战士': '记忆守卫', '法师': '忆术师', '牧师': '守忆祭司', '刺客': '残影刺客', '猎人': '忆中猎手', '歌者': '往昔歌者' },
  fate: { '战士': '命轨战士', '法师': '命运术士', '牧师': '命途祭司', '刺客': '命终刺客', '猎人': '终末之笔', '歌者': '预言家' },
  fraud: { '战士': '欺诈斗士', '法师': '幻术师', '牧师': '小丑牧师', '刺客': '伪面刺客', '猎人': '虚言猎手', '歌者': '谎言之喉' }
};

/* ===== 程实的核心天赋（前248章）===== */
const DATA_CHENGSHI_TALENTS = [
  { id: 'deceive_master', name: '欺骗大师', rank: 'S', type: 'passive', faith: 'fraud', desc: '你的谎言更容易被他人相信。除非被欺骗的目标出现认知矛盾，否则无法发现你的欺骗手段。并且你可以察觉除你之外的所有欺骗手段。', effect: { trustBonus: 15, detectLie: true } },
  { id: 'lies_like_yesterday', name: '谎如昨日', rank: 'SS', type: 'active', faith: 'fraud', desc: '将自身信仰暂时替换为最近一次被你成功欺骗的信徒的信仰。可持续至下次使用或一场试炼结束。', effect: { switchFaithTemp: true, duration: 1 } },
  { id: 'sacrifice_to_void', name: '献往虚无的祭品', rank: 'S', type: 'active', faith: 'fraud', desc: '当你编造的物品并不存在却被他人广泛承认存在时，物品存在。', effect: { createObject: true } },
  { id: 'all_forms', name: '众生相', rank: 'S', type: 'passive', faith: 'fate_forsaken', desc: '命运弃誓天赋，背离了命运的可怜人被众生命运所缚。特殊试炼奖励将替换为特殊道具【众生假面】。', effect: { grantMask: true } }
];

/* ===== 程实初始道具（前248章）===== */
const DATA_CHENGSHI_ITEMS = [
  { id: 'bone_ring', name: '骨仆乐乐尔之戒', rank: 'SSSs', type: '饰品', desc: '由【死亡】亲自锻造。可吸收恐惧情绪充能，召降雷刑诛灭敌人。', effects: [ { name: '恐惧养料', desc: '吸收周围恐惧情绪充能' }, { name: '鸣雷裁决', desc: '消耗充能召降雷刑，曾提供恐惧者必中' }, { name: '王座下的骨仆', desc: '将尸体炼制成死亡骨仆' } ] },
  { id: 'fate_dice', name: '命运之骰', rank: 'A', type: '道具', desc: '来自【命运】的骰子，掷出的点数决定命运的走向。', effects: [ { name: '既定', desc: '可以观察掷骰结果并选择是否接受' } ] },
  { id: 'mask_stock', name: '众生假面 ×2', rank: 'S', type: '道具', desc: '可以戴在脸上，暂时替换为来源信徒的基础职业。', effects: [ { name: '命运织机', desc: '戴上替换职业，摘下假面消失' } ], count: 2 }
];

/* ===== 队友系统 ===== */
const DATA_TEAMMATE_NAMES = ['林晓', '陈默', '苏晴', '王浩', '李想', '张薇', '赵阳', '周雨', '吴迪', '郑凯', '孙雅', '钱程', '冯杰', '何娜', '吕布', '貂蝉', '关羽', '张飞', '赵云', '马超', '黄忠', '魏延', '姜维', '庞统', '法正', '徐庶', '贾诩', '郭嘉', '荀彧', '司马懿', '诸葛亮', '周瑜', '陆逊', '吕蒙', '甘宁', '太史慈', '黄盖', '程普', '韩当', '周泰', '凌统', '丁奉', '蒋钦', '陈武', '潘璋', '马忠', '朱然', '陆绩', '顾雍'];

const DATA_TEAMMATE_PERSONALITIES = [
  { id: 'loyal', name: '忠诚', trait: '对你无条件信任' },
  { id: 'paranoid', name: '多疑', trait: '容易怀疑他人' },
  { id: 'reckless', name: '莽撞', trait: '行事不计后果' },
  { id: 'cunning', name: '狡黠', trait: '善于算计' },
  { id: 'steady', name: '稳重', trait: '情绪稳定可靠' },
  { id: 'greedy', name: '贪婪', trait: '唯利是图' },
  { id: 'altruistic', name: '无私', trait: '乐于奉献' },
  { id: 'cowardly', name: '胆小', trait: '遇事容易退缩' }
];

/* ===== 试炼数据库（核心数据）===== */
const DATA_TRIALS = {
  // 欺诈试炼
  fraud_1: { id: 'fraud_1', name: '初入谎言', difficulty: 'A', path: '虚无', god: 'fraud', summary: '你第一次踏入信仰试炼，面对第一个选择。', objective: '做出你的第一个选择', scenes: [ { id: 'f1s1', title: '黑暗中的声音', text: ['四周一片漆黑，你只能听到自己的心跳声。', '一个低沉的声音在你耳边响起："选择吧，凡人。"'], choices: [ { text: '询问对方是谁', effects: { mpCost: 5, doubt: 1 }, next: 'f1s2' }, { text: '保持沉默', effects: { mpCost: 0 }, next: 'f1s2' } ] }, { id: 'f1s2', title: '谎言或真相', text: ['"告诉我，"声音说道，"你是相信眼前所见，还是相信耳畔之言？"'], choices: [ { text: '眼见为实', effects: { trust: 2 }, resolve: '声音轻笑："有趣，那就让你见识一下真相。" next: 'f1e1' }, { text: '耳听为虚', effects: { trust: -2 }, resolve: '声音冷笑："愚蠢，那你将付出代价。" next: 'f1e2' } ] } ] },
  fraud_2: { id: 'fraud_2', name: '两难抉择', difficulty: 'B', path: '虚无', god: 'fraud', summary: '一个需要谎言才能解决的问题。', objective: '用你的智慧渡过难关', scenes: [ { id: 'f2s1', title: '守门人', text: ['一个巨大的石像挡在前方，双眼闪烁着红光。', '"只有说谎的人才能通过。"'], choices: [ { text: '说"我会通过"（明知不会）', effects: { trust: 1 }, resolve: '石像沉默片刻，让开了道路。', next: 'f2e1' }, { text: '说"我不会通过"', effects: { trust: -1 }, resolve: '石像发出怒吼，将你弹开。', next: 'f2e2' } ] } ] },
  // 命运试炼
  fate_1: { id: 'fate_1', name: '命运的丝线', difficulty: 'A', path: '虚无', god: 'fate', summary: '命运之线已编织，但你能否挣脱？', objective: '在命运的安排中找到出路', scenes: [ { id: 'fa1s1', title: '预言', text: ['一个神秘的老者拦住你的去路，",我看见了你的未来——充满荆棘。"'], choices: [ { text: '询问如何改变', effects: { mpCost: 10 }, next: 'fa1s2' }, { text: '相信命运', effects: { mpCost: 0 }, next: 'fa1s2' } ] }, { id: 'fa1s2', title: '十字路口', text: ['前方有三条路，每条都通向不同的命运。', '老者说："每条路都是注定要走的。"'], choices: [ { text: '走左边', effects: { trust: 2 }, resolve: '你选择了自己的路。', next: 'fa1e1' }, { text: '走中间', effects: { trust: 0 }, resolve: '你选择了自己的路。', next: 'fa1e1' }, { text: '走右边', effects: { trust: -2 }, resolve: '你选择了自己的路。', next: 'fa1e1' } ] } ] },
  // 战争试炼
  war_1: { id: 'war_1', name: '战火初燃', difficulty: 'B', path: '文明', god: 'war', summary: '战争即将来临，你将如何面对？', objective: '在战火中生存', scenes: [ { id: 'w1s1', title: '集结', text: ['战鼓雷鸣，你的队友们纷纷集结。', '指挥官看向你："你，准备好战斗了吗？"'], choices: [ { text: '誓死保卫', effects: { trust: 3 }, resolve: '你握紧了武器，眼神坚定。', next: 'w1e1' }, { text: '谨慎观察', effects: { trust: -1 }, resolve: '你后退一步，观察局势。', next: 'w1e2' } ] } ] },
  // 混沌试炼
  chaos_1: { id: 'chaos_1', name: '无序之域', difficulty: 'C', path: '混沌', god: 'chaos', summary: '一切规则在此失效，唯有混乱永恒。', objective: '在混乱中找到秩序', scenes: [ { id: 'c1s1', title: '扭曲的世界', text: ['天空是紫色的，地面是柔软的，重力似乎不存在了。', '"欢迎来到混沌之地，"一个声音笑道。'], choices: [ { text: '接受现实', effects: { mpCost: 5 }, next: 'c1e1' }, { text: '反抗现实', effects: { mpCost: 15 }, next: 'c1e2' } ] } ] },
  // 秩序试炼
  order_1: { id: 'order_1', name: '铁律之庭', difficulty: 'B', path: '文明', god: 'order', summary: '绝对的秩序面前，你的自由意志将受到考验。', objective: '在规则中找到突破口', scenes: [ { id: 'o1s1', title: '审判庭', text: ['金碧辉煌的大厅中，一座巨大的天平悬浮在空中。', '"你的罪行，将在此裁决。"'], choices: [ { text: '认罪', effects: { trust: -3 }, resolve: '你低下了头。', next: 'o1e1' }, { text: '辩护', effects: { mpCost: 10 }, next: 'o1e2' } ] } ] },
  // 真理试炼
  truth_1: { id: 'truth_1', name: '真理之门', difficulty: 'A', path: '文明', god: 'truth', summary: '真理之门只向诚实者敞开。', objective: '说出真相', scenes: [ { id: 't1s1', title: '守门者', text: ['一扇巨大的光门矗立在前方，门上刻着："说出你最大的秘密"'], choices: [ { text: '说出秘密', effects: { trust: -5 }, resolve: '光门缓缓打开。', next: 't1e1' }, { text: '拒绝回答', effects: { trust: 0 }, resolve: '光门毫无反应。', next: 't1e2' } ] } ] },
  // 沉默试炼
  silence_1: { id: 'silence_1', name: '无声之海', difficulty: 'C', path: '混沌', god: 'silence', summary: '在这里，语言是禁忌。', objective: '用沉默传递信息', scenes: [ { id: 'si1s1', title: '静默领域', text: ['你发现自己无法发出任何声音。', '"在这里，只有沉默者才能生存。"'], choices: [ { text: '点头示意', effects: { trust: 2 }, resolve: '你通过了考验。', next: 'si1e1' }, { text: '尝试说话', effects: { mpCost: 20 }, resolve: '你的喉咙被撕裂。', next: 'si1e2' } ] } ] },
  // 诞育试炼
  genesis_1: { id: 'genesis_1', name: '生命之源', difficulty: 'B', path: '生命', god: 'genesis', summary: '生命的起源，也是终结的开始。', objective: '保护生命的火种', scenes: [ { id: 'g1s1', title: '生命之泉', text: ['一汪散发着柔和光芒的泉水出现在你面前。', '"这是生命的源泉，但也是诱惑的深渊。"'], choices: [ { text: '取一捧水', effects: { trust: 2 }, resolve: '你获得了生命的祝福。', next: 'g1e1' }, { text: '远离泉水', effects: { trust: -1 }, resolve: '你拒绝了诱惑。', next: 'g1e2' } ] } ] },
  // 繁荣试炼
  prosperity_1: { id: 'prosperity_1', name: '丰饶之野', difficulty: 'A', path: '生命', god: 'prosperity', summary: '无尽的财富面前，你的本心是否坚定？', objective: '在诱惑中保持本心', scenes: [ { id: 'p1s1', title: '黄金沙漠', text: ['黄沙之下埋藏着无尽的宝藏。', '"只要你愿意，这一切都是你的。"'], choices: [ { text: '拿走一些', effects: { trust: -2 }, resolve: '你拿走了金币。', next: 'p1e1' }, { text: '拒绝', effects: { trust: 3 }, resolve: '你保持了本心。', next: 'p1e2' } ] } ] },
  // 死亡试炼
  death_1: { id: 'death_1', name: '亡者之境', difficulty: 'C', path: '生命', god: 'death', summary: '死亡并非终结，而是另一种开始。', objective: '面对死亡的真相', scenes: [ { id: 'd1s1', title: '灵魂摆渡', text: ['一个黑影出现在你面前，"跟我走吧。"'], choices: [ { text: '跟随', effects: { mpCost: 30 }, resolve: '你看到了死亡的真相。', next: 'd1e1' }, { text: '拒绝', effects: { mpCost: 0 }, resolve: '你逃过了死亡。', next: 'd1e2' } ] } ] },
  // 污堕试炼
  defilement_1: { id: 'defilement_1', name: '堕落深渊', difficulty: 'B', path: '沉沦', god: 'defilement', summary: '堕落的边缘，你能否保持清醒？', objective: '在污堕中保持自我', scenes: [ { id: 'df1s1', title: '欲望之镜', text: ['一面镜子出现在你面前，镜中映出了你最深的欲望。', '"想要吗？它就在你一念之间。"'], choices: [ { text: '接受诱惑', effects: { trust: -5 }, resolve: '你堕落了。', next: 'df1e1' }, { text: '打碎镜子', effects: { mpCost: 20 }, resolve: '你战胜了诱惑。', next: 'df1e2' } ] } ] },
  // 腐朽试炼
  decay_1: { id: 'decay_1', name: '凋零花园', difficulty: 'A', path: '沉沦', god: 'decay', summary: '万物终将腐朽，这是不可逆转的法则。', objective: '在腐朽中寻找永恒', scenes: [ { id: 'dc1s1', title: '枯败之花', text: ['一片荒芜的花园，所有花朵都已凋零。', '"美丽终将逝去，这就是世界。"'], choices: [ { text: '种下一颗种子', effects: { trust: 2 }, resolve: '你种下了希望。', next: 'dc1e1' }, { text: '离开', effects: { trust: -2 }, resolve: '你放弃了希望。', next: 'dc1e2' } ] } ] },
  // 湮灭试炼
  annihilation_1: { id: 'annihilation_1', name: '虚无尽头', difficulty: 'S', path: '沉沦', god: 'annihilation', summary: '存在的终点，一切归于虚无。', objective: '面对最终的虚无', scenes: [ { id: 'an1s1', title: '空无', text: ['你站在世界的尽头，前方只有无尽的黑暗。', '"你存在过吗？"'], choices: [ { text: '我存在', effects: { mpCost: 50 }, resolve: '你证明了存在的意义。', next: 'an1e1' }, { text: '我不存在', effects: { mpCost: 0 }, resolve: '你消失了。', next: 'an1e2' } ] } ] },
  // 时间试炼
  time_1: { id: 'time_1', name: '时光回廊', difficulty: 'B', path: '存在', god: 'time', summary: '时间在这里失去了意义。', objective: '在时光中找到正确的方向', scenes: [ { id: 'tm1s1', title: '时间之门', text: ['一扇古老的门出现在你面前，门上刻着过去、现在和未来。', '"选择一扇门。"'], choices: [ { text: '过去', effects: { trust: -2 }, resolve: '你回到了过去。', next: 'tm1e1' }, { text: '现在', effects: { trust: 0 }, resolve: '你留在了现在。', next: 'tm1e2' }, { text: '未来', effects: { trust: 2 }, resolve: '你走向了未来。', next: 'tm1e3' } ] } ] },
  // 记忆试炼
  memory_1: { id: 'memory_1', name: '记忆殿堂', difficulty: 'A', path: '存在', god: 'memory', summary: '记忆是存在的证明，也是痛苦的根源。', objective: '面对被遗忘的记忆', scenes: [ { id: 'my1s1', title: '记忆之湖', text: ['一汪平静的湖水倒映着你的过去。', '"看看你遗忘的一切。"'], choices: [ { text: '凝视湖面', effects: { mpCost: 15 }, resolve: '你看到了被遗忘的记忆。', next: 'my1e1' }, { text: '转身离开', effects: { mpCost: 0 }, resolve: '你选择了遗忘。', next: 'my1e2' } ] } ] },
  // 命运弃誓试炼
  fate_forsaken_1: { id: 'fate_forsaken_1', name: '弃誓者之路', difficulty: 'S', path: '虚无', god: 'fate', summary: '被命运抛弃的人，将踏上新的道路。', objective: '在绝望中寻找希望', scenes: [ { id: 'ff1s1', title: '命运审判', text: ['命运女神出现在你面前，"你已背叛命运的契约。"'], choices: [ { text: '接受命运', effects: { trust: -3 }, resolve: '你接受了惩罚。', next: 'ff1e1' }, { text: '反抗命运', effects: { mpCost: 30 }, resolve: '你踏上了弃誓之路。', next: 'ff1e2' } ] } ] },
  // 任意神试炼
  any_1: { id: 'any_1', name: '神的试炼', difficulty: 'A', path: '任意', god: 'any', summary: '所有神明的试炼，都是对你内心的拷问。', objective: '通过试炼', scenes: [ { id: 'a1s1', title: '十字路口', text: ['你站在十字路口，每条路都通向不同的神明。', '"选择你的道路。"'], choices: [ { text: '走向光明', effects: { trust: 2 }, resolve: '你选择了秩序。', next: 'a1e1' }, { text: '走向黑暗', effects: { trust: -2 }, resolve: '你选择了混沌。', next: 'a1e2' } ] } ] },
  // 终局试炼
  ending_1: { id: 'ending_1', name: '终局之战', difficulty: 'S', path: '虚无', god: 'fraud', summary: '最终的试炼，决定你的命运。', objective: '战胜最终的敌人', scenes: [ { id: 'e1s1', title: '诸神战场', text: ['你站在诸神战场上，面前是最终的敌人。', '"游戏结束了，"欺诈之神笑道。'], choices: [ { text: '发起攻击', effects: { mpCost: 50 }, resolve: '你发起了最后的攻击。', next: 'e1e1' }, { text: '谈判', effects: { mpCost: 20 }, resolve: '你尝试谈判。', next: 'e1e2' } ] } ] }
};

/* ===== 觐神场景库 ===== */
const DATA_JINSHEN = {
  fraud: {
    god: 'fraud',
    dialogues: [
      { speaker: '【欺诈】', text: '呵呵……哈哈哈！程实，你来了！来得正好。【秩序】可悲，【真理】可叹，【战争】可笑，【文明】不过笑料——吾本以为这场游戏里再没有值得多看一眼的东西，结果你踩着一地谎话进来了。哈哈哈，多好笑的一幅画。', effects: { appreciation: 10, patience: 5 } },
      { speaker: '【欺诈】', text: '吾不问你做了什么，吾只问——他们信了什么？呵呵，说出来的话在现实里找不到影子？不要紧。信的人够了，现实自己会照着改。所以你那场试炼里的真话假话，不必答。真伪从来不归说话的人定，归信的人定。哈哈哈，这规则，多有趣。', choices: [ { text: '"……你猜。"', effects: { appreciation: 15, fear: -5 } }, { text: '"有一半是真的。"', effects: { appreciation: 5, fear: 5 } }, { text: '"全部都是真的。"', effects: { appreciation: -10, fear: 10 } } ] },
      { speaker: '程实', text: '（内心独白：祂一直在笑。笑声里没有温度，只有兴致——像看戏的人捏着一颗随时会扔下来的骰子。祂把一切都当乐子，那我最好也是乐子，而不是笑话的结尾。我得让祂觉得我有趣，但不能让祂太了解我。）', effects: {} },
      { speaker: '【欺诈】', text: '昨日，吾欺骗了【诞育】的信徒，所以今日，吾是【诞育】的信徒——哈哈哈，别用那种眼神看吾，你以为这是玩笑？语言于吾不是交谈，是权柄。呵呵，吾说吾是谁并不重要——你们信了，吾就是。你看，连身份都能随手换着玩，这游戏岂不是处处是乐子？', choices: [ { text: '"那你信自己吗？"', effects: { appreciation: 12, fear: 0 } }, { text: '"神也需要骗人。真好笑。"', effects: { appreciation: 5, fear: 8 } }, { text: '"我信你是欺诈。你会因此成真吗？"', effects: { appreciation: 18, fear: -3 } } ] },
      { speaker: '【欺诈】', text: '吾见过太多信徒——有人把谎言当信仰，有人把信仰当谎言，无聊，无聊透顶。呵呵……但你，程实，你什么都不是。你是个意外。哈哈哈，而意外，是吾唯一还没尝过的味道。真让人期待你还会闹出什么新鲜乐子。', effects: { appreciation: 8, fear: 12 } },
      { speaker: '【欺诈】', text: '"不辨真伪，勿论虚实。"——这是吾的祷词。呵呵，现在，给吾说一个谎。别说给吾听，说给"信"听。让吾看看，你能不能连自己一起骗过——骗过了，吾大笑一场；骗不过，吾也笑一场。哈哈哈，反正吾横竖都有乐子。', choices: [ { text: '"我从不骗人。"', effects: { appreciation: 20, fear: -5 } }, { text: '"我最近没骗人。"', effects: { appreciation: -8, fear: 5 } }, { text: '"我骗了……我自己。"', effects: { appreciation: 15, fear: 15 } } ] }
    ],
    gifts: [ { name: '谎如昨日（天赋碎片）', desc: '暂时获得最近欺骗对象的信仰权柄', chance: 0.15 }, { name: '众生假面 ×1', desc: '多一张可以切换职业的假面', chance: 0.3 }, { name: '精神力恢复', desc: '觐神后精神力全满', chance: 1.0 } ]
  },
  fate: {
    god: 'fate',
    dialogues: [
      { speaker: '【命运】', text: '程实……你又一次偏离了我为你编织的命运之线。', effects: { appreciation: 5, patience: 10 } },
      { speaker: '【命运】', text: '但每次偏离之后，你又会走回我编织的网里。这是巧合吗？', choices: [ { text: '"我不相信巧合。"', effects: { appreciation: 15, fear: 10 } }, { text: '"也许这就是命运。"', effects: { appreciation: -5, fear: 5 } }, { text: '"也许你也在偏离你的命运。"', effects: { appreciation: 20, fear: 15 } } ] },
      { speaker: '程实', text: '（命运的力量深不可测。我需要表现出对祂的敬畏，但不能让祂完全掌控我。）', effects: {} },
      { speaker: '【命运】', text: '你知道吗，我看过无数未来。每一个你，都在撒谎。但只有这个你——把谎言活成了命运本身。', effects: { appreciation: 12, fear: 8 } },
      { speaker: '【命运】', text: '最后一个问题——如果有一天，谎言不够用了。你会选择相信命运吗？', choices: [ { text: '"我会创造新的谎言。"', effects: { appreciation: 18, fear: -5 } }, { text: '"到时候再说。"', effects: { appreciation: 8, fear: 3 } }, { text: '"我已经不相信任何东西了。"', effects: { appreciation: -5, fear: 20 } } ] }
    ],
    gifts: [ { name: '命运之骰 ×1', desc: '额外一枚命运骰子', chance: 0.2 }, { name: '命运之骰（强化）', desc: '下次使用命运之骰，精神力消耗减半', chance: 0.3 }, { name: '登神之路积分', desc: '觐见之梯额外+3', chance: 1.0 } ]
  },
  death: {
    god: 'death',
    dialogues: [
      { speaker: '【死亡】', text: '……程实。', effects: { appreciation: 5, patience: 15, fear: 10 } },
      { speaker: '【死亡】', text: '你在试炼中选择"活着"，还是选择"被铭记"？', choices: [ { text: '"我选择……我想守护的东西。"', effects: { appreciation: 15, fear: 5 } }, { text: '"活着才能守护。"', effects: { appreciation: -5, fear: 0 } }, { text: '"被铭记就是另一种活着。"', effects: { appreciation: 20, fear: 15 } } ] },
      { speaker: '【死亡】', text: '……程实，你有没有想过？你的记忆里，有一段是我替你保管的。', effects: { appreciation: 8, fear: 25 } }
    ],
    gifts: [ { name: '血线回满', desc: 'HP回满', chance: 0.5 }, { name: '恐惧养料（额外）', desc: '骨仆戒指额外充能', chance: 0.3 }, { name: '死亡权柄碎片', desc: '获得一次死亡豁免', chance: 0.2 } ]
  }
};

/* ===== 神明数据 ===== */
const DATA_GODS = {
  fraud: { name: '欺诈', desc: '谎言与愚弄之神，视万物为乐子。' },
  fate: { name: '命运', desc: '编织命运之线的神明，一切皆有定数。' },
  death: { name: '死亡', desc: '终结与轮回之神，掌管生死边界。' },
  order: { name: '秩序', desc: '法则与规则之神，万物皆有其序。' },
  chaos: { name: '混乱', desc: '无序与变数之神，打破一切既定。' },
  truth: { name: '真理', desc: '真相与知识之神，洞悉万物本质。' },
  war: { name: '战争', desc: '战斗与征服之神，以战止戈。' },
  silence: { name: '沉默', desc: '隐秘与缄默之神，无声胜有声。' },
  genesis: { name: '诞育', desc: '生命与创造之神，万物之源。' },
  prosperity: { name: '繁荣', desc: '丰饶与生长之神，万物繁荣。' },
  defilement: { name: '污堕', desc: '堕落与欲望之神，沉沦无边。' },
  decay: { name: '腐朽', desc: '凋零与消逝之神，万物归尘。' },
  annihilation: { name: '湮灭', desc: '虚无与终结之神，一切归于空无。' },
  time: { name: '时间', desc: '流逝与轮回之神，过去未来皆在手中。' },
  memory: { name: '记忆', desc: '铭记与回响之神，存在过的证明。' }
};

/* ===== 幕间场景库 ===== */
const DATA_INTERLUDES = [
  { id: 'itl_any_note', god: 'any', interlude: true, title: '幕间 · 字条', text: ['你的口袋里多了一张字条。不是你放的。', '字条上的字迹娟秀："别相信今晚会主动帮你的那个人。"', '没有署名。你抬起头，五个队友都在火光外忙碌着，看起来人畜无害。'], choices: [ { text: '烧掉字条，装作从未看见', effects: { doubt: 3 }, resolve: '火苗舔掉纸角的瞬间，你仿佛听见远处有一声轻叹。有些提醒只有一次。' }, { text: '不动声色，留意今夜谁会"主动帮忙"', effects: { mpCost: 10 }, resolve: '深夜，果然有一位队友摸过来要帮你"换岗"。你笑着拒绝了。他的眼神，变了。' }, { text: '把字条拿给全体队友看——阳谋对阴谋', effects: { trust: 4, doubt: 6 }, resolve: '字条传了一圈，每个人看别人的眼神都变了。信任这东西，一旦摊开就再也回不去了。' } ] },
  { id: 'itl_any_quarrel', god: 'any', interlude: true, title: '幕间 · 争吵', text: ['为了最后半壶净水，两名队友吵了起来。', '一个说自己伤重该多喝，一个说自己探路出力最多。', '火堆的光把两张涨红的脸照得忽明忽暗。其余人都在看你——你是队伍的主心骨。'], choices: [ { text: '各打五十大板：水均分，两人的怨气各自消化', effects: { doubt: 2, csTrust: 3 }, resolve: '水壶传递了两圈。争吵平息了，但有些疙瘩不是半壶水能化开的。' }, { text: '把水给伤重的那个——情义比道理重', effects: { trust: 5, csTrust: -3 }, resolve: '探路的队友摔了水杯，一个人坐到火堆外。但伤员活下来了，这就够了。' }, { text: '立规矩：今后资源分配全队投票，少数服从多数', effects: { trust: 4, doubt: -4 }, resolve: '投票制通过了。规矩一旦立起来，争吵就变成了流程。队伍意外地更团结了。' } ] },
  { id: 'itl_any_wounded', god: 'any', interlude: true, title: '幕间 · 求助者', text: ['一个满身是血的人在路口向你们挥手。', '"求求你们……帮帮我……"他的伤口不像是试炼的造物，倒像是被什么东西啃过。', '队友们看向你：救，还是不救？'], choices: [ { text: '救治他——见死不救的事，做不出来', effects: { trust: 6, csTrust: 3, mpCost: 20 }, resolve: '伤口处理到一半，你发现他口袋里装着别的试炼者的遗物。他恢了些力气，道了谢，一瘸一拐地走了。真相是什么，已经不重要了。' }, { text: '给他食物和水，但不允许他跟队', effects: { doubt: -2 }, resolve: '他狼吞虎咽之后，指了条避开危险区的近路作为报答。各取所需，两不相欠。' }, { text: '远远绕开——试炼里的"弱者"不一定真是弱者', effects: { doubt: 3, fear: 3 }, resolve: '走出很远后，你们回头看见那个人站得笔直，正朝你们的方向"看"。你们加快了脚步。' } ] },
  { id: 'itl_any_rumor', god: 'any', interlude: true, title: '幕间 · 传闻', text: ['有队友私下告诉你：他昨晚看见另一位队友"在和敌方的人交易"。', '"我没看错。你最好心里有数。"他压低声音说。', '而被传的那位队友，此刻正在远处为大家站岗。'], choices: [ { text: '先不表态，自己暗中核实', effects: { mpCost: 10, doubt: 2 }, resolve: '你查了一夜。所谓"交易"，其实是那位队友在偷偷埋葬死去的陌生人。传闻害人，你庆幸自己没轻信。' }, { text: '当面把话挑开，让三个人对质', effects: { trust: 3, doubt: 6 }, resolve: '对质不欢而散。传话的人和被传的人从此形同陌路——但至少，暗箭变成了明枪。' }, { text: '感谢报信的人，什么也不做', effects: { doubt: 4 }, resolve: '你把疑心埋进肚子里。但试炼结束前，你总会忍不住多看那位队友两眼。种子已经种下了。' } ] },
  { id: 'itl_any_supply', god: 'any', interlude: true, title: '幕间 · 清点', text: ['出发前清点补给——干粮只够一半人走到终点。', '账目很清楚，问题很残忍：谁能吃，谁少吃？', '五双眼睛看着你。这是试炼，也是审判。'], choices: [ { text: '均分——所有人都走慢一点，但都活着', effects: { trust: 7, csTrust: -3 }, resolve: '每份干粮都小得可怜，但每个人都在笑。饥饿面前，公平是最好的调味料。' }, { text: '体弱者多分，强壮者少吃——团队要走到最后', effects: { trust: 4, doubt: 3 }, resolve: '强壮的队友默默咽了口水，没说什么。弱者眼神里的感激货真价实。' }, { text: '另辟蹊径：用多余物资去和"世界"交换补给', effects: { doubt: 3, mpCost: 15 }, resolve: '你在一处废弃祭坛摆上多余物资，跪拜再三。第二天清晨，祭坛上多了一袋新鲜的面包。诸神偶尔也做买卖。' } ] }
];

/* ===== 成就数据 ===== */
const DATA_ACHIEVEMENTS = [
  { id: 'trial_3',    name: '初入试炼',     desc: '完成第 3 场试炼',       check: (g) => g.trialCount >= 3 },
  { id: 'trial_5',    name: '熟练的试炼者', desc: '完成第 5 场试炼',       check: (g) => g.trialCount >= 5 },
  { id: 'trial_10',   name: '试炼老兵',     desc: '完成 10 场试炼',       check: (g) => g.trialCount >= 10 },
  { id: 'score_50',   name: '登神之路',     desc: '登神之路积分达到 50',   check: (g) => g.state.score_dengshen >= 50 },
  { id: 'score_100',  name: '觐见之梯',     desc: '觐见之梯积分达到 30',   check: (g) => g.state.score_jinshen >= 30 },
  { id: 'best_clear', name: '完美通关',     desc: '以 best 结局完成试炼',  check: (g,ctx) => ctx?.outcome === 'best' },
  { id: 'jinshen_3',  name: '神明的注视',   desc: '累计觐神 3 次',         check: (g) => g.state.score_jinshen >= 3 },
  { id: 'lie_master', name: '谎言大师',     desc: '连续 3 次选择带"谎言"标签的选项', check: (g,ctx) => (g._lieStreak || 0) >= 3 },
  { id: 'fear_50',    name: '恐惧的囚徒',   desc: '恐惧值达到 50',         check: (g) => g.state.chengshi.fear >= 50 },
  { id: 'no_teammate_death', name: '可靠的队长', desc: '连续 3 场试炼无队友死亡', check: (g) => (g._safeStreak || 0) >= 3 },
  { id: 'trust_high', name: '众望所归',     desc: '所有队友信任度同时 ≥ 70', check: (g) => g.state.teammates.every(t => t.alive && t.trust >= 70) },
  { id: 'doubt_100',  name: '孤家寡人',     desc: '队友怀疑度之和达到 100', check: (g) => g.state.teammates.reduce((s,t) => s + t.doubt, 0) >= 100 },
  { id: 'hp_1',       name: '九死一生',     desc: '血量降到 1 点还活着',   check: (g,ctx) => ctx?.hpOneAlive },
  { id: 'jinshen_best', name: '神明宠儿',   desc: '在觐神中获得最高评价',  check: (g,ctx) => ctx?.jinshenBest },
  { id: 'all_trials', name: '试炼探险家',   desc: '至少玩过每一种试炼',    check: (g) => g.state.completedTrials.length >= Object.keys(DATA_TRIALS).length },
  { id: 'no_death_run', name: '金身不灭',   desc: '连续 5 场试炼没死亡',   check: (g) => (g._noDeathStreak || 0) >= 5 }
];

/* ===== 彩蛋数据 ===== */
const DATA_EASTER_EGGS = [
  { id: 'auto_lie_triggered',  name: '愚戏之唇',   hint: '触发一次失控谎言' },
  { id: 'fear_100_secret',     name: '深渊凝视',   hint: '让恐惧值达到极限（触发秘密结局）' },
  { id: 'faith_combo_fraud_mem', name: '背叛记忆', hint: '信仰欺诈 + 遇到记忆神信徒队友时触发特殊对话' },
  { id: 'all_lie_choices',     name: '谎言之王',   hint: '一次试炼中所有选择都是谎言' },
  { id: 'teammate_truth',     name: '队友的真相', hint: '连续三场试炼让同类型队友都活到最后' }
];
