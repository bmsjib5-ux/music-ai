import { View } from "react-native";
import { Card, Text } from "@/components/ui";

interface SectionProps {
  title: string;
  hint?: string;
  children: React.ReactNode;
}

export function Section({ title, hint, children }: SectionProps) {
  return (
    <Card className="gap-3 rounded-2xl p-4 shadow-none">
      <View className="gap-0.5">
        <Text className="font-display-regular text-xl leading-8">{title}</Text>
        {hint ? <Text className="text-sm leading-6 text-muted-foreground">{hint}</Text> : null}
      </View>
      {children}
    </Card>
  );
}
