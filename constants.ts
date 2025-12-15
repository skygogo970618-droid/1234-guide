import { Category, DollProfile, Question } from './types';

export const DOLLS: Record<Category, DollProfile> = {
  PeoplePleaser: {
    id: 'PeoplePleaser',
    name: '討好型',
    description: '戴著永恆的微笑面具，為了讓所有人滿意而耗盡了自己。',
    color: 'bg-doll-pleaser',
    icon: 'Smile',
    // 檔名結尾 97 (棕髮/天使光環)
    imageUrl: './people-pleaser.png'
  },
  Appearance: {
    id: 'Appearance',
    name: '容貌焦慮',
    description: '困在反射中的靈魂，總覺得自己不夠好，害怕別人的目光。',
    color: 'bg-doll-appearance',
    icon: 'ScanFace',
    // 檔名結尾 98 (繃帶/遮眼)
    imageUrl: './appearance.png'
  },
  Phone: {
    id: 'Phone',
    name: '手機成癮',
    description: '與世界時刻連結，卻與內心斷線。害怕錯過，害怕空白。',
    color: 'bg-doll-phone',
    icon: 'Smartphone',
    // 檔名結尾 99 (電線/大腦外露)
    imageUrl: './phone.png'
  },
  Perfectionist: {
    id: 'Perfectionist',
    name: '完美主義',
    description: '追求絕對的精確與完美，不容許一絲裂痕，卻活得緊繃易碎。',
    color: 'bg-doll-perfection',
    icon: 'Clock',
    // 檔名結尾 00 (制服/催眠眼)
    imageUrl: './perfectionist.png'
  }
};

export const FALLBACK_CONTENT: Record<Category, { advice: string; actionItems: string[] }> = {
  Appearance: {
    advice: "親愛的，鏡子只能反映外表，卻照不出你靈魂的深度。你對完美的追求讓你疲憊不堪，但請相信，真實的你比精修的照片更有溫度。試著放下對瑕疵的執著，你的價值不取決於別人的目光，而取決於你如何愛自己。請擁抱那個獨一無二的自己，你的存在本身就是一種美麗。",
    actionItems: ["今天照鏡子時，稱讚自己的一個優點", "停止修圖，發一張真實的生活照", "穿一件自己覺得舒適而非顯瘦的衣服"]
  },
  Phone: {
    advice: "親愛的，螢幕的光亮填補不了內心的空虛。你害怕錯過世界的動態，卻錯過了當下的寧靜。試著把目光從手機移開，看看窗外的風景，聽聽身邊人的聲音。真正的連結，發生在眼神交會的時刻，而非訊號滿格的時候。讓心靈重新上線，去感受真實世界的溫度吧。",
    actionItems: ["睡前一小時將手機放在臥室外", "設定每天 30 分鐘的「無機時間」", "出門散步時不帶手機"]
  },
  PeoplePleaser: {
    advice: "親愛的，你的善良很珍貴，但不該成為委屈自己的理由。你總是照顧別人的情緒，卻忘了聆聽自己的心聲。學會拒絕並不是自私，而是為了保留更多能量來愛那些真正值得的人。你的感受，同樣重要。請試著把「我」放在「我們」之前，你值得被自己溫柔對待。",
    actionItems: ["練習對一個不想去的邀約說「不」", "今天做一個完全以自己喜好為主的決定", "當感到委屈時，誠實地表達出來"]
  },
  Perfectionist: {
    advice: "親愛的，人生不是一張考卷，不需要事事都拿滿分。你緊繃的發條需要放鬆，允許自己犯錯，允許事情有裂痕，因為光就是從裂痕中照進來的。休息不是偷懶，而是為了走更長遠的路。不完美的你，依然值得被愛。請放下時鐘，聽聽自己內心的節奏。",
    actionItems: ["故意做一件只有 60 分及格就好的事", "給自己安排一段毫無目的的放空時間", "當事情不如預期時，對自己說「沒關係」"]
  }
};

export const QUESTIONS: Question[] = [
  // --- 容貌焦慮 (Appearance) ---
  { id: 1, category: 'Appearance', text: '出門前，你會花大量的時間在鏡子前檢查自己的妝容或穿著，直到最後一刻嗎？' },
  { id: 2, category: 'Appearance', text: '看到社交媒體上別人的精修照片，會讓你感到自卑或焦慮嗎？' },
  { id: 3, category: 'Appearance', text: '你是否避免在光線太亮或沒有濾鏡的情況下拍照？' },
  { id: 4, category: 'Appearance', text: '若有人盯著你看，你的第一反應是覺得自己身上有什麼地方不對勁嗎？' },
  { id: 5, category: 'Appearance', text: '你是否曾因為對外表的不滿而取消原本的社交計劃？' },

  // --- 手機成癮 (Phone) ---
  { id: 6, category: 'Phone', text: '如果手機不在身邊或快沒電了，你會感到莫名的恐慌或焦慮嗎？' },
  { id: 7, category: 'Phone', text: '睡覺前，你是否總是滑手機滑到眼睛睜不開才願意放下？' },
  { id: 8, category: 'Phone', text: '即使在看電影或與朋友聚餐，你也無法忍受超過 30 分鐘不看手機嗎？' },
  { id: 9, category: 'Phone', text: '你是否習慣性地解鎖螢幕，即使沒有特定的事情要做？' },
  { id: 10, category: 'Phone', text: '如果無法連上網路，你會覺得自己與世界脫節了嗎？' },

  // --- 討好型 (PeoplePleaser) ---
  { id: 11, category: 'PeoplePleaser', text: '面對別人的請求，即使自己很累或不方便，你也很難開口說「不」嗎？' },
  { id: 12, category: 'PeoplePleaser', text: '你是否經常因為擔心別人生氣，而隱藏自己真實的想法或感受？' },
  { id: 13, category: 'PeoplePleaser', text: '在做決定之前，你是否總是優先考慮別人的喜好，而非自己的需求？' },
  { id: 14, category: 'PeoplePleaser', text: '如果有人對你冷淡，你會立刻反省是不是自己做錯了什麼嗎？' },
  { id: 15, category: 'PeoplePleaser', text: '你常常覺得為別人付出是你的責任，但很少有人回報同樣的關心？' },

  // --- 完美主義 (Perfectionist) ---
  { id: 16, category: 'Perfectionist', text: '如果一件事情不能做到 100 分，你寧願完全不做或拖延開始嗎？' },
  { id: 17, category: 'Perfectionist', text: '你是否對微小的錯誤非常敏感，並且會反覆糾結很久？' },
  { id: 18, category: 'Perfectionist', text: '你很難把工作下放給別人，因為總覺得別人做不到你的標準？' },
  { id: 19, category: 'Perfectionist', text: '當你達成一個目標後，你很少慶祝，而是立刻尋找下一個更高的目標嗎？' },
  { id: 20, category: 'Perfectionist', text: '你是否常常覺得「休息」是在浪費時間？' },
];