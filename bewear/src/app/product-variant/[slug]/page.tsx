import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import QuantitySelector from "./components/quantity-selector";
import VariantSelector from "./components/variant-selector";



interface ProductVariantPageProps {
  params: Promise<{ slug: string }>
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariants = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        }
      }
    }
  });
  if (!productVariants) {
    return notFound();
  }
  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariants.product.categoryId),
    with: {
      variants: true,
    },
  });
  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6">
        <Image
          src={productVariants.imageUrl}
          alt={productVariants.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full object-contain"
        />

        <div className="px-5">
          <VariantSelector selectedVariantSlug={productVariants.slug} variants={productVariants.product.variants} />
        </div>

        <div className="px-5">
          <h2 className="font-semibold text-lg">{productVariants.product.name}</h2>
          <h3 className="text-muted-foreground text-sm">{productVariants.name}</h3>
          <h3 className="text-lg font-semibold">{formatCentsToBRL(productVariants.priceInCents)}</h3>
        </div>

        <div className="px-5">
          <QuantitySelector />
        </div>

        <div className="px-5 space-y-4">
          <Button className="w-full rounded-full" variant={"outline"}>Adicionar ao carrinho</Button>
          <Button className="w-full flex flex-col rounded-full" size={"lg"}>Comprar agora</Button>
        </div>

        <div className="px-5">
          <p className="text-sm">{productVariants.product.description}</p>
        </div>

        <ProductList title="Talvez você goste" products={likelyProducts} />

        <Footer />
      </div>
    </>
  )
}

export default ProductVariantPage