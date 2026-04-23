import { PropsWithChildren } from "react";
import { View } from "react-native";

export function EBContainer({ children }: PropsWithChildren) {
  return (
    <View className="bg-white rounded-3xl p-6 shadow-card border border-slate-100">
      {children}
    </View>
  );
}