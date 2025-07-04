import type { Metadata } from "next";
import {Plus_Jakarta_Sans} from "next/font/google";
import "./globals.css";
import '@/tailwind.config'
import {cn} from '@/lib/utils'

import { ThemeProvider } from "@/components/theme-provider"
const fontSans=Plus_Jakarta_Sans({
  subsets:["latin"],
  weight:['300','400','500','600','700'],
  variable:'--font-sans'
})

export const metadata: Metadata = {
  title: "Care Point",
  description: "a health care management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressContentEditableWarning suppressHydrationWarning>
      <body
        className={cn('min-h-screen dark:bg-dark-300 font-sans antialiased',fontSans.variable)}
      >
        
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
