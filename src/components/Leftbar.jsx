"use client"
import React from 'react'
import { Home, Search, Plus, Heart, Users2, UserCheck, LogOut, LogIn, LogInIcon, UserPlus, User } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { twMerge } from 'tailwind-merge'
import { SignIn, SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
const Leftbar = ({user}) => {

  
  const pathname = usePathname()
  const router = useRouter()


  const routes = [
    {
      lable: "Home",
      icon: Home,
      href: "/"
    },
    {
      lable: "Search",
      icon: Search,
      href: "/search"
    },
    {
      lable: "Activity",
      icon: Heart,
      href: "/activity"
    },
    {
      lable: "Create Thread",
      icon: Plus,
      href: "/create-thread"
    },
    {
      lable: "Profile",
      icon: User,
      href:`/profile/${user}`
    },
    
  ]


  return (
    <div className=' fixed py-20 bg-neutral-900 h-full flex-col justify-between hidden sm:flex '>
      <div className=' flex flex-col gap-3 px-3'>
        {routes.map((route) => {
          return (
            <button key={route.href} onClick={() => router.push(route.href)} className={twMerge('flex md:justify-between justify-center gap-4 items-center px-5 bg-neutral-500/5 hover:bg-neutral-500/10 transition  py-4 md:py-2 rounded-xl ', pathname == route.href && "bg-purple-700 hover:bg-purple-700")}>
              <route.icon className=' h-5 w-5' />
              <p className=' hidden md:flex w-[80%]'>
                {route.lable}
              </p>
            </button>
          )
        })}
      </div>
      <div className=' sm:flex justify-center hidden '>
        <SignedIn>
          <SignOutButton>
          <div className=' cursor-pointer flex gap-2 items-center px-5 bg-neutral-500/5 hover:bg-neutral-500/10 transition  py-4 md:py-2 rounded-xl'>
            <LogOut className=' h-5 w-5' />Logout
            </div>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <div className=' cursor-pointer flex gap-4 items-center px-5 bg-neutral-500/5 hover:bg-neutral-500/10 transition  py-4 md:py-2 rounded-xl'>
              <UserPlus className=' h-5 w-5' />Login
            </div>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  )
}

export default Leftbar
