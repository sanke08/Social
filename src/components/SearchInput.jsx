"use client"
import React, { useEffect, useState } from 'react'
import { useRouter, usePathname,useSearchParams } from "next/navigation"
export default function SearchInput() {
  
  const searchParams=useSearchParams()
  const [text, setText] = useState(searchParams.name ||"")
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (text) {
      return router.push(`${pathname}?name=${text}`)
    }
    if (!text) {
      return router.push(`${pathname}`)
    }
  }, [text, pathname, router])

  return (
    <div className=' mt-5'>
      <input type="text" placeholder='Search...' value={text} onChange={(e) => setText(e.target.value)} className=' bg-neutral-900 px-4 py-2 rounded-lg' />
    </div>
  )
}
