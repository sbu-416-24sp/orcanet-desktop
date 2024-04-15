"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, ChevronDown, Check } from "lucide-react"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "../../lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea";

const accountFormSchema = z.object({
    defaultSaveFolder: z.string(),
    uploadRateLimit: z.string()
        .transform((val) => parseFloat(val))
        .refine(val => !isNaN(val) && val >= 2, { 
            message: "Upload rate limit must be at least 2 KiB/s.",
        }),
    downloadRateLimit: z.string()
        .transform((val) => parseFloat(val))
        .refine(val => !isNaN(val) && val >= 2, { 
            message: "Download rate limit must be at least 2 KiB/s.",
        }),
    seedingRatioLimit: z.string()
        .transform((val) => parseFloat(val))
        .refine(val => !isNaN(val) && val >= 2, { 
            message: "Seeding ratio limit must be at least 2.",
        }),
    //pasteJSONThemeConfiguration: z.string(),
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
      toast({
        title: "Transfer Notification",
        description: "Your transfer settings have successfully been updated! A confirmation email has been sent to your email address.",
      })
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <FormField
            control={form.control}
            name="seedingRatioLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seeding Ratio Limit (KiB/s)</FormLabel>
                <FormControl>
                    <Input placeholder="10" {...field} /> 
                </FormControl> 
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="uploadRateLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Rate Limit (KiB/s)</FormLabel>
                <FormControl>
                    <div className="flex items-center">
                        <Input placeholder="10" {...field} /> 
                        <span className="ml-2">KiB/s</span>
                    </div>
                </FormControl> 
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="downloadRateLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Download Rate Limit (KiB/s)</FormLabel>
                <FormControl>
                    <div className="flex items-center">
                        <Input placeholder="10" {...field} /> 
                        <span className="ml-2">KiB/s</span>
                    </div>
                </FormControl> 
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* <FormField
            control={form.control}
            name="pasteJSONThemeConfiguration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paste JSON Theme Configuration</FormLabel>
                <FormControl>
                    <Textarea placeholder="10" {...field} /> 
                </FormControl> 
                <FormDescription>
                  Paste your JSON Theme Configuration here.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button type="submit">Update Transfer Settings</Button>
        </form>
      </Form>
    )
  }


const SaveFolderSetting = () => {
    return (
      <div className="flex items-center mb-5">
        <span>Default save folder</span>
        <Input type="text" className="ml-5 w-96" placeholder="\store\" />
      </div>
    );
  };
  
  const UploadRateSetting = () => {
    return (
      <div className="flex items-center mb-5">
        <span>Upload Rate Limit</span>
        <Input type="text" className="ml-5 w-24 text-end" placeholder="10" />{" "}
        <span className="ml-2">KiB/s</span>
      </div>
    );
  };
  
  const DownloadRateSetting = () => {
    return (
      <div className="flex items-center mb-5">
        <span>Download Rate Limit</span>
        <Input type="text" className="ml-5 w-24 text-end" placeholder="10" />{" "}
        <span className="ml-2">KiB/s</span>
      </div>
    );
  };
  
  const SeedingLimitSetting = () => {
    return (
      <div className="flex items-center mb-5">
        <span>Seeding Ratio Limit</span>
        <Input type="text" className="ml-5 w-24 text-end" placeholder="1" />{" "}
      </div>
    );
  };
  const ThemeJSONSetting = () => {
    return (
      <div className="mb-5">
        <div className="mb-2 text-xs"><b>Paste JSON Theme Configuration</b></div>
        <Textarea className="w-[32rem]" />
      </div>
    );
  };