import { getSEO } from "@/lib/seo";

export const metadata = getSEO("Return Policy", "Return and exchange policy for 1SOGA products.");

export default function ReturnPolicyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20">
      <span className="font-[family-name:var(--font-body)] text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--accent)] sm:text-xs">
        Policy
      </span>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl tracking-tight text-[var(--foreground)] sm:text-6xl">
        RETURN POLICY
      </h1>

      <div className="mt-8 space-y-6 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[var(--muted)] sm:text-base">
        <p>
          All sales on 1SOGA are <strong className="text-[var(--foreground)]">final</strong>. We do not offer returns, exchanges, or refunds on any products.
        </p>

        <p>
          Every item is made to order with care. Please double-check your size, colour, and shipping details before placing your order.
        </p>

        <p>
          If you receive a damaged or defective product, reach out to us within 48 hours of delivery and we will work with you to make it right.
        </p>
      </div>
    </section>
  );
}
