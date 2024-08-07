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
import { RadioGroupItem } from "@/components/ui/radio-group"
import { zodResolver } from "@hookform/resolvers/zod"
import { RadioGroup } from "@radix-ui/react-radio-group"
import { useCreate } from "@refinedev/core"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  name: z.string({ required_error: "Bu alan gerekli" }),
  surname: z.string({ required_error: "Bu alan gerekli" }),
  email: z.string({ required_error: "Bu alan gerekli" }),
  username: z.string({ required_error: "Bu alan gerekli" }),
  isCorporate: z.string({ required_error: "Bu alan gerekli" }),
  shouldSendMembershipInfo: z.string({ required_error: "Bu alan gerekli" }),
  isEmailVerified: z.string({ required_error: "Bu alan gerekli" }),
})

export const CreateUser = () => {
  const { mutate: create, isLoading, error } = useCreate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const manipulatedValues = {
      ...values,
      //convert string values to boolean
      isCorporate: values.isCorporate === "true",
      shouldSendMembershipInfo: values.shouldSendMembershipInfo === "true",
      isEmailVerified: values.isEmailVerified === "true",
    }
    create(
      {
        resource: "user",
        values: manipulatedValues,
      },
      {
        onSuccess: (data) => {
          console.log("User created successfully:", data)
        },
        onError: (error) => {
          console.error("Error creating user:", error)
        },
      }
    )
    console.log(manipulatedValues)
  }

  return (
    <div>
      <main className="mt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex sm:flex-col gap-x-12"
          >
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-96 sm:w-[85%]">
                    <FormLabel>İsim</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem className="w-96 sm:w-[85%]">
                    <FormLabel>Soyisim</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-96 sm:w-[85%]">
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
                name="username"
                render={({ field }) => (
                  <FormItem className="w-96 sm:w-[85%]">
                    <FormLabel>Kullanıcı adı</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-96 sm:w-[85%] sm:hidden">
                Oluştur
              </Button>
            </div>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="isCorporate"
                render={({ field }) => (
                  <FormItem className="w-96 sm:w-[85%] mt-6">
                    <FormLabel>Kurumsal</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0 mt-1">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">Evet</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal">Hayır</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shouldSendMembershipInfo"
                render={({ field }) => (
                  <FormItem className="w-96 md:max-w-xs">
                    <FormLabel>Üyelik bilgileri gönderilsin mi?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0 mt-1">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">Evet</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal">Hayır</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isEmailVerified"
                render={({ field }) => (
                  <FormItem className="w-96 md:max-w-xs">
                    <FormLabel>Email onaylansın mı?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0 mt-1">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">Evet</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal">Hayır</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-96 sm:w-[85%] hidden sm:block">
                Oluştur
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  )
}

export default CreateUser
