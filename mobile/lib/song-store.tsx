import * as React from "react";
import type { SongState } from "./build-prompt";
import { BPM_MAX, BPM_MIN, GENRES, IDEAS } from "./song-data";

function withGenreDefaults(state: SongState, genre: string): SongState {
  const rec = GENRES[genre];
  return { ...state, genre, insts: [...rec.inst], moods: [...rec.mood], rhyme: rec.rhyme, bpm: rec.bpm, structure: rec.str };
}

// เปิดแอปมาเจอตัวอย่างแนวป๊อปพร้อมค่าที่แนะนำ จะได้เห็นทันทีว่าแอปทำอะไร
const initialState: SongState = withGenreDefaults(
  {
    genre: null, moods: [], insts: [], rhyme: "abcb", bpm: 96, structure: "vpc",
    vocal: "นักร้องชาย", lang: "ภาษาไทย", pov: "บุรุษที่ 1 (ฉัน/เรา)", topic: "", keys: "",
  },
  "ป๊อป"
);

const toggle = (list: string[], item: string) =>
  list.includes(item) ? list.filter((x) => x !== item) : [...list, item];

const pick = <T,>(list: readonly T[]) => list[Math.floor(Math.random() * list.length)];

function useSongState() {
  const [state, setState] = React.useState<SongState>(initialState);
  return React.useMemo(
    () => ({
      state,
      set: <K extends keyof SongState>(key: K, value: SongState[K]) => setState((s) => ({ ...s, [key]: value })),
      toggleGenre: (g: string) => setState((s) => ({ ...s, genre: s.genre === g ? null : g })),
      toggleMood: (m: string) => setState((s) => ({ ...s, moods: toggle(s.moods, m) })),
      toggleInst: (i: string) => setState((s) => ({ ...s, insts: toggle(s.insts, i) })),
      setBpm: (bpm: number) => setState((s) => ({ ...s, bpm: Math.min(BPM_MAX, Math.max(BPM_MIN, bpm)) })),
      applyRecommended: () => setState((s) => (s.genre ? withGenreDefaults(s, s.genre) : s)),
      randomIdea: () => setState((s) => ({ ...withGenreDefaults(s, pick(Object.keys(GENRES))), topic: pick(IDEAS) })),
    }),
    [state]
  );
}

type SongStore = ReturnType<typeof useSongState>;
const SongContext = React.createContext<SongStore | null>(null);

export function SongProvider({ children }: { children: React.ReactNode }) {
  const store = useSongState();
  return <SongContext.Provider value={store}>{children}</SongContext.Provider>;
}

export function useSong() {
  const store = React.useContext(SongContext);
  if (!store) throw new Error("useSong must be used inside <SongProvider>");
  return store;
}
