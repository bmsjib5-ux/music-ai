import "../global.css";
import { IBMPlexSansThai_400Regular, IBMPlexSansThai_500Medium, IBMPlexSansThai_600SemiBold } from "@expo-google-fonts/ibm-plex-sans-thai";
import { Mitr_400Regular, Mitr_600SemiBold } from "@expo-google-fonts/mitr";
import { useFonts } from "expo-font";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ThemeProvider as UIThemeProvider, useColorScheme } from "@/components/ui";
import { Colors } from "@/constants/Colors";
import { SongProvider } from "@/lib/song-store";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const scheme = useColorScheme();
  const [loaded, error] = useFonts({
    IBMPlexSansThai_400Regular,
    IBMPlexSansThai_500Medium,
    IBMPlexSansThai_600SemiBold,
    Mitr_400Regular,
    Mitr_600SemiBold,
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  // ถ้าโหลดฟอนต์ไม่ได้ ก็ยังเปิดแอปได้ด้วยฟอนต์ของระบบ
  if (!loaded && !error) return null;

  const c = Colors[scheme];
  const navTheme = scheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SongProvider>
        <UIThemeProvider>
          <ThemeProvider
            value={{ ...navTheme, colors: { ...navTheme.colors, background: c.background, card: c.card, border: c.border, text: c.text, primary: c.tint } }}
          >
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="+not-found" options={{ headerShown: true, title: "ไม่พบหน้านี้" }} />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </UIThemeProvider>
      </SongProvider>
    </GestureHandlerRootView>
  );
}
