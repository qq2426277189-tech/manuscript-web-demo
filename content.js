const LINES = [
  {
    id: 1,
    en: "I returned after midnight. The archive was still awake.",
    zh: "我午夜后回来。档案馆还醒着。",
    note: "不写“我很累”或“这里很安静”，只给两个事实：时间，以及建筑的状态。 awake 一个词把空间变成守夜者。",
    craft: "短句开场；用一个拟人词承担全部气氛，这是 1999 常见的“克制抒情”。",
    grammar: "两个独立短句；after midnight 作时间状语；was still awake 为系表结构。",
    words: [
      { term: "returned", meaning: "回来。比 came back 更书面，带一点档案口吻。" },
      { term: "after midnight", meaning: "午夜之后。不是“深夜”的泛称，而是具体的时间登记。" },
      { term: "awake", meaning: "醒着的。通常形容人，这里形容 archive，构成拟人。" }
    ],
    echo: "The archive was still awake",
    mood: "rain",
    source: "剧情 · 最后一份目录"
  },
  {
    id: 2,
    en: "Rain on the glass. One lamp left burning. A cup gone cold.",
    zh: "雨打在玻璃上。只剩一盏灯。一杯凉透的茶。",
    note: "三样物品并列，没有动词连接。时间流逝不靠解释，而靠那杯冷掉的茶说出来。",
    craft: "名词短语清单 + 逗号省略；情绪藏在物件里，不直接命名。",
    grammar: "三个名词短语独立成句；left burning / gone cold 都是过去分词作后置修饰。",
    words: [
      { term: "on the glass", meaning: "在玻璃上。指窗户，不说 window，画面更近。" },
      { term: "left burning", meaning: "被留着仍在燃烧；灯没有被关掉。" },
      { term: "gone cold", meaning: "已经变凉。go + 形容词表示状态变化。" }
    ],
    echo: "A cup gone cold",
    mood: "rain",
    source: "剧情 · 最后一份目录"
  },
  {
    id: 3,
    en: "On my desk lay a letter. It had not been there when I locked up.",
    zh: "桌上有一封信。我锁门时，它不在那里。",
    note: "地点状语放在句首，动词 lay 提前，镜头忽然落到桌面；第二句才把“不对劲”说出来，节奏像先看见、再明白。",
    craft: "先呈现，后解释；违和感来自事实之间的落差，而不是惊悚形容词。",
    grammar: "倒装：On my desk lay a letter；过去完成时 had not been；when 引导时间状语从句。",
    words: [
      { term: "lay", meaning: "位于；躺着。此处是 lie 的过去式。" },
      { term: "had not been", meaning: "过去完成时：在我锁门之前并不存在。" },
      { term: "locked up", meaning: "锁门；锁好（场所）。口语里很自然。" }
    ],
    echo: "It had not been there",
    mood: "desk",
    source: "剧情 · 最后一份目录"
  },
  {
    id: 4,
    en: "No seal. No name. Only a hand that wrote as if it feared being interrupted.",
    zh: "没有封印。没有姓名。只有一手字，写得仿佛怕被人打断。",
    note: "两次否定先清空信息，再把注意力交还给“字迹”。“怕被打断”让笔迹有了动作和情绪，却没有直接说“写信的人很紧张”。",
    craft: "否定并列 + 反常拟人；用 as if 把痕迹还原成一个正在发生的动作。",
    grammar: "No seal. No name. 为省略句；that 引导定语从句；as if + 过去式表虚拟；fear doing。",
    words: [
      { term: "seal", meaning: "封印；印章。信封上的身份标记。" },
      { term: "a hand", meaning: "一手字；笔迹。hand 可指书写风格。" },
      { term: "being interrupted", meaning: "被打断。fear + 动名词的被动式。" }
    ],
    echo: "a hand that feared being interrupted",
    mood: "desk",
    source: "剧情 · 最后一份目录"
  },
  {
    id: 5,
    en: "I nearly closed it. Nearly is a small word, and it has saved me more than once.",
    zh: "我差点把它合上。“差点”是个很小的词，它不止一次救过我。",
    note: "角色忽然从事件里退出来，替一个普通副词作注。箴言式的一句把“差一点没做”变成了自我认识。",
    craft: "把虚词实物化，再给一句轻描淡写的自评；1999 很爱这种“旁白式聪明”。",
    grammar: "nearly 作副词；第二句把 nearly 当名词用；has saved 现在完成时。",
    words: [
      { term: "nearly", meaning: "几乎；差点。这里被当作一个词本身来谈论。" },
      { term: "small word", meaning: "小词。表面谦卑，实际在强调它的分量。" },
      { term: "more than once", meaning: "不止一次。比 often 更含蓄。" }
    ],
    echo: "Nearly is a small word",
    mood: "desk",
    source: "剧情 · 最后一份目录"
  },
  {
    id: 6,
    en: "Paper keeps what hands let go. It is not loyalty. It is merely what paper does.",
    zh: "纸会留住手松开的东西。这不是忠诚。这只是纸会做的事。",
    note: "先给出一条近乎谚语的规则，再用两句短句撤掉浪漫解释。越是否认情绪，情绪越重。",
    craft: "陈述—否认—再陈述；用冷静的更正制造反讽，而不是抒情。",
    grammar: "what 引导宾语从句；let go 表示“放开”；merely 表示“仅仅”。",
    words: [
      { term: "keeps", meaning: "保存；留住。与后面的 let go 形成对照。" },
      { term: "let go", meaning: "松开；放手。" },
      { term: "merely", meaning: "只是；仅仅。语气克制、近乎冷淡。" }
    ],
    echo: "Paper keeps what hands let go",
    mood: "memory",
    source: "剧情 · 最后一份目录"
  },
  {
    id: 7,
    en: "A date. A street I had walked every day. A sentence that knew my name.",
    zh: "一个日期。一条我天天走过的街。一句知道我名字的话。",
    note: "三项列举像档案卡片逐张放下。前两项都平常，第三项突然越界：句子反过来认得人。",
    craft: "并列名词短语 + 最后一项越界；用“清单”承载神秘感。",
    grammar: "三个名词短语并列；I had walked every day 是省略关系词的定语从句；that knew my name 修饰 sentence。",
    words: [
      { term: "a date", meaning: "一个日期。档案里最中性的线索。" },
      { term: "had walked", meaning: "过去完成时：在那封信出现之前已经走了很多次。" },
      { term: "knew my name", meaning: "知道我的名字。know 的主语是 sentence，拟人。" }
    ],
    echo: "A sentence that knew my name",
    mood: "memory",
    source: "剧情 · 最后一份目录"
  },
  {
    id: 8,
    en: "I had spent eleven years teaching myself that memory was weather: it passed, and one went on.",
    zh: "我花了十一年说服自己，记忆是天气：它会过去，人还得继续走。",
    note: "把私人创伤说成气象常识，再用冒号冷静解释。 one 代替“我”，像在写一份不带姓名的报告。",
    craft: "隐喻 + 自我训诫；用泛化代词 one 把情绪压低，这是很典型的知识分子口吻。",
    grammar: "had spent + 时间 + doing；that 引导宾语从句；冒号后为解释；one 为泛指代词。",
    words: [
      { term: "had spent", meaning: "过去完成时：在今晚之前已经持续了十一年。" },
      { term: "teaching myself", meaning: "说服自己；自我训练。" },
      { term: "one went on", meaning: "人还得继续。one 泛指任何人，包括说话者。" }
    ],
    echo: "Memory was weather",
    mood: "memory",
    source: "剧情 · 最后一份目录"
  },
  {
    id: 9,
    en: "Yet here it was. Not weather. Ink. Gathering itself beneath the lamp with the patience of a thing that had waited for me.",
    zh: "可它在这里。不是天气。是墨。在灯下把自己一点点聚起来，像一个等过我的东西。",
    note: "连续三个短句纠偏：在这里、不是天气、是墨。最后才让记忆动起来，而且动得像一个有耐心的人。",
    craft: "短句断裂 + 逐项更正；拟人迟迟出现，所以出现时更有重量。",
    grammar: "Here 置于句首的倒装；Not weather. Ink. 为省略句；现在分词短语作伴随状语；beneath 为书面语。",
    words: [
      { term: "Yet", meaning: "然而。比 but 更书面，转折更安静。" },
      { term: "Ink", meaning: "墨。单独成句，像在档案上盖章。" },
      { term: "with the patience of", meaning: "带着……的耐心。用抽象名词作比喻。" }
    ],
    echo: "Ink, gathering itself",
    mood: "memory",
    source: "剧情 · 最后一份目录"
  },
  {
    id: 10,
    en: "Outside, the rain thinned. The city held its breath at the door.",
    zh: "外面的雨细了。城市在门前屏住呼吸。",
    note: "天气变化不再解释，直接交给城市一个动作。镜头从桌面推到门外，世界像另一个听众。",
    craft: "外部景物承担内心变化；一句拟人把空间扩大到整座城。",
    grammar: "thinned 为 thin 的过去式；held its breath 为固定表达；at the door 表示贴近门口。",
    words: [
      { term: "thinned", meaning: "变细；变稀。既可指雨，也可指声音。" },
      { term: "held its breath", meaning: "屏住呼吸。表示紧张或等待。" },
      { term: "at the door", meaning: "在门口。介词 at 有贴近感。" }
    ],
    echo: "The city held its breath",
    mood: "quiet",
    source: "剧情 · 最后一份目录"
  },
  {
    id: 11,
    en: "Some things are not kept. They are returned. There is a difference, and the archive knows it.",
    zh: "有些东西不是被保存，而是被归还。二者不同，档案馆知道。",
    note: "先给出定义，再把判断权交给机构。语气冷静到近乎傲慢，正是这类文本里“制度口吻”的魅力。",
    craft: "箴言 + 制度背书；不煽情，让一个机构说出比人更坚定的话。",
    grammar: "被动语态 are kept / are returned；There be 句型；and 连接并列分句。",
    words: [
      { term: "are kept", meaning: "被保存。keep 的被动语态。" },
      { term: "are returned", meaning: "被归还。return 的被动语态。" },
      { term: "the archive knows", meaning: "档案馆知道。把机构拟人成最终权威。" }
    ],
    echo: "Not kept. Returned.",
    mood: "quiet",
    source: "剧情 · 最后一份目录"
  },
  {
    id: 12,
    en: "So I wrote one word on the envelope: stay. Then I turned out the lamp.",
    zh: "于是我在信封上写下一个词：留下。然后关了灯。",
    note: "结尾只写两个动作，不写心情。 stay 既是命令也是请求；关灯让故事回到开头的那盏灯，完成闭环。",
    craft: "动作收束 + 物件回环；用最小的仪式代替总结陈词。",
    grammar: "So 引导结果；冒号引出同位语；turned out 表示“关掉（灯）”。",
    words: [
      { term: "So", meaning: "于是。承接前面的决定，不给解释。" },
      { term: "stay", meaning: "留下。一个词同时是命令、请求与承诺。" },
      { term: "turned out", meaning: "关掉。turn out the lamp 比 turn off the light 更有旧式语感。" }
    ],
    echo: "stay",
    mood: "ending",
    source: "剧情 · 最后一份目录"
  },
  {
    id: 13,
    en: "A good archive is not a room for answers. It is a room where questions may wait. We do not keep what we understand; we keep what we are not yet worthy to forget.",
    zh: "好的档案馆不是存放答案的房间，而是允许问题等待的房间。我们保存的并非已经懂得的东西，而是尚不配遗忘的东西。",
    note: "两句定义加一句悖论式箴言。 worthy to forget 把“记忆”变成一种资格问题，留下比理解更重的余味。",
    craft: "定义—修正—悖论；用 formal 的 we 说话，像档案守则，也像祷文。",
    grammar: "not... but... 语义；where 引导定语从句；分号连接并列句；be worthy to do。",
    words: [
      { term: "for answers", meaning: "为了答案。for 表示用途。" },
      { term: "may wait", meaning: "可以等待。may 表示允许，语气庄重。" },
      { term: "worthy to forget", meaning: "配得上遗忘。worthy + 不定式，构成悖论式表达。" }
    ],
    echo: "not yet worthy to forget",
    mood: "ending",
    source: "角色语音 · 档案管理员"
  }
];
