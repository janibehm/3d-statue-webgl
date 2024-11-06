// src/pages/Contact.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Checkbox } from "../ui/checkbox";

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

// Form validation schema
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nimen täyty olla vähintään kaksi merkkiä" })
    .max(50, { message: "Nimen täyty olla enintään 50 merkkiä" }),
  email: z
    .string()
    .min(1, { message: "Sähköposti on pakollinen" })
    .email({ message: "Lisää sähköposti oikeassa muodossa" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(500, { message: "Message must be less than 500 characters" }),
  phone: z.string().optional(),
  privacy: z.boolean().refine((value) => value === true, {
    message: "Hyväksyn tietosuojakäytännön ja minuun voi olla yhteydessä",
  }),
});

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      privacy: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission
  }

  return (
    <div className="bg-slate-400 relative w-full min-h-screen flex items-start justify-center pt-[32vh]">
      <div className="w-full max-w-md mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-black text-center">Ota Yhteyttä</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Nimi</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nimesi"
                      {...field}
                      className="bg-white text-black border-black/20 placeholder:text-black/50"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    Sähköposti <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="esimerkki@sähköposti.com"
                      {...field}
                      className="bg-white text-black border-black/20 placeholder:text-black/50"
                      required
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Puhelinnumero</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+358 40 123 4567"
                      {...field}
                      type="tel"
                      className="bg-white text-black border-black/20 placeholder:text-black/50"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Viestisi meille</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Viestisi meille..."
                      {...field}
                      className="bg-white text-black border-black/20 placeholder:text-black/50"
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="privacy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-black">
                      Hyväksyn{" "}
                      <a
                        href="/privacy-policy"
                        className="text-black underline hover:text-black/80"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        tietosuojakäytännön
                      </a>
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormMessage className="text-red-600" />
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-black text-white hover:bg-black/90">
              Lähetä
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
