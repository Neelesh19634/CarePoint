import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.action'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const register = async ({params:{userId}}:SearchParamProps) => {
    const user=await getUser(userId)
  return (
     <div className="flex h-screen max-h-screen">
      
      <section className="container remove-scrollbar">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10 ">
          <div className="flex items-center gap-2 mb-12">
            <Image src="/Logomark.png" height={40} width={40} alt="patient" />
            <span className="text-xl font-semibold text-foreground">
              CarePoint
            </span>
          </div>
          <RegisterForm user={user}/>
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-[#76828D] xl:text-left">© 2024 CarePoint</p>
            <Link href="/?admin=true" className="text-green-500">Admin</Link>
            </div>
        </div>
      </section>
      <Image src='/assets/images/register-img.png' height={1000} width={1000} alt="patient" className="side-img max-w-[390px]"/>
    </div>
  )
}

export default register