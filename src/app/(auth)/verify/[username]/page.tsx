
import { useToast } from '@/hooks/use-toast';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

const VerifyUsername = () => {
    const router = useRouter()
    const params = useParams()
    const {toast} = useToast()

    
    return (
        <div>
            
        </div>
    );
};

export default VerifyUsername;