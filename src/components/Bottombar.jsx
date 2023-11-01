"use client"
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Home, Search, Plus, Heart, User } from "lucide-react"
import { twMerge } from 'tailwind-merge'




const Bottombar = ({user}) => {

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
      lable: "Create Thread",
      icon: Plus,
      href: "/create-thread"
    },
    {
      lable: "Activity",
      icon: Heart,
      href: "/activity"
    },
    {
      lable: "Profile",
      icon: User,
      href:`/profile/${user}`
    },
  ]


  return (
    <div className=' bg-neutral-900 w-full h-14 fixed bottom-0 flex sm:hidden justify-evenly p-1'>
      {routes.map((route) => {
        return (
          <button key={route.href} onClick={() => router.push(route.href)} className={twMerge(" rounded-xl px-3", pathname == route.href && "bg-purple-700")}>
            <route.icon className='' />
          </button>
        )
      })}

    </div>
  )
}

export default Bottombar