
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
import authApiRequest from "@/apiRequest/auth"
import { useRouter } from "next/navigation"


const LoginForm = () => {
    const router = useRouter()
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
            const result = await authApiRequest.login(values)
            // fetch form next client to next server
            authApiRequest.auth({ sessionToken: result.payload.data.token })
            // display toast success
            toast(result.payload.message as string)
            // redirect page 'me'
            router.push('/me')
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
