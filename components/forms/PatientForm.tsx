"use client"
import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Control } from "react-hook-form"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.action"
export enum FormFieldType{
    INPUT='input',
    TEXTAREA='textarea',
    PHONE='phoneInput',
    CHECKBOX='checkbox',
    DATE_PICKER='datePicker',
    SELECT='select',
    SKELETON='skeleton'
}


const PatientForm=()=> {
    const router=useRouter();
const[isLoading,setisLoading]=useState(false)

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:""

    },
  })

  
  async function onSubmit({name,email,phone}: z.infer<typeof UserFormValidation>) {
    setisLoading(true);

    try {
        const userData={
            name,
            email,
            phone
        }
        const user =await createUser(userData) 
        if(user) router.push(`/patients/${user.$id}/register`)
    } catch (error) {
        console.log(error)
    }
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋</h1>
            <p className="text-[#ABB8C4]">Schedule your first appointment</p>
        </section>
        <CustomFormField control={form.control}
        fieldType={FormFieldType.INPUT}
        name="name"
        label="Full name"
        placeholder="Jhon Doe"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"
        />
         <CustomFormField control={form.control}
        fieldType={FormFieldType.INPUT}
        name="email"
        label="Email"
        placeholder="abc@gmail.com"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email"
        />
         <CustomFormField control={form.control}
        fieldType={FormFieldType.PHONE}
        name="phone"
        label="Phone Number"
        placeholder="(555) 123-4567"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email"
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}
export default PatientForm;