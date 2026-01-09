// src/app/layout-client.tsx
"use client";

import { useEffect } from "react";
import { startKeepAlive } from "@/utils/keepAlive";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    startKeepAlive();
  }, []);

  return <>{children}</>;
}