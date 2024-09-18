import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { messageSchema } from '@/schemas/messageSchema';
import { z } from 'zod';
import { Button } from './ui/button';

const PublicForm = () => {
   
    const form = useForm<z.infer<typeof messageSchema>>({
        resolver: zodResolver(messageSchema),
      });

      const onSubmit = async (data: z.infer<typeof messageSchema>) => {

      }

    return (
       <>
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Write your message here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
       </>
    );
};

export default PublicForm;