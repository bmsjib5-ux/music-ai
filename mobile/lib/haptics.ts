import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export function tap() {
  if (Platform.OS !== "web") Haptics.selectionAsync().catch(() => {});
}

export function success() {
  if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
}
