import { useToast } from '@/hooks/use-toast';
import { Message } from '@/model/User.model';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

const Dashboard = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSwitchLoading, setIsSwitchLoading] = useState(false)
    const {toast} = useToast()

    const handleDeleteMessage = (messageId:string) =>{
        setMessages(messages.filter((message) => message._id !== messageId))
    }
    const {data:session} = useSession()
    return (
        <div>
            dashboard
        </div>
    );
};

export default Dashboard;