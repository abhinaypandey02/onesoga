import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:py-32">
      <h1 className="font-[family-name:var(--font-display)] text-[clamp(6rem,30vw,12rem)] leading-none tracking-tight text-[var(--accent)]">
        404
      </h1>
      <p className="mt-2 font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.2em] text-[var(--muted)] sm:text-base">
        This page doesn&apos;t exist
      </p>
      <Link
        href="/"
        className="mt-8 border-2 border-[var(--foreground)] bg-[var(--foreground)] px-6 py-3 font-[family-name:var(--font-body)] text-xs font-bold uppercase tracking-[0.15em] text-white transition-all duration-200 hover:border-[var(--accent)] hover:bg-[var(--accent)]"
      >
        Back to Home
      </Link>
    </section>
  );
}
