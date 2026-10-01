import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Platform, Pressable, ScrollView, Share, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Badge, Button, Card, CopyIcon, Share2Icon, Text, cn } from "@/components/ui";
import { buildLyricPrompt, buildSunoPrompt } from "@/lib/build-prompt";
import { success, tap } from "@/lib/haptics";
import { RHYMES } from "@/lib/song-data";
import { useSong } from "@/lib/song-store";

type Tab = "lyric" | "suno";
const TABS: { key: Tab; label: string }[] = [
  { key: "lyric", label: "เขียนเนื้อเพลง" },
  { key: "suno", label: "สไตล์ Suno/Udio" },
];

export default function PromptScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { state } = useSong();
  const [tab, setTab] = useState<Tab>("lyric");
  const [toast, setToast] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const text = tab === "lyric" ? buildLyricPrompt(state) : buildSunoPrompt(state);

  const flash = (msg: string) => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 2500);
  };

  const copy = async () => {
    try {
      await Clipboard.setStringAsync(text);
      success();
      flash("คัดลอกแล้ว");
    } catch {
      flash("คัดลอกไม่สำเร็จ ลองกดค้างที่ข้อความเพื่อคัดลอกเอง");
    }
  };

  const share = async () => {
    tap();
    try {
      await Share.share({ message: text });
    } catch {
      flash("แชร์ไม่สำเร็จ ลองกดคัดลอกแทน");
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="gap-4 px-4"
      contentContainerStyle={{ paddingTop: insets.top + 20, paddingBottom: 32 }}
    >
      <View className="gap-2 px-1">
        <Text className="font-display text-[32px] leading-[44px]">Prompt พร้อมใช้</Text>
        <View className="flex-row flex-wrap gap-1.5">
          <Badge>
            <Text>{state.genre ?? "ป๊อป"}</Text>
          </Badge>
          <Badge variant="secondary">
            <Text>{state.bpm} BPM</Text>
          </Badge>
          <Badge variant="secondary">
            <Text>{RHYMES[state.rhyme].t}</Text>
          </Badge>
          {state.moods.map((m) => (
            <Badge key={m} variant="outline">
              <Text>{m}</Text>
            </Badge>
          ))}
        </View>
      </View>

      <View className="flex-row rounded-xl bg-card p-1" role="tablist">
        {TABS.map((t) => {
          const active = t.key === tab;
          return (
            <Pressable
              key={t.key}
              role="tab"
              aria-selected={active}
              onPress={() => {
                tap();
                setTab(t.key);
                setToast("");
              }}
              className={cn("flex-1 items-center rounded-lg py-2.5", active && "bg-ink")}
            >
              <Text className={cn("text-sm", active ? "font-thai-semibold text-ink-foreground" : "text-muted-foreground")}>{t.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <Card className="rounded-2xl border-dashed p-4 shadow-none">
        <Text selectable className="text-[15px] leading-7">
          {text}
        </Text>
      </Card>

      <View className="gap-2.5">
        <View className="flex-row gap-2.5">
          <Button size="lg" className="flex-1 flex-row gap-2 rounded-xl" onPress={copy}>
            <CopyIcon size={20} className="text-primary-foreground" />
            <Text className="font-thai-semibold">คัดลอก</Text>
          </Button>
          {Platform.OS !== "web" ? (
            <Button size="lg" variant="outline" className="flex-1 flex-row gap-2 rounded-xl border-[1.5px] border-ink bg-transparent" onPress={share}>
              <Share2Icon size={20} className="text-foreground" />
              <Text className="font-thai-semibold">แชร์</Text>
            </Button>
          ) : null}
        </View>
        <Text aria-live="polite" className="min-h-6 text-center text-sm text-secondary-foreground">
          {toast}
        </Text>
        <Button variant="ghost" onPress={() => router.navigate("/")}>
          <Text className="text-muted-foreground">กลับไปแก้รายละเอียดเพลง</Text>
        </Button>
      </View>
    </ScrollView>
  );
}
