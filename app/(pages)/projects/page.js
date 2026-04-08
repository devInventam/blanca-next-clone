import { Suspense } from "react";
import Projects from "../../../screens/Projects";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Projects />
    </Suspense>
  );
}

