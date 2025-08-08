
import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { cn } from "@/lib/utils";


interface ProductListProps {
    product: typeof productTable.$inferSelect & {
        variants: (typeof productVariantTable.$inferSelect)[];
    };
    textContainerClassName?: string;
}

const ProductItem = ({ product, textContainerClassName }: ProductListProps) => {
    const firstVariant = product.variants[0];
    return (
        <Link href={"/"} className="flex flex-col gap-4 px-3">
            <Image
                src={firstVariant.imageUrl}
                alt={firstVariant.name}
                sizes="100vw"
                width={0}
                height={0}
                className="rounded-3xl h-auto w-full"
            />
            <div className={cn("flex flex-col gap-1 max-w-[200px]", textContainerClassName)}>
                <p className="truncate text-sm font-medium">{product.name}</p>
                <p className="truncate text-xs text-muted-foreground font-medium">{product.description}</p>
                <p className="truncate text-sm font-semibold">{formatCentsToBRL(firstVariant.priceInCents)}</p>
            </div>
        </Link>
    );
}

export default ProductItem   