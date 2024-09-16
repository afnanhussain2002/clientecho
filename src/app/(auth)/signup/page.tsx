"use client"
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from 'next/link';
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation';
import { singUpSchema } from '@/schemas/signUpSchema';


const SingUp = () => {
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState('')

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

  return (
    <div>
      
    </div>
  );
};

export default SingUp;