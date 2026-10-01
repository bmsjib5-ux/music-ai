import { Pressable, View } from "react-native";
import { CheckIcon, Text, cn } from "@/components/ui";
import { tap } from "@/lib/haptics";

interface OptionListProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  recommended?: T;
}

/** รายการตัวเลือกแบบเลือกได้ข้อเดียว เหมาะกับตัวเลือกที่ข้อความยาว */
export function OptionList<T extends string>({ options, value, onChange, recommended }: OptionListProps<T>) {
  return (
    <View className="overflow-hidden rounded-xl border border-border">
      {options.map((o, i) => {
        const selected = o.value === value;
        return (
          <Pressable
            key={o.value}
            role="radio"
            aria-checked={selected}
            onPress={() => {
              tap();
              onChange(o.value);
            }}
            className={cn(
              "flex-row items-center gap-3 px-3.5 py-3 active:bg-accent",
              i > 0 && "border-t border-border",
              selected && "bg-secondary"
            )}
          >
            <View className="w-5 items-center">{selected ? <CheckIcon size={18} className="text-ink" /> : null}</View>
            <Text className="flex-1 text-sm leading-6">{o.label}</Text>
            {o.value === recommended ? <Text className="font-thai-semibold text-xs text-primary">แนะนำ</Text> : null}
          </Pressable>
        );
      })}
    </View>
  );
}
