import { useEffect, useState } from "react";
import { CLOSING_HOUR, OPENING_HOUR } from "@/data/site";

export interface OpenStatus {
  isOpen: boolean;
  /** Jam saat ini dalam WIB, mis. "09.41 WIB" */
  timeLabel: string;
}

function getJakartaTime(): { hour: number; minute: number } {
  const now = new Date();
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Jakarta",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).formatToParts(now);
    const hour = Number(parts.find((p) => p.type === "hour")?.value ?? now.getHours()) % 24;
    const minute = Number(parts.find((p) => p.type === "minute")?.value ?? now.getMinutes());
    return { hour, minute };
  } catch {
    // Fallback: hitung manual UTC+7
    const utc = now.getTime() + now.getTimezoneOffset() * 60_000;
    const wib = new Date(utc + 7 * 60 * 60_000);
    return { hour: wib.getHours(), minute: wib.getMinutes() };
  }
}

const pad = (n: number) => String(n).padStart(2, "0");

function compute(): OpenStatus {
  const { hour, minute } = getJakartaTime();
  const minutes = hour * 60 + minute;
  const isOpen = minutes >= OPENING_HOUR * 60 && minutes < CLOSING_HOUR * 60;
  return { isOpen, timeLabel: `${pad(hour)}.${pad(minute)} WIB` };
}

/** Status "Buka Sekarang" berdasarkan waktu WIB, diperbarui tiap menit. */
export function useOpenStatus(): OpenStatus {
  const [status, setStatus] = useState<OpenStatus>(() => compute());

  useEffect(() => {
    const id = window.setInterval(() => setStatus(compute()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return status;
}
