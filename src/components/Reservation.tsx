import { useMemo, useState, type FormEvent } from "react";
import { CalendarDays, Check, ChevronDown, Clock, MessageCircle, Phone, RotateCcw, Users } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/utils/cn";
import { Button } from "./ui/Button";
import { SectionHeading } from "./ui/SectionHeading";

interface FormState {
  name: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const guestOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Lebih dari 10"];

function todayISO(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function formatDateID(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Mohon isi nama Anda.";
  if (!f.date) e.date = "Pilih tanggal reservasi.";
  else if (f.date < todayISO()) e.date = "Tanggal tidak boleh di masa lalu.";
  if (!f.time) e.time = "Pilih waktu kedatangan.";
  else if (f.time < "08:00") e.time = "Kami buka mulai pukul 08.00 WIB.";
  if (!f.guests) e.guests = "Pilih jumlah orang.";
  return e;
}

const labelClass = "mb-1.5 block text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-mocha";
const errorClass = "mt-1.5 text-xs font-medium text-rust";

export default function Reservation() {
  const [form, setForm] = useState<FormState>({ name: "", date: "", time: "", guests: "", notes: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<FormState | null>(null);
  const minDate = useMemo(() => todayISO(), []);

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`res-${firstKey}`)?.focus();
      return;
    }
    setSubmitted(form);
  };

  const reset = () => {
    setForm({ name: "", date: "", time: "", guests: "", notes: "" });
    setErrors({});
    setSubmitted(null);
  };

  const waMessage = submitted
    ? [
        `Halo ${site.name}, saya ingin reservasi meja.`,
        ``,
        `Nama: ${submitted.name.trim()}`,
        `Tanggal: ${formatDateID(submitted.date)}`,
        `Waktu: ${submitted.time.replace(":", ".")} WIB`,
        `Jumlah orang: ${submitted.guests}`,
        `Catatan: ${submitted.notes.trim() || "-"}`,
        ``,
        `Terima kasih!`,
      ].join("\n")
    : "";

  return (
    <section id="reservasi" className="relative overflow-hidden bg-espresso py-20 text-cream md:py-28" aria-labelledby="reservation-title">
      <div aria-hidden className="scallop-top absolute inset-x-0 top-0 rotate-180" />
      <div aria-hidden className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-rust/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-sage/20 blur-3xl" />

      <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-16">
        {/* Info */}
        <div className="lg:sticky lg:top-32">
          <SectionHeading
            id="reservation-title"
            align="left"
            tone="light"
            eyebrow="Reservasi"
            title={
              <>
                Pesan Meja, <em className="font-normal italic text-sand">Datang Tenang</em>
              </>
            }
            description="Isi formulir di samping, lalu kirim ringkasannya lewat WhatsApp. Cocok untuk kumpul keluarga, pertemuan kerja, atau sekadar memastikan sudut favoritmu tersedia."
          />

          <ul className="mt-9 space-y-5" role="list">
            {[
              { icon: Clock, title: "Jam Operasional", text: site.hours.label },
              { icon: Phone, title: "Telepon / WhatsApp", text: site.phone.display, href: `tel:${site.phone.tel}` },
              { icon: Users, title: "Rombongan & Keluarga", text: "Ramah anak, area outdoor, dan akses kursi roda tersedia." },
            ].map(({ icon: Icon, title, text, href }) => (
              <li key={title} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cream/40 text-sand">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-sand/80">{title}</p>
                  {href ? (
                    <a href={href} className="mt-0.5 block font-display text-lg text-cream underline-offset-4 hover:underline">
                      {text}
                    </a>
                  ) : (
                    <p className="mt-0.5 font-accent text-[1.02rem] text-cream/90">{text}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Tiket formulir */}
        <div className="relative">
          <div className="frame-double-light bg-cream p-2 text-espresso shadow-[8px_8px_0_0_var(--color-rust)]">
            <div className="border border-dashed border-espresso/40">
              {/* Kepala tiket */}
              <div className="flex items-center justify-between border-b border-dashed border-espresso/40 bg-parchment px-5 py-3 sm:px-7">
                <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-espresso">Tiket Reservasi</p>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-mocha/70">Mosa · Bandung</p>
              </div>

              {submitted ? (
                <div className="relative px-5 py-8 sm:px-7 sm:py-10" role="status" aria-live="polite">
                  <span className="stamp absolute right-5 top-6 -rotate-12 border-sage text-sage sm:right-8">Diterima</span>

                  <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-sage bg-sage/15 text-sage">
                    <Check className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-espresso sm:text-3xl">Terima kasih, {submitted.name.trim()}!</h3>
                  <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-mocha/85">
                    Ringkasan reservasi Anda sudah siap. Kirimkan lewat WhatsApp agar tim kami dapat segera mengonfirmasi ketersediaan
                    meja.
                  </p>

                  <dl className="mt-6 grid gap-x-8 gap-y-4 border-y border-dashed border-espresso/30 py-5 sm:grid-cols-2">
                    <div>
                      <dt className={labelClass}>Tanggal</dt>
                      <dd className="font-accent text-espresso">{formatDateID(submitted.date)}</dd>
                    </div>
                    <div>
                      <dt className={labelClass}>Waktu</dt>
                      <dd className="font-accent text-espresso">{submitted.time.replace(":", ".")} WIB</dd>
                    </div>
                    <div>
                      <dt className={labelClass}>Jumlah Orang</dt>
                      <dd className="font-accent text-espresso">{submitted.guests}</dd>
                    </div>
                    <div>
                      <dt className={labelClass}>Catatan</dt>
                      <dd className="font-accent text-espresso">{submitted.notes.trim() || "—"}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href={site.links.whatsapp(waMessage)} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4" aria-hidden />
                      Kirim via WhatsApp
                    </Button>
                    <Button variant="outline" onClick={reset}>
                      <RotateCcw className="h-4 w-4" aria-hidden />
                      Reservasi Lain
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="px-5 py-7 sm:px-7 sm:py-8">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="res-name" className={labelClass}>
                        Nama
                      </label>
                      <input
                        id="res-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Nama lengkap Anda"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "res-name-err" : undefined}
                        className={cn("input-retro", errors.name && "border-rust")}
                      />
                      {errors.name && (
                        <p id="res-name-err" className={errorClass}>
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="res-date" className={labelClass}>
                        Tanggal
                      </label>
                      <div className="relative">
                        <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mocha/50" aria-hidden />
                        <input
                          id="res-date"
                          name="date"
                          type="date"
                          min={minDate}
                          value={form.date}
                          onChange={(e) => update("date", e.target.value)}
                          aria-invalid={Boolean(errors.date)}
                          aria-describedby={errors.date ? "res-date-err" : undefined}
                          className={cn("input-retro appearance-none pr-10", errors.date && "border-rust")}
                        />
                      </div>
                      {errors.date && (
                        <p id="res-date-err" className={errorClass}>
                          {errors.date}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="res-time" className={labelClass}>
                        Waktu
                      </label>
                      <div className="relative">
                        <Clock className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mocha/50" aria-hidden />
                        <input
                          id="res-time"
                          name="time"
                          type="time"
                          min="08:00"
                          step={900}
                          value={form.time}
                          onChange={(e) => update("time", e.target.value)}
                          aria-invalid={Boolean(errors.time)}
                          aria-describedby={errors.time ? "res-time-err" : "res-time-help"}
                          className={cn("input-retro appearance-none pr-10", errors.time && "border-rust")}
                        />
                      </div>
                      {errors.time ? (
                        <p id="res-time-err" className={errorClass}>
                          {errors.time}
                        </p>
                      ) : (
                        <p id="res-time-help" className="mt-1.5 text-xs text-mocha/65">
                          Buka setiap hari mulai 08.00 WIB
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="res-guests" className={labelClass}>
                        Jumlah Orang
                      </label>
                      <div className="relative">
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mocha/50" aria-hidden />
                        <select
                          id="res-guests"
                          name="guests"
                          value={form.guests}
                          onChange={(e) => update("guests", e.target.value)}
                          aria-invalid={Boolean(errors.guests)}
                          aria-describedby={errors.guests ? "res-guests-err" : undefined}
                          className={cn("input-retro appearance-none pr-10", !form.guests && "text-espresso/50", errors.guests && "border-rust")}
                        >
                          <option value="" disabled>
                            Pilih jumlah orang
                          </option>
                          {guestOptions.map((g) => (
                            <option key={g} value={g}>
                              {g === "Lebih dari 10" ? g : `${g} orang`}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.guests && (
                        <p id="res-guests-err" className={errorClass}>
                          {errors.guests}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="res-notes" className={labelClass}>
                        Catatan Tambahan <span className="normal-case tracking-normal text-mocha/60">(opsional)</span>
                      </label>
                      <textarea
                        id="res-notes"
                        name="notes"
                        rows={3}
                        placeholder="Misal: meja outdoor, kursi anak, akses kursi roda, atau perayaan ulang tahun"
                        value={form.notes}
                        onChange={(e) => update("notes", e.target.value)}
                        className="input-retro resize-y"
                      />
                    </div>
                  </div>

                  <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-accent text-xs italic text-mocha/70">
                      Ringkasan akan dikirim ke WhatsApp {site.phone.display}.
                    </p>
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Kirim Reservasi
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
