"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"

const formSchema = z.object({
    email: z.email("Digite um email válido"),
    password: z.string("Digite uma senha").min(8, "A senha deve ter pelo menos 8 caracteres"),
})

type FormValue = z.infer<typeof formSchema>

const SignInForm = () => {
    const router = useRouter()
    const form = useForm<FormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    async function onSubmit(values: FormValue) {
        await authClient.signIn.email({
            email: values.email,
            password: values.password,
            fetchOptions: {
                onSuccess: () => {
                    router.push('/')
                },
                onError: (ctx) => {
                    if (ctx.error.code === "USER_NOT_FOUND") {
                        toast.error("E_mail incorreto")
                        return form.setError("email", {
                            message: "Email incorreto"
                        });
                    }
                    if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
                        toast.error("Senha incorreta ou e-mail")
                        return form.setError("email", {
                            message: "Senha incorreta ou e-mail"
                        });
                    }
                    toast.error(ctx.error.message)
                }
            }
        });
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