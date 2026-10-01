import { Pressable, View } from "react-native";
import { Text, cn } from "@/components/ui";
import { tap } from "@/lib/haptics";

interface ChipProps {
  label: string;
  selected: boolean;
  /** จุดสีชมพู: ค่าที่แนะนำสำหรับแนวเพลงที่เลือก */
  recommended?: boolean;
  onPress: () => void;
}

export function Chip({ label, selected, recommended, onPress }: ChipProps) {
  return (
    <Pressable
      role="checkbox"
      aria-checked={selected}
      accessibilityLabel={recommended ? `${label} (แนะนำ)` : label}
      onPress={() => {
        tap();
        onPress();
      }}
      className={cn(
        "relative rounded-full border-[1.5px] px-4 py-2 active:opacity-80",
        selected ? "border-ink bg-ink" : "border-border bg-transparent"
      )}
    >
      <Text className={cn("text-[15px] leading-6", selected ? "text-ink-foreground" : "text-foreground")}>{label}</Text>
      {recommended ? (
        <View className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-card bg-primary" />
      ) : null}
    </Pressable>
  );
}

export function ChipRow({ children }: { children: React.ReactNode }) {
  return <View className="flex-row flex-wrap gap-2">{children}</View>;
}
