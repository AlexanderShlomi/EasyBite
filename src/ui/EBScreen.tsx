import { PropsWithChildren } from "react";
import { SafeAreaView, View } from "react-native";

type Props = PropsWithChildren<{
  padded?: boolean;
  testID?: string;
}>;

export function EBScreen({ children, padded = true, testID }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-[#F9F9F7] dark:bg-[#0B1220]" testID={testID}>
      <View className={padded ? "flex-1 px-5 py-5" : "flex-1"}>{children}</View>
    </SafeAreaView>
  );
}

