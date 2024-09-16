"use client"
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from 'next/link';
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"


const SingUp = () => {
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState('')

  const debounced = useDebounceCallback(setUsername, 500)
  const { toast } = useToast()

  return (
    <div>
      
    </div>
  );
};

export default SingUp;