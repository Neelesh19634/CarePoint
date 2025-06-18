import PatientForm from "@/components/forms/PatientForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex h-screen max-h-screen">
      {/* //otp verification */}
      <section className="container remove-scrollbar my-auto">
        <div className="sub-container max-w-[496px] ">
          <div className="flex items-center gap-2 mb-12">
            <Image src="/Logomark.png" height={40} width={40} alt="patient" />
            <span className="text-xl font-semibold text-foreground">
              CarePoint
            </span>
          </div>
          <PatientForm/>
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-[#76828D] xl:text-left">© 2024 CarePoint</p>
            <Link href="/?admin=true" className="text-green-500">Admin</Link>
            </div>
        </div>
      </section>
      <Image src='/assets/images/onboarding-img.png' height={1000} width={1000} alt="patient" className="side-img max-w-[50%]"/>
    </div>
  );
};

export default page;
