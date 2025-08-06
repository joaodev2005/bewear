"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    email: z.email("Digite um email válido"),
    password: z.string("Digite uma senha").min(8, "A senha deve ter pelo menos 8 caracteres"),
})

type FormValue = z.infer<typeof formSchema>

const SignInForm = () => {
    const form = useForm<FormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
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
                    <CardTitle>Entrar</CardTitle>
                    <CardDescription>
                        Faça login na sua conta para continuar.
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
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">Entrar</Button>
                        </CardFooter>
                    </form>
                </Form >
            </Card>
        </>
    )
}

export default SignInForm