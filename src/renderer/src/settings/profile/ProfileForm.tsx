"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "../../shadcn/lib/utils"
import { Button } from "../../shadcn/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../shadcn/components/ui/form"
import { Input } from "../../shadcn/components/ui/input"
import { Textarea } from "../../shadcn/components/ui/textarea"
import { toast } from "../../shadcn/components/ui/use-toast"

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  // email: z
  //   .string({
  //     required_error: "Please select an email to display.",
  //   })
  //   .email(),
  bio: z.string().max(160).min(4),
  // urls: z
  //   .array(
  //     z.object({
  //       value: z.string().url({ message: "Please enter a valid URL." }),
  //     })
  //   )
  //   .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "My name is Bubble Guppies and I'm a computer science student at Stony Brook University. I love to code and learn new things! 🚀",
  // urls: [
  //   { value: "https://www.stonybrook.edu/" }, 
  //   { value: "https://www.cs.stonybrook.edu/" },
  // ],
}

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  // const { fields, append } = useFieldArray({
  //   name: "urls",
  //   control: form.control,
  // })

  function onSubmit(data: ProfileFormValues) {
    if(data){
      //new stuff
    }
    toast({
      title: "Profile Notification",
      description: "Your profile information have successfully been updated! A confirmation email has been sent to your email address.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          defaultValue="Bubble Guppies"
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Bubble Guppies" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. Can be changed once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          defaultValue="bubble.guppies@stonybrook.edu"
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Linked Emails</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email for communications" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bubble.guppies@stonybrook.edu">bubble.guppies@stonybrook.edu</SelectItem>
                  <SelectItem value="gupplies@cs.stonybrook.edu">gupplies@cs.stonybrook.edu</SelectItem>
                  <SelectItem value="bubbleguppies2024@gmail.com">bubbleguppies2024@gmail.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage verified email addresses in your{" "}
                <a href="/settings/account" style={{ textDecoration: 'underline' }}>account settings</a>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Give a short description of yourself. This is displayed on your profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add URL
          </Button>
        </div> */}
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}
