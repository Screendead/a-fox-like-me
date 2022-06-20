import { useEffect, useState } from "react";
import { useFirebase } from "./useFirebase";
import { FirebasePerformance, getPerformance } from "firebase/performance";

export function usePerformance() {
  const app = useFirebase();
  const [performance, setPerformance] = useState<FirebasePerformance>();

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const _performance = getPerformance(app);
      setPerformance(_performance);
    }
  }, [app]);

  return performance;
}
