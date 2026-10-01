import { Pressable, View } from "react-native";
import { Text, cn } from "@/components/ui";
import { tap } from "@/lib/haptics";

interface RhymeOptionProps {
  title: string;
  description: string;
  example: string;
  selected: boolean;
  recommended: boolean;
  onPress: () => void;
}

export function RhymeOption({ title, description, example, selected, recommended, onPress }: RhymeOptionProps) {
  return (
    <Pressable
      role="radio"
      aria-checked={selected}
      onPress={() => {
        tap();
        onPress();
      }}
      className={cn(
        "rounded-xl border-[1.5px] px-3.5 py-3 active:opacity-80",
        selected ? "border-ink bg-secondary" : "border-border"
      )}
    >
      <View className="flex-row items-start justify-between gap-2">
        <Text className="flex-1 font-thai-semibold text-[15px] leading-6">{title}</Text>
        {recommended ? <Text className="font-thai-semibold text-xs leading-6 text-primary">แนะนำ</Text> : null}
      </View>
      <Text className="text-sm leading-6 text-muted-foreground">{description}</Text>
      <Text className="mt-1 text-sm leading-6 text-secondary-foreground">ตัวอย่าง: {example}</Text>
    </Pressable>
  );
}
