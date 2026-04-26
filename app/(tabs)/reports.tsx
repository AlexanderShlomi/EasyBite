import { Text, View } from "react-native";
import { EBScreen } from "@/src/ui/EBScreen";
import { EBButton } from "@/src/ui/EBButton";
import { EBContainer } from "@/src/ui/EBContainer";

export default function ReportsScreen() {
  return (
    <EBScreen>
      <EBContainer>
        <Text className="text-3xl font-semibold text-slate-900 text-right">דוחות</Text>
        <Text className="mt-3 text-lg text-slate-700 text-right">כאן נציג דוחות ברורים וקריאים (דמו בשלב הזה).</Text>
      </EBContainer>

      <View className="mt-8 gap-3">
        <EBButton
          variant="secondary"
          analyticsEvent="tap_secondary"
          analyticsProps={{ screen: "reports", action: "weekly_report_mock" }}
          onPress={() => {}}
        >
          דוח שבועי (דמו)
        </EBButton>
        <EBButton
          variant="secondary"
          analyticsEvent="tap_secondary"
          analyticsProps={{ screen: "reports", action: "monthly_report_mock" }}
          onPress={() => {}}
        >
          דוח חודשי (דמו)
        </EBButton>
      </View>
    </EBScreen>
  );
}

