"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import { addProductToCart } from '@/actions/add-cart-product';
import { Button } from '@/components/ui/button';

interface AddToCartButtonProps {
    productVariantId: string;
    quantity: number;
}

const AddToCartButton = ({ productVariantId, quantity }: AddToCartButtonProps) => {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationKey: ['addProductToCart', productVariantId, quantity],
        mutationFn: () => addProductToCart({
            productVariantId,
            quantity: 1,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    })
    return (
        <Button className="w-full rounded-full" variant={"outline"} disabled={isPending} onClick={() => mutate()}>
            {isPending && <Loader2 className="animate-spin" />}
            Adicionar ao carrinho
        </Button >
    )
}

export default AddToCartButton