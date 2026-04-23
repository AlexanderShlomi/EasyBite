import { Text, View } from "react-native";
import { EBScreen } from "@/src/ui/EBScreen";
import { EBButton } from "@/src/ui/EBButton";
import { EBContainer } from "@/src/ui/EBContainer";

export default function ReportsScreen() {
  return (
    <EBScreen>
      <EBContainer>
        <Text className="text-3xl font-semibold text-slate-900">Reports</Text>
        <Text className="mt-3 text-lg text-slate-700">
          We’ll generate clear, readable reports here (mock for now).
        </Text>
      </EBContainer>

      <View className="mt-8 gap-3">
        <EBButton
          variant="secondary"
          analyticsEvent="tap_secondary"
          analyticsProps={{ screen: "reports", action: "weekly_report_mock" }}
          onPress={() => {}}
        >
          Weekly report (mock)
        </EBButton>
        <EBButton
          variant="secondary"
          analyticsEvent="tap_secondary"
          analyticsProps={{ screen: "reports", action: "monthly_report_mock" }}
          onPress={() => {}}
        >
          Monthly report (mock)
        </EBButton>
      </View>
    </EBScreen>
  );
}

