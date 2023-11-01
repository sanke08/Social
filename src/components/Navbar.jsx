import { OrganizationSwitcher, SignedIn, SignedOut, UserButton, SignInButton,OrganizationProfile } from '@clerk/nextjs'
import { LogOut, UserPlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className=' bg-neutral-900 fixed top-0 flex z-50 justify-between h-12 w-full items-center px-5'>
      <Link href={"/"} className=' text-purple-700 text-2xl'>
        Threads
      </Link>
      <div>
        <div className=' w-full sm:hidden justify-center flex '>
          <SignedIn>
            <SignedOut>
              <LogOut size={30} />
            </SignedOut>
          </SignedIn>
        </div>
        <SignedOut>
          <SignInButton>
            <div className=' cursor-pointer flex gap-1 items-center px-3 bg-neutral-500/5 hover:bg-neutral-500/10 transition  py-2 md:py-2 rounded-xl'>
              <UserPlus className=' h-5 w-5' />Login
            </div>
          </SignInButton>
        </SignedOut>
        <UserButton />
      </div>
    </div>
  )
}
