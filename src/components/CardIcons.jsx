"use client"
import { Clipboard, Heart, MessageCircle, } from 'lucide-react'
import React, { useState } from 'react'
import Link from "next/link"
import { addLike } from '@/lib/actions/thread.actioin'
import { twMerge } from 'tailwind-merge'
import { useRouter } from "next/navigation"

export default function CardIcons({ postId, liked, text, user }) {
    const router = useRouter()
    const handleLike = async () => {
        if (user?.userId) {
            const { success, liked } = await addLike({ userClerkId: user?.userId, postId })
            if (success) {
                router.refresh()
            }
            return
        }
    }
    const copy = () => {
        navigator.clipboard.writeText(text)
    }



    return (
        <div className=' h-full  pt-5  flex items-center gap-3'>
            <button onClick={handleLike} >
                {
                    liked && liked.includes(user?.userId) ?
                        <Heart size={20} fill='purple' className={twMerge(' opacity-50 cursor-pointer hover:opacity-100 transition-all')} />
                        :
                        <Heart size={20} className=' opacity-50 cursor-pointer hover:opacity-100 transition-all' />
                }
            </button>
            <Link href={`/thread/${postId}`}>
                <MessageCircle size={20} className=' opacity-50 cursor-pointer hover:opacity-100 transition-all' />
            </Link>
            <button onClick={copy}>
                <Clipboard size={20} className=' opacity-50 cursor-pointer hover:opacity-100 transition-all' />
            </button>
        </div>
    )
}
