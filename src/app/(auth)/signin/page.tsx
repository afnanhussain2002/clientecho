"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";

const SingIn = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });


  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
  const response = await signIn('credentials',{
    redirect:false,
    identifier: data.identifier,
    password: data.password
   })
   if (response?.error) {
    toast({
        title:"Login failed",
        description:"Incorrect username/email, password",
        variant:"destructive"
    })
    
   }
   if (response?.url) {
    router.replace('/dashboard')
   }

  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <div>
        <h1 className="text-2xl font-bold text-center text-gray-900">Sign In now</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700">Email or Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email/username"
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
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
                <FormLabel className="block text-sm font-medium text-gray-700">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="password"
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSubmitting ? (
              <>
                <Loader className="inline-block w-4 h-4 mr-2 animate-spin" />
                Please Wait
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </Form>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Not a member?{' '}
          <Link href="/signup" className="text-indigo-600 hover:text-indigo-800">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  </div>
  
  );
};

export default SingIn;
