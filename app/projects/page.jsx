import { Suspense } from "react";
import Projects from "../../src/screens/Projects";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Projects />
    </Suspense>
  );
}

