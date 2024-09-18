'use client'
import PublicForm from '@/components/PublicForm';
import { User } from '@/model/User.model';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

const PublicProfile = () => {

    const {data:session, status} = useSession()
    

   if (status === 'loading') {
    return <Loader2/>
   }
   if (!session || !session.user) {
    return <div>User Not Found</div>
}
    return (
        <div className='mt-10'>
            <h1 className='text-center text-4xl font-bold'>Public Profile Link</h1>
            <div>
                <p>Send Anonymous Message to @{session?.user.username} </p>
                <PublicForm/>
            </div>
        </div>
    );
};

export default PublicProfile;