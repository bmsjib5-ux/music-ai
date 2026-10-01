import { Tabs } from "expo-router";
import { Text, type ColorValue } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/HapticTab";
import { FileTextIcon, MusicIcon, useColorScheme } from "@/components/ui";
import { Colors } from "@/constants/Colors";

// ป้ายแท็บเขียนเอง เพราะป้ายเริ่มต้นสูงไม่พอสำหรับสระและวรรณยุกต์ภาษาไทย
function TabLabel({ title, color }: { title: string; color: ColorValue }) {
  return <Text style={{ color, fontFamily: "IBMPlexSansThai_500Medium", fontSize: 12, lineHeight: 18 }}>{title}</Text>;
}

export default function TabLayout() {
  const c = Colors[useColorScheme()];
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: c.tint,
        tabBarInactiveTintColor: c.muted,
        tabBarStyle: { backgroundColor: c.card, borderTopColor: c.border, height: 62 + insets.bottom, paddingTop: 6, paddingBottom: insets.bottom + 6 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "แต่งเพลง",
          tabBarLabel: ({ color }) => <TabLabel title="แต่งเพลง" color={color} />,
          tabBarIcon: ({ color }) => <MusicIcon size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="prompt"
        options={{
          title: "Prompt",
          tabBarLabel: ({ color }) => <TabLabel title="Prompt" color={color} />,
          tabBarIcon: ({ color }) => <FileTextIcon size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}
