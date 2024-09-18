'use client'
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
        <div>
            Public Profile of {session?.user.username}
        </div>
    );
};

export default PublicProfile;