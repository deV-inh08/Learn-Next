
"use client"

// import { z } from "zod"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema"
import envConfig from "@/config"
import { useAppContext } from "@/app/AppProvider"


const LoginForm = () => {
    const { setSessionToken } = useAppContext()
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: '',
            password: '',
        },
    })
    // 2. Define a submit handler.
    async function onSubmit(values: LoginBodyType) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async (res) => {
                const payload = await res.json()
                const data = {
                    status: res.status,
                    payload
                }
                toast(data.payload.message)
                if (!res.ok) {
                    throw data
                }
                return data
            })
            // fetch form next client to next server
            fetch('/api/auth', {
                method: 'POST',
                body: JSON.stringify(result)
            })
            setSessionToken(result.payload.data.token)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const errors = error.payload.errors as { field: 'email' | 'password', message: string }[]
            const status = error.status as number
            if (status === 422) {
                errors.forEach((error) => {
                    form.setError(error.field, {
                        type: 'Server',
                        message: error.message
                    })
                })
            } else {
                toast(error.payload.message as string)
            }
        }
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-[600px] shrink-0 w-full">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} type="email" />
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="mt-8 w-full" type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default LoginForm
