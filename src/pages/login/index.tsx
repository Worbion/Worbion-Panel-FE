import { Button } from "@/components/ui/button"
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
import { LoginFormTypes, useLogin } from "@refinedev/core"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  email: z
    .string()
    .min(10, {
      message: "Email 10 karakterden uzun olmalı!",
    })
    .max(40, {
      message: "Email 40 karakterden kısa olmalı!",
    }),
  password: z.string().max(30, {
    message: "Şifre 30 karakterden uzun olamaz!",
  }),
})

export const Login = () => {
  const { mutate: login } = useLogin<LoginFormTypes>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values
    console.log(values)
    login({ email, password })
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-96 md:max-w-xs">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-96 md:max-w-xs">
                <FormLabel>Şifre</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-96 md:max-w-xs">
            Giriş yap
          </Button>
        </form>
      </Form>
    </div>
  )
}
