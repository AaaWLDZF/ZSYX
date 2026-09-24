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
          '黑袍宾客被带了上来。出人意料的是，他竟然笑着承认："不错，是我。公爵欠我一条命。"',
          '然而你注意到——他笑的时候，眼睛里没有任何恨意，反而带着一种……玩味。',
          '"不过，"黑袍人继续道，"我真正想毒杀的，不是公爵，而是——"他缓缓指向你，"你。"',
          '陷阱。你掉进了陷阱。但此时改口，已经没有人会相信你了。'
        ],
        choices: [
          {
            text: '继续硬撑，编造更多细节',
            tag: 'lie',
            next: 'order_1_2b_mid_a',
            effects: { trust: -8, doubt: 15, csTrust: -8, hpCost: 10, mpCost: 15 }
          },
          {
            text: '承认自己说谎，但指出黑袍人也并非善类',
            next: 'order_1_2b_mid_b',
            effects: { trust: -2, doubt: 5, csTrust: -5 }
          },
          {
            text: '使用【欺骗大师】观察黑袍人的真实意图',
            tag: 'talent',
            next: 'order_1_2b_mid_c',
            effects: { mpCost: 10 }
          },
          {
            text: '【队友·欺骗】让队友假装支持黑袍人，从他口中套情报',
            tag: 'lie',
            next: 'order_1_2b_mid_c',
            effects: { trust: -12, doubt: 10, csTrust: -5, mpCost: 8 }
          }
        ]
      },
      {
        id: 'order_1_2b_mid_a',
        title: '越描越黑',
        text: [
          `你大脑飞速运转，继续编："他……他用的是一种从东方来的奇毒！我亲眼看到他从袖子里掏出一个小瓶子！"`,
          `黑袍人笑容更盛："哦？那你说说，那瓶子是什么颜色的？"`,
          `你张了张嘴——你根本没编这个细节。`,
          `大厅里有人开始窃笑。一个谎言需要更多谎言来填补，而你已经开始捉襟见肘。`,
          `更糟糕的是，你【欺骗大师】的天赋好像也失灵了——因为你的恐惧太大了。`
        ],
        choices: [
          { text: '继续编："是……绿色的！不，黑色的！等等……"', next: 'order_1_3d', effects: { trust: -15, doubt: 20, csTrust: -10, hpCost: 5 } },
          { text: '【队友·支援】让队友假装想起"对！是绿色的！"帮你圆谎', tag: 'lie', next: 'order_1_3d_alt', effects: { trust: -20, doubt: 18, csTrust: -10 } }
        ]
      },
      {
        id: 'order_1_2b_mid_b',
        title: '坦诚',
        text: [
          `你深吸一口气，放下手指："对不起。我……我在说谎。我只是太害怕了。"`,
          `大厅里短暂地沉默了一下。`,
          `然后黑袍人笑了："终于诚实了。"`,
          `但他接着说："但我也没打算就这么放过你。——我确实下了毒，只是没毒到公爵。"`,
          `他的眼神突然变得冰冷："你们这些秩序信徒，真以为秩序能保护你们吗？"`
        ],
        choices: [
          { text: '和黑袍人谈判："你到底想要什么？"', next: 'order_1_3e', effects: { trust: 0, doubt: 3, csTrust: -3 } },
          { text: '【队友·协作】让队友包围黑袍人，准备动手', tag: 'collab', next: 'order_1_3e_alt', effects: { trust: 3, hpCost: 10, mpCost: 5 } }
        ]
      },
      {
        id: 'order_1_2b_mid_c',
        title: '看穿黑袍人',
        text: [
          `你激活了【欺骗大师】——刹那间，黑袍人的所有微表情、肌肉抽动、瞳孔收缩都被你捕捉到。`,
          `他说"我真正想毒杀的是你"的时候，嘴角是上扬的——那不是恨，是……期待？`,
          `他期待你做出什么反应？期待你崩溃？还是……期待你做出某种选择？`,
          `突然，你想到了一种可能——这个人，根本不是凶手。他是秩序神派来的试炼者。`
        ],
        choices: [
          { text: '直接点破："你不是凶手。你在测试我。"', next: 'order_1_3f', effects: { csTrust: 10, trust: 5 } },
          { text: '装没看出来："你到底是谁？"', next: 'order_1_3f_alt', effects: { csTrust: 3, trust: 0 } }
        ]
      },
      {
        id: 'order_1_2c',
        title: '聆听之路',
        text: [
          '你集中精神，周围的窃窃私语像潮水一样涌入脑海——',
          '"……那孩子，是公爵的私生……"',
          '"……不能让他继位……"',
          '"……毒药是从地牢里拿的……"',
          '"……他和公爵碰过杯……不，是公爵主动找的他……"',
          '信息太杂。但你抓住了一个关键：有人提到"私生"和"继位"。',
          '而那个"他"，指的就是你自己——有人把你伪装成了公爵的私生子！'
        ],
        choices: [
          {
            text: '指出有人在设局陷害，动机是继承爵位',
            next: 'order_1_2c_mid_a',
            effects: { trust: 8, doubt: -5, csTrust: 5, mpCost: 5 }
          },
          {
            text: '不动声色，继续偷听更多细节',
            next: 'order_1_2c_mid_b',
            effects: { trust: 0, doubt: 0, csTrust: 0, mpCost: 5 }
          },
          {
            text: '【队友·协作】让新队友也用各自天赋帮忙搜集信息',
            tag: 'collab',
            next: 'order_1_2c_mid_a',
            effects: { trust: 10, mpCost: 15 }
          }
        ]
      },
      {
        id: 'order_1_2c_mid_a',
        title: '揭露设局',
        text: [
          `你决定主动出击："各位，我要坦白一件事——我根本不是什么公爵的私生子。"`,
          `大厅里一阵哗然。`,
          `"我是受邀赴宴的宾客，名字是程实。但刚才我听到有人说，要把我包装成私生子来陷害我。"`,
          `你环视一周，目光锁定那个戴家徽的少女和角落里的骑士——骑士微微点头。`,
          `队友们（全新的随机队友）此时也站了出来。其中一个队友说："我可以证明，他是我们【欺诈】公会的人。"`,
          `等等——队友怎么说自己是欺诈公会的？你根本没提过。不过……这或许是他想出来的掩护。`
        ],
        choices: [
          { text: '感谢这位队友的谎言掩护，继续追查真凶', next: 'order_1_3g', effects: { trust: 10, csTrust: 8 } },
          { text: '【队友·策略讨论】讨论为什么有人要把你牵扯进继承斗争', tag: 'strategy', next: 'order_1_3g', effects: { trust: 5, csTrust: 5, mpCost: 5 } }
        ]
      },
      {
        id: 'order_1_2c_mid_b',
        title: '更多窃密',
        text: [
          `你继续集中精神，更多细碎的对话涌入脑海：`,
          `"……地牢的钥匙在老管家手里……"`,
          `"……他还不知道自己被设局了……让他继续当替罪羊吧……"`,
          `"……公爵弟弟说了，只要今晚成功，我们每人拿一份……"`,
          `钥匙、老管家、公爵弟弟——三条线索交织在一起。`,
          `但你感觉有人的目光正在注视你。有人发现你在偷听了？`
        ],
        choices: [
          { text: '立刻假装什么都没发生，然后指证公爵弟弟', next: 'order_1_3g', effects: { trust: 5, csTrust: 5 } },
          { text: '【队友·支援】让队友掩护你去地牢搜查', tag: 'support', next: 'order_1_3g', effects: { trust: 8, hpCost: 5, mpCost: 10 } },
          { text: '继续保持专注——也许还能听到更关键的', next: 'order_1_3g_secret', effects: { mpCost: 20, csTrust: 10, trust: 0 } }
        ]
      },
      // 结果场景
      { id: 'order_1_3a', outcome: 'good', title: '真相大白', reward: { dengshen: 15, jinshen: 3 }, summary: '你识破了少女的谎言，她崩溃后承认是受真正凶手指使。真相虽曲折，但秩序得以伸张。你获得了秩序的认可。' },
      { id: 'order_1_3a_alt', outcome: 'mid', title: '逼供的代价', reward: { dengshen: 12, jinshen: 2 }, summary: '你用假消息（说已抓到公爵弟弟）逼少女崩溃——她确实招供了，但秩序神看到了你不择手段的一面。及格，但不赞赏。' },
      { id: 'order_1_3b', outcome: 'mid', title: '勉强脱困', reward: { dengshen: 10, jinshen: 2 }, summary: '骑士提供了一些证据帮你解围，但真凶并未完全暴露。秩序神只给了你及格分。' },
      { id: 'order_1_3c', outcome: 'bad', title: '弄巧成拙', reward: { dengshen: 3, jinshen: 0 }, summary: '你假装中毒的表演太过拙劣，反而让所有人认为你在演戏。秩序神对你的诚信打了负分。' },
      { id: 'order_1_3c_alt', outcome: 'mid', title: '及时认错', reward: { dengshen: 8, jinshen: 1 }, summary: '你立刻道歉认错，虽然弄巧成拙，但诚实的态度挽回了一些分。秩序神叹气给了及格。' },
      { id: 'order_1_3d', outcome: 'bad', title: '谎言崩塌', reward: { dengshen: -5, jinshen: 0 }, summary: '你越编漏洞越多，最终被当场戳穿。秩序神怒斥你的虚伪，直接给了负分。' },
      { id: 'order_1_3d_alt', outcome: 'mid', title: '队友圆谎', reward: { dengshen: 6, jinshen: 1 }, summary: '队友帮你圆谎虽然暂时保住了局面，但秩序神看穿了一切。不过……他对队友们的团结还是给了一点面子。' },
      { id: 'order_1_3e', outcome: 'mid', title: '诚实的代价', reward: { dengshen: 8, jinshen: 1 }, summary: '承认错误后，秩序神看到了你的坦诚，但也看到了你最初的不诚实。勉强给了及格。' },
      { id: 'order_1_3e_alt', outcome: 'good', title: '武力压制', reward: { dengshen: 14, jinshen: 2 }, summary: '你和队友联手制服黑袍人，从他身上搜出了指向真正凶手的密信。武力不是最好的方式，但在危急时刻有效。' },
      { id: 'order_1_3f', outcome: 'good', title: '看穿一切', reward: { dengshen: 18, jinshen: 3 }, summary: '你用欺骗大师看穿黑袍人的真实意图——他是秩序神的试炼者，专门测试你的诚实与智慧。你过关了！' },
      { id: 'order_1_3f_alt', outcome: 'mid', title: '棋差一招', reward: { dengshen: 11, jinshen: 1 }, summary: '你装作没看出来，黑袍人觉得无趣，说出了一部分真相。但因为没有主动点破，秩序神觉得你不够坦诚。' },
      { id: 'order_1_3g', outcome: 'best', title: '还原完整真相', reward: { dengshen: 20, jinshen: 3 }, summary: '你将所有线索串联，不仅洗清了自己，还揪出了幕后黑手——公爵的弟弟。秩序神对你的推理赞赏有加。' },
      { id: 'order_1_3g_secret', outcome: 'best', title: '密会秘闻', reward: { dengshen: 25, jinshen: 4 }, summary: `你坚持偷听，最终听到了一条连秩序神都不知道的秘闻——公爵的"死亡"其实是他自己安排的假死，他想通过假死来测试身边所有人的忠诚。而你，是唯一一个被他选出来的"局外人"测试者。` }
    ]
  },

  /* === 生命命途 · 诞育 === */
  'genesis_1': {
    id: 'genesis_1',
    name: '求子观音',
    god: 'genesis',
    path: '生命',
    difficulty: 'B',
    summary: '你被困在一个由【诞育】权柄扭曲的村庄。所有女性都会莫名怀孕，而胎儿却在腹中疯狂生长。作为有治疗能力的牧师，你被村民视为希望——但你隐约感觉到，这并非恩赐。',
    objective: '找出村庄异常怀孕的真相，并阻止灾难',
    scenes: [
      {
        title: '第一章 · 丰收村',
        text: [
          '空气中弥漫着甜腻的气息，像是熟透的果实混合着某种……更原始的气味。',
          '丰收村，正如它的名字，这里硕果累累。但你看到的却是另一番景象：所有的女性都挺着肚子行走，连少女也不例外。',
          '"救救我们……"一位脸色惨白的妇人拉住你，"孩子在肚子里……他在咬我……"',
          '话音未落，她的腹部剧烈鼓起，一只小小的手从衣料下伸了出来！',
          '你必须尽快搞清楚这里发生了什么。'
        ],
        choices: [
          {
            text: '尝试用治疗手段稳住这位妇人',
            tag: 'talent',
            next: 'genesis_1_2a',
            effects: { mpCost: 20, hpCost: -15, trust: 10 }
          },
          {
            text: '集中精神，感知妇人体内的动静',
            tag: 'talent',
            next: 'genesis_1_2b',
            effects: { mpCost: 8 }
          },
          {
            text: '询问村里的老人，了解异变的来源',
            next: 'genesis_1_2c',
            effects: { trust: 3 }
          }
        ]
      },
      {
        id: 'genesis_1_2a',
        allowLieTrigger: true,
        title: '治愈与诅咒',
        text: [
          '你尝试治疗——微弱的力量灌入妇人身体。但那个胎儿的动静让你不安。',
          '效果立竿见影——但不是你期待的效果。治疗之力似乎被腹中的胎儿"吸收"了！',
          '胎儿以肉眼可见的速度飞速生长，妇人发出凄厉的惨叫。',
          '"不不不……你……你让他更强了！"',
          '你这才意识到：这里的"病"，根本不是你能治愈的东西。【诞育】的权柄，正在被扭曲地使用着。'
        ],
        choices: [
          {
            text: '强行用治疗之力压制胎儿生长（可能伤及妇人）',
            next: 'genesis_1_2a_mid_a',
            effects: { mpCost: 30, hpCost: 10, trust: -5, doubt: 10 }
          },
          {
            text: '停止治疗，转而去寻找异变的源头',
            next: 'genesis_1_2a_mid_b',
            effects: { trust: -8, doubt: 5 }
          },
          {
            text: '编造一个"神秘仪式"，让村民集体祈祷改变胎儿',
            tag: 'lie',
            next: 'genesis_1_2a_mid_c',
            effects: { mpCost: 15, trust: 15, csTrust: -10, doubt: 3 }
          },
          {
            text: '【队友·协作】让新队友用各自天赋分散胎儿的注意力',
            tag: 'collab',
            next: 'genesis_1_2a_mid_a',
            effects: { trust: 8, mpCost: 10, hpCost: 5 }
          }
        ]
      },
      {
        id: 'genesis_1_2a_mid_a',
        title: '生死一线',
        text: [
          `你深吸一口气，将治疗之力转化为压制之力——`,
          `这是一种亵渎。用诞育的力量去扼杀诞育本身。`,
          `妇人的腹部在你手下剧烈起伏。胎儿发出了类似婴儿的啼哭——但那声音里，有某种让人毛骨悚然的……成熟。`,
          `"快……快……"妇人抓着你的手，指甲嵌入你的皮肤，"不要……杀……他……"`,
          `她在保护那个怪物。她不知道那不是她的孩子。`
        ],
        choices: [
          { text: '加大压制力度——牺牲一小部分胎儿救妇人', next: 'genesis_1_3a', effects: { mpCost: 20, trust: 8 } },
          { text: '停手——尊重她作为母亲的选择', next: 'genesis_1_3a_alt', effects: { trust: 5, csTrust: 5 } },
          { text: '【队友·支援】让队友固定妇人，你全力压制', tag: 'support', next: 'genesis_1_3a', effects: { hpCost: 5, trust: 5 } }
        ]
      },
      {
        id: 'genesis_1_2a_mid_b',
        title: '离开',
        text: [
          `你松开手，站起身。妇人用怨恨的眼神看着你——在她看来，是你让孩子变"强壮"的，然后你又放弃了她。`,
          `你转身走进村庄。身后传来妇人的惨叫。`,
          `新队友追上来："我们真的不管了？"`,
          `"我们管不了。"你说，"得找到源头。不然救一个还有下一个。"`
        ],
        choices: [
          { text: '去村庄边缘找那个"赐子果"的来源', next: 'genesis_1_3b', effects: { csTrust: 3 } },
          { text: '【队友·策略讨论】分析为什么会发生这种事——谁在扭曲诞育权柄？', tag: 'strategy', next: 'genesis_1_3b', effects: { trust: 5, csTrust: 5 } }
        ]
      },
      {
        id: 'genesis_1_2a_mid_c',
        title: '集体仪式',
        text: [
          `你跑向村庄中心广场，高呼："大家听我说！我知道这是谁的诅咒！我们需要集体祈祷！"`,
          `你编造了一个"古老的净化仪式"，让所有人手牵手围成圈。`,
          `诡异的是——村民们真的开始祈祷。他们脸上带着狂热的光芒。`,
          `而你在中间，作为这个"仪式"的主持者，感受到了一股不属于你的力量……`,
          `那是信念的力量。虽然你在撒谎，但村民的信仰是真实的。`
        ],
        choices: [
          { text: '继续维持仪式，让信念凝聚到最强', next: 'genesis_1_3c', effects: { mpCost: 25, trust: 15, csTrust: -5 } },
          { text: '偷偷溜走——这种力量你控制不了', next: 'genesis_1_3c_alt', effects: { trust: -15, csTrust: -10 } }
        ]
      },
      {
        id: 'genesis_1_2b',
        title: '腹中真相',
        text: [
          '你屏息凝神，将注意力深入妇人体内。',
          '你听见了——不是一个胎儿，而是……很多个。无数小小的声音在血肉中嗡鸣：',
          '"妈妈……妈妈……让我出来……我饿……"',
          '更让你不寒而栗的是——这些声音中有男有女，有老有少……',
          '这根本不是"怀孕"。这是【诞育】权柄在吞噬村民的生命力，让他们成为新生命的孵化器——而那些"新生命"，是某种被制造出来的怪物。'
        ],
        choices: [
          {
            text: '将真相告诉村民，让他们自己决定',
            next: 'genesis_1_2b_mid_a',
            effects: { trust: 5, doubt: 15, csTrust: 5 }
          },
          {
            text: '对村民隐瞒真相，自己去寻找源头解决',
            next: 'genesis_1_2b_mid_b',
            effects: { trust: -10, doubt: 5, csTrust: -5 }
          },
          {
            text: '【队友·欺骗】说谎说"我已经治好一个了"，先稳住村民',
            tag: 'lie',
            next: 'genesis_1_2b_mid_a',
            effects: { trust: -8, doubt: 12, csTrust: -5, mpCost: 5 }
          }
        ]
      },
      {
        id: 'genesis_1_2b_mid_a',
        title: '恐慌',
        text: [
          `你当着所有村民的面说出了真相：这不是怀孕，这是孵化怪物。`,
          `广场上死一般的安静。然后——尖叫、哭喊、混乱。`,
          `一个抱着肚子的老妇人突然冲向你："你是恶魔！你要杀我们的孩子！"`,
          `更糟的是——那个"外来商人"不知从哪冒了出来，站在人群后面冷笑。他没有逃。他在看戏。`
        ],
        choices: [
          { text: '当场指证商人，让他暴露', next: 'genesis_1_3d', effects: { trust: 3, csTrust: 5 } },
          { text: '【队友·支援】让队友保护村民，你去追商人', tag: 'support', next: 'genesis_1_3d', effects: { trust: 8, mpCost: 10 } }
        ]
      },
      {
        id: 'genesis_1_2b_mid_b',
        title: '独自前行',
        text: [
          `你决定不告诉村民——他们太脆弱了。`,
          `你和新队友悄悄离开了村庄，顺着商人可能走的路线追踪。`,
          `路上，你在一片树林里发现了一个令人不安的东西：一株巨大的发光树，树根下埋着数不清的"赐子果"残渣。`,
          `这就是源头。被腐化的生命之树。`
        ],
        choices: [
          { text: '用诞育之力净化它（你自己会暂时失去牧师能力）', next: 'genesis_1_3e_alt', effects: { mpCost: 30, csTrust: 10 } },
          { text: '直接砍倒它（简单粗暴但可能释放腐化能量）', next: 'genesis_1_3b', effects: { hpCost: 15, mpCost: 5 } }
        ]
      },
      {
        id: 'genesis_1_2c',
        title: '古老仪式',
        text: [
          '一位颤巍巍的老婆婆告诉你："七天前，外来的商人给我们送来了「赐子果」……说能让我们家家有后。"',
          '"我们吃了。然后……然后所有人都怀上了。连男人……"她掀开自己的衣服，胸前微微隆起。',
          '外来商人，赐子果。你已经有了怀疑：这是某种试炼，有人在刻意用【诞育】权柄制造灾难。',
          '但为什么？'
        ],
        choices: [
          {
            text: '去村庄边缘寻找那位"外来商人"的踪迹',
            next: 'genesis_1_3b',
            effects: { trust: 0 }
          },
          {
            text: '调查"赐子果"的来源和成分',
            next: 'genesis_1_3d',
            effects: { trust: 3 }
          }
        ]
      },
      // 结果
      { id: 'genesis_1_3a', outcome: 'mid', reward: { dengshen: 8, jinshen: 1 }, summary: '你杀死了胎儿，但妇人也因失血过多濒死。诞育神认为你浪费了生命的馈赠。' },
      { id: 'genesis_1_3a_alt', outcome: 'good', reward: { dengshen: 14, jinshen: 2 }, summary: '你选择尊重妇人的选择。诞育神被你的同理心打动——那些怪物竟然没有再长大，反而慢慢萎缩消散了。' },
      { id: 'genesis_1_3b', outcome: 'good', reward: { dengshen: 15, jinshen: 2 }, summary: '你找到并摧毁了赐子果的源头——一株被腐化的生命之树。但一些村民已经无法挽回。' },
      { id: 'genesis_1_3c', outcome: 'best', reward: { dengshen: 20, jinshen: 3 }, summary: '你用谎言凝聚了村民的意志，集体的信念竟然短暂突破了腐化权柄。诞育神被你的创意震惊，给了满分！' },
      { id: 'genesis_1_3c_alt', outcome: 'bad', reward: { dengshen: 4, jinshen: 0 }, summary: '你偷偷溜走了。仪式失去主持后立刻崩溃，村民陷入混乱。你跑了，但信任也跑光了。' },
      { id: 'genesis_1_3d', outcome: 'mid', reward: { dengshen: 12, jinshen: 2 }, summary: '真相大白后村民陷入恐慌，但也有人因此获得了面对的勇气。' },
      { id: 'genesis_1_3e', outcome: 'bad', reward: { dengshen: 5, jinshen: 0 }, summary: '你独自行动错过了最佳时机，更多村民惨死。队友开始怀疑你的动机。' },
      { id: 'genesis_1_3e_alt', outcome: 'best', reward: { dengshen: 24, jinshen: 4 }, summary: `你用诞育之力净化了腐化之树——代价是你暂时失去了牧师能力。但诞育神亲手为你戴上了一枚"纯洁者"的徽章，这比任何天赋都珍贵。` }
    ]
  },

  /* === 生命命途 · 死亡 === */
  'death_1': {
    id: 'death_1',
    name: '守墓人的考验',
    god: 'death',
    path: '生命',
    difficulty: 'B',
    summary: '你站在一片无尽的墓园前。墓碑上刻着你认识的所有人的名字——包括你自己的。一位穿黑袍的守墓人告诉你：要通关，你必须从墓碑中选出一个"你最想让他活着的人"，但代价是你必须代替他死去。',
    objective: '在抉择中找到真正的活路（死亡的权柄并不只意味着结束）',
    scenes: [
      {
        title: '第一章 · 墓园',
        text: [
          '风穿过墓碑间的缝隙，发出像无数人低语的声音。',
          '你走过一排排墓碑，看到了熟悉的名字：方诗晴、陆沉、阿铭……',
          '还有——程实。',
          '"欢迎来到我的墓园。"守墓人的声音像从地底传来，"死亡的试炼，从来都很公平。"',
          '"规则很简单：选一个你想让他活的人。你代替他，成为这里的新守墓人。"',
          '你感觉到【死亡】的目光。祂在看你的选择。'
        ],
        choices: [
          { text: '选择陆沉', next: 'death_1_2a_mid', effects: { csTrust: 5 } },
          { text: '选择方诗晴', next: 'death_1_2b_mid', effects: { trust: 3 } },
          { text: '选择阿铭', next: 'death_1_2c_mid', effects: { trust: 0, doubt: 5 } },
          { text: '不选择，试图与死亡谈判', next: 'death_1_2d_mid', effects: { mpCost: 15 } },
          { text: '编造一个"更值得守护的人"并不存在', tag: 'lie', next: 'death_1_2e_mid', effects: { mpCost: 10 } },
          { text: '【队友·协作】让新队友们先商量一下——这关系到所有人', tag: 'collab', next: 'death_1_2d_mid', effects: { trust: 10, mpCost: 5 } }
        ]
      },
      {
        id: 'death_1_2a_mid',
        title: '陆沉的墓碑',
        text: [
          `你走向陆沉的墓碑。陆沉是队伍里最沉默的那一个——他几乎从不说话，但每次危险都会挡在你前面。`,
          `但在你伸手触碰之前——墓碑上浮现了一行你从未见过的小字：`,
          `"程实，你真的不记得我了吗？"`,
          `你愣住了。你不记得认识这个人……但为什么，他的墓碑让你感到一种莫名的悲伤？`,
          `守墓人在远处轻笑："有些关系，即使死亡也无法切断。但你选择遗忘了什么？"`
        ],
        choices: [
          { text: '我想知道——告诉我真相', next: 'death_1_3a_secret', effects: { csTrust: 10, fear: 5 } },
          { text: '不需要了。我的选择不会变。', next: 'death_1_3a', effects: { hpCost: 50 } }
        ]
      },
      {
        id: 'death_1_2b_mid',
        title: '方诗晴的墓碑',
        text: [
          `你站在方诗晴的墓碑前。奇怪的是——她的墓碑和其他人不一样。`,
          `它是温热的。`,
          `"有趣的选择。"守墓人说，"但你有没有想过——方诗晴她自己，愿不愿意被你这样选择？"`,
          `一个尖锐的问题。死亡在考验的不只是你的选择，还有——你的选择是否尊重了对方的意志。`
        ],
        choices: [
          { text: '她会的。因为我们是队友。', next: 'death_1_3c' },
          { text: '她值得活下去。不管她愿不愿意。', next: 'death_1_3d' },
          { text: '……因为我喜欢她。', next: 'death_1_3e' }
        ]
      },
      {
        id: 'death_1_2c_mid',
        title: '阿铭的真实',
        text: [
          `你选择了阿铭。但当你走到他墓碑前时，发现上面还有一行字：`,
          `"此碑下无人。——死亡留"`,
          `阿铭根本没死。他的墓碑是个假的。`,
          `守墓人看着你："你选了一个活人的墓碑。为什么？"`,
          `你突然意识到——阿铭可能就是这场试炼的设计参与者之一。`
        ],
        choices: [
          { text: '"因为我想看看——到底谁在操控这一切。"', next: 'death_1_3f', effects: { csTrust: 10 } },
          { text: '"随便选的。"', next: 'death_1_3g', effects: { doubt: 10 } },
          { text: '【队友·欺骗】说谎说"因为我知道他在伪装死亡"', tag: 'lie', next: 'death_1_3f', effects: { trust: -5, csTrust: -3, mpCost: 5 } }
        ]
      },
      {
        id: 'death_1_2d_mid',
        title: '谈判的筹码',
        text: [
          `你走向守墓人——不是为了选墓碑，而是为了谈判。`,
          `但你需要筹码。你有什么东西是死亡想要的？`,
          `死亡看着你："我什么都不缺。但你有一样东西——其他信徒很少有的：你有一个说谎的天赋。"`,
          `"你可以对死人说谎，让他们相信自己还活着。你愿意用这个能力，来"管理"我的墓园吗？"`
        ],
        choices: [
          { text: '答应：用谎言让死人被铭记', tag: 'lie', next: 'death_1_3h', effects: { mpCost: 20, csTrust: -5 } },
          { text: '拒绝：死亡不该被欺骗', next: 'death_1_3i', effects: { csTrust: 10 } },
          { text: '【队友·策略讨论】让队友出谋划策——怎么谈判才能最大化收益', tag: 'strategy', next: 'death_1_3i', effects: { trust: 8, mpCost: 10 } }
        ]
      },
      {
        id: 'death_1_2e_mid',
        title: '死亡的挑战',
        text: [
          `你试图用谎言逃避选择。死亡笑了。`,
          `"死亡不接受谎言。"祂说，"但如果你能让我相信——谎言在死亡面前也有意义……"`,
          `一个苛刻的条件。死亡本身就是"终结"的化身，你要怎么让祂相信谎言有意义？`,
          `但【欺诈】的核心理念就是"让谎言成真"。`
        ],
        choices: [
          { text: '讲述程实自己的故事：一个用谎言保护亲人的人', next: 'death_1_3j', effects: { mpCost: 25, csTrust: -5 } },
          { text: '【献往虚无的祭品】——编造"有人记得就不算真正死亡"', tag: 'talent', next: 'death_1_3k', effects: { mpCost: 30, csTrust: -10 } },
          { text: '【队友·欺骗】让队友配合你演戏——假装他们死后你用谎言让他们"活"过来了', tag: 'lie', next: 'death_1_3k', effects: { trust: -15, csTrust: -10, mpCost: 15 } }
        ]
      },
      {
        id: 'death_1_2a',
        allowLieTrigger: true,
        title: '陆沉',
        text: [
          '你走到陆沉的墓碑前。陆沉是队伍里最沉默的人，每次危险都会挡在你前面。',
          '"愿意为了他去死？"守墓人似笑非笑，"好孩子。但你确定——死亡真的能让他活过来吗？"',
          '"你知道的。死亡只是终结。如果他注定要在这里，你的牺牲……毫无意义。"',
          '你愣住了。死亡说的对。你愿意为一个队友死，但如果死亡不能复活他，你的选择就是纯粹的自我毁灭。',
          '【死亡】在考验你的情感深度，还是在考验你的理性？'
        ],
        choices: [
          { text: '依然选择牺牲自己', next: 'death_1_3a', effects: { hpCost: 50 } },
          { text: '转身寻找其他出路', next: 'death_1_3b' }
        ]
      },
      {
        id: 'death_1_2b',
        title: '方诗晴',
        text: [
          '方诗晴是你队伍中最聪明的存在，【真理】的信徒。',
          '"选择队友？"守墓人挑眉，"你们的友谊，值得一条命？"',
          '你意识到守墓人在观察你。死亡不在乎你选谁，但在乎——你为什么选。',
          '你的理由，决定了这个选择的"质量"。'
        ],
        choices: [
          { text: '"她比我更有用，这个队伍需要她。"', next: 'death_1_3c' },
          { text: '"朋友之间，本就该互相牺牲。"', next: 'death_1_3d' },
          { text: '"因为……我喜欢她。"', next: 'death_1_3e' }
        ]
      },
      {
        id: 'death_1_2c',
        title: '阿铭',
        text: [
          '阿铭是个身份存疑的【秩序】信徒，有时候你分不清他是敌是友。',
          '"有趣。"守墓人眼中闪过一丝异色，"你选了一个可能会在背后捅你刀子的人。为什么？"',
          '你感觉到【死亡】的注意力被吸引了。这个选择，似乎出乎祂的意料。'
        ],
        choices: [
          { text: '"因为我想知道，如果换成他，他会不会选我。"', next: 'death_1_3f' },
          { text: '"随便选的，凑数。"', next: 'death_1_3g', effects: { doubt: 10 } }
        ]
      },
      {
        id: 'death_1_2d',
        title: '谈判',
        text: [
          '"死亡并非只能单向终结。"你说，"你是生命命途的一员，死亡是生命循环的一部分——你可以收割，也可以返还。"',
          '守墓人沉默了。风停了一瞬，所有墓碑上的照片都微微亮了一下。',
          '"有意思。"祂说，"很久没有人注意到这一点了。那你想怎么谈？"',
          '【死亡】给了你谈判的机会——这已经是巨大的信任。'
        ],
        choices: [
          { text: '"让所有人都活下去，我可以帮你管理墓园（用谎言让"死人"被铭记）。"', tag: 'lie', next: 'death_1_3h', effects: { mpCost: 20 } },
          { text: '"让我用另一种方式"代替"——比如，我来做你的信使，把死亡的意义传递给活人。"', next: 'death_1_3i' }
        ]
      },
      {
        id: 'death_1_2e',
        title: '谎言挑战',
        text: [
          '"我编不出来。"守墓人说，"死亡不接受谎言。"',
          '祂顿了顿，又说："但如果你能让我相信——谎言在死亡面前也有意义……"',
          '你明白了。你必须编织一个关于"死亡之后仍有东西存在"的故事——并让【死亡】相信它。',
          '这几乎是不可能的任务。但【欺诈】的权柄，正是"让谎言成真"。'
        ],
        choices: [
          { text: '讲述程实自己的故事：一个用谎言保护亲人的人', next: 'death_1_3j', effects: { mpCost: 25, csTrust: -5 } },
          { text: '尝试【献往虚无的祭品】——编造"有人记得就不算真正死亡"', tag: 'talent', next: 'death_1_3k', effects: { mpCost: 30, csTrust: -10 } }
        ]
      },
      // 结果
      { id: 'death_1_3a', outcome: 'mid', reward: { dengshen: 10, jinshen: 2 }, summary: '死亡认可了你的情感，但批评了你的冲动。你失去了一半血量，但陆沉的墓碑裂开了一道缝。' },
      { id: 'death_1_3a_secret', outcome: 'best', reward: { dengshen: 28, jinshen: 4 }, summary: `你选择知道真相——陆沉不是自然死亡，他是为了把你从某个你不愿提起的深渊中拉出来，主动拥抱了死亡。但你选择了遗忘，把这段记忆封印了起来。死亡被这个故事感动了："原来被遗忘的爱，比被记住的更重。"祂不仅让陆沉活了，还给了你一个"死亡见证者"的称号。` },
      { id: 'death_1_3b', outcome: 'good', reward: { dengshen: 16, jinshen: 2 }, summary: '你找到了第三选择——不牺牲任何人。死亡欣赏了你的智慧。' },
      { id: 'death_1_3c', outcome: 'mid', reward: { dengshen: 8, jinshen: 1 }, summary: '理性的理由让死亡有些失望——她想要的是真心。' },
      { id: 'death_1_3d', outcome: 'good', reward: { dengshen: 18, jinshen: 3 }, summary: '死亡看到了你的诚意。方诗晴的墓碑开始发光。' },
      { id: 'death_1_3e', outcome: 'best', reward: { dengshen: 22, jinshen: 3 }, summary: '最不理性的回答最打动了死亡。祂说："死亡不消灭爱，它只是让爱更清晰。"所有墓碑都亮了。' },
      { id: 'death_1_3f', outcome: 'good', reward: { dengshen: 15, jinshen: 2 }, summary: '死亡欣赏了你的坦诚与勇气。阿铭的墓碑微微倾斜——似乎在感激你的选择。' },
      { id: 'death_1_3g', outcome: 'bad', reward: { dengshen: 4, jinshen: 0 }, summary: '死亡看穿了你的敷衍，直接给了低分。' },
      { id: 'death_1_3h', outcome: 'best', reward: { dengshen: 25, jinshen: 3 }, summary: '你用谎言赋予了死亡新的意义。【死亡】大笑："原来死亡也能被愚弄！我喜欢！"这是死亡第一次露出欣赏的表情。' },
      { id: 'death_1_3i', outcome: 'good', reward: { dengshen: 18, jinshen: 3 }, summary: '死亡接受了你的提议。你成为了死亡与活人之间的信使。' },
      { id: 'death_1_3j', outcome: 'good', reward: { dengshen: 20, jinshen: 3 }, summary: '你讲出了自己最真实的故事，打动了死亡。虽然用了谎言的形式，但内核是真的。' },
      { id: 'death_1_3k', outcome: 'best', reward: { dengshen: 30, jinshen: 3 }, summary: '【献往虚无的祭品】发动！"只要有人记得，就不算真正死亡"这句话，竟然在死亡的领域中被承认为真！所有墓碑上的名字开始流动，活着的人，继续活下去。【死亡】第一次被彻底震撼。' }
    ]
  },

  /* === 虚无命途 · 欺诈 === */
  'fraud_1': {
    id: 'fraud_1',
    name: '小丑的试炼',
    god: 'fraud',
    path: '虚无',
    difficulty: 'A',
    summary: '你被关在一个巨大的剧院里。台上正在上演一出戏剧，而你——是剧中的反派。但问题是，你根本不知道自己在演什么。你需要在不破坏剧情的前提下，找到属于自己的"剧本"，然后……改写它。',
    objective: '在戏剧中找到自己的身份，并改写结局',
    scenes: [
      {
        title: '第一章 · 剧院',
        text: [
          '红色的天鹅绒幕布低垂，舞台灯光明灭不定。',
          '你站在台侧，穿着一件华丽的小丑服——但你不记得自己是谁。',
          '舞台上，一位"王子"正在和"公主"对话。台下坐着的，是无数戴着面具的观众。',
          '一个尖细的声音在你耳边响起："哦不，剧本好像丢了……你能自己编一个吗？"',
          '【欺诈】的试炼，从来都不简单。'
        ],
        choices: [
          {
            text: '走上舞台，即兴发挥',
            next: 'fraud_1_2a'
          },
          {
            text: '在后台寻找剧本的线索',
            next: 'fraud_1_2b'
          },
          {
            text: '先观察王子和公主的表演',
            next: 'fraud_1_2c'
          }
        ]
      },
      {
        id: 'fraud_1_2a',
        allowLieTrigger: true,
        title: '即兴登场',
        text: [
          '你走上舞台，全场灯光集中在你身上。王子和公主停下了对话，看向你。',
          '"这位是……？"王子皱眉。',
          '你必须立刻编出一个合理的身份。但更重要的是——你要让它"合理"到让所有人相信。',
          '这是【欺诈】权柄的核心：谎言不仅要听起来像真的，还要让人们愿意相信它是真的。'
        ],
        choices: [
          {
            text: '"我是……王子的孪生兄弟！我被关在地下室多年！"',
            tag: 'lie',
            next: 'fraud_1_3a',
            effects: { mpCost: 15 }
          },
          {
            text: '"我是观众席上的一员，我买票来看戏，但我想改变剧情。"',
            next: 'fraud_1_3b',
            effects: { mpCost: 20, csTrust: -5 }
          },
          {
            text: '直接不说话，开始跳一段即兴舞蹈',
            next: 'fraud_1_3c'
          }
        ]
      },
      {
        id: 'fraud_1_2b',
        title: '寻找真相',
        text: [
          '后台一片混乱，道具散落一地。你在一堆剧本中翻找……',
          '"给你。"一个戴着面具的小女孩出现，递给你一本空白剧本。',
          '"你的剧本是空白的。"她说，"因为【欺诈】不写剧本。你来写。"',
          '空白剧本。这既是最大的自由，也是最大的考验——你必须从零开始构建自己的存在。'
        ],
        choices: [
          {
            text: '翻开空白剧本，开始书写',
            next: 'fraud_1_3d'
          },
          {
            text: '问小女孩她是谁',
            next: 'fraud_1_3e',
            effects: { trust: 5 }
          }
        ]
      },
      {
        id: 'fraud_1_2c',
        title: '旁观者',
        text: [
          '你观察了五分钟。王子和公主的表演程式化得可怕——每一句台词、每一个手势，都像是排练了千百遍。',
          '但你注意到了异样：',
          '王子看公主的眼神里没有爱意，只有……无奈？',
          '而公主的手指一直在颤抖。',
          '他们也不喜欢自己的"剧本"。',
          '这不是一出王子公主的爱情戏——这是一出【所有人都想逃离却逃不掉】的禁锢戏。'
        ],
        choices: [
          {
            text: '走上舞台，给王子和公主一个选择',
            next: 'fraud_1_3f',
            effects: { trust: 10, mpCost: 10 }
          },
          {
            text: '走上舞台，扮演"打破第四面墙"的角色',
            next: 'fraud_1_3g',
            effects: { mpCost: 25 }
          }
        ]
      },
      // 结果
      { id: 'fraud_1_3a', outcome: 'good', reward: { dengshen: 18, jinshen: 3 }, summary: '你的谎言让所有人都"自愿"相信了。甚至王子本人也开始怀疑自己是不是真的有个孪生兄弟。欺诈神哈哈大笑了三声，笑声里全是兴致——祂很久没看过这么好笑的戏码了。' },
      { id: 'fraud_1_3b', outcome: 'mid', reward: { dengshen: 10, jinshen: 2 }, summary: '诚实不适合欺诈的试炼。你只得到了及格分。' },
      { id: 'fraud_1_3c', outcome: 'best', reward: { dengshen: 25, jinshen: 3 }, summary: '你用舞蹈代替语言，反而达到了最好的效果。所有人都被你的表演吸引，甚至忘记了在"演戏"。欺诈神说："最好的谎言，是让人们分不清现实与虚构。"' },
      { id: 'fraud_1_3d', outcome: 'good', reward: { dengshen: 15, jinshen: 2 }, summary: '你写出了自己的剧本。空白的纸也能变成故事——这本身就是一种欺诈。' },
      { id: 'fraud_1_3e', outcome: 'best', reward: { dengshen: 22, jinshen: 3 }, summary: '小女孩摘下了面具——是小时候的你自己。欺诈神给了你最温暖的试炼：让你与过去的自己和解。' },
      { id: 'fraud_1_3f', outcome: 'best', reward: { dengshen: 30, jinshen: 3 }, summary: '你不仅找到了自己的角色，还给所有人提供了选择。欺诈神说：「真正的谎言大师，不是欺骗别人，而是给所有人一个更好的『现实』。」' },
      { id: 'fraud_1_3g', outcome: 'good', reward: { dengshen: 20, jinshen: 3 }, summary: '你打破了第四面墙，让观众意识到自己也在看戏。剧院崩塌了，但所有人都获得了自由。' }
    ]
  },

  /* === 混沌命途 · 混乱 === */
  'chaos_1': {
    id: 'chaos_1',
    name: '身份互换',
    god: 'chaos',
    path: '混沌',
    difficulty: 'C',
    summary: '一个混乱神的试炼：你和你的队友身份被随机互换。你可能变成了【污堕】的信徒，队友可能变成了【秩序】的信徒。更糟糕的是，如果你"扮演不好"新身份，就会被混乱神惩罚。',
    objective: '在身份互换的混乱中生存下来，同时想办法换回身份',
    scenes: [
      {
        title: '第一章 · 醒来',
        text: [
          '你睁开眼，发现自己穿着黑袍，房间里挂满了尖叫的人脸图腾。',
          '你摸了摸自己的脸——没有小丑面具，取而代之的是一个扭曲的笑面。',
          '"哦？"一个陌生的声音从你嘴里发出，"看来互换成功了。"',
          '你打开状态面板，惊恐地看到：信仰从【欺诈】变成了【污堕】，职业从【小丑牧师】变成了【尖啸伯爵】！',
          '混乱神的试炼开始了。'
        ],
        choices: [
          { text: '尝试用"混乱扮演法"适应新身份', tag: 'talent', next: 'chaos_1_2a', effects: { mpCost: 10 } },
          { text: '大声呼救，试图换回身份', next: 'chaos_1_2b', effects: { mpCost: 5 } },
          { text: '冷静观察，看能否找到换回身份的线索', next: 'chaos_1_2c', effects: { trust: 3 } }
        ]
      },
      {
        id: 'chaos_1_2a',
        title: '新身份扮演',
        text: [
          '你尝试用"混乱扮演法"调整状态。片刻后，你开口说话时，声音、语气、甚至神情都完全符合【污堕】信徒的样子。',
          '"不错。"一个声音响起——是你原身的队友阿铭，他现在穿着黑袍，是【秩序】信徒。',
          '"看来混乱神想玩一场……扮演游戏。"阿铭冷冷道，"我的身份是秩序骑士，你的是尖啸伯爵。如果我们的角色在对应信仰的NPC面前『扮演失败』，就会受到惩罚。"',
          '一场身份扮演的考验。你必须骗过所有NPC。'
        ],
        choices: [
          { text: '继续深入扮演，让自己彻底相信新身份', next: 'chaos_1_3a', effects: { csTrust: -10, mpCost: 15 } },
          { text: '表面扮演，内心保持清醒', next: 'chaos_1_3b', effects: { mpCost: 5 } }
        ]
      },
      {
        id: 'chaos_1_2b',
        title: '混乱的惩罚',
        text: [
          '"换回来！"你大喊。但你的声音是【污堕】信徒的声音，听起来像在威胁。',
          '房间开始扭曲变形，墙面上浮现出嘲笑的人脸。',
          '"哦？有人不满意？"混乱神的声音，"身份互换才刚刚开始哦~"',
          '一阵眩晕后，你发现自己又变了——这次是【诞育】信徒。'
        ],
        choices: [
          { text: '这次先适应再说', next: 'chaos_1_2c' }
        ]
      },
      {
        id: 'chaos_1_2c',
        title: '冷静观察',
        text: [
          '你注意到墙上有一行小字（只有用欺诈之眼才能看到）：「想换回身份？找到混乱神的『规则漏洞』。」',
          '规则漏洞。混乱神的试炼，必然有漏洞。因为混乱的本质就是没有绝对的规则。',
          '你开始观察——每次你尝试"变回自己"，都会被再次变换身份。但如果你"拒绝扮演任何身份"呢？'
        ],
        choices: [
          { text: '拒绝扮演任何身份，做"没有身份的程实"', next: 'chaos_1_3c' },
          { text: '尝试同时扮演多个身份', next: 'chaos_1_3d', effects: { mpCost: 30 } }
        ]
      },
      // 结果
      { id: 'chaos_1_3a', outcome: 'bad', reward: { dengshen: 5, jinshen: 0 }, summary: '你入戏太深，差点忘记自己是谁。欺诈天赋也无法使用。混乱神警告你不要被新身份吞噬。' },
      { id: 'chaos_1_3b', outcome: 'mid', reward: { dengshen: 12, jinshen: 2 }, summary: '你在表面扮演与内心自我之间找到了平衡。虽然没换回身份，但通过了考验。' },
      { id: 'chaos_1_3c', outcome: 'best', reward: { dengshen: 25, jinshen: 3 }, summary: '当你拒绝所有身份标签时——混乱神的试炼崩解了。因为混乱无法定义"无身份"的状态。你用"我就是我"打败了混乱的规则。' },
      { id: 'chaos_1_3d', outcome: 'good', reward: { dengshen: 18, jinshen: 3 }, summary: '同时扮演多个身份让混乱神陷入混乱——祂的试炼程序处理不了这种情况。你虽然精神力耗尽，但换回了自己的身份。' }
    ]
  },

  /* === 虚无命途 · 命运 === */
  'fate_1': {
    id: 'fate_1',
    name: '命运骰子',
    god: 'fate',
    path: '虚无',
    difficulty: 'B',
    summary: '一个无限大的骰子桌。命运神丢给你一枚骰子，说："掷出1点，你可以通关；掷出6点，你和队友一起死。其余点数，看运气。"但这枚骰子是被命运加权的——你永远不知道实际概率。',
    objective: '通过智慧或天赋，破解命运骰子的谜题',
    scenes: [
      {
        title: '第一章 · 命运的骰子',
        text: [
          '巨大的骰桌悬浮在虚空中，命运之神【命运】编织的命运之网在你头顶闪烁。',
          '一枚金色骰子滚到你面前，上面刻着命运符文。',
          '【命运】的声音像无数人在同时说话："掷吧，程实。1点通关，6点团灭。其余……你自己看着办。"',
          '你拿起骰子——触感冰冷。你不确定这是"真正的随机"，还是命运早已写下的剧本。'
        ],
        choices: [
          { text: '直接掷骰子', next: 'fate_1_2a' },
          { text: '用命运之骰（道具）替换命运神的骰子', tag: 'talent', next: 'fate_1_2b', effects: { mpCost: 5 } },
          { text: '尝试与命运神谈判，改变规则', next: 'fate_1_2c', effects: { mpCost: 10 } }
        ]
      },
      {
        id: 'fate_1_2a',
        title: '盲掷',
        text: [
          '你深吸一口气，掷下骰子。——3点。',
          '命运神没有说话，但骰桌上浮现出一张纸条："3点——你将失去一位队友的信任。"',
          '旁边的阿铭冷冷地看了你一眼。'
        ],
        choices: [
          { text: '再掷一次，也许运气会变好', next: 'fate_1_2d', effects: { doubt: 10 } },
          { text: '停下，接受这次结果', next: 'fate_1_3a', effects: { trust: -5, doubt: 5 } }
        ]
      },
      {
        id: 'fate_1_2b',
        title: '命运之骰',
        text: [
          '你从背包取出自己的【命运之骰】。与命运神的骰子对上——金色符文开始共鸣。',
          '"哦？你也有骰子？"命运神似乎来了兴致，"那就用你的骰，掷出什么就是什么。"',
          '你集中精神，将【命运之骰】的权柄注入骰子——你不要"好运"，你要"选择"。',
          '骰子落下：6点？不！在落地的最后一刻，它翻了个面——1点！',
          '命运神笑了："用自己的命运权柄反抗命运，有意思。"'
        ],
        choices: [
          { text: '接受这个结果', next: 'fate_1_3b', effects: { mpCost: 20 } }
        ]
      },
      {
        id: 'fate_1_2c',
        title: '谈判',
        text: [
          '「命运，」你说，「我知道你不是来『测试』我的。你想让我做你的信徒，对吧？」',
          '沉默了很久。然后——',
          '"聪明的孩子。"命运神的声音柔和了，"我观察你很久了。你有欺诈天赋，但骨子里……你相信命运。"',
          '"我的条件很简单：掷骰子。但这次，你可以选择——『相信命运』或者『反抗命运』。无论你选哪个，结果都是你自己的。"',
          '你听懂了——这不是骰子的游戏，这是信仰的选择。'
        ],
        choices: [
          { text: '"我相信命运，所以我接受它的安排。"', next: 'fate_1_3c' },
          { text: '"我反抗命运，因为我相信的是自己。"', next: 'fate_1_3d' }
        ]
      },
      // 结果
      { id: 'fate_1_2d', outcome: 'bad', reward: { dengshen: -3, jinshen: 0 }, summary: '第二次掷出了5点——你被"注定"会失去一位队友。阿铭消失了。混乱神趁机介入了试炼。' },
      { id: 'fate_1_3a', outcome: 'mid', reward: { dengshen: 8, jinshen: 1 }, summary: '你接受了命运，但这让命运神有些失望——你没展现出反抗的精神。' },
      { id: 'fate_1_3b', outcome: 'best', reward: { dengshen: 25, jinshen: 3 }, summary: '你用命运天赋破解了命运的设定。命运神给了你最高评价："你理解了命运的真正含义——它不是枷锁，是选择的权利。"' },
      { id: 'fate_1_3c', outcome: 'good', reward: { dengshen: 18, jinshen: 2 }, summary: '命运神对你的顺从给予了认可，但也略微失望——祂更喜欢有反抗精神的信徒。' },
      { id: 'fate_1_3d', outcome: 'best', reward: { dengshen: 30, jinshen: 3 }, summary: '"反抗命运的选择，本身就是命运的一部分。"命运神大笑，骰桌崩解，你获得了命运的专属赐福！' }
    ]
  },

  /* === 沉沦命途 · 腐朽 === */
  'decay_1': {
    id: 'decay_1',
    name: '衰败之镇',
    god: 'decay',
    path: '沉沦',
    difficulty: 'B',
    summary: '一座原本繁荣的小镇，在一夜之间开始衰败。建筑风化，植物枯萎，人类衰老。所有人都在快速腐朽，只有你没有——但你能感觉到，腐朽正在等待你的选择。',
    objective: '找出腐朽的源头，并阻止衰败蔓延',
    scenes: [
      {
        title: '第一章 · 衰败',
        text: [
          '风一吹，街道上的墙皮就簌簌往下掉。曾经碧绿的街道树只剩下光秃秃的枝干，叶片一碰就碎成粉末。',
          '镇上的人都老了十岁不止，佝偻着身子行走，皮肤上布满老年斑。',
          '但最诡异的是——你完好无损。你身上没有一丝腐朽的痕迹。',
          '一位老人颤颤巍巍地抓住你："救……救救我们……神……神说我们有罪……这是惩罚……"',
          '【腐朽】的权柄。一座小镇被整个拖入了腐朽试炼。'
        ],
        choices: [
          { text: '尝试治疗村民，遏制腐朽蔓延', next: 'decay_1_2a', effects: { mpCost: 25 } },
          { text: '调查镇上的神庙', next: 'decay_1_2b' },
          { text: '去小镇边缘看衰败的边界', next: 'decay_1_2c' }
        ]
      },
      {
        id: 'decay_1_2a',
        title: '治疗无效',
        text: [
          '你用尽治疗之力，却无济于事。腐朽不是"病"，是【腐朽】神的权柄——权柄无法被治疗驱散。',
          '但你注意到：治疗之力能短暂延缓腐朽的速度。',
          '"不够……"你意识到，"必须从源头解决。"'
        ],
        choices: [
          { text: '继续寻找源头', next: 'decay_1_2b' }
        ]
      },
      {
        id: 'decay_1_2b',
        title: '神庙的秘密',
        text: [
          '小镇中心，有一座腐朽的神庙。虽然庙体破败不堪，但你能感觉到强大的权柄气息。',
          '神庙中央，有一口巨大的铜棺。棺盖微微敞开，里面是……',
          '一位活着的、年轻的、美丽的女子。她看起来什么都没有变，甚至比常人更美丽。',
          '但你走近一看——她的手指正在缓慢地，一寸一寸地，变成枯骨。',
          '"你来了……"女子睁开眼睛，"我就是这座小镇的『源头』。他们献祭了我给【腐朽】，换来了暂时的繁荣。现在我要让他们一起腐朽。"'
        ],
        choices: [
          { text: '帮她从铜棺中解放出来', next: 'decay_1_3a', effects: { trust: 10, mpCost: 15 } },
          { text: '尝试劝她停止腐朽', next: 'decay_1_3b' },
          { text: '编造一个谎言，说【腐朽】已经放弃了她', tag: 'lie', next: 'decay_1_3c', effects: { mpCost: 20 } }
        ]
      },
      {
        id: 'decay_1_2c',
        title: '边界',
        text: [
          '你走到小镇边缘，看到了惊人的一幕——衰败像一幅画被人从外向内涂抹，边界正在缓慢移动。',
          '而边界之外——是【繁荣】的权柄笼罩之地。生机勃勃，与衰败截然相反。',
          '这不是一场独立的试炼。这是【腐朽】和【繁荣】的权柄在对抗！',
          '你必须选择——帮助哪一边？还是……在两边之间找到平衡？'
        ],
        choices: [
          { text: '帮助腐朽加速衰败（黑暗选择）', next: 'decay_1_3d', effects: { trust: -20, csTrust: -10 } },
          { text: '帮助繁荣遏制衰败', next: 'decay_1_3e', effects: { trust: 15 } },
          { text: '在两者之间找到平衡', next: 'decay_1_3f', effects: { trust: 5, mpCost: 20 } }
        ]
      },
      // 结果
      { id: 'decay_1_3a', outcome: 'good', reward: { dengshen: 15, jinshen: 2 }, summary: '她解脱后，腐朽停止蔓延，但她的死亡让部分村民也跟着消亡。' },
      { id: 'decay_1_3b', outcome: 'mid', reward: { dengshen: 10, jinshen: 1 }, summary: '你的劝说未能打动她。但至少你没让情况更糟。' },
      { id: 'decay_1_3c', outcome: 'best', reward: { dengshen: 25, jinshen: 3 }, summary: '你用谎言让她相信【腐朽】已经抛弃了她——她失去了神的权柄，腐朽停止了。你又一次用欺诈破解了试炼。' },
      { id: 'decay_1_3d', outcome: 'bad', reward: { dengshen: 3, jinshen: 0 }, summary: '队友集体反对你的选择。即使通关，你也失去了他们的信任。' },
      { id: 'decay_1_3e', outcome: 'mid', reward: { dengshen: 12, jinshen: 1 }, summary: '你帮繁荣遏制了衰败。但【腐朽】神给你留了下一次报复的机会。' },
      { id: 'decay_1_3f', outcome: 'best', reward: { dengshen: 22, jinshen: 3 }, summary: '你证明了腐朽与繁荣并非对立——而是生命循环的两面。两位神明同时给你打出了高分！' }
    ]
  },

  /* === 存在命途 · 时间循环（新增） === */
  'time_loop_1': {
    id: 'time_loop_1',
    name: '永恒的十月七日',
    god: 'time',
    path: '存在',
    difficulty: 'A',
    summary: '你醒来时发现，时钟永远停在了十月七日的早上八点。你已经在这一天度过了一千次——每一次都以死亡告终。时间神看着你重复，像是在看一出永不停歇的戏。',
    objective: '找到打破循环的条件，从永恒的同一天中逃脱',
    scenes: [
      {
        title: '第一天 · 第八千七百二十三次',
        text: [
          '闹钟准时响了。八点整。窗外的阳光角度和昨天一模一样——和八百七十二天前一模一样。',
          '你已经记得每一个细节：陆沉会在走廊和你擦肩而过，宋义会打翻早餐咖啡，那个穿灰色外套的男人会在九点十五分准时从街角走过三次。',
          '而每一次循环的终点，都是那声枪响。',
          '这一次，你决定不再等枪响。',
          '但更重要的是——你要弄清楚，到底是谁，把你困在了这一天。'
        ],
        choices: [
          { text: '先和队友们商量——分享循环信息，制定逃生计划', next: 'tl_1_2a', effects: { trust: 8, doubt: 0, csTrust: 5 } },
          { text: '假装这是第一天，暗中观察谁也被困住了', next: 'tl_1_2b', effects: { trust: -5, doubt: 10, csTrust: -3 } },
          { text: '单独行动，去见那个穿灰外套的男人', next: 'tl_1_2c', effects: { mpCost: 10 } },
          { text: '【队友·支援】先给陆沉补满状态再出发', tag: 'support', next: 'tl_1_2a', effects: { mpCost: 8, trust: 3 } },
          { text: '【队友·欺骗】假装你已经找到出口，带队友去踩你已知的陷阱', tag: 'lie', next: 'tl_1_2d', effects: { trust: -20, doubt: 25, csTrust: -15, mpCost: 15 } }
        ]
      },
      {
        id: 'tl_1_2a', title: '集体推理',
        text: [
          '你把循环的事告诉了队友。一开始没人信你——直到你准确说出宋义会在三分钟后打翻咖啡。',
          '咖啡翻了。全员沉默。',
          '陆沉第一个开口："我也记得……有一次我好像也经历了这一天。但只有一次，然后就忘了。"',
          '宋义开始计算："如果每个人都保留了一次循环的记忆，那我们可以拼出打破循环的条件……"',
          '但角落里，那个沉默的队友却始终一言不发地盯着你。'
        ],
        choices: [
          { text: '让每个人说出自己记得的那一次循环', next: 'tl_1_3a', effects: { trust: 10 } },
          { text: '逼问那个沉默的队友在隐藏什么', next: 'tl_1_3b', effects: { trust: -5, doubt: 8 } },
          { text: '【队友·策略讨论】集体推演：谁有能力操纵时间？', tag: 'strategy', next: 'tl_1_3c', effects: { trust: 5, mpCost: 5 } }
        ]
      },
      {
        id: 'tl_1_2b', title: '独自观察',
        text: [
          '你装作一切正常，像每一次循环的第一天一样。',
          '但这一次你注意到了一个细节——灰外套男人第三次走过街角时，脚步和前两次有微妙的不同。',
          '你跟踪他到了巷子里，他突然转身："你应该已经死了上千次了。你还没发现这个循环的规律吗？"',
          '他笑了笑。"打破循环的方法，就是——有人自愿永远留在这一天。"'
        ],
        choices: [
          { text: '问他是谁，为什么知道这一切', next: 'tl_1_3d', effects: { csTrust: 3 } },
          { text: '立刻动手制服他，打破循环', next: 'tl_1_3e', effects: { hpCost: 20 } },
          { text: '说谎："我已经找到替代者了。不是我留下来。"', tag: 'lie', next: 'tl_1_3f', effects: { trust: -10, csTrust: -8, mpCost: 20 } }
        ]
      },
      {
        id: 'tl_1_2c', title: '灰外套的秘密',
        text: [
          `你来到了街角。灰外套男人已经在等你。`,
          `"终于舍得来了？"他推了推眼镜，"每次循环，你都是选『和队友商量』然后一起死。这次单刀赴会，有意思。"`,
          `他告诉你：时间神已经厌倦了这场游戏。只要有一个人自愿成为"锚点"留在这一天，其他人就能出去。`,
          `"你可以让你的某个队友来当锚点。或者……你自己选。"`
        ],
        choices: [
          { text: '【队友·欺骗】撒谎说"陆沉自愿留下"，骗陆沉当锚点', tag: 'lie', next: 'tl_1_2d', effects: { trust: -25, doubt: 30, csTrust: -20 } },
          { text: '让灰外套把条件告诉队友，民主投票', next: 'tl_1_3a', effects: { trust: 5 } },
          { text: '你自己自愿当锚点', next: 'tl_1_3g', effects: { hpCost: 50, csTrust: 10 } }
        ]
      },
      { id: 'tl_1_2d', outcome: 'bad', reward: { dengshen: 5, jinshen: 0 }, summary: '你骗了队友。但灰外套并不打算帮你——他只是想看你怎么自食其果。' },
      { id: 'tl_1_3a', outcome: 'good', reward: { dengshen: 18, jinshen: 2 }, summary: '队友们投票决定让一个最接近时间神信仰的人留下。民主的代价是痛苦的。' },
      { id: 'tl_1_3b', outcome: 'mid', reward: { dengshen: 12, jinshen: 1 }, summary: '沉默的队友确实藏着秘密——他就是时间神的信徒。逼得太紧，他反水了。' },
      { id: 'tl_1_3c', outcome: 'best', reward: { dengshen: 28, jinshen: 4 }, summary: '你们推演出了时间神的真正意图——祂在选继承者。你让陆沉伪装成时间信徒，把"锚点"推给了时间神自己。绝妙的欺诈。' },
      { id: 'tl_1_3d', outcome: 'good', reward: { dengshen: 15, jinshen: 2 }, summary: '灰外套告诉你他是上一场试炼的幸存者。他已经在这一天循环了三千年。' },
      { id: 'tl_1_3e', outcome: 'bad', reward: { dengshen: 2, jinshen: 0 }, summary: '你制服了他。但他消失了——留下一句话：循环不会因为你杀了一个使者就停止。' },
      { id: 'tl_1_3f', outcome: 'mid', reward: { dengshen: 10, jinshen: 1 }, summary: '灰外套相信了你的谎言。但你把队友推进了火坑，信任彻底破产。' },
      { id: 'tl_1_3g', outcome: 'best', reward: { dengshen: 30, jinshen: 5 }, summary: '你自愿成为锚点。时间神愣了一下——祂见过无数试图逃脱的信徒，但从未见过主动留下的。祂给了你最大的尊重。' }
    ]
  },

  /* === 虚无命途 · 沉默禁闭（新增） === */
  'silence_1': {
    id: 'silence_1',
    name: '无声之牢',
    god: 'silence',
    path: '混沌',
    difficulty: 'B',
    summary: '你被关进了一间完全隔音的石牢。没有光，没有声音，连自己的呼吸都像被人捂住了嘴。沉默神正在审视你——你能用多长时间打破沉默？',
    objective: '在完全无声的环境中保持自我认知，找到与沉默神沟通的方式',
    scenes: [
      {
        title: '石牢 · 第一小时',
        text: [
          '门关上了。然后是一片绝对的寂静。',
          '你能听到自己的心跳——咚、咚、咚——但甚至连心跳声都在逐渐远去，像是被这间石牢吞噬了。',
          '沉默神的信徒不需要声音。但你是【欺诈】信徒——你靠谎言和话术生存。',
          '没有声音，你甚至不能对自己说谎。'
        ],
        choices: [
          { text: '尝试说话——哪怕只能听见自己的声音', next: 'sil_1_2a', effects: { mpCost: 5, csTrust: 3 } },
          { text: '安静等待——观察沉默神的真正意图', next: 'sil_1_2b', effects: { csTrust: 5 } },
          { text: '【队友·协作】用摩斯密码敲击墙壁，看队友是否也被关在附近', tag: 'collab', next: 'sil_1_2c', effects: { trust: 8, mpCost: 8 } },
          { text: '【队友·欺骗】假装精神崩溃，让沉默神给你"安慰"——实则是陷阱', tag: 'lie', next: 'sil_1_2d', effects: { trust: -15, doubt: 18, mpCost: 12 } }
        ]
      },
      {
        id: 'sil_1_2a', title: '自言自语',
        text: [
          '你开始说话。第一声很轻，像是怕打破什么。然后你越说越大声。',
          '你给自己编故事：队友背叛了你、宋义是假的、神明其实是AI……',
          '说到第八十七个谎言时，你听到了回应——不是墙那边，而是你自己的嘴里。',
          '那个声音，像是另外一个人。"你还没说完吗？"'
        ],
        choices: [
          { text: '和那个声音对话', next: 'sil_1_3a', effects: { fear: 15, mpCost: 10 } },
          { text: '闭嘴，这是幻觉', next: 'sil_1_3b', effects: { csTrust: 3 } }
        ]
      },
      {
        id: 'sil_1_2b', title: '观察',
        text: [
          '你一动不动地坐在黑暗中，什么都不做。',
          '渐渐地，你感觉到——石牢的温度变了。某处，有极其微弱的脉搏声。',
          '不是你的心跳。是这间石牢本身的心跳。',
          '沉默神不是"什么都不存在"，而是"不被注意的东西"。祂一直都在。'
        ],
        choices: [
          { text: '对那个脉搏声说："我听见你了"', next: 'sil_1_3c', effects: { csTrust: 8 } },
          { text: '保持沉默，让祂主动出现', next: 'sil_1_3d', effects: { csTrust: 5 } }
        ]
      },
      {
        id: 'sil_1_2c', title: '墙那边的回应',
        text: [
          '你开始有节奏地敲击墙壁。三短——三长——三短。SOS。',
          '等了很久——没有回应。你又敲了一次。',
          '终于，隔壁传来了敲击声。但不是SOS。是三个字母：Y-E-S。',
          '是的。什么？是的你也被关在这里？还是……另一个意思？',
          '然后，那面墙开始震动。"YES"的意思是——门已经开了。'
        ],
        choices: [
          { text: '推开那面墙出去', next: 'sil_1_3e', effects: { trust: 10 } },
          { text: '等一等——谁在对面？不是队友吧？', next: 'sil_1_3f', effects: { csTrust: 3, fear: 8 } }
        ]
      },
      { id: 'sil_1_2d', outcome: 'bad', reward: { dengshen: 3, jinshen: 0 }, summary: '沉默神不上当。你假装崩溃，但祂只是给了你真正的崩溃。' },
      { id: 'sil_1_3a', outcome: 'mid', reward: { dengshen: 10, jinshen: 1 }, summary: '那个声音是你自己的另一面。你对自己说谎太多了，多到分裂出了第二人格。' },
      { id: 'sil_1_3b', outcome: 'good', reward: { dengshen: 18, jinshen: 2 }, summary: '你拒绝了那个声音。沉默神给了你无声的尊重——你没有被自己的谎言吞噬。' },
      { id: 'sil_1_3c', outcome: 'best', reward: { dengshen: 25, jinshen: 3 }, summary: '沉默神被你听到了。祂从未被任何信徒真正"听到"过——直到现在。你的诚实（是的，哪怕你是欺诈信徒）打动了祂。' },
      { id: 'sil_1_3d', outcome: 'good', reward: { dengshen: 20, jinshen: 2 }, summary: '你用沉默回应沉默。这是沉默神最喜欢的交流方式——祂让你出去了。' },
      { id: 'sil_1_3e', outcome: 'mid', reward: { dengshen: 15, jinshen: 1 }, summary: '你冲出去了。但"YES"的意思可能不是"你可以走"——而是"我替你走了"。你不知道队友有没有变成沉默神的祭品。' },
      { id: 'sil_1_3f', outcome: 'best', reward: { dengshen: 28, jinshen: 4 }, summary: '你等了。墙那边走出来的，不是沉默神的信徒——是沉默神自己。祂对你说："你是第一个不对我撒谎的欺诈信徒。"' }
    ]
  },

  /* === 生命命途 · 繁荣交易（新增） === */
  'prosperity_trade_1': {
    id: 'prosperity_trade_1',
    name: '繁荣之商',
    god: 'prosperity',
    path: '生命',
    difficulty: 'C',
    summary: '繁荣神化身为一位神秘商人，在试炼中摆了一个摊位。你可以用任何东西交易——时间、记忆、信任、寿命。繁荣神从不欺骗你。但你要仔细看清价格标签。',
    objective: '在与繁荣神的交易中获得最大收益，同时保持自己的核心存在',
    scenes: [
      {
        title: '第一章 · 神秘的摊位',
        text: [
          `在一片虚无之中，突然出现了一个古色古香的摊位，挂着"繁荣之商"的木牌。`,
          '摊主是一个笑起来永远像在打折的男人。"欢迎欢迎！今天清仓大甩卖——你想要什么？"',
          '摊位上摆着各种奇异的商品：一袋记忆、一瓶信任、一卷寿命、一匣时间。',
          '"当然，"摊主笑了，"你得拿点什么来换。繁荣从不白给。"'
        ],
        choices: [
          { text: '交易：用自己的一段记忆换取全队满血复活', next: 'pt_1_2a', effects: { hpCost: 0, mpCost: 0 } },
          { text: '交易：用未来三年寿命换取所有队友的信任拉满', next: 'pt_1_2b', effects: { hpCost: 15, trust: 15 } },
          { text: '交易：用一个谎言换取下一场试炼的"上帝视角"（预知选项后果）', tag: 'lie', next: 'pt_1_2c', effects: { mpCost: 20, csTrust: -10 } },
          { text: '【队友·协作】让全队一起凑东西交易', tag: 'collab', next: 'pt_1_2d', effects: { trust: 10 } },
          { text: '不交易——繁荣神的东西必然有陷阱', next: 'pt_1_2e', effects: { csTrust: 5 } }
        ]
      },
      {
        id: 'pt_1_2a', title: '记忆交换',
        text: [
          '你交出了一段记忆。你选了哪一段？哦，你不记得了——因为它已经被换走了。',
          '队友们的伤口确实全部愈合了。但你突然发现——你忘了某个人。',
          '陆沉站在你面前，你看着他的脸，感到陌生。"我是陆沉啊……程实，你怎么了？"'
        ],
        choices: [
          { text: '假装没忘——"陆沉？当然记得。开什么玩笑。"', tag: 'lie', next: 'pt_1_3a', effects: { trust: -5, csTrust: -5, mpCost: 10 } },
          { text: '诚实承认："对不起……我真的不记得了。"', next: 'pt_1_3b', effects: { trust: 8, csTrust: 8 } }
        ]
      },
      {
        id: 'pt_1_2b', title: '寿命交换',
        text: [
          '你交出了三年寿命。感觉身体轻微虚弱了一下，但随即——',
          '队友们看着你的眼神变了。敌意没了，怀疑没了。取而代之的，是一种近乎崇拜的信任。',
          '但你注意到——摊主在你签完契约后笑了。那笑容和一开始不一样了。',
          '你付出的不是"三年"，而是"剩余寿命的百分之三十"。繁荣神从来不骗人——但你没仔细看价格标签。'
        ],
        choices: [
          { text: '接受代价，信任全队通关', next: 'pt_1_3c', effects: { hpCost: 30, trust: 20 } },
          { text: '【队友·欺骗】骗队友："我用的只是一段记忆，不是寿命。我们赚大了。"', tag: 'lie', next: 'pt_1_3d', effects: { trust: -15, csTrust: -15, doubt: 20 } }
        ]
      },
      {
        id: 'pt_1_2c', title: '上帝视角交易',
        text: [
          '你交出了一个谎言。繁荣神收下了——他本来只收实物，但谎言是你唯一能给的东西。',
          '下一场试炼的画面涌入你的脑海：所有选项，所有后果，清清楚楚。',
          '但你同时发现——你再也不会不知道的感觉了。一切都是已知的。试炼变成了走流程。',
          '这到底是奖励还是惩罚？'
        ],
        choices: [
          { text: '带着上帝视角继续试炼——稳了', next: 'pt_1_3e', effects: { csTrust: 5 } },
          { text: '把上帝视角分享给队友（部分）', next: 'pt_1_3f', effects: { trust: 8, mpCost: 10 } }
        ]
      },
      {
        id: 'pt_1_2d', title: '集体交易',
        text: [
          '你们全队凑出了一些零碎的东西：一根头发、一句承诺、一个名字、一滴血、一段沉默。',
          '摊主笑得合不拢嘴。"好！好！这个好！集体交易最划算！"',
          '你们得到了一整箱"随机祝福"。每个人从里面抽了一张。',
          '你抽到的那张写着："你将失去所有谎言能力——但从此你说的每句话都是真的。"'
        ],
        choices: [
          { text: '接受：从此不说谎', next: 'pt_1_3g', effects: { csTrust: 15, trust: 15, mpCost: 0 } },
          { text: '偷偷换一张——你还是想保留说谎的能力', next: 'pt_1_3h', effects: { trust: -10, csTrust: -10, doubt: 12 } }
        ]
      },
      { id: 'pt_1_2e', outcome: 'mid', reward: { dengshen: 10, jinshen: 1 }, summary: '你拒绝了交易。繁荣神给了你一个尊重的表情——然后试炼继续，没有惊喜也没有惩罚。' },
      { id: 'pt_1_3a', outcome: 'bad', reward: { dengshen: 5, jinshen: 0 }, summary: '你骗了所有人。但陆沉看你的眼神，知道你在说谎——哪怕他说不出为什么。' },
      { id: 'pt_1_3b', outcome: 'best', reward: { dengshen: 25, jinshen: 3 }, summary: '你诚实承认了遗忘。队友们反而更加信任你——一个敢说自己"不记得"的欺诈信徒，比任何满口谎言的都更真实。' },
      { id: 'pt_1_3c', outcome: 'mid', reward: { dengshen: 12, jinshen: 1 }, summary: '你用寿命换来了信任，全队齐心协力通关了。但你明显感觉到自己虚弱了很多。' },
      { id: 'pt_1_3d', outcome: 'bad', reward: { dengshen: 3, jinshen: 0 }, summary: '队友们从别人那里听到了真相。信任的崩塌比寿命的流失更致命。' },
      { id: 'pt_1_3e', outcome: 'good', reward: { dengshen: 20, jinshen: 2 }, summary: '你带着上帝视角通关。但游戏变成了读剧本——你开始怀念那些未知的紧张时刻。' },
      { id: 'pt_1_3f', outcome: 'best', reward: { dengshen: 28, jinshen: 4 }, summary: '你把未来分享给了队友。虽然他们只知道了部分答案，但这份信任让你们全队爆发出前所未有的默契。' },
      { id: 'pt_1_3g', outcome: 'best', reward: { dengshen: 30, jinshen: 5 }, summary: '你从此不说谎。一个欺诈信徒，放弃了说谎的权利。繁荣神站起来向你鞠了一躬——这是祂第一次对信徒低头。' },
      { id: 'pt_1_3h', outcome: 'mid', reward: { dengshen: 8, jinshen: 1 }, summary: '你换了一张祝福。但繁荣神显然看到了——你偷走的那张，后来变成了一个诅咒，在最关键的时刻发作。' }
    ]
  },

  /* === 沉沦命途 · 污堕 === */
  'defilement_1': {
    id: 'defilement_1',
    name: '恐魔来袭',
    god: 'defilement',
    path: '沉沦',
    difficulty: 'A',
    summary: '一群恐魔正在疯狂冲击你们的防线。这些【污堕】的产物以恐惧为食，越多人害怕它们就越强。你的队友已经陷入恐慌。作为欺诈牧师，你需要想办法让他们"不怕"——或者让恐魔"不那么可怕"。',
    objective: '击退恐魔大军',
    scenes: [
      {
        title: '第一章 · 恐魔突袭',
        text: [
          '夜色下，无数扭曲的身影从黑暗中爬出。它们有人类的形状，但每一个都长着多余的眼睛、牙齿和肢体。',
          '恐魔。【污堕】的造物，以恐惧为食。',
          '"它们越来越强了！"队友陈冲挥舞着斧头后退，"我越害怕，它们越凶！"',
          '更糟糕的是——你的精神力也在被侵蚀。恐魔的恐惧之力像潮水一样涌来。',
          '但你注意到了一个细节：恐魔之间也在互相……恐吓？它们好像也在"害怕"什么。'
        ],
        choices: [
          { text: '尝试为队友加持勇气和力量', tag: 'talent', next: 'defilement_1_2a', effects: { mpCost: 30 } },
          { text: '用谎言"让恐魔相信"它们自己才是猎物', tag: 'lie', next: 'defilement_1_2b', effects: { mpCost: 20 } },
          { text: '用骨仆戒指吸收恐惧能量', tag: 'talent', next: 'defilement_1_2c', effects: { mpCost: 10 } }
        ]
      },
      {
        id: 'defilement_1_2a',
        title: '勇气加持',
        text: [
          '你将治疗之力转化为勇气之光照耀全队。效果立竿见影——恐惧被压制，队友开始冷静下来。',
          '但恐魔的数量太多了，而且随着恐惧被压制，它们似乎开始……饥饿。',
          '恐魔发出愤怒的嘶吼，开始更疯狂地攻击。'
        ],
        choices: [
          { text: '继续加持勇气，硬抗', next: 'defilement_1_3a', effects: { mpCost: 25, hpCost: 15 } },
          { text: '想办法转移恐魔的注意力', next: 'defilement_1_3b' }
        ]
      },
      {
        id: 'defilement_1_2b',
        title: '谎言恐吓',
        text: [
          '你闭上眼睛，全力发动【欺骗大师】和【献往虚无的祭品】。',
          '"恐魔们！"你的声音在虚空中回荡，"我们才是这里的主人！你们是入侵的怪物！"',
          '一瞬间——所有恐魔停下了动作。它们的大脑（如果有的话）接收到了一个强烈的、与现实矛盾的信息。',
          '它们开始互相看向对方。那些扭曲的面孔上，竟然浮现出……困惑和恐惧？',
          '你成功地用谎言将"猎物"和"猎人"的身份颠倒了！'
        ],
        choices: [
          { text: '继续加强谎言，让恐魔自相残杀', next: 'defilement_1_3c', effects: { mpCost: 15 } }
        ]
      },
      {
        id: 'defilement_1_2c',
        title: '骨仆充能',
        text: [
          '骨仆乐乐尔之戒开始吸收周围的恐惧能量——充能！',
          '戒指上亮起了三张尖啸之嘴。你获得了三次【鸣雷裁决】的使用机会。',
          '但同时，你感觉到恐惧也在侵蚀你的精神力。吸收恐惧是有代价的。'
        ],
        choices: [
          { text: '用鸣雷裁决清除最强大的恐魔', next: 'defilement_1_3d', effects: { mpCost: 10 } },
          { text: '先存着，关键时刻再用', next: 'defilement_1_3b' }
        ]
      },
      // 结果
      { id: 'defilement_1_3a', outcome: 'mid', reward: { dengshen: 10, jinshen: 1 }, summary: '你们撑过去了，但代价惨重。两位队友受伤严重。' },
      { id: 'defilement_1_3b', outcome: 'good', reward: { dengshen: 15, jinshen: 2 }, summary: '你分散了恐魔的注意力，让团队找到了撤退的机会。' },
      { id: 'defilement_1_3c', outcome: 'best', reward: { dengshen: 28, jinshen: 3 }, summary: '恐魔在你的谎言下彻底混乱，开始互相撕咬。【污堕】神都被你的创造力震惊了——祂说："这就是欺骗大师的真正用法！"' },
      { id: 'defilement_1_3d', outcome: 'good', reward: { dengshen: 20, jinshen: 2 }, summary: '你用鸣雷裁决清场，但恐惧的侵蚀让你精神力见底。骨仆戒指获得了一次升级。' }
    ]
  },

  /* === 文明命途 · 真理 === */
  'truth_1': {
    id: 'truth_1',
    name: '博学之塔',
    god: 'truth',
    path: '文明',
    difficulty: 'B',
    summary: '你被困在无限堆叠的书籍高塔中。每一层都是一个知识谜题，解开才能上到下一层。但你逐渐发现——有些"真相"，被刻意地从书籍中删除了。',
    objective: '穿越书籍高塔，找到最终的"真理"',
    scenes: [
      {
        title: '第一章 · 书塔',
        text: [
          '书籍像山一样堆叠，空气里飘着纸张的霉味。你站在一层的平台上，面前有三道门。',
          '左边门上写着："过去"，中间写着："现在"，右边写着："未来"。',
          '一位戴着圆框眼镜的贤者出现："真理信徒的试炼，你需要在三层谜题中选择正确的顺序。顺序错了，就永远困在这里。"',
          '"提示：真理是连贯的。"'
        ],
        choices: [
          { text: '按 过去→现在→未来 顺序', next: 'truth_1_2a' },
          { text: '按 未来→现在→过去 顺序', next: 'truth_1_2b' },
          { text: '按 现在→过去→未来 顺序', next: 'truth_1_2c' }
        ]
      },
      {
        id: 'truth_1_2a',
        title: '过去之门',
        text: [
          '门后是一本巨大的史书，记载着这座塔的建造史。但很多页被撕掉了。',
          '"缺页的地方……是什么？"贤者问。',
          '你仔细观察被撕掉的痕迹——边缘很新，像是最近才撕的。而且缺口的形状似乎……组成了某种符号？',
          '你可以编造缺失的内容（欺诈），也可以尝试还原（真理）。'
        ],
        choices: [
          { text: '用欺诈"还原"缺失的内容', tag: 'lie', next: 'truth_1_3a', effects: { mpCost: 15 } },
          { text: '诚实说"我不知道"，然后去下一层', next: 'truth_1_3b' }
        ]
      },
      {
        id: 'truth_1_2b',
        title: '反向顺序',
        text: [
          '顺序错了！贤者摇头："真理不能倒着理解。但也不是线性的……"',
          '你需要重新理解"连贯"的含义。也许顺序不重要，重要的是——你看到了什么。'
        ],
        choices: [
          { text: '回到选择重新思考', next: 'truth_1_2c' }
        ]
      },
      {
        id: 'truth_1_2c',
        title: '现在之门',
        text: [
          '门后是一面镜子。你照进去——镜子里的你没有笑，眼睛是空洞的。',
          '"你是谁？"镜子问。',
          '这是一个真理问题。你必须诚实地回答。但作为欺诈信徒，你可以选择……不那么诚实。'
        ],
        choices: [
          { text: '"我是程实，一个从不骗人的骗子。"', next: 'truth_1_3c' },
          { text: '"我是命运的宠儿，欺诈的藏品。"', next: 'truth_1_3d' },
          { text: '"我不想回答这个问题。"', next: 'truth_1_3e' }
        ]
      },
      // 结果
      { id: 'truth_1_3a', outcome: 'mid', reward: { dengshen: 10, jinshen: 1 }, summary: '真理识破了你的谎言，但被你的"创造力"逗乐了。' },
      { id: 'truth_1_3b', outcome: 'good', reward: { dengshen: 15, jinshen: 2 }, summary: '承认无知，本身就是真理的一部分。真理神对你的诚实给予了正面评价。' },
      { id: 'truth_1_3c', outcome: 'best', reward: { dengshen: 25, jinshen: 3 }, summary: '矛盾的答案恰恰是最接近真理的描述——你的存在本身就是一个悖论。真理神第一次露出欣赏的表情。' },
      { id: 'truth_1_3d', outcome: 'good', reward: { dengshen: 18, jinshen: 2 }, summary: '你说出了一个"真相"，真理认可了它的真实性。' },
      { id: 'truth_1_3e', outcome: 'bad', reward: { dengshen: 5, jinshen: 0 }, summary: '回避真理问题，等于放弃了试炼。' }
    ]
  }
};

/* ============================================================
 * 幕间场景库（运行时注入）
 * 当本场试炼的选择次数不足 5 次时，在结局前插入突发幕间事件，
 * 保证每次试炼至少包含 5 次基础选择机会。
 * god: 信仰专属场景；'any'：所有试炼通用。
 * ============================================================ */
const DATA_INTERLUDES = [
  /* —— 欺诈专属 —— */
  {
    id: 'itl_fraud_1', god: 'fraud', interlude: true,
    title: '幕间 · 检票员',
    text: [
      '试炼的间隙，一位戴着银色面具的"检票员"拦住了队伍的去路。',
      '他举着一把铜制剪票钳："票根对不上。你们的座位，剧本里没有写。"',
      '队友们纷纷看向你——【欺诈】的试炼里，这种时候说真话的人，通常活不到下一幕。'
    ],
    choices: [
      { text: '反问他："票根是哪一幕发的？你自己记得吗？"', effects: { doubt: 2, mpCost: 5 }, resolve: '检票员愣住了。他低头翻找自己的票根——那张纸不知何时变成了一面镜子。他默默退开了。' },
      { text: '编造"巡场导演"的身份，要求他配合排查混入的观众', effects: { mpCost: 15, csTrust: -3 }, resolve: '你报出一连串术语，检票员的姿势越来越低。他行了个礼，剪票钳双手奉上——现在是你的了。' },
      { text: '拉队友当场演一出"内讧戏"，把检票员晾在一边', effects: { trust: 5, doubt: -3 }, resolve: '你们吵得难解难分，检票员在旁边站了足足五分钟，最后自己走开了。队友们憋笑憋得很辛苦。' }
    ]
  },
  {
    id: 'itl_fraud_2', god: 'fraud', interlude: true,
    title: '幕间 · 观众席的低语',
    text: [
      '休息室里，一个戴天鹅绒面具的观众凑近你，声音压得很低。',
      '"这个角色……原本的剧本里不该出现。你是多出来的，对吗？"',
      '他的手指向自己的面具："说出实话的人，要在这里摘下面具。你敢吗？"'
    ],
    choices: [
      { text: '"我敢。但摘下你的面具之前，先摘下你的脸。"', effects: { csTrust: 5, fear: 5 }, resolve: '观众大笑三声，掌声不止："好胆量！欺诈会喜欢你的。"' },
      { text: '沉默地把小丑面具压得更低，从他身边挤过去', effects: { mpCost: 5 }, resolve: '你没有回答。身后的低语声变成了一声轻笑，随即被幕布落下声吞没。' },
      { text: '"剧本没写我？那正好——没写过的角色，才改得动结局。"', effects: { doubt: 3, mpCost: 10 }, resolve: '观众席安静了一瞬。远处，某个看不见的存在发出了满意的、黏稠的笑声。' }
    ]
  },
  /* —— 混沌专属 —— */
  {
    id: 'itl_chaos_1', god: 'chaos', interlude: true,
    title: '幕间 · 声音互换',
    text: [
      '一阵铃铛般的笑声掠过，队伍里突然一片混乱——',
      '你和一名队友的声音互换了。你开口时，是他嗓子发出的声音；他喊疼时，用的却是你的声带。',
      '远处的墙壁上浮现出一行歪歪扭扭的字："换回来可以。但要先有人承认自己是谁。"'
    ],
    choices: [
      { text: '第一时间大声承认"我是程实"，用真名锚定自己', effects: { doubt: 4, csTrust: 5 }, resolve: '声音"咔"地归位了。代价是——混沌听见了你的真名，它记住了。' },
      { text: '让队友先说，你在旁观察规则', effects: { mpCost: 10, doubt: 2 }, resolve: '队友犹豫着喊出自己的名字，声音归位。规则清楚了，但那位队友看你的眼神多了一丝异样。' },
      { text: '故意用队友的声音说反话，搅浑这滩水', effects: { trust: -3, doubt: 6, mpCost: 15 }, resolve: '墙壁上的字被你气笑了。声音全乱了套——三分钟后才恢复。混沌很满意，队友们不太满意。' }
    ]
  },
  {
    id: 'itl_chaos_2', god: 'chaos', interlude: true,
    title: '幕间 · 规则告示牌',
    text: [
      '一块木牌从天花板"啪"地砸在路中央，上面用三种字体写着互相矛盾的规则：',
      '"本区域禁止说谎。" / "本区域只允许说谎。" / "本区域禁止禁止。"',
      '队伍必须从这里通过。木牌后面，走廊微微地扭动着，像一条醒着的蛇。'
    ],
    choices: [
      { text: '三条规则同时遵守——用"既真又假"的话糊弄过去', effects: { mpCost: 20 }, resolve: '你说出一句真伪莫辨的话。走廊扭动着让开了路。混沌的本质就是矛盾，你比它更像它。' },
      { text: '选"禁止禁止"——用否定之否定开路', effects: { doubt: 3, csTrust: 3 }, resolve: '木牌发出崩溃的嗡鸣。以规则对抗规则，你走通了。队友们跟在你身后，若无其事。' },
      { text: '让最莽的那位队友先走，观察会发生什么', effects: { trust: -5, doubt: 5 }, resolve: '队友平安走过——木牌对他毫无反应。原来规则只拦"想太多的人"。你安然通过，但愧疚感挥之不去。' }
    ]
  },
  /* —— 命运专属 —— */
  {
    id: 'itl_fate_1', god: 'fate', interlude: true,
    title: '幕间 · 丝线',
    text: [
      '恍惚间，你看见了不该看见的东西——',
      '每位队友的手腕上都缠着一根极细的发光丝线，延伸向黑暗深处。其中一根，正在缓缓变成红色。',
      '【命运】在编织什么。而你看见了。'
    ],
    choices: [
      { text: '悄悄记住那根变红的丝线是谁的，不发一言', effects: { mpCost: 10 }, resolve: '你记下了。丝线的颜色恢复了原状——但你总觉得，那根线还在某处慢慢变红。' },
      { text: '当面提醒那位队友"最近小心一点"', effects: { trust: 6, doubt: 3 }, resolve: '队友怔了怔："你怎么知道？"你笑而不语。信任多了三分，怀疑也是。' },
      { text: '伸手去捻自己的丝线——看看你的命运是什么颜色', effects: { fear: 10, mpCost: 15 }, resolve: '你的丝线没有颜色。命运看不见你。这个认知让你脊背发凉，却莫名安心。' }
    ]
  },
  {
    id: 'itl_fate_2', god: 'fate', interlude: true,
    title: '幕间 · 预言之梦',
    text: [
      '靠着墙壁打盹的几分钟里，你做了一个过分清晰的梦：',
      '梦里，下一幕会有一个"选择"——而其中一个选项的背后，站着微笑的死神。',
      '醒来时，梦的细节清晰得像是有人特意放进你脑子里的。'
    ],
    choices: [
      { text: '把梦一字不差地告诉全体队友', effects: { trust: 6, doubt: 6 }, resolve: '有人信，有人不信。但等下一幕真的出现那个"选择"时，所有人都想起了你的梦。' },
      { text: '只记在心里——预言说出口，就可能被命运改道', effects: { mpCost: 5 }, resolve: '你守住了这个秘密。命运欣赏懂规矩的人——也可能只是还没注意到你。' },
      { text: '故意反着来：梦里说左，你偏走右', effects: { fear: 8, doubt: 3 }, resolve: '下一幕，右边的路平安无事。可是——梦里的死神，似乎朝着你笑得更开心了。' }
    ]
  },
  /* —— 腐朽专属 —— */
  {
    id: 'itl_decay_1', god: 'decay', interlude: true,
    title: '幕间 · 菌丝',
    text: [
      '一夜之间，队伍的干粮长出了灰白色的菌丝，净水袋里泛起铁锈味。',
      '腐朽从不喧哗，它只是安静地、不可避免地发生着。',
      '必须做出取舍了——东西在坏，而路还很长。'
    ],
    choices: [
      { text: '把还能吃的部分平均分配，谁也不多拿', effects: { trust: 6, doubt: -2 }, resolve: '平均分配的举动让队友们松了口气。腐朽在继续，但人心还齐。' },
      { text: '自己少拿一份，把多的留给伤员', effects: { csTrust: 8, mpCost: 10 }, resolve: '饥饿感如影随形，但伤员看你的眼神里有了真心的东西。' },
      { text: '检查菌丝——有些腐朽之物，或许另有用处', effects: { doubt: 3, mpCost: 5 }, resolve: '你发现这种菌丝遇火会发出驱虫的烟。腐朽也是变化的一种——你赚到了。' }
    ]
  },
  {
    id: 'itl_decay_2', god: 'decay', interlude: true,
    title: '幕间 · 锈',
    text: [
      '无端的锈蚀在队伍里蔓延：刀剑起锈斑，甲胄失光泽，连门轴都发出垂死的呻吟。',
      '一位队友的武器已经锈得快握不住了——那是他唯一的依仗。',
      '腐朽在等你们松懈。'
    ],
    choices: [
      { text: '把油脂分给队友保养武器，自己的武器最后处理', effects: { trust: 5, mpCost: 10 }, resolve: '武器重新亮了起来。你的刀却多锈了一分——这笔账，队友们记下了。' },
      { text: '优先保养自己的武器——活下去才有资格讲情义', effects: { csTrust: -5, doubt: 4 }, resolve: '你的刀锋依旧锐利。队友们什么都没说，但分配干粮时，你的份少了些。' },
      { text: '研究锈的纹路——它蔓延的方向似乎指向什么', effects: { doubt: 2, mpCost: 15 }, resolve: '锈迹的走向像一张地图，指向安全路线。腐朽在毁灭一切之前，先泄露了秘密。' }
    ]
  },
  /* —— 时间专属 —— */
  {
    id: 'itl_time_1', god: 'time', interlude: true,
    title: '幕间 · 三十秒',
    text: [
      '世界毫无征兆地抖动了一下——你回到了三十秒之前。',
      '队友们重复着一模一样的对话，连打喷嚏的节奏都分毫不差。',
      '只有你记得这一切已经发生过一次。'
    ],
    choices: [
      { text: '顺着对话再说一遍——什么都没变，什么都没坏', effects: { mpCost: 5 }, resolve: '三十秒平稳地流过。这一次，没有回溯。时间放过了配合它的人。' },
      { text: '插一句上一次没说的话，试探改变的边界', effects: { doubt: 4, mpCost: 10 }, resolve: '队友们茫然地转头看你——他们不记得上一轮。回溯的沙漏里，你是唯一的沙粒。' },
      { text: '利用记忆，提前做一件"未来"的小事', effects: { csTrust: 5, fear: 5 }, resolve: '你抢在队友掏出口袋前说出他要说的话。他惊恐地后退半步："你……你怎么会知道？"' }
    ]
  },
  {
    id: 'itl_time_2', god: 'time', interlude: true,
    title: '幕间 · 倒流的沙',
    text: [
      '走廊中央立着一座两人高的沙漏，沙流的方向飘忽不定。',
      '一会儿向下，一会儿停滞，一会儿——向上倒流。',
      '一位队友盯着沙漏出了神，眼皮越来越沉，像被什么拽进了沙里。'
    ],
    choices: [
      { text: '一巴掌拍醒他——陷入时间的人会被时间收走', effects: { trust: 5 }, resolve: '他猛地惊醒，额头上全是冷汗："我刚才……看见了我小时候。"队伍继续前进。' },
      { text: '观察沙流的规律，找出安全的通过时机', effects: { mpCost: 15, doubt: 2 }, resolve: '沙流每九息一个循环。你数着节拍带全队通过。时间的纪律，是唯一的救命绳。' },
      { text: '对沙漏许愿——听说倒流的时间里，愿望会逆流而上', effects: { doubt: 5, fear: 8 }, resolve: '沙漏的沙向上倒流了一瞬。你听不清的某个愿望，被什么东西收下了。愿不愿灵，就不知道了。' }
    ]
  },
  /* —— 沉默专属 —— */
  {
    id: 'itl_silence_1', god: 'silence', interlude: true,
    title: '幕间 · 失声',
    text: [
      '一名队友张着嘴，却发不出任何声音。',
      '他的嘴唇在动，喉咙在震，但空气纹丝不动——声音被某种东西"拿走"了。',
      '【沉默】的领地里，这是警告，也是考题。'
    ],
    choices: [
      { text: '用手势和他交流，陪他走完这段路', effects: { trust: 6 }, resolve: '你们用笨拙的手势聊了一路。声音回来时，他对你点了点头——有些话不必说出口。' },
      { text: '替他说话——你说出的每个字，替他付一份代价', effects: { csTrust: 6, mpCost: 15 }, resolve: '你的嗓子渐渐沙哑。声音回到他喉咙里的那一刻，你的指尖短暂地失去了知觉。' },
      { text: '保持绝对安静，观察是谁"拿走"了声音', effects: { doubt: 2, mpCost: 10 }, resolve: '黑暗里，你看见一只没有身体的手正握着一把"声音"。它对你们的安静表示满意，把手松开了。' }
    ]
  },
  {
    id: 'itl_silence_2', god: 'silence', interlude: true,
    title: '幕间 · 静音走廊',
    text: [
      '前方走廊的入口刻着一行字："入内者，噤声。"',
      '传闻这条走廊会吞掉一切声音——包括求救声，包括惨叫声。',
      '但又只有这一条路。'
    ],
    choices: [
      { text: '规定全队手拉手通过，任何人不许脱手', effects: { trust: 5, doubt: -2 }, resolve: '十步长的走廊，你们走了像一年。走出出口的瞬间，所有人同时长出一口气——声音回来了。' },
      { text: '在绳子上系铃铛——铃在走廊里哑，人在外面响', effects: { mpCost: 10 }, resolve: '铃铛进走廊就哑了。但有一个人在外侧拉动绳子，铃在外面的响声就是全队的生命线。' },
      { text: '快速冲刺通过——缩短暴露时间', effects: { doubt: 4, fear: 6 }, resolve: '你们狂奔而过。走廊在身后合拢又张开，像一个意犹未尽的哈欠。太险了。' }
    ]
  },
  /* —— 繁荣专属 —— */
  {
    id: 'itl_prosperity_1', god: 'prosperity', interlude: true,
    title: '幕间 · 黑市商人',
    text: [
      '一位笑容满面的商人推着堆成小山的货车出现在路中央。',
      '"治愈药水！护身符！情报！样样都有，样样公道——"',
      '标价签上写的不是钱，而是"记忆一段"、"三天寿命"、"一个秘密"。'
    ],
    choices: [
      { text: '买一瓶治愈药水，付"一个秘密"', effects: { doubt: 5, mpCost: 5 }, resolve: '你付的秘密无关紧要，药水货真价实。商人心满意足——但谁知道那个秘密最后会流向哪里？' },
      { text: '分文不买，礼数周全地绕开', effects: { csTrust: 3 }, resolve: '商人也不恼，笑着让路："不买没关系，欢迎下次光临。"货车吱呀吱呀地远了。' },
      { text: '砍价——用"假情报"换真物资', effects: { doubt: 8, mpCost: 20 }, resolve: '你把假情报说得天衣无缝。商人验收时眉头一皱，随即大笑："有胆识！这单算我交个朋友。"繁荣不介意被骗，它只介意没钱赚。' }
    ]
  },
  {
    id: 'itl_prosperity_2', god: 'prosperity', interlude: true,
    title: '幕间 · 丰饶的陷阱',
    text: [
      '房间里堆满了金银、鲜肉和蜜酒——在这个万物匮乏的试炼里，像一场幻觉。',
      '墙壁上刻着褪色的字："拿走你需要的东西，留下你承受得起的东西。"',
      '队友们的眼睛都亮了。'
    ],
    choices: [
      { text: '只拿干粮和水，留下一句真心的感谢', effects: { trust: 6, csTrust: 3 }, resolve: '东西到手，门应声而开。克制是繁荣最爱的祭品——它用开门向你致敬。' },
      { text: '拿走所有能带走的——繁荣不拿白不拿', effects: { doubt: 6, fear: 5 }, resolve: '包袱塞得鼓鼓囊囊。出门后你发现，包里所有的金银都变成了等重的石头。只有最初拿的食物没变。' },
      { text: '劝队友们都别拿——天上掉的不一定是馅饼', effects: { trust: -3, doubt: 2 }, resolve: '有一半人听了你的。拿的那一半人体验到了石头，没拿的人暗自庆幸。你的威信各损益一半。' }
    ]
  },
  /* —— 污堕专属 —— */
  {
    id: 'itl_defilement_1', god: 'defilement', interlude: true,
    title: '幕间 · 井水',
    text: [
      '队伍唯一的取水井里，水面浮着一层薄薄的黑色油花。',
      '油花组成了奇怪的图案——像一只眼睛，也像一张咧开的嘴。',
      '没有这井水，队伍撑不过明天。'
    ],
    choices: [
      { text: '静置一夜，取下层清水，煮沸再喝', effects: { mpCost: 10 }, resolve: '水能喝了，只是隐隐有股说不清的味道。至少，没人开始长出鳞片。' },
      { text: '对井水做净化仪式——尽人事，听天命', effects: { csTrust: 5, fear: 5 }, resolve: '油花在仪式中散开又聚拢，最终退成一圈，让出了中心的一片清水。污堕收下了敬意。' },
      { text: '研究油花的图案——它在模仿什么，就在渴求什么', effects: { doubt: 4, mpCost: 15 }, resolve: '你看懂了：图案模仿的是"活人"。污堕想要活的东西。你用一根活树枝引开了油花，取水成功。' }
    ]
  },
  {
    id: 'itl_defilement_2', god: 'defilement', interlude: true,
    title: '幕间 · 污渍',
    text: [
      '清晨，一位队友发现他随身的信仰圣徽上多了三道抓痕状的污渍。',
      '擦不掉。抠不掉。污渍在圣徽表面缓缓蠕动，像活物。',
      '【污堕】的标记。被标记的人，会在某个时刻"变质"。'
    ],
    choices: [
      { text: '立刻用干净的布包住圣徽，隔绝污染扩散', effects: { trust: 4, mpCost: 10 }, resolve: '污渍在布里安静下来。队友感激地看着你——虽然谁都知道，这只是延缓。' },
      { text: '提议全体轮流握住圣徽——污堕的标记会找"最有隙可乘"的人', effects: { doubt: 5, mpCost: 15 }, resolve: '圣徽在每个人手里传递。传完一圈后，污渍竟真的淡了。污堕不喜欢被平均分摊。' },
      { text: '和那位队友保持距离——你赌不起', effects: { trust: -6, doubt: 8 }, resolve: '你悄悄落后了半个身位。队友察觉了你的疏离，什么都没说。夜里的篝火，他坐在了离你最远的地方。' }
    ]
  },
  /* —— 通用场景 —— */
  {
    id: 'itl_any_watch', god: 'any', interlude: true,
    title: '幕间 · 站岗',
    text: [
      '夜宿的安全屋里，站岗顺序成了问题。',
      '后半夜的岗最苦——冷、困，还最容易出事。',
      '五个人的目光在火光里碰来碰去，谁都没先开口。'
    ],
    choices: [
      { text: '主动接过最苦的后半夜岗', effects: { trust: 8, csTrust: -3 }, resolve: '你裹紧衣服坐到了门边。队友们睡得很沉——有人在梦里嘟囔了一句"谢谢"。' },
      { text: '提议抽签，把命运交给运气', effects: { doubt: -2, mpCost: 0 }, resolve: '签筒用的是空弹壳。抽签结果谁也没意见——运气面前，人人平等。' },
      { text: '观察谁的精神最差，让他睡整觉，你带其余人轮岗', effects: { trust: 5, mpCost: 5 }, resolve: '安排得明明白白。被照顾的人第二天精神饱满，团队走得更快了。' }
    ]
  },
  {
    id: 'itl_any_note', god: 'any', interlude: true,
    title: '幕间 · 字条',
    text: [
      '你的口袋里多了一张字条。不是你放的。',
      '字条上的字迹娟秀："别相信今晚会主动帮你的那个人。"',
      '没有署名。你抬起头，五个队友都在火光外忙碌着，看起来人畜无害。'
    ],
    choices: [
      { text: '烧掉字条，装作从未看见', effects: { doubt: 3 }, resolve: '火苗舔掉纸角的瞬间，你仿佛听见远处有一声轻叹。有些提醒只有一次。' },
      { text: '不动声色，留意今夜谁会"主动帮忙"', effects: { mpCost: 10 }, resolve: '深夜，果然有一位队友摸过来要帮你"换岗"。你笑着拒绝了。他的眼神，变了。' },
      { text: '把字条拿给全体队友看——阳谋对阴谋', effects: { trust: 4, doubt: 6 }, resolve: '字条传了一圈，每个人看别人的眼神都变了。信任这东西，一旦摊开就再也回不去了。' }
    ]
  },
  {
    id: 'itl_any_quarrel', god: 'any', interlude: true,
    title: '幕间 · 争吵',
    text: [
      '为了最后半壶净水，两名队友吵了起来。',
      '一个说自己伤重该多喝，一个说自己探路出力最多。',
      '火堆的光把两张涨红的脸照得忽明忽暗。其余人都在看你——你是队伍的主心骨。'
    ],
    choices: [
      { text: '各打五十大板：水均分，两人的怨气各自消化', effects: { doubt: 2, csTrust: 3 }, resolve: '水壶传递了两圈。争吵平息了，但有些疙瘩不是半壶水能化开的。' },
      { text: '把水给伤重的那个——情义比道理重', effects: { trust: 5, csTrust: -3 }, resolve: '探路的队友摔了水杯，一个人坐到火堆外。但伤员活下来了，这就够了。' },
      { text: '立规矩：今后资源分配全队投票，少数服从多数', effects: { trust: 4, doubt: -4 }, resolve: '投票制通过了。规矩一旦立起来，争吵就变成了流程。队伍意外地更团结了。' }
    ]
  },
  {
    id: 'itl_any_wounded', god: 'any', interlude: true,
    title: '幕间 · 求助者',
    text: [
      '一个满身是血的人在路口向你们挥手。',
      '"求求你们……帮帮我……"他的伤口不像是试炼的造物，倒像是被什么东西啃过。',
      '队友们看向你：救，还是不救？'
    ],
    choices: [
      { text: '救治他——见死不救的事，做不出来', effects: { trust: 6, csTrust: 3, mpCost: 20 }, resolve: '伤口处理到一半，你发现他口袋里装着别的试炼者的遗物。他恢了些力气，道了谢，一瘸一拐地走了。真相是什么，已经不重要了。' },
      { text: '给他食物和水，但不允许他跟队', effects: { doubt: -2 }, resolve: '他狼吞虎咽之后，指了条避开危险区的近路作为报答。各取所需，两不相欠。' },
      { text: '远远绕开——试炼里的"弱者"不一定真是弱者', effects: { doubt: 3, fear: 3 }, resolve: '走出很远后，你们回头看见那个人站得笔直，正朝你们的方向"看"。你们加快了脚步。' }
    ]
  },
  {
    id: 'itl_any_rumor', god: 'any', interlude: true,
    title: '幕间 · 传闻',
    text: [
      '有队友私下告诉你：他昨晚看见另一位队友"在和敌方的人交易"。',
      '"我没看错。你最好心里有数。"他压低声音说。',
      '而被传的那位队友，此刻正在远处为大家站岗。'
    ],
    choices: [
      { text: '先不表态，自己暗中核实', effects: { mpCost: 10, doubt: 2 }, resolve: '你查了一夜。所谓"交易"，其实是那位队友在偷偷埋葬死去的陌生人。传闻害人，你庆幸自己没轻信。' },
      { text: '当面把话挑开，让三个人对质', effects: { trust: 3, doubt: 6 }, resolve: '对质不欢而散。传话的人和被传的人从此形同陌路——但至少，暗箭变成了明枪。' },
      { text: '感谢报信的人，什么也不做', effects: { doubt: 4 }, resolve: '你把疑心埋进肚子里。但试炼结束前，你总会忍不住多看那位队友两眼。种子已经种下了。' }
    ]
  },
  {
    id: 'itl_any_supply', god: 'any', interlude: true,
    title: '幕间 · 清点',
    text: [
      '出发前清点补给——干粮只够一半人走到终点。',
      '账目很清楚，问题很残忍：谁能吃，谁少吃？',
      '五双眼睛看着你。这是试炼，也是审判。'
    ],
    choices: [
      { text: '均分——所有人都走慢一点，但都活着', effects: { trust: 7, csTrust: -3 }, resolve: '每份干粮都小得可怜，但每个人都在笑。饥饿面前，公平是最好的调味料。' },
      { text: '体弱者多分，强壮者少吃——团队要走到最后', effects: { trust: 4, doubt: 3 }, resolve: '强壮的队友默默咽了口水，没说什么。弱者眼神里的感激货真价实。' },
      { text: '另辟蹊径：用多余物资去和"世界"交换补给', effects: { doubt: 3, mpCost: 15 }, resolve: '你在一处废弃祭坛摆上多余物资，跪拜再三。第二天清晨，祭坛上多了一袋新鲜的面包。诸神偶尔也做买卖。' }
    ]
  }
];

/* ============================================================
 * 觐神场景库
 * 每次试炼后，有概率触发觐神
 * ============================================================ */

const DATA_JINSHEN = {
  fraud: {
    god: 'fraud',
    dialogues: [
      {
        speaker: '【欺诈】',
        text: '呵呵……哈哈哈！程实，你来了！来得正好。【秩序】可悲，【真理】可叹，【战争】可笑，【文明】不过笑料——吾本以为这场游戏里再没有值得多看一眼的东西，结果你踩着一地谎话进来了。哈哈哈，多好笑的一幅画。',
        effects: { appreciation: 10, patience: 5 }
      },
      {
        speaker: '【欺诈】',
        text: '吾不问你做了什么，吾只问——他们信了什么？呵呵，说出来的话在现实里找不到影子？不要紧。信的人够了，现实自己会照着改。所以你那场试炼里的真话假话，不必答。真伪从来不归说话的人定，归信的人定。哈哈哈，这规则，多有趣。',
        choices: [
          { text: '"……你猜。"', effects: { appreciation: 15, fear: -5 } },
          { text: '"有一半是真的。"', effects: { appreciation: 5, fear: 5 } },
          { text: '"全部都是真的。"', effects: { appreciation: -10, fear: 10 } }
        ]
      },
      {
        speaker: '程实',
        text: '（内心独白：祂一直在笑。笑声里没有温度，只有兴致——像看戏的人捏着一颗随时会扔下来的骰子。祂把一切都当乐子，那我最好也是乐子，而不是笑话的结尾。我得让祂觉得我有趣，但不能让祂太了解我。）',
        effects: {}
      },
      {
        speaker: '【欺诈】',
        text: '昨日，吾欺骗了【诞育】的信徒，所以今日，吾是【诞育】的信徒——哈哈哈，别用那种眼神看吾，你以为这是玩笑？语言于吾不是交谈，是权柄。呵呵，吾说吾是谁并不重要——你们信了，吾就是。你看，连身份都能随手换着玩，这游戏岂不是处处是乐子？',
        choices: [
          { text: '"那你信自己吗？"', effects: { appreciation: 12, fear: 0 } },
          { text: '"神也需要骗人。真好笑。"', effects: { appreciation: 5, fear: 8 } },
          { text: '"我信你是欺诈。你会因此成真吗？"', effects: { appreciation: 18, fear: -3 } }
        ]
      },
      {
        speaker: '【欺诈】',
        text: '吾见过太多信徒——有人把谎言当信仰，有人把信仰当谎言，无聊，无聊透顶。呵呵……但你，程实，你什么都不是。你是个意外。哈哈哈，而意外，是吾唯一还没尝过的味道。真让人期待你还会闹出什么新鲜乐子。',
        effects: { appreciation: 8, fear: 12 }
      },
      {
        speaker: '【欺诈】',
        text: '"不辨真伪，勿论虚实。"——这是吾的祷词。呵呵，现在，给吾说一个谎。别说给吾听，说给"信"听。让吾看看，你能不能连自己一起骗过——骗过了，吾大笑一场；骗不过，吾也笑一场。哈哈哈，反正吾横竖都有乐子。',
        choices: [
          { text: '"我从不骗人。"', effects: { appreciation: 20, fear: -5 } },
          { text: '"我最近没骗人。"', effects: { appreciation: -8, fear: 5 } },
          { text: '"我骗了……我自己。"', effects: { appreciation: 15, fear: 15 } }
        ]
      }
    ],
    gifts: [
      { name: '谎如昨日（天赋碎片）', desc: '暂时获得最近欺骗对象的信仰权柄', chance: 0.15 },
      { name: '众生假面 ×1', desc: '多一张可以切换职业的假面', chance: 0.3 },
      { name: '精神力恢复', desc: '觐神后精神力全满', chance: 1.0 }
    ]
  },
  fate: {
    god: 'fate',
    dialogues: [
      {
        speaker: '【命运】',
        text: '程实……你又一次偏离了我为你编织的命运之线。',
        effects: { appreciation: 5, patience: 10 }
      },
      {
        speaker: '【命运】',
        text: '但每次偏离之后，你又会走回我编织的网里。这是巧合吗？',
        choices: [
          { text: '"我不相信巧合。"', effects: { appreciation: 15, fear: 10 } },
          { text: '"也许这就是命运。"', effects: { appreciation: -5, fear: 5 } },
          { text: '"也许你也在偏离你的命运。"', effects: { appreciation: 20, fear: 15 } }
        ]
      },
      {
        speaker: '程实',
        text: '（命运的力量深不可测。我需要表现出对祂的敬畏，但不能让祂完全掌控我。）',
        effects: {}
      },
      {
        speaker: '【命运】',
        text: '你知道吗，我看过无数未来。每一个你，都在撒谎。但只有这个你——把谎言活成了命运本身。',
        effects: { appreciation: 12, fear: 8 }
      },
      {
        speaker: '【命运】',
        text: '最后一个问题——如果有一天，谎言不够用了。你会选择相信命运吗？',
        choices: [
          { text: '"我会创造新的谎言。"', effects: { appreciation: 18, fear: -5 } },
          { text: '"到时候再说。"', effects: { appreciation: 8, fear: 3 } },
          { text: '"我已经不相信任何东西了。"', effects: { appreciation: -5, fear: 20 } }
        ]
      }
    ],
    gifts: [
      { name: '命运之骰 ×1', desc: '额外一枚命运骰子', chance: 0.2 },
      { name: '命运之骰（强化）', desc: '下次使用命运之骰，精神力消耗减半', chance: 0.3 },
      { name: '登神之路积分', desc: '觐见之梯额外+3', chance: 1.0 }
    ]
  },
  death: {
    god: 'death',
    dialogues: [
      {
        speaker: '【死亡】',
        text: '……程实。',
        effects: { appreciation: 5, patience: 15, fear: 10 }
      },
      {
        speaker: '【死亡】',
        text: '你在试炼中选择"活着"，还是选择"被铭记"？',
        choices: [
          { text: '"我选择……我想守护的东西。"', effects: { appreciation: 15, fear: 5 } },
          { text: '"活着才能守护。"', effects: { appreciation: -5, fear: 0 } },
          { text: '"被铭记就是另一种活着。"', effects: { appreciation: 20, fear: 15 } }
        ]
      },
      {
        speaker: '【死亡】',
        text: '……程实，你有没有想过？你的记忆里，有一段是我替你保管的。',
        effects: { appreciation: 8, fear: 25 }
      }
    ],
    gifts: [
      { name: '死亡权柄碎片', desc: '骨仆戒指充能效率提升', chance: 0.25 },
      { name: '血线回满', desc: '觐神后血量全满', chance: 1.0 }
    ]
  },
  chaos: {
    god: 'chaos',
    dialogues: [
      {
        speaker: '【混乱】',
        text: '嘿嘿嘿……程实，要不要来我这里做令使？很好玩的~',
        effects: { appreciation: 10, patience: 5 }
      },
      {
        speaker: '【混乱】',
        text: '秩序、真理、命运……那些无聊的神会把你困在网里的~',
        choices: [
          { text: '"我考虑一下。"', effects: { appreciation: 5, fear: 0 } },
          { text: '"不，我有自己的选择。"', effects: { appreciation: -10, fear: 10 } },
          { text: '"什么是令使？能吃吗？"', effects: { appreciation: 20, fear: -5 } }
        ]
      },
      {
        speaker: '【混乱】',
        text: '~你知道吗，你其实没有选择哦~ 你的每个决定，都是混乱想要的结果~',
        effects: { appreciation: 10, fear: 20 }
      }
    ],
    gifts: [
      { name: '混乱扮演法（碎片）', desc: '短暂获得混乱权柄', chance: 0.15 }
    ]
  },
  decay: {
    god: 'decay',
    dialogues: [
      {
        speaker: '【腐朽】',
        text: '……你没有逃避我。有意思。',
        effects: { appreciation: 5, patience: 10, fear: 15 }
      },
      {
        speaker: '【腐朽】',
        text: '所有人都怕我。但你不怕……为什么？',
        choices: [
          { text: '"因为腐朽是生命的一部分。"', effects: { appreciation: 15, fear: 10 } },
          { text: '"我装出来的，你信吗？"', effects: { appreciation: 10, fear: -5 } },
          { text: '"我还没到腐朽的时候。"', effects: { appreciation: -10, fear: 5 } }
        ]
      },
      {
        speaker: '【腐朽】',
        text: '你身上有种奇妙的味道……像正在腐烂的果实，却还在努力香甜。我很喜欢你。',
        effects: { appreciation: 15, fear: 15 }
      }
    ],
    gifts: [
      { name: '腐朽抗性', desc: '下次面对腐朽权柄时抗性增加', chance: 0.3 }
    ]
  },
  defilement: {
    god: 'defilement',
    dialogues: [
      {
        speaker: '【污堕】',
        text: '你利用我的恐魔反杀了……你不害怕？',
        effects: { appreciation: 10, patience: 5, fear: 20 }
      },
      {
        speaker: '【污堕】',
        text: '恐惧是最真诚的情感。你真的不怕我吗？',
        choices: [
          { text: '"怕，但我能控制恐惧。"', effects: { appreciation: 5, fear: 0 } },
          { text: '"我怕你，但我更怕什么都不做。"', effects: { appreciation: 15, fear: 10 } },
          { text: '"你让我想起了一个人。"', effects: { appreciation: -5, fear: 15 } }
        ]
      },
      {
        speaker: '【污堕】',
        text: '嘿嘿……什么都不做？那你真的很会骗自己呢。没关系，我喜欢这种反差感。',
        effects: { appreciation: 12, fear: 18 }
      }
    ],
    gifts: [
      { name: '恐惧养料（额外）', desc: '骨仆戒指额外充能一份', chance: 0.4 }
    ]
  },
  truth: {
    god: 'truth',
    dialogues: [
      {
        speaker: '【真理】',
        text: '你在书塔中表现出了对知识的渴望。我观察你很久了。',
        effects: { appreciation: 10, patience: 10 }
      },
      {
        speaker: '【真理】',
        text: '谎言和真理，你认为哪个更接近本质？',
        choices: [
          { text: '"谎言揭示了真相的反面。"', effects: { appreciation: 15, fear: -5 } },
          { text: '"当然是真理。"', effects: { appreciation: -10, fear: 0 } },
          { text: '"都不是。本质在选择中。"', effects: { appreciation: 20, fear: 5 } }
        ]
      },
      {
        speaker: '【真理】',
        text: '你有一个有趣的灵魂。虽然我不喜欢你的信仰……但我不得不承认，你在追求某些东西。继续吧，让我看看你能走到哪一步。',
        effects: { appreciation: 15, fear: 0 }
      }
    ],
    gifts: [
      { name: '知识碎片', desc: '下次面对知识谜题时提供线索', chance: 0.2 }
    ]
  }
};
