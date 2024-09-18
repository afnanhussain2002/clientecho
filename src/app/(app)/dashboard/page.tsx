import { useToast } from '@/hooks/use-toast';
import { Message } from '@/model/User.model';
import { acceptMessagesSchema } from '@/schemas/acceptMessageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Dashboard = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSwitchLoading, setIsSwitchLoading] = useState(false)
    const {toast} = useToast()

    const handleDeleteMessage = (messageId:string) =>{
        setMessages(messages.filter((message) => message._id !== messageId))
    }
    const {data:session} = useSession()

    const form = useForm({
        resolver: zodResolver(acceptMessagesSchema)
    })
    const {register, watch, setValue} = form
    return (
        <div>
            dashboard
        </div>
    );
};

export default Dashboard;