import AsyncStorage from "@react-native-async-storage/async-storage";
import { OnboardingAnswers, OnboardingAnswersSchema } from "./onboardingSchema";

const ANSWERS_KEY = "easybite:onboarding:answers:v1";
const DONE_KEY = "easybite:onboarding:done:v1";

export async function getOnboardingDone(): Promise<boolean> {
  const value = await AsyncStorage.getItem(DONE_KEY);
  return value === "true";
}

export async function setOnboardingDone(done: boolean): Promise<void> {
  await AsyncStorage.setItem(DONE_KEY, done ? "true" : "false");
}

export async function getOnboardingAnswers(): Promise<OnboardingAnswers> {
  const raw = await AsyncStorage.getItem(ANSWERS_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    return OnboardingAnswersSchema.partial().parse(parsed);
  } catch {
    return {};
  }
}

export async function setOnboardingAnswers(answers: OnboardingAnswers): Promise<void> {
  const safe = OnboardingAnswersSchema.partial().parse(answers);
  await AsyncStorage.setItem(ANSWERS_KEY, JSON.stringify(safe));
}

