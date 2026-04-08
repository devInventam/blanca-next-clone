"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { ContactModalProvider } from "../src/context/ContactModalContext";

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ContactModalProvider>{children}</ContactModalProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

