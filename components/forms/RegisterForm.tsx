"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Control } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { PatientFormValidation, UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser, registerPatient } from "@/lib/actions/patient.action";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants";
import { Label } from "@/components/ui/label"
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";
const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
  ...PatientFormDefaultValues,
  name: "",
  email: "",
  phone: "",
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
}
  });

  async function onSubmit(
    values: z.infer<typeof PatientFormValidation>) {
    setisLoading(true);
    let formData;

    if(values.identificationDocument && values.identificationDocument.length>0){
      const bolbFile=new Blob([values.identificationDocument[0]],{
        type:values.identificationDocument[0].type
      })
      formData=new FormData();
      formData.append('blobFile',bolbFile);
      formData.append('filename',values.identificationDocument[0].name)
    }

    try {
      
      const patientData={
        ...values,
        userId:user.$id,
        birthDate: values.birthDate?.toISOString(),
        identificationDocument:formData
        
      }
      console.log("Sending to registerPatient:", patientData);
//@ts-ignore
      const patient=await registerPatient(patientData)
      console.log("Register patient response:", patient);
      if(patient) router.push(`/patients/${user.$id}/new-appointment`)
        
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-[#ABB8C4]">Let us konw about yourself</p>
        </section>
        <section className="mb-12 space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full Name"
          placeholder="Jhon Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
          
        />
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="email"
            label="Email"
            placeholder="abc@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE}
            name="phone"
            label="Phone Number"
            placeholder="(555) 123-4567"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            name="birthDate"
            label="Date of Birth"
           
            
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            name="gender"
            label="Gender"
            placeholder="(555) 123-4567"
            
            renderSkeleton={(field) => (
                <FormControl className="flex h-11 gap-6 xl:justify-between">
                    <RadioGroup onChange={field.onChange} defaultValue={field.value}>
                        {GenderOptions.map((option:any)=>{
                            return(
                                <div key={option} className="radio-group">
                                    <RadioGroupItem value={option}/>
                                    <Label htmlFor={option} className="cursor-pointer">
                                        {option}
                                    </Label>
                                </div>
                            )
                        })}
                    </RadioGroup>
                </FormControl>
            )}
          />

        </div>
        
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="address"
            label="Address"
            placeholder="14th street, New York"
            
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="occupation"
            label="Occupation"
            placeholder="Software Engineer"
            
          />

        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="emergencyContactName"
            label="Emercency Contact Name"
            placeholder="Guardian's Name"
            
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE}
            name="emergencyContactNumber"
            label="Emergency Contact Number"
            placeholder="(555)123-4567"
            
          />

        </div>
        <section className="mb-12 space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>
        <div className="flex flex-col gap-6 xl:flex-row ">
           <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="primaryPhysician"
            label="Primary Physician"
            placeholder="select a physician"
            
          >
            {Doctors.map((doctors)=>{
                return (
                    <SelectItem key={doctors.name} value={doctors.name}>
                        <div className="flex cursor-pointer items-center gap-2">
                            <Image src={doctors.image} width={32} height={32} alt={doctors.name} className="rounded-full border border-[#363A3D]" />
                            <p>{doctors.name}</p>
                        </div>
                    </SelectItem>
                )
            })}
          </CustomFormField>

        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="BlueCross Blueshield"
            
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="insurancePolicyNumber"
            label="Insurance Policy Number"
            placeholder="ABC12345"
            
          />

        </div>


        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="allergies"
            label="Allergies"
            placeholder="Penicillin, etc..."
            
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="currentMedication"
            label="Current Medication (if any)"
            placeholder="Ibuprofen 200mg, etc..."
            
          />

        </div>
         <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="familyMedicalHistory"
            label="Family Medical History"
            placeholder="mother has a brain cancer, etc..."
            
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="Past Medical History"
            label="Past Medical History"
            placeholder="Tonsillectomy, etc..."
            
          />

        </div>
         <section className="mb-12 space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>
        </section>
        <div className="flex flex-col gap-6 xl:flex-row">
           <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="identificationType"
            label="Identification Type"
            placeholder="select an identification type"
            
          >
            {IdentificationTypes.map((types)=>{
                return (
                    <SelectItem key={types} value={types}>
                        {types}
                        
                    </SelectItem>
                )
            })}
          </CustomFormField>
          

        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="identificationNumber"
            label="Identification Number"
            placeholder="123456789"
            
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            name="identificationDocument"
            label="Identification Document"
            placeholder="(555) 123-4567"
            
            renderSkeleton={(field) => (
                <FormControl>
                    <FileUploader files={field.value} onChange={field.onChange}/>
                </FormControl>
            )}
          />

        </div>

         <section className="mb-12 space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>
        <CustomFormField
        fieldType={FormFieldType.CHECKBOX}
        control={form.control}
        name="treatmentConsent"
        label="I consent to treatment"
        />

        <CustomFormField
        fieldType={FormFieldType.CHECKBOX}
        control={form.control}
        name="disclosureConsent"
        label="I consent to diclosure information"
        />

        <CustomFormField
        fieldType={FormFieldType.CHECKBOX}
        control={form.control}
        name="privacyConsent"
        label="I consent to privacy policy"
        />

        



        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
export default RegisterForm;
