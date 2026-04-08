import { Suspense } from "react";
import Registration from "../../src/screens/Registration";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Registration />
    </Suspense>
  );
}

