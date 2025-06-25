"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
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
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  iconSrc?: string;
  placeholder?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder ,showTimeSelect,dateFormat,renderSkeleton

  } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-[#363A3D] bg-[#1A1D21]">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              height={24}
              width={28}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
      break;
    case FormFieldType.PHONE:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="IN"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as string | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-[#363A3D] bg-inherit">
          <Image
            src="/assets/icons/calendar.svg"
            height={22}
            width={24}
            alt="DOB"
            className="ml-2 h-10"
          />
          <FormControl>
            <DatePicker
              selected={field.value ? new Date(field.value) : null}
              onChange={(date) => field.onChange(date)}
              dateFormat="MM/dd/yyyy"
              showTimeSelect={false}
              wrapperClassName="date-picker"
              
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
        return(
            renderSkeleton ? renderSkeleton(field):null
        )
    case FormFieldType.SELECT:
        return(
            <div className="flex rounded-md border border-[#363A3D] bg-inherit">

            <FormControl >
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl >
                        <SelectTrigger className="shad-select-trigger w-full">

                        <SelectValue placeholder={placeholder}/>
                        </SelectTrigger>

                    </FormControl>
                    <SelectContent className="shad-select-content">{props.children}</SelectContent>
                </Select>
            </FormControl>
            </div>
        )
    case FormFieldType.TEXTAREA:
        return (
            <FormControl>
                <Textarea placeholder={placeholder} {...field} className="shad-textArea" disabled={props.disabled}>

                </Textarea>
            </FormControl>
        )
    case FormFieldType.CHECKBOX:
        return(
            <FormControl>
                <div className="flex item-center gap-4">
                    <Checkbox id={props.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                    <label htmlFor={props.name} className="checkbox-label">{props.label}</label>

                   
                </div>
            </FormControl>
        )
    default:
      break;
  }
};
const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderInput field={field} props={props} />

          <FormMessage className="shad-error"></FormMessage>
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
