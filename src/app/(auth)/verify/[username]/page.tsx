
import { useToast } from '@/hooks/use-toast';
import { verifySchema } from '@/schemas/verifySchema';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const VerifyUsername = () => {
    const router = useRouter()
    const params = useParams<{username:string}>()
    const {toast} = useToast()

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema)
      });

      const onSubmit = async(data: z.infer<typeof verifySchema>) =>{

try {
    const response = await axios.post('/api/verify-code',{
        username:params.username,
        code:data.code
    })
    toast({
        title:"Success",
        description:response.data.message
    })
    router.replace('/sign-in')
} catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    let errorMessage = axiosError.response?.data.message;
    toast({
      title: "Verify Failed",
      description: errorMessage,
      variant: "destructive",
    });
}
      }
    return (
        <div>
            
        </div>
    );
};

export default VerifyUsername;