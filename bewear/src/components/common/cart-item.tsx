import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { formatCentsToBRL } from "@/helpers/money";
import { useDecreaseCartProduct } from "@/hooks/mutations/use-decrease-cart-product";
import { useIncreaseCartProduct } from "@/hooks/mutations/use-increase-cart-product";
import { useRemoveProductFromCart } from "@/hooks/mutations/use-remove-product-from-cart";

import { Button } from "../ui/button";

interface CartItemProps {
    id: string;
    productName: string;
    productVariantId: string;
    productVariantName: string;
    productVariantImageUrl: string;
    productVariantPriceInCents: number;
    quantity: number;
}

const CartItem = ({
    id,
    productVariantId,
    productVariantImageUrl,
    productName,
    productVariantName,
    productVariantPriceInCents,
    quantity,
}: CartItemProps) => {

    const removeProductFromCartMutation = useRemoveProductFromCart(id);

    const decreaseCartProductQuantityMutation = useDecreaseCartProduct(id);

    const increaseCartProductQuantityMutation = useIncreaseCartProduct(productVariantId);

    const handleDeleteClick = () => {
        removeProductFromCartMutation.mutate(undefined, {
            onSuccess: () => {
                toast.success("Product removed from cart");
            },
            onError: () => {
                toast.error("Failed to remove product from cart");
            }
        });
    }

    const handleDecreaseQuantityClick = () => {
        decreaseCartProductQuantityMutation.mutate(undefined, {
            onSuccess: () => {
                toast.success("Product quantity decreased");
            },
        });
    };

    const handleIncreaseQuantityClick = () => {
        increaseCartProductQuantityMutation.mutate(undefined, {
            onSuccess: () => {
                toast.success("Product quantity increased");
            },
        });
    };

    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
                <Image src={productVariantImageUrl} alt={productVariantName} width={78} height={78} className="rounded-lg" />
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold">{productName}</p>
                    <p className="text-xs text-muted-foreground font-medium">{productVariantName}</p>
                    <div className="flex items-center border justify-between rounded-lg w-[100px] p-1">
                        <Button className="h-4 w-4" variant="ghost" onClick={handleDecreaseQuantityClick}>
                            <MinusIcon />
                        </Button>
                        <p className="text-xs font-medium">{quantity}</p>
                        <Button className="h-4 w-4" variant="ghost" onClick={handleIncreaseQuantityClick}>
                            <PlusIcon />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-end gap-1">
                <Button variant="outline" size="icon" onClick={handleDeleteClick}>
                    <TrashIcon />
                </Button>
                <p className="text-sm font-semibold mt-2">
                    {formatCentsToBRL(productVariantPriceInCents * quantity)}
                </p>
            </div>
        </div>
    )
}

export default CartItem