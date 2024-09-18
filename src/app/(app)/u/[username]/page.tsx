'use client'
import { User } from '@/model/User.model';
import { useSession } from 'next-auth/react';
import React from 'react';

const PublicProfile = () => {
    const {data:session} = useSession()
   const {username} = session?.user as User
    return (
        <div>
            Public Profile of {username}
        </div>
    );
};

export default PublicProfile;