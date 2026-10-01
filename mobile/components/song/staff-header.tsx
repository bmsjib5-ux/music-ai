import { View } from "react-native";
import { Text } from "@/components/ui";

/** หัวแอปบนบรรทัด 5 เส้นของโน้ตเพลง */
export function StaffHeader({ subtitle }: { subtitle: string }) {
  return (
    <View className="px-1 pb-2 pt-4">
      <View className="relative h-[72px] justify-center">
        <View className="absolute inset-x-0 top-1 gap-[15px]" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <View key={i} className="h-px bg-border" />
          ))}
        </View>
        <Text className="font-display text-[40px] leading-[56px]">
          โน้ตแต่งเพลง<Text className="font-display text-[34px] text-primary"> ♪</Text>
        </Text>
      </View>
      <Text className="mt-3 text-[15px] leading-6 text-muted-foreground">{subtitle}</Text>
    </View>
  );
}
