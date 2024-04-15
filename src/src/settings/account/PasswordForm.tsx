"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
  
import { Button } from "@/components/ui/button"
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
import { toast } from "@/components/ui/use-toast"
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 3 characters.",
    }),
    confirmpassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    newpassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    oldpassword: z.string().min(8, {
        message: "Password must match your old password.",
    }),
})

export function PasswordForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            newpassword: "",
            confirmpassword: "",
            oldpassword: "",
        },
    })
 
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        toast({
            title: "Password Notification",
            description: "Your password has successfully been updated! A confirmation email has been sent to your email address.",
          })
    }

    return (
        <Dialog>
  <DialogTrigger asChild><Button variant="outline">Change Password</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Change Password</DialogTitle>
      <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="oldpassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Old Password</FormLabel>
                            <FormControl>
                                <Input className="w-96" placeholder="Old Password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter your old password to confirm changes.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
              
                    )}
                />
                <FormField
                    control={form.control}
                    name="newpassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input className="w-96" placeholder="New Password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Password must be at least 8 characters.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
              
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmpassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                                <Input className="w-96" placeholder="New Password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Password must match.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button>Submit</Button>
          
        </form>
      </Form>
      <DialogDescription>
        This action cannot be undone. This will change your password. To change again, resubmit this form.
        Your old password cannot be used again.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

        
    )
}

export default PasswordForm;