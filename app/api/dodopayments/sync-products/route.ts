import { NextResponse } from "next/server";
import { dodo } from "@/app/api/lib/dodopayments";
import fs from "fs/promises";
import path from "path";
import type { Product } from "@/data/types";

const PRODUCTS_JSON_PATH = path.join(
  process.cwd(),
  "data",
  "jsons",
  "products.json"
);

export async function POST() {
  const raw = await fs.readFile(PRODUCTS_JSON_PATH, "utf-8");
  const products: Product[] = JSON.parse(raw);

  const results: {
    sku: string;
    productName: string;
    dodoProductId: string;
    action: "created" | "skipped";
  }[] = [];

  for (const product of products) {
    for (const variant of product.variants) {
      if (variant.dodoProductId) {
        results.push({
          sku: variant.sku,
          productName: product.name,
          dodoProductId: variant.dodoProductId,
          action: "skipped",
        });
        continue;
      }

      const variantLabel = variant.options.map((o) => o.value).join(" / ");
      const priceInCents = Math.round((variant.price ?? product.price) * 100);

      const dodoProduct = await dodo.products.create({
        name: `${product.name} — ${variantLabel}`,
        description: product.description || undefined,
        price: {
          type: "one_time_price",
          currency: "INR",
          price: priceInCents,
          discount: 0,
          purchasing_power_parity: false,
        },
        tax_category: "digital_products",
        metadata: {
          sku: variant.sku,
          product_id: product.id,
          variant_slug: variant.slug,
        },
      });

      variant.dodoProductId = dodoProduct.product_id;

      results.push({
        sku: variant.sku,
        productName: `${product.name} — ${variantLabel}`,
        dodoProductId: dodoProduct.product_id,
        action: "created",
      });
    }
  }

  // Write updated products back to JSON
  await fs.writeFile(PRODUCTS_JSON_PATH, JSON.stringify(products, null, 2));

  const created = results.filter((r) => r.action === "created").length;
  const skipped = results.filter((r) => r.action === "skipped").length;

  return NextResponse.json({
    summary: { created, skipped, total: results.length },
    results,
  });
}
