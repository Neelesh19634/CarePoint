import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
interface ButtonProps{
    isLoading:boolean,
    className?:string,
    children:React.ReactNode

}
const SubmitButton = ({isLoading,className,children}:ButtonProps) => {
  return (
   <Button type='submit' disabled={isLoading} className={className ?? 'shad-primary-btn w-full hover:cursor-pointer'}>
    {isLoading?(
        <div className='flex items-center gap-4'>
            <Image src="/assets/icons/loader.svg" height={24} width={24} className='animate-spin' alt='loading'/>
            Loading...

        </div>
  ):children}
   </Button>
  )
}

export default SubmitButton