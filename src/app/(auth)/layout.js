import React from "react"
import "../globals.css"
import { ClerkProvider } from "@clerk/nextjs"




export default function RootLayout({ children }) {
 return (
   <ClerkProvider>
    <html>
      <body>
        <div className=" flex justify-center items-center h-screen">

        {children}
        </div>
      </body>
    </html>
   </ClerkProvider>
  )
}
