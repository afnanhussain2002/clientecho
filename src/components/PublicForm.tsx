import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { messageSchema } from '@/schemas/messageSchema';
import { z } from 'zod';
import { Button } from './ui/button';
import dbConnect from '@/lib/dbConnect';
import axios from 'axios';
import { ApiResponse } from '@/types/ApiResponse';

const PublicForm = () => {
   
    const form = useForm<z.infer<typeof messageSchema>>({
        resolver: zodResolver(messageSchema),
      });

      const onSubmit = async (data: z.infer<typeof messageSchema>) => {
        await dbConnect()
        try {
          await axios.post<ApiResponse>('/api/send-message',data)
        } catch (error) {
          
        }
           
      }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Write your message here"
                    {...field}
                    className="w-full h-28 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage className="text-red-500 mt-1" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
    );
};

export default PublicForm;