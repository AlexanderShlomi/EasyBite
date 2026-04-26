import { useCallback, useEffect, useState } from "react";
import { OnboardingAnswers } from "./onboardingSchema";
import { getOnboardingAnswers, setOnboardingAnswers } from "./onboardingStorage";

export function useOnboardingAnswers() {
  const [ready, setReady] = useState(false);
  const [answers, setAnswers] = useState<OnboardingAnswers>({});

  useEffect(() => {
    let mounted = true;
    (async () => {
      const v = await getOnboardingAnswers();
      if (!mounted) return;
      setAnswers(v);
      setReady(true);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const update = useCallback(async (patch: Partial<OnboardingAnswers>) => {
    setAnswers((prev) => {
      const next = { ...prev, ...patch };
      void setOnboardingAnswers(next);
      return next;
    });
  }, []);

  return { ready, answers, update };
}

