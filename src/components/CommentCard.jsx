import Link  from "next/link"
import React from 'react'
import Image from "next/image"
import { Forward, Heart, Send } from "lucide-react"



export default function CommentCard({ comment, userImage, user }) {
    return (
        <div>
            <div className=" flex gap-1 items-center">
                {/* <div className=" relative aspect-square w-14"> */}
                    <Link href={`/profile/${comment.author._id}`} className=" relative aspect-square w-14">
                        <Image src={comment.author?.image} alt="" fill className=" rounded-full" />
                    </Link>
                {/* </div> */}
                <Link href={`/profile/${comment.author._id}`} className=" text-neutral-400">
                    @{comment.author.name}
                </Link>
            </div>
            <div className=" ml-8 pl-6 border-l border-neutral-700">
                {comment.text}
                <div className=' h-full  pt-3  flex items-center gap-3'>
                    <Heart size={20} className=' opacity-50 cursor-pointer hover:opacity-100 transition-all' />
                    <Forward size={20} className=' opacity-50 cursor-pointer hover:opacity-100 transition-all' />
                    <Send size={20} className=' opacity-50 cursor-pointer hover:opacity-100 transition-all' />
                </div>
            </div>
        </div>
    )
}
