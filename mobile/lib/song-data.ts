export type RhymeKey = "tail" | "aabb" | "abab" | "abcb" | "klon" | "inner" | "mono" | "multi" | "free";
export type StructureKey = "vpc" | "vc" | "vpcb" | "classic" | "story" | "rap" | "aaba" | "edm";

export interface Genre {
  en: string;
  inst: string[];
  bpm: number;
  rhyme: RhymeKey;
  mood: string[];
  str: StructureKey;
}

export const GENRES: Record<string, Genre> = {
  "ป๊อป": { en: "Thai pop", inst: ["เปียโน", "กีตาร์โปร่ง", "ซินธ์", "กลอง", "เบส"], bpm: 104, rhyme: "abcb", mood: ["รักหวาน", "คิดถึง"], str: "vpc" },
  "บัลลาด": { en: "emotional ballad", inst: ["เปียโน", "เครื่องสาย", "กีตาร์โปร่ง"], bpm: 72, rhyme: "tail", mood: ["อกหัก", "คิดถึง"], str: "vpc" },
  "ลูกทุ่ง": { en: "Thai luk thung", inst: ["แซกโซโฟน", "กีตาร์ไฟฟ้า", "กลอง", "เบส", "แคน"], bpm: 112, rhyme: "klon", mood: ["อกหัก", "คิดถึง"], str: "classic" },
  "หมอลำ": { en: "mor lam, Isan folk", inst: ["พิณ", "แคน", "กลอง", "เบส"], bpm: 132, rhyme: "inner", mood: ["สนุก", "อกหัก"], str: "classic" },
  "เพื่อชีวิต": { en: "Thai folk-rock, phleng phua chiwit", inst: ["กีตาร์โปร่ง", "ขลุ่ย", "ฮาร์โมนิกา", "กลอง"], bpm: 92, rhyme: "klon", mood: ["ให้กำลังใจ", "ขบถ"], str: "story" },
  "ร็อก": { en: "rock", inst: ["กีตาร์ไฟฟ้า", "เบส", "กลอง"], bpm: 128, rhyme: "aabb", mood: ["ขบถ", "ปลุกใจ"], str: "vpc" },
  "อินดี้/โฟล์ค": { en: "indie folk", inst: ["กีตาร์โปร่ง", "อูคูเลเล่", "เปียโน"], bpm: 88, rhyme: "abcb", mood: ["เหงา", "คิดถึง"], str: "vc" },
  "อาร์แอนด์บี": { en: "R&B, soul", inst: ["เปียโนไฟฟ้า", "เบส", "กลอง", "ซินธ์"], bpm: 84, rhyme: "inner", mood: ["โรแมนติก", "เหงา"], str: "vpc" },
  "ฮิปฮอป/แร็พ": { en: "hip-hop, rap", inst: ["808", "ซินธ์", "กลอง", "เปียโน"], bpm: 90, rhyme: "multi", mood: ["ขบถ", "ปลุกใจ"], str: "rap" },
  "ซิตี้ป๊อป": { en: "city pop, retro 80s", inst: ["เบส", "ซินธ์", "กีตาร์ไฟฟ้า", "แซกโซโฟน"], bpm: 112, rhyme: "abab", mood: ["โรแมนติก", "คิดถึง"], str: "vpc" },
  "แจ๊ส": { en: "jazz", inst: ["เปียโน", "ดับเบิลเบส", "แซกโซโฟน", "กลอง"], bpm: 96, rhyme: "inner", mood: ["โรแมนติก", "เหงา"], str: "aaba" },
  "อีดีเอ็ม": { en: "EDM, dance", inst: ["ซินธ์", "808", "กลอง"], bpm: 126, rhyme: "mono", mood: ["สนุก", "ปลุกใจ"], str: "edm" },
  "โลไฟ": { en: "lo-fi chill", inst: ["เปียโนไฟฟ้า", "กีตาร์โปร่ง", "กลอง"], bpm: 76, rhyme: "free", mood: ["เหงา", "คิดถึง"], str: "vc" },
  "ทีป๊อป": { en: "T-pop, idol dance-pop", inst: ["ซินธ์", "808", "กลอง", "เบส"], bpm: 118, rhyme: "mono", mood: ["สนุก", "รักหวาน"], str: "vpcb" },
};

export const MOODS = ["อกหัก", "รักหวาน", "คิดถึง", "เหงา", "โรแมนติก", "สนุก", "ให้กำลังใจ", "ปลุกใจ", "ขบถ", "เศร้าลึก", "หวานอมขม", "ปล่อยวาง"];

export const MOOD_EN: Record<string, string> = {
  "อกหัก": "heartbroken", "รักหวาน": "sweet love", "คิดถึง": "longing", "เหงา": "lonely", "โรแมนติก": "romantic",
  "สนุก": "fun, upbeat", "ให้กำลังใจ": "hopeful, uplifting", "ปลุกใจ": "anthemic", "ขบถ": "rebellious",
  "เศร้าลึก": "melancholic", "หวานอมขม": "bittersweet", "ปล่อยวาง": "calm, letting go",
};

export const INSTS = ["กีตาร์โปร่ง", "กีตาร์ไฟฟ้า", "เปียโน", "เปียโนไฟฟ้า", "ซินธ์", "เบส", "ดับเบิลเบส", "กลอง", "808", "เครื่องสาย", "แซกโซโฟน", "ขลุ่ย", "ฮาร์โมนิกา", "อูคูเลเล่", "พิณ", "แคน", "ระนาด", "ซอ"];

export const INST_EN: Record<string, string> = {
  "กีตาร์โปร่ง": "acoustic guitar", "กีตาร์ไฟฟ้า": "electric guitar", "เปียโน": "piano", "เปียโนไฟฟ้า": "Rhodes electric piano",
  "ซินธ์": "synth", "เบส": "bass guitar", "ดับเบิลเบส": "upright bass", "กลอง": "drums", "808": "808 bass",
  "เครื่องสาย": "strings", "แซกโซโฟน": "saxophone", "ขลุ่ย": "Thai flute", "ฮาร์โมนิกา": "harmonica", "อูคูเลเล่": "ukulele",
  "พิณ": "phin (Thai lute)", "แคน": "khaen", "ระนาด": "ranat", "ซอ": "Thai fiddle",
};

export const RHYMES: Record<RhymeKey, { t: string; d: string; ex: string }> = {
  tail: { t: "สัมผัสท้ายบรรทัด", d: "คำท้ายบรรทัดใช้สระเดียวกัน ฟังง่าย ร้องตามง่าย", ex: "ยังจำ…วันนั้น / ที่เรา…ฝันกัน" },
  aabb: { t: "สัมผัสคู่ (AABB)", d: "บรรทัด 1–2 สัมผัสกัน 3–4 สัมผัสกัน ให้ความหนักแน่น", ex: "ไฟ / ใจ · ทาง / ร้าง" },
  abab: { t: "สัมผัสสลับ (ABAB)", d: "บรรทัดเว้นบรรทัดสัมผัสกัน ฟังมีจังหวะไหลลื่น", ex: "ฝน / ทาง / ทน / ร้าง" },
  abcb: { t: "สัมผัสบรรทัดคู่ (ABCB)", d: "สัมผัสเฉพาะบรรทัดที่ 2 กับ 4 เป็นธรรมชาติที่สุด นิยมในเพลงป๊อป", ex: "…/ เธอ / …/ เจอ" },
  klon: { t: "สัมผัสแบบกลอน (ส่งสัมผัสข้ามวรรค)", d: "คำท้ายวรรคส่งสัมผัสไปคำกลางวรรคถัดไป แบบกลอนแปด เหมาะกับลูกทุ่ง เพื่อชีวิต", ex: "ทุ่งนาเขียว…รอ / ยังเฝ้าพอ…ใจ" },
  inner: { t: "สัมผัสใน", d: "คำในวรรคเดียวกันสัมผัสสระหรือพยัญชนะกัน ให้ภาษาไพเราะ ลื่นปาก", ex: "รักร้าง ห่างหาย ใจสลาย" },
  mono: { t: "สัมผัสสระเดียวทั้งท่อน", d: "ทุกบรรทัดในท่อนฮุกจบด้วยสระเดียวกัน ติดหู จำง่าย", ex: "เธอ / เจอ / เผลอ / เพ้อ" },
  multi: { t: "สัมผัสหลายพยางค์ (แร็พ)", d: "สัมผัส 2–3 พยางค์ต่อเนื่อง ทั้งท้ายบรรทัดและกลางบรรทัด", ex: "ล้มลุกคลุกคลาน / ทุกวันที่ผ่าน" },
  free: { t: "อิสระ ไม่เน้นสัมผัส", d: "เน้นภาพและความรู้สึก ใช้สัมผัสเฉพาะที่เป็นธรรมชาติ", ex: "แสงไฟจากหน้าต่างห้องข้าง ๆ…" },
};

export const STRUCTS: Record<StructureKey, string> = {
  vpc: "Verse – Pre-Chorus – Chorus – Verse – Pre-Chorus – Chorus – Bridge – Chorus",
  vc: "Verse – Chorus – Verse – Chorus – Outro",
  vpcb: "Intro – Verse – Pre-Chorus – Chorus – Verse – Pre-Chorus – Chorus – Dance Break – Bridge – Chorus",
  classic: "ท่อนเกริ่น – ท่อน A – ท่อน A – ท่อนฮุก – ท่อนดนตรี – ท่อน A – ท่อนฮุก – ท่อนจบ",
  story: "Intro – Verse 1 – Verse 2 – Chorus – Verse 3 – Chorus – Outro",
  rap: "Intro – Verse 1 (16 บาร์) – Hook – Verse 2 (16 บาร์) – Hook – Bridge – Hook",
  aaba: "A – A – B – A (แบบเพลงแจ๊สมาตรฐาน)",
  edm: "Intro – Verse – Build-up – Drop – Verse – Build-up – Drop – Outro",
};

export const VOCALS: Record<string, string> = {
  "นักร้องชาย": "male vocals", "นักร้องหญิง": "female vocals", "คู่ชาย-หญิง": "male and female duet", "ประสานเสียงกลุ่ม": "group vocals",
};

export const LANGS: Record<string, string> = {
  "ภาษาไทย": "Thai lyrics", "ไทยผสมอังกฤษ": "Thai and English lyrics", "ภาษาอังกฤษ": "English lyrics",
  "ภาษาอีสาน": "Isan Thai lyrics", "คำเมือง": "Northern Thai lyrics",
};

export const POVS = ["บุรุษที่ 1 (ฉัน/เรา)", "พูดกับอีกคน (เธอ)", "ผู้เล่าเรื่อง (บุรุษที่ 3)"];

export const IDEAS = [
  "คนที่ยังรอแฟนเก่าที่ป้ายรถเมล์เดิมทุกเย็น",
  "เพื่อนสนิทที่แอบรักแต่ไม่กล้าบอก จนวันที่เขาส่งการ์ดแต่งงานมา",
  "เด็กต่างจังหวัดที่มาทำงานในเมืองและคิดถึงบ้าน",
  "คนที่เพิ่งลาออกจากงานที่เกลียด และรู้สึกเป็นอิสระครั้งแรก",
  "ความรักที่เริ่มจากแชตตอนตีสอง",
  "แม่ที่ส่งข้อความมาถามว่ากินข้าวหรือยังทุกวัน",
  "คู่รักที่ต้องอยู่ห่างกันคนละประเทศ",
  "คืนสุดท้ายก่อนย้ายออกจากห้องเช่าที่อยู่มาห้าปี",
  "คนที่ล้มเหลวซ้ำ ๆ แต่ยังไม่ยอมแพ้",
  "ฤดูฝนที่ทำให้นึกถึงรักครั้งแรก",
];

export const BPM_MIN = 60;
export const BPM_MAX = 180;

export function bpmText(v: number) {
  return v < 80 ? "ช้า ฟังสบาย" : v < 105 ? "ปานกลาง" : v < 130 ? "ค่อนข้างเร็ว" : "เร็ว มันส์";
}
