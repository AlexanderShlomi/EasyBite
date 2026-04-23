import { Text } from "react-native";
import { EBScreen } from "@/src/ui/EBScreen";
import { EBContainer } from "@/src/ui/EBContainer";

export default function ProfileScreen() {
  return (
    <EBScreen>
      <EBContainer>
        <Text className="text-3xl font-semibold text-slate-900">Profile</Text>
        <Text className="mt-3 text-lg text-slate-700">Coming soon.</Text>
      </EBContainer>
    </EBScreen>
  );
}

