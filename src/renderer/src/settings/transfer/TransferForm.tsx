"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button, buttonVariants } from "../../shadcn/components/ui/button";
import { cn } from "../../shadcn/lib/utils"
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
import { toast } from "../../shadcn/components/ui/use-toast"
import { Textarea } from "../../shadcn/components/ui/textarea";

const accountFormSchema = z.object({
  backend: z.enum(
    ["Go", "JS", "Rust"],
    {
      invalid_type_error: "Select a backend",
      required_error: "Please select a backend.",
    }
  ),
    defaultSaveFolder: z.string(),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
}
export function TransferForm() {
    const form = useForm<AccountFormValues>({
      resolver: zodResolver(accountFormSchema),
      defaultValues,
    })
  
    function onSubmit(data: AccountFormValues) {
      if(data){
        window.Electron.ipcRenderer.send('set-backend', data.backend);
      }
      toast({
        title: "Transfer Notification",
        description: "Your transfer settings have successfully been updated!",
      })
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="backend"
          defaultValue="Go"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Backend</FormLabel>
              <div className="relative w-max">
                <FormControl>
                  <select
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-[200px] appearance-none font-normal"
                    )}
                    {...field}
                  >
                    <option value="go">Go</option>
                    <option value="js">JS</option>
                    <option value="rust">Rust</option>
                  </select>
                </FormControl>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
              </div>
              <FormDescription>
                Set the backend you want to use for OrcaNet Program.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">    
          <FormField
            control={form.control}
            name="defaultSaveFolder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Default Save Folder</FormLabel>
                <FormControl>
                  <Input placeholder="\store\" {...field} />
                </FormControl>
                <FormDescription>
                  Insert path to your save folder.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
          <Button type="submit">Update Transfer Settings</Button>
        </form>
      </Form>
    )
  }