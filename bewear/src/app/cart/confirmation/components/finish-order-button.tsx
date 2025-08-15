"use client";

import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { useFinishOrder } from '@/hooks/mutations/use-finish-order';

const FinishOrderButton = () => {
    const [successDialogIsOpen, setSuccessDialogIsOpen] = useState(false);
    const finishOrderMutation = useFinishOrder();
    return (
        <>
            <Button
                className='w-full rounded-full'
                size={"lg"}
                onClick={() => finishOrderMutation.mutate()}
                disabled={finishOrderMutation.isPending}
            >
                {finishOrderMutation.isPending && (
                    <Loader2 className="h-4 animate-spin" />
                )}
                Finalizar pedido
            </Button>

            <Dialog open={successDialogIsOpen} onOpenChange={setSuccessDialogIsOpen}>
                <DialogContent className='text-center'>
                    <Image
                        src="/ilustrator.png"
                        alt="Pedido realizado com sucesso"
                        width={300}
                        height={300}
                        className="mx-auto mb-4"
                    />
                    <DialogTitle className="text-2xl mt-4">Pedido realizado com sucesso!</DialogTitle>
                    <DialogDescription className='font-medium'>
                        Seu pedido foi realizado com sucesso! Você receberá um e-mail com os detalhes do seu pedido em breve.
                    </DialogDescription>

                    <DialogFooter>
                        <Button className='rounded-full' size={"lg"}>Ver meus pedidos</Button>
                        <Button variant="outline" className='rounded-full' size={"lg"}> 
                            Voltar para a loja
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default FinishOrderButton