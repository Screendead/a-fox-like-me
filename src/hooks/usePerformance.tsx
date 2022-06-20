import { useEffect, useState } from "react";
import { useFirebase } from "./useFirebase";
import { FirebasePerformance, getPerformance } from "firebase/performance";

export function usePerformance() {
  const app = useFirebase();
  const [performance, setPerformance] = useState<FirebasePerformance>();

  useEffect(() => {
    const _performance = getPerformance(app);

    setPerformance(_performance);
  }, [app]);

  return performance;
}
