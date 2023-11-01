import { SignIn } from '@clerk/nextjs'
import React from 'react'

import Link from "next/link"

export default function page() {
  return <div className='h-screen  '>
    <div className=' pt-10'>
      <Link href={"/"} className="bg-neutral-500 px-4 py-2 rounded-lg mb-5">
        Home
      </Link>
    </div>
    <div className=' h-[70vh] flex items-center'>
      <SignIn />
    </div>
  </div>

}
