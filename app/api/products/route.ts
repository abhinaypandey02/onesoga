import { NextResponse } from "next/server";
import products from "@/data/products";

export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  return NextResponse.json(
    products.flatMap((product) =>
      product.variants.map((variant) => ({
        title: `${product.name} — ${variant.options.map((o) => o.value).join(", ")}`,
        description: product.description,
        price: variant.price,
        image: variant.image,
        url: `${baseUrl}/products/${product.id}/${variant.slug}`,
      }))
    )
  );
}
