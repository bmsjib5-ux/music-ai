import { bpmText, GENRES, INST_EN, LANGS, MOOD_EN, RHYMES, STRUCTS, VOCALS, type RhymeKey, type StructureKey } from "./song-data";

export interface SongState {
  genre: string | null;
  moods: string[];
  insts: string[];
  rhyme: RhymeKey;
  bpm: number;
  structure: StructureKey;
  vocal: string;
  lang: string;
  pov: string;
  topic: string;
  keys: string;
}

export function buildLyricPrompt(s: SongState) {
  const g = s.genre ?? "ป๊อป";
  const rh = RHYMES[s.rhyme];
  const topic = s.topic.trim() || "(ให้คิดเรื่องราวที่เข้ากับแนวและอารมณ์ที่เลือก)";
  const keys = s.keys.trim();
  return `ช่วยแต่งเนื้อเพลงให้หน่อย ตามรายละเอียดนี้

แนวเพลง: ${g}
อารมณ์: ${s.moods.length ? s.moods.join(", ") : "เข้ากับแนวเพลง"}
เรื่องราว: ${topic}
มุมมองการเล่า: ${s.pov}
ภาษา: ${s.lang}
เสียงร้อง: ${s.vocal}
ดนตรีประกอบ (เพื่อให้คำเข้ากับซาวด์): ${s.insts.length ? s.insts.join(", ") : "ตามความเหมาะสมของแนว"}
จังหวะ: ประมาณ ${s.bpm} BPM (${bpmText(s.bpm)}) ให้จำนวนพยางค์ต่อบรรทัดร้องได้พอดีกับความเร็วนี้

โครงสร้าง: ${STRUCTS[s.structure]}

การสัมผัส: ${rh.t}
- ${rh.d}
- ตัวอย่างลักษณะ: ${rh.ex}
${keys ? `\nคำ/วลีที่ต้องมีในเพลง: ${keys}\n` : ""}
ข้อกำหนดเพิ่มเติม:
- ท่อนฮุกต้องติดหู มีวลีหลักที่ซ้ำได้และเป็นชื่อเพลงได้
- ใช้ภาพและรายละเอียดที่จับต้องได้ เล่าด้วยฉาก สิ่งของ ช่วงเวลา แทนการบอกความรู้สึกตรง ๆ
- หลีกเลี่ยงคำซ้ำซากของเพลงรักทั่วไป
- เขียนป้ายกำกับแต่ละท่อน เช่น [Verse 1] [Chorus]
- ใส่ชื่อเพลงที่เสนอ 3 ชื่อ และอธิบายสั้น ๆ ว่าวางสัมผัสไว้ตรงไหนบ้าง`;
}

export function buildStyleTags(s: SongState) {
  const rec = GENRES[s.genre ?? "ป๊อป"];
  return [
    rec.en,
    ...s.moods.map((x) => MOOD_EN[x]),
    ...s.insts.map((x) => INST_EN[x]),
    `${s.bpm} BPM`,
    VOCALS[s.vocal],
    LANGS[s.lang],
  ].filter(Boolean);
}

export function buildSunoPrompt(s: SongState) {
  return `ช่อง Style of Music (คัดลอกไปวาง):
${buildStyleTags(s).join(", ")}

ช่อง Lyrics:
ให้นำเนื้อเพลงจากแท็บ "เขียนเนื้อเพลง" มาวาง โดยคงป้ายท่อน [Verse] [Chorus] ไว้ เพื่อให้ AI จัดโครงเพลงถูกต้อง

เคล็ดลับ: ใส่ไม่เกิน 6–8 แท็ก และวางแนวเพลงไว้หน้าสุด จะได้ผลชัดที่สุด`;
}
