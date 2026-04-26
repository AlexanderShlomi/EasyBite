import { useEffect, useState } from "react";
import { getOnboardingDone } from "./onboardingStorage";

export function useOnboardingGate() {
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const v = await getOnboardingDone();
      if (!mounted) return;
      setDone(v);
      setReady(true);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return { ready, done };
}

