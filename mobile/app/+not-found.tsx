import { Link } from "expo-router";
import { View } from "react-native";
import { Text } from "@/components/ui";

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-3 bg-background p-5">
      <Text className="font-display text-xl">ไม่พบหน้านี้</Text>
      <Link href="/">
        <Text className="text-primary">กลับหน้าแต่งเพลง</Text>
      </Link>
    </View>
  );
}
