"use client"
import React, { useState } from 'react'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { addComment } from '@/lib/actions/thread.actioin'


export default function Comment({ threadId, userImage, user }) {
    const [text, setText] = useState("")
    const router = useRouter()

    const onsubmit = async () => {
        await addComment(threadId, text, user)
        setText("")
        router.refresh()
    }



    return (
        <div className=' w-full h-full flex gap-5 p-5 items-center border-t border-b border-neutral-800'>
            <div className=' relative h-10 aspect-square'>
            <Image src={userImage} alt='img' fill className=' bg-neutral-900 h-16 w-16 rounded-full' />
            </div>
            <input type="text" placeholder='Comment...' value={text} onChange={(e) => setText(e.target.value)} className=' w-full h-fit bg-neutral-950 px-2 py-3 placeholder:text-neutral-500 rounded-xl' />
            <button onClick={onsubmit} className=' bg-purple-800 hover:bg-purple-700 px-4 py-1 rounded-xl'>Reply</button>
        </div>
    )
}
