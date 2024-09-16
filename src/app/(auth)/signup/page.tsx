"use client"
import React, { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from 'next/link';
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation';
import { singUpSchema } from '@/schemas/signUpSchema';
import axios, { AxiosError } from "axios"
import { ApiResponse } from '@/types/ApiResponse';


const SingUp = () => {
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const debounced = useDebounceCallback(setUsername, 500)
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof singUpSchema>>({
    resolver:zodResolver(singUpSchema),
    defaultValues:{
      username:'',
      email:'',
      password:''
    }
  })

  useEffect(()=>{

 const checkUsernameUnique = async() =>{
  setIsCheckingUsername(true)
  setUsernameMessage('')
  try {
   const response = await axios.get(`/api/check-username-unique?username=${debounced}`)
    setUsernameMessage(response.data.message)
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    setUsernameMessage(axiosError.response?.data.message ?? "Error is checking")
  }finally{
    setIsCheckingUsername(false)
  }
 }
 checkUsernameUnique()
  },[debounced])

  const onSubmit = async(data: z.infer<typeof singUpSchema>)=> {
     setIsSubmitting(true)
     try {
      const response = await axios.post<ApiResponse>('/api/sign-up',data)
      toast({
        title:'Success',
        description:response.data.message
      })
      router.replace(`/verify/${username}`)
      setIsSubmitting(false)
     } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message
      toast({
        title:"Sing up failed",
        description:errorMessage,
        variant:"destructive"
      })
      setIsSubmitting(false)
     }
  }
  return (
    <div>
      
    </div>
  );
};

export default SingUp;