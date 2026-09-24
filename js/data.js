/* ============================================================
 * 《诸神愚戏 · 信仰试炼》游戏数据
 * 基于前248章设定
 * ============================================================ */

/* ===== 六大命途与对应信仰 ===== */
const DATA_FAITHS = {
  // 文明命途
  order:    { id: 'order',    name: '秩序',  path: '文明', pathColor: '#3498db', desc: '守序、公约、铁律' },
  truth:    { id: 'truth',    name: '真理',  path: '文明', pathColor: '#3498db', desc: '洞窥本质、行见真理' },
  war:      { id: 'war',      name: '战争',  path: '文明', pathColor: '#3498db', desc: '以战止戈、恐惧冲锋' },
  // 混沌命途
  chaos:    { id: 'chaos',    name: '混乱',  path: '混沌', pathColor: '#e67e22', desc: '无序、异变、一切皆可' },
  folly:    { id: 'folly',    name: '痴愚',  path: '混沌', pathColor: '#e67e22', desc: '高傲、嘲讽、愚弄众生' },
  silence:  { id: 'silence',  name: '沉默',  path: '混沌', pathColor: '#e67e22', desc: '缄默、无声、不可名状' },
  // 生命命途
  genesis:  { id: 'genesis',  name: '诞育',  path: '生命', pathColor: '#27ae60', desc: '孕育、繁衍、生生不息' },
  prosperity:{ id: 'prosperity', name: '繁荣', path: '生命', pathColor: '#27ae60', desc: '繁茂、馈赠、万物生长' },
  death:    { id: 'death',    name: '死亡',  path: '生命', pathColor: '#27ae60', desc: '终结、收割、归于沉寂' },
  // 沉沦命途
  defilement:{ id: 'defilement', name: '污堕',path: '沉沦', pathColor: '#8e44ad', desc: '恐惧、欲望、扭曲' },
  decay:    { id: 'decay',    name: '腐朽',  path: '沉沦', pathColor: '#8e44ad', desc: '衰败、凋零、侵蚀万物' },
  annihilation:{ id: 'annihilation', name: '湮灭', path: '沉沦', pathColor: '#8e44ad', desc: '毁灭、虚无、存在的终点' },
  // 存在命途
  time:     { id: 'time',     name: '时间',  path: '存在', pathColor: '#1abc9c', desc: '流变、刻度、过去未来' },
  memory:   { id: 'memory',   name: '记忆',  path: '存在', pathColor: '#1abc9c', desc: '铭记、回响、存在的证明' },
  // 虚无命途
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
  order: {
    '战士': '秩序骑士', '法师': '元素法官', '牧师': '公正官',
    '刺客': '行刑官', '猎人': '搜查官', '歌者': '律者'
  },
  truth: {
    '战士': '格斗专家', '法师': '博识学者', '牧师': '外科医生',
    '刺客': '暗杀博士', '猎人': '陷阱大师', '歌者': '博闻诗人'
  },
  war: {
    '战士': '陷阵勇士', '法师': '炼狱主教', '牧师': '督战官',
    '刺客': '隙光铁刺', '猎人': '鹰眼斥候', '歌者': '风暴之嗓'
  },
  chaos: {
    '战士': '异血同袍', '法师': '灾祸之源', '牧师': '理智蚀者',
    '刺客': '疯癫刺客', '猎人': '混乱猎手', '歌者': '无律琴师'
  },
  folly: {
    '战士': '痴愚狂战士', '法师': '戏谑法师', '牧师': '愚弄祭司',
    '刺客': '嘲讽刺客', '猎人': '笑料猎手', '歌者': '疯癫诗人'
  },
  silence: {
    '战士': '静默守卫', '法师': '无声术士', '牧师': '缄默祭司',
    '刺客': '隐声刺客', '猎人': '无声猎手', '歌者': '寂语诵者'
  },
  genesis: {
    '战士': '酋长', '法师': '生命贤者', '牧师': '子嗣牧师',
    '刺客': '借诞之婴', '猎人': '创生猎人', '歌者': '孕育歌者'
  },
  prosperity: {
    '战士': '德鲁伊', '法师': '木精灵', '牧师': '园丁',
    '刺客': '荆棘之冠', '猎人': '美食家', '歌者': '繁茂歌者'
  },
  death: {
    '战士': '死亡骑士', '法师': '死灵法师', '牧师': '守墓人',
    '刺客': '死亡编织者', '猎人': '猩红猎手', '歌者': '撞钟人'
  },
  defilement: {
    '战士': '尖啸伯爵', '法师': '欲望主宰', '牧师': '悲悯领主',
    '刺客': '恶孽', '猎人': '感官追猎者', '歌者': '塞壬'
  },
  decay: {
    '战士': '木乃伊', '法师': '瘟疫枢机', '牧师': '凋零祭司',
    '刺客': '疮痍之目', '猎人': '黄昏猎人', '歌者': '腐烂颂唱者'
  },
  annihilation: {
    '战士': '清道夫', '法师': '烬灭者', '牧师': '焚化工',
    '刺客': '寂灭使徒', '猎人': '终焉行者', '歌者': '毁灭宣告'
  },
  time: {
    '战士': '时空战士', '法师': '时间行者', '牧师': '时序祭司',
    '刺客': '刹那刺客', '猎人': '流时猎手', '歌者': '时之诵者'
  },
  memory: {
    '战士': '记忆守卫', '法师': '忆术师', '牧师': '守忆祭司',
    '刺客': '残影刺客', '猎人': '忆中猎手', '歌者': '往昔歌者'
  },
  fate: {
    '战士': '命轨战士', '法师': '命运术士', '牧师': '命途祭司',
    '刺客': '命终刺客', '猎人': '终末之笔', '歌者': '预言家'
  },
  fraud: {
    '战士': '欺诈斗士', '法师': '幻术师', '牧师': '小丑牧师',
    '刺客': '伪面刺客', '猎人': '虚言猎手', '歌者': '谎言之喉'
  }
};

/* ===== 程实的核心天赋（前248章）===== */
const DATA_CHENGSHI_TALENTS = [
  {
    id: 'deceive_master',
    name: '欺骗大师',
    rank: 'S',
    type: 'passive',
    faith: 'fraud',
    desc: '你的谎言更容易被他人相信。除非被欺骗的目标出现认知矛盾，否则无法发现你的欺骗手段。并且你可以察觉除你之外的所有欺骗手段。',
    effect: { trustBonus: 15, detectLie: true }
  },
  {
    id: 'lies_like_yesterday',
    name: '谎如昨日',
    rank: 'SS',
    type: 'active',
    faith: 'fraud',
    desc: '将自身信仰暂时替换为最近一次被你成功欺骗的信徒的信仰。可持续至下次使用或一场试炼结束。',
    effect: { switchFaithTemp: true, duration: 1 }
  },
  {
    id: 'sacrifice_to_void',
    name: '献往虚无的祭品',
    rank: 'S',
    type: 'active',
    faith: 'fraud',
    desc: '当你编造的物品并不存在却被他人广泛承认存在时，物品存在。',
    effect: { createObject: true }
  },
  {
    id: 'all_forms',
    name: '众生相',
    rank: 'S',
    type: 'passive',
    faith: 'fate_forsaken',
    desc: '命运弃誓天赋，背离了命运的可怜人被众生命运所缚。特殊试炼奖励将替换为特殊道具【众生假面】。',
    effect: { grantMask: true }
  }
];

/* ===== 程实初始道具（前248章）===== */
const DATA_CHENGSHI_ITEMS = [
  {
    id: 'bone_ring',
    name: '骨仆乐乐尔之戒',
    rank: 'SSSs',
    type: '饰品',
    desc: '由【死亡】亲自锻造。可吸收恐惧情绪充能，召降雷刑诛灭敌人。',
    effects: [
      { name: '恐惧养料', desc: '吸收周围恐惧情绪充能' },
      { name: '鸣雷裁决', desc: '消耗充能召降雷刑，曾提供恐惧者必中' },
      { name: '王座下的骨仆', desc: '将尸体炼制成死亡骨仆' }
    ]
  },
  {
    id: 'fate_dice',
    name: '命运之骰',
    rank: 'A',
    type: '道具',
    desc: '来自【命运】的骰子，掷出的点数决定命运的走向。',
    effects: [
      { name: '既定', desc: '可以观察掷骰结果并选择是否接受' }
    ]
  },
  {
    id: 'mask_stock',
    name: '众生假面 ×2',
    rank: 'S',
    type: '道具',
    desc: '可以戴在脸上，暂时替换为来源信徒的基础职业。',
    effects: [
      { name: '命运织机', desc: '戴上替换职业，摘下假面消失' }
    ],
    count: 2
  }
];

/* ===== 神明设定 ===== */
const DATA_GODS = {
  order: {
    id: 'order', name: '秩序', icon: '⚖️', color: '#3498db',
    appearance: '一道威严的光柱，内含四枚环扣——公约、恐惧、傲慢、偏执',
    personality: '公正、刻板、不可动摇',
    gift: '圣光长城（护盾）',
    hatred: '最厌恶混乱',
    trial_types: ['审判', '戒律', '契约']
  },
  chaos: {
    id: 'chaos', name: '混乱', icon: '🌀', color: '#e67e22',
    appearance: '一团不断变幻的漩涡，既像笑脸又像哭脸',
    personality: '无拘无束、变幻莫测、玩弄规则',
    gift: '一切皆可',
    hatred: '憎恶秩序',
    trial_types: ['异变', '赌博', '身份互换']
  },
  genesis: {
    id: 'genesis', name: '诞育', icon: '🌱', color: '#27ae60',
    appearance: '一只巨大的母性之眼，瞳孔中孕育着无数雏形生命',
    personality: '狂热地渴望繁衍，让一切生命孕育',
    gift: '致孕攻击/治疗怀孕',
    hatred: '对死亡充满敌意',
    trial_types: ['孕育', '繁衍', '母职']
  },
  death: {
    id: 'death', name: '死亡', icon: '💀', color: '#27ae60',
    appearance: '一袭黑袍的骷髅，手持巨大的镰刀',
    personality: '冷酷、公正、不带有任何情感',
    gift: '死亡送葬',
    hatred: '与诞育对立，但本质是生命的循环',
    trial_types: ['终末', '告别', '死灵']
  },
  fraud: {
    id: 'fraud', name: '欺诈', icon: '🎭', color: '#d4a843',
    appearance: '一位戴着滑稽小丑面具的身影，面具永远在笑',
    personality: '狡黠、荒诞、以愚弄众生为乐',
    gift: '让谎言成真',
    hatred: '与记忆对立',
    trial_types: ['谎言', '伪装', '骗局']
  },
  fate: {
    id: 'fate', name: '命运', icon: '🎲', color: '#d4a843',
    appearance: '一双巨大的手，正在编织一张无尽的命运之网',
    personality: '神秘、不可知、似乎一切尽在掌握',
    gift: '众生假面',
    hatred: '与时间对立',
    trial_types: ['命运', '选择', '骰子']
  },
  prosperity: {
    id: 'prosperity', name: '繁荣', icon: '🌳', color: '#27ae60',
    appearance: '一棵巨大的发光之树，树冠延伸至无限',
    personality: '慷慨、繁茂、但有吞噬一切的贪欲',
    gift: '生命繁盛',
    hatred: '与腐朽对立',
    trial_types: ['丰收', '馈赠', '贪婪']
  },
  decay: {
    id: 'decay', name: '腐朽', icon: '🍂', color: '#8e44ad',
    appearance: '一具布满霉斑和蛆虫的干枯尸体',
    personality: '阴郁、缓慢、侵蚀一切',
    gift: '凋零腐蚀',
    hatred: '与繁荣对立',
    trial_types: ['衰败', '疫病', '凋零']
  },
  war: {
    id: 'war', name: '战争', icon: '⚔️', color: '#3498db',
    appearance: '一位身着戎装的将军，但神情异常惊恐',
    personality: '本质胆小，却不断挑起战争',
    gift: '以战止伤',
    hatred: '与沉默对立',
    trial_types: ['战场', '勇气', '以战止戈']
  },
  truth: {
    id: 'truth', name: '真理', icon: '📖', color: '#3498db',
    appearance: '一双闪烁着知识光芒的眸子',
    personality: '冷漠、理性、一切归于知识',
    gift: '洞窥本质',
    hatred: '与痴愚对立',
    trial_types: ['解谜', '实验', '知识考验']
  },
  defilement: {
    id: 'defilement', name: '污堕', icon: '😱', color: '#8e44ad',
    appearance: '一棵挂满人脸的黑暗之树，人脸都在尖叫',
    personality: '制造恐惧、收割情绪、扭曲欲望',
    gift: '恐惧收割',
    hatred: '与诞育对立',
    trial_types: ['恐惧', '诱惑', '扭曲']
  },
  annihilation: {
    id: 'annihilation', name: '湮灭', icon: '🌑', color: '#8e44ad',
    appearance: '一片纯粹的虚无，连光都被吞噬',
    personality: '沉默、纯粹的终结',
    gift: '抹除存在',
    hatred: '与死亡对立',
    trial_types: ['虚无', '消解', '存在抹除']
  }
};

/* ===== 队友随机名字池 ===== */
const DATA_TEAMMATE_NAMES = [
  '方诗晴', '阿铭', '百灵', '徐璐', '曹三岁', '黄波', '陈冲', '夏婉',
  '墨秋斯', '于归', '胡璇', '宋义', '布鲁克斯',
  '林宇', '王猛', '李逸', '赵影', '周宁', '秦九', '小七', '铁柱',
  '婉儿', '冷月', '凌风', '萧然', '楚云', '梦璃', '无痕', '风行',
  '陆沉', '沈夜', '苏雾', '江潮', '闻笙', '夜阑', '温沉', '冷屿',
  '许砚', '简辞', '时晏', '裴野', '谢檐', '霍渊', '纪川', '宋砚舟'
];

/* ===== 队友性格设定 ===== */
const DATA_TEAMMATE_PERSONALITIES = [
  { id: 'steady', name: '稳健', trait: '做事谨慎，偏好保守选择', trustMod: 5 },
  { id: 'reckless', name: '冲动', trait: '热血上头，偏好冒险', trustMod: -5 },
  { id: 'cunning', name: '狡猾', trait: '精于算计，不太信任他人', trustMod: 0 },
  { id: 'loyal', name: '忠诚', trait: '认准一人便至死不渝', trustMod: 10 },
  { id: 'paranoid', name: '多疑', trait: '不轻易相信任何人', trustMod: -10 },
  { id: 'greedy', name: '贪婪', trait: '对奖励有极强渴望', trustMod: -3 },
  { id: 'altruistic', name: '善良', trait: '优先考虑队友安全', trustMod: 8 },
  { id: 'cowardly', name: '怯懦', trait: '遇到危险容易退缩', trustMod: -8 }
];

/* ============================================================
 * 试炼内容库
 * 每条命途设计2-3个试炼场景
 * ============================================================ */

const DATA_TRIALS = {
  /* === 文明命途 === */
  'order_1': {
    id: 'order_1',
    name: '布鲁克斯公爵的名誉',
    god: 'order',
    path: '文明',
    difficulty: 'C',
    summary: '你是受邀参加公爵晚宴的宾客。席间，公爵突然身亡，而所有线索都指向你。作为秩序信徒，真相必须大白——但真相可能比谎言更加致命。',
    objective: '在晚宴宾客中找出真凶，还自己清白',
    scenes: [
      {
        title: '第一章 · 晚宴',
        text: [
          '水晶吊灯的光芒透过高脚杯折射出斑斓色彩，管弦乐在大厅中流淌。',
          '你以【秩序】信徒的身份来到布鲁克斯公爵的城堡，表面上是受邀赴宴。但你知道，这里将是一场考验。',
          '公爵举杯致辞时，脸色突然发青，手中的水晶杯摔落在地。',
          '"有人在酒中下毒！"一片惊叫中，你注意到自己杯中的酒与公爵杯中的酒……颜色微妙地不同。',
          '更糟糕的是——你座位旁的托盘上，赫然留着一个明显属于你的信仰符号。'
        ],
        choices: [
          {
            text: '立刻声明自己的清白，并指出酒杯颜色不同',
            tag: 'truth',
            next: 'order_1_2a',
            effects: { trust: 5, doubt: -3, csTrust: 5 }
          },
          {
            text: '编造一个"看见有人下毒"的谎言，指向另一位宾客',
            tag: 'lie',
            next: 'order_1_2b',
            effects: { trust: -5, doubt: 10, csTrust: -5, mpCost: 10 }
          },
          {
            text: '集中精神，仔细聆听周围宾客的窃窃私语',
            tag: 'talent',
            next: 'order_1_2c',
            effects: { mpCost: 5 }
          }
        ]
      },
      {
        id: 'order_1_2a',
        allowLieTrigger: true,
        title: '真相之路',
        text: [
          '"各位请看！"你举起酒杯高声道，"公爵的酒杯与我的酒杯颜色不同——说明有人调换了！"',
          '众人哗然。一位老管家走上前确认："确实……公爵大人的酒杯被人下了慢性毒药。"',
          '但随即，一位贵族少女站起来："我亲眼看到——你在公爵举杯前与他碰过杯！"',
          '你成了新的嫌疑对象。不过，你注意到少女的手指在微微颤抖——她在说谎。',
          '而角落里，那位沉默的骑士正冷冷地看着你……不，他的目光是看向那个少女的。'
        ],
        choices: [
          {
            text: '当众指出少女在说谎，观察她的反应',
            next: 'order_1_2a_mid_a',
            effects: { trust: 3, doubt: 5, csTrust: 3 }
          },
          {
            text: '转移话题，让骑士提供证词',
            next: 'order_1_2a_mid_b',
            effects: { trust: 0, doubt: 2, csTrust: 0 }
          },
          {
            text: '假装自己中毒，吸引所有人注意',
            tag: 'lie',
            next: 'order_1_2a_mid_c',
            effects: { trust: -3, doubt: 8, csTrust: -3, mpCost: 15 }
          },
          {
            text: '【队友·策略讨论】拉队友一起分析少女和骑士的可疑之处',
            tag: 'strategy',
            next: 'order_1_2a_mid_a',
            effects: { trust: 5, mpCost: 5 }
          }
        ]
      },
      {
        id: 'order_1_2a_mid_a',
        title: '少女的秘密',
        text: [
          `你直视少女的眼睛，一字一顿："你在撒谎。你的手指在颤抖，你的声音在发抖——你有话不敢说。"`,
          `大厅的空气凝固了。少女后退一步，裙角被椅子勾住，踉跄了一下。`,
          `"我……我没有……"`,
          `你注意到她的颈间有一枚小小的家徽——那是公爵弟弟家的标志。而公爵的弟弟，正是公爵死后爵位的第一顺位继承人。`,
          `更巧的是——你的一位新队友也注意到了那枚家徽。他悄悄冲你点了点头。`
        ],
        choices: [
          { text: '当场质问少女与公爵弟弟的关系', next: 'order_1_3a', effects: { trust: 5, csTrust: 3 } },
          { text: '【队友·支援】让队友出去找公爵弟弟，先把少女稳住', tag: 'support', next: 'order_1_3a', effects: { trust: 8, mpCost: 5 } },
          { text: '【队友·欺骗】说谎说你已经抓到了公爵弟弟，逼少女崩溃', tag: 'lie', next: 'order_1_3a_alt', effects: { trust: -10, doubt: 12, csTrust: -5, mpCost: 10 } }
        ]
      },
      {
        id: 'order_1_2a_mid_b',
        title: '沉默骑士',
        text: [
          `你不再纠结少女，而是转向角落的骑士："阁下，你一直在观察。请问你看到了什么？"`,
          `骑士抬起头。他的脸像一块石头，但眼睛里有一丝不易察觉的温柔——他是公爵的旧部。`,
          `"我看到……"骑士缓缓开口，声音沙哑，"我看到有人在仪式开始前，偷偷换了公爵的酒杯。那个人……穿了和公爵弟弟一样的手套。"`,
          `他顿了顿，补了一句："我本不想说。但公爵对我有恩。我不会让他死不瞑目。"`
        ],
        choices: [
          { text: '让骑士当众作证，将矛头指向公爵弟弟', next: 'order_1_3b', effects: { trust: 8, csTrust: 5 } },
          { text: '【队友·协作】让队友保护骑士，防止凶手灭口', tag: 'collab', next: 'order_1_3b', effects: { trust: 5, hpCost: 5 } }
        ]
      },
      {
        id: 'order_1_2a_mid_c',
        title: '演砸的戏',
        text: [
          `你捂住胸口，摇摇欲坠："毒……我也……"`,
          `大厅里短暂地安静了一秒。然后——`,
          `少女笑出了声。`,
          `"你以为你是谁？"她冷笑，"你那杯酒根本没毒——毒在公爵的专属水晶杯里，只有他会用。"`,
          `所有人的目光再次聚向你，充满鄙夷。秩序神的追随者，竟然在秩序崩塌时用谎言求生。`
        ],
        choices: [
          { text: '硬撑到底："我不管！反正酒里有毒！"', next: 'order_1_3c', effects: { trust: -8, doubt: 15, csTrust: -8 } },
          { text: '立刻改口道歉："我太慌了……对不起……"', next: 'order_1_3c_alt', effects: { trust: -3, doubt: 5, csTrust: -5 } }
        ]
      },
      {
        id: 'order_1_2b',
        title: '谎言之路',
        text: [
          '"我看见了！"你指着远处一位穿黑袍的宾客，"就是他，趁人不备调换了公爵的酒杯！"',
          '黑袍宾客被带了上来。出人意料