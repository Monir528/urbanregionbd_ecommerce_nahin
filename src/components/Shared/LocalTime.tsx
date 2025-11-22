"use client";

import { useMemo } from "react";

interface LocalTimeProps {
  utcDate: string; // e.g. "2025-09-01T18:49:40.943Z"
  dateStyle?: "full" | "long" | "medium" | "short";
  timeStyle?: "full" | "long" | "medium" | "short";
}

export default function LocalTime({
  utcDate,
  dateStyle = "medium",
  timeStyle = "short",
}: LocalTimeProps) {
  const formatted = useMemo(() => {
    const localDate = new Date(utcDate);
    return new Intl.DateTimeFormat(undefined, {
      dateStyle,
      timeStyle,
    }).format(localDate);
  }, [utcDate, dateStyle, timeStyle]);

  return <span>{formatted}</span>;
}