"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    name: z.string("Digite seu nome").trim().min(1, "O nome é obrigatório"),
    email: z.email("Digite um email válido"),
    password: z.string("Digite uma senha").min(8, "A senha deve ter pelo menos 8 caracteres"),
    passwordConfirmation: z.string("Digite uma senha").min(8, "A senha deve ter pelo menos 8 caracteres"),
}).refine((data) => {
    return data.password === data.passwordConfirmation;
}, {
    error: "As senhas não coincidem",
    path: ["passwordConfirmation"],
});

type FormValue = z.infer<typeof formSchema>

const SignUpForm = () => {
    const form = useForm<FormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
            passwordConfirmation: ''
        }
    })

    function onSubmit(values: FormValue) {
        console.log('FORMULÁRIO ENVIADO!')
        console.log(values)
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Criar conta</CardTitle>
                    <CardDescription>
                        Crie uma nova conta para começar.
                    </CardDescription>
                </CardHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <CardContent className="grid gap-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite seu email" type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite seu nome" type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite sua senha" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="passwordConfirmation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmar Senha</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Confirme sua senha" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">Criar Conta</Button>
                        </CardFooter>
                    </form>
                </Form >
            </Card>
        </>
    )
}

export default SignUpForm