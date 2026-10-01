import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, Input, Text, ShuffleIcon, SparklesIcon } from "@/components/ui";
import { BpmControl } from "@/components/song/bpm-control";
import { Chip, ChipRow } from "@/components/song/chip";
import { OptionList } from "@/components/song/option-list";
import { RhymeOption } from "@/components/song/rhyme-option";
import { Section } from "@/components/song/section";
import { StaffHeader } from "@/components/song/staff-header";
import { tap } from "@/lib/haptics";
import { GENRES, INSTS, LANGS, MOODS, POVS, RHYMES, STRUCTS, VOCALS, type RhymeKey, type StructureKey } from "@/lib/song-data";
import { useSong } from "@/lib/song-store";

const STRUCT_OPTIONS = (Object.keys(STRUCTS) as StructureKey[]).map((k) => ({ value: k, label: STRUCTS[k] }));

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View className="gap-2">
      <Text className="text-sm text-muted-foreground">{label}</Text>
      {children}
    </View>
  );
}

export default function ComposeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const song = useSong();
  const { state } = song;
  const rec = state.genre ? GENRES[state.genre] : null;

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="gap-3.5 px-4"
      contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: 32 }}
      keyboardShouldPersistTaps="handled"
    >
      <StaffHeader subtitle="เลือกแนวเพลง อารมณ์ เครื่องดนตรี และแบบสัมผัส แล้วรับ prompt พร้อมใช้ ทั้งสำหรับให้ AI เขียนเนื้อร้อง และสำหรับ Suno หรือ Udio จุดสีชมพูคือค่าที่แนะนำ" />

      <Section title="แนวเพลง" hint="เลือกได้หนึ่งแนว ระบบจะแนะนำเครื่องดนตรี จังหวะ และสัมผัสที่เข้ากันให้">
        <ChipRow>
          {Object.keys(GENRES).map((g) => (
            <Chip key={g} label={g} selected={state.genre === g} onPress={() => song.toggleGenre(g)} />
          ))}
        </ChipRow>
        {rec ? (
          <View className="gap-3 rounded-xl bg-accent p-3.5">
            <Text className="text-sm leading-6 text-accent-foreground">
              <Text className="font-thai-semibold text-sm text-accent-foreground">แนะนำสำหรับ{state.genre}: </Text>
              {rec.inst.join(", ")} · ประมาณ {rec.bpm} BPM · {RHYMES[rec.rhyme].t} · อารมณ์{rec.mood.join("/")}
            </Text>
            <Button
              size="sm"
              className="self-start rounded-full"
              onPress={() => {
                tap();
                song.applyRecommended();
              }}
            >
              <Text>ใช้ค่าที่แนะนำทั้งหมด</Text>
            </Button>
          </View>
        ) : null}
      </Section>

      <Section title="อารมณ์ของเพลง" hint="เลือกได้หลายอย่าง แต่ 1–2 อย่างจะชัดที่สุด">
        <ChipRow>
          {MOODS.map((m) => (
            <Chip key={m} label={m} selected={state.moods.includes(m)} recommended={rec?.mood.includes(m)} onPress={() => song.toggleMood(m)} />
          ))}
        </ChipRow>
      </Section>

      <Section title="เครื่องดนตรี" hint="เลือกได้หลายชิ้น มีทั้งเครื่องสากลและเครื่องดนตรีไทย">
        <ChipRow>
          {INSTS.map((i) => (
            <Chip key={i} label={i} selected={state.insts.includes(i)} recommended={rec?.inst.includes(i)} onPress={() => song.toggleInst(i)} />
          ))}
        </ChipRow>
      </Section>

      <Section title="จังหวะ">
        <BpmControl bpm={state.bpm} recommended={rec?.bpm} onChange={song.setBpm} />
      </Section>

      <Section title="การสัมผัส" hint="เลือกหนึ่งแบบเป็นหลัก">
        <View className="gap-2">
          {(Object.keys(RHYMES) as RhymeKey[]).map((k) => (
            <RhymeOption
              key={k}
              title={RHYMES[k].t}
              description={RHYMES[k].d}
              example={RHYMES[k].ex}
              selected={state.rhyme === k}
              recommended={rec?.rhyme === k}
              onPress={() => song.set("rhyme", k)}
            />
          ))}
        </View>
      </Section>

      <Section title="รายละเอียดเพลง">
        <Field label="โครงสร้างเพลง">
          <OptionList options={STRUCT_OPTIONS} value={state.structure} recommended={rec?.str} onChange={(v) => song.set("structure", v)} />
        </Field>
        <Field label="เสียงร้อง">
          <ChipRow>
            {Object.keys(VOCALS).map((v) => (
              <Chip key={v} label={v} selected={state.vocal === v} onPress={() => song.set("vocal", v)} />
            ))}
          </ChipRow>
        </Field>
        <Field label="ภาษาเนื้อร้อง">
          <ChipRow>
            {Object.keys(LANGS).map((l) => (
              <Chip key={l} label={l} selected={state.lang === l} onPress={() => song.set("lang", l)} />
            ))}
          </ChipRow>
        </Field>
        <Field label="มุมมองการเล่า">
          <ChipRow>
            {POVS.map((p) => (
              <Chip key={p} label={p} selected={state.pov === p} onPress={() => song.set("pov", p)} />
            ))}
          </ChipRow>
        </Field>
        <Field label="เพลงนี้เล่าเรื่องอะไร">
          <Input
            multiline
            value={state.topic}
            onChangeText={(t) => song.set("topic", t)}
            placeholder="เช่น คนที่ยังรอแฟนเก่าที่ป้ายรถเมล์เดิมทุกเย็น ทั้งที่รู้ว่าเขาไม่กลับมา"
            className="native:h-auto h-auto min-h-[96px] rounded-xl border-[1.5px] py-3 font-sans leading-6"
            style={{ textAlignVertical: "top" }}
          />
        </Field>
        <Field label="คำหรือวลีที่อยากให้มีในเพลง (ไม่บังคับ)">
          <Input
            value={state.keys}
            onChangeText={(t) => song.set("keys", t)}
            placeholder="เช่น ฝนแรก, ร่มคันเก่า"
            className="rounded-xl border-[1.5px] font-sans"
          />
        </Field>
      </Section>

      <View className="gap-2.5 pt-1">
        <Button
          size="lg"
          className="flex-row gap-2 rounded-xl"
          onPress={() => {
            tap();
            router.navigate("/prompt");
          }}
        >
          <SparklesIcon size={20} className="text-primary-foreground" />
          <Text className="font-thai-semibold">สร้าง prompt</Text>
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="flex-row gap-2 rounded-xl border-[1.5px] border-ink bg-transparent"
          onPress={() => {
            tap();
            song.randomIdea();
            router.navigate("/prompt");
          }}
        >
          <ShuffleIcon size={20} className="text-foreground" />
          <Text className="font-thai-semibold">สุ่มไอเดียให้</Text>
        </Button>
      </View>
    </ScrollView>
  );
}
