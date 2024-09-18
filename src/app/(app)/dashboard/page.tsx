"use client"
import MessageCard from '@/components/MessageCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Message } from '@/model/User.model';
import { acceptMessagesSchema } from '@/schemas/acceptMessageSchema';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2, RefreshCcw } from 'lucide-react';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
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

    const acceptMessages = watch('acceptMessages')

    const fetchAcceptMessage = useCallback(async () =>{
        setIsSwitchLoading(true)

        try {
           const response = await axios.get<ApiResponse>('/api/accept-messages')
           setValue('acceptMessages',response.data.isAcceptingMessages)
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title:"Error",
                description: axiosError.response?.data.message || "Failed to fetch message settings",
                variant:"destructive"
            })
        }finally{
            setIsSwitchLoading(false)
        }
    },[setValue,toast])

    const fetchMessages = useCallback(async(refresh:boolean = false) =>{
     setIsLoading(true)
     setIsSwitchLoading(false)

     try {
        const response = await axios.get<ApiResponse>('/api/get-messages')
        setMessages(response.data.messages || [])
        if (refresh) {
            toast({
                title:"Refreshed Messages",
                description:"Showing lates messages"
            })
        }
     } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
            title:"Error",
            description: axiosError.response?.data.message || "Failed to fetch message settings",
            variant:"destructive"
        })
     }finally{
        setIsLoading(false)
        setIsSwitchLoading(false)
     }
    },[toast])

    useEffect(() => {
        const initialize = async () => {
            if (!session || !session.user) {
                await fetchMessages();
            } else {
                await fetchAcceptMessage();
            }
        };

        initialize();
    }, [session, fetchAcceptMessage, fetchMessages]);

    const handleSwitchChange = async() =>{
        try {
            const response = await axios.post<ApiResponse>('/api/accept-messages',{
                acceptMessages: !acceptMessages
            })
            setValue('acceptMessages',!acceptMessages)
            toast({
                title: response.data.message,
                variant:"default"

            })
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title:"Error",
                description: axiosError.response?.data.message || "Failed to fetch message settings",
                variant:"destructive"
            })
        }
    }

    if (!session || !session.user) {
        return <div>Please Login</div>
    }

    const {username} = session.user as User

    const baseUrl = `${window.location.protocol}//${window.location.host}`

    const profileUrl = `${baseUrl}/u/${username}`

    const copyToClipboard = () => {
        navigator.clipboard.writeText(profileUrl)

        toast({
            title:"Copy to Clipboard"
        })

    }

    

    return (
        <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-8 bg-white rounded-lg shadow-lg w-full max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-800">User Dashboard</h1>
      
        <div className="mb-6">
          <h2 className="text-base md:text-lg font-semibold mb-3 text-gray-600">Copy Your Unique Link</h2>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={profileUrl}
              disabled
              className="input input-bordered w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <Button onClick={copyToClipboard} className="px-4 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition">
              Copy
            </Button>
          </div>
        </div>
      
        <div className="mb-6 flex items-center">
          <Switch
            {...register('acceptMessages')}
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
            className="mr-3"
          />
          <span className="text-gray-700">
            Accept Messages: <strong>{acceptMessages ? 'On' : 'Off'}</strong>
          </span>
        </div>
      
        <Separator className="my-6" />
      
        <Button
          className="px-5 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition focus:outline-none"
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            fetchMessages(true);
          }}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <RefreshCcw className="h-5 w-5" />
          )}
        </Button>
      
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <MessageCard
                key={index}
                message={message}
                onMessageDelete={handleDeleteMessage}
                className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
                
              />
            ))
          ) : (
            <p className="text-center text-gray-600">No messages to display.</p>
          )}
        </div>
      </div>
      
    );
};

export default Dashboard;