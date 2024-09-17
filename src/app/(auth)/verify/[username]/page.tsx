
import { useToast } from '@/hooks/use-toast';
import { verifySchema } from '@/schemas/verifySchema';
import { zodResolver } from '@hookform/resolvers/zod';
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
    
} catch (error) {
    
}

      }
    return (
        <div>
            
        </div>
    );
};

export default VerifyUsername;