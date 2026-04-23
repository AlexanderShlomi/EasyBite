import { Text, View } from "react-native";
import { EBScreen } from "@/src/ui/EBScreen";
import { EBButton } from "@/src/ui/EBButton";
import { EBContainer } from "@/src/ui/EBContainer";

export default function HistoryScreen() {
  return (
    <EBScreen>
      <EBContainer>
        <Text className="text-3xl font-semibold text-slate-900">History</Text>
        <Text className="mt-3 text-lg text-slate-700">Your entries will appear here (mock for now).</Text>
      </EBContainer>

      <View className="mt-8">
        <EBButton
          variant="secondary"
          analyticsEvent="tap_secondary"
          analyticsProps={{ screen: "history", action: "add_entry_mock" }}
          onPress={() => {}}
        >
          Add an entry (mock)
        </EBButton>
      </View>
    </EBScreen>
  );
}

