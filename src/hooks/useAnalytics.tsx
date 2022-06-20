import { useEffect, useState } from "react";
import { useFirebase } from "./useFirebase";
import { Analytics, getAnalytics } from "firebase/analytics";

export function useAnalytics() {
  const app = useFirebase();
  const [analytics, setAnalytics] = useState<Analytics>();

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const _analytics = getAnalytics(app);
      setAnalytics(_analytics);
    }
  }, [app]);

  return analytics;
}
