import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.action'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


interface PageProps {
  params: {
    userId: string;
  };
}
const register = async ({params}:PageProps) => {
    const user = await getUser(params.userId);
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
            <p className="copyright py-12">© 2024 CarePoint</p>
         
        </div>
      </section>
      <Image src='/assets/images/register-img.png' height={1000} width={1000} alt="patient" className="side-img max-w-[390px]"/>
    </div>
  )
}

export default register