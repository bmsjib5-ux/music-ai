import { Pressable, View } from "react-native";
import { MinusIcon, PlusIcon, Text, cn } from "@/components/ui";
import { bpmText, BPM_MAX, BPM_MIN } from "@/lib/song-data";
import { tap } from "@/lib/haptics";

const PRESETS = [
  { label: "ช้า", bpm: 72 },
  { label: "กลาง", bpm: 96 },
  { label: "เร็ว", bpm: 120 },
  { label: "มันส์", bpm: 140 },
];

function StepButton({ onPress, label, disabled, children }: { onPress: () => void; label: string; disabled: boolean; children: React.ReactNode }) {
  return (
    <Pressable
      accessibilityLabel={label}
      disabled={disabled}
      onPress={() => {
        tap();
        onPress();
      }}
      className={cn("h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-border active:bg-accent", disabled && "opacity-40")}
    >
      {children}
    </Pressable>
  );
}

export function BpmControl({ bpm, recommended, onChange }: { bpm: number; recommended?: number; onChange: (bpm: number) => void }) {
  const fill = (bpm - BPM_MIN) / (BPM_MAX - BPM_MIN);
  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between">
        <StepButton label="ลด 4 BPM" disabled={bpm <= BPM_MIN} onPress={() => onChange(bpm - 4)}>
          <MinusIcon size={20} className="text-foreground" />
        </StepButton>
        <View className="items-center">
          <Text className="font-display text-[40px] leading-[52px]" style={{ fontVariant: ["tabular-nums"] }}>
            {bpm}
          </Text>
          <Text className="text-sm text-muted-foreground">BPM · {bpmText(bpm)}</Text>
        </View>
        <StepButton label="เพิ่ม 4 BPM" disabled={bpm >= BPM_MAX} onPress={() => onChange(bpm + 4)}>
          <PlusIcon size={20} className="text-foreground" />
        </StepButton>
      </View>
      <View className="h-1.5 overflow-hidden rounded-full bg-muted">
        <View className="h-full rounded-full bg-primary" style={{ width: `${Math.round(fill * 100)}%` }} />
      </View>
      <View className="flex-row flex-wrap gap-2">
        {PRESETS.map((p) => (
          <Pressable
            key={p.label}
            onPress={() => {
              tap();
              onChange(p.bpm);
            }}
            className="rounded-full bg-muted px-3 py-1.5 active:opacity-70"
          >
            <Text className="text-sm">
              {p.label} {p.bpm}
            </Text>
          </Pressable>
        ))}
        {recommended ? (
          <Pressable
            onPress={() => {
              tap();
              onChange(recommended);
            }}
            className="rounded-full bg-accent px-3 py-1.5 active:opacity-70"
          >
            <Text className="text-sm text-accent-foreground">แนะนำ {recommended}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
