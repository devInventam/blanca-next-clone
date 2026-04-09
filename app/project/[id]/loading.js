"use client";

import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/common/Preloader";

export default function Loading() {
  return (
    <AnimatePresence>
      <Preloader key="preloader" isLoading />
    </AnimatePresence>
  );
}
