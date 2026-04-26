import { PropsWithChildren } from "react";
import { View } from "react-native";
import { Colors } from "@/constants/theme";

type Props = PropsWithChildren<{
  className?: string;
  padded?: boolean;
}>;

export function EBContainer({ children, className, padded = true }: Props) {
  return (
    <View
      className={`rounded-3xl shadow-card border ${padded ? "p-6" : ""} ${className ?? ""}`}
      style={{ backgroundColor: Colors.light.surface, borderColor: Colors.light.border }}
    >
      {children}
    </View>
  );
}