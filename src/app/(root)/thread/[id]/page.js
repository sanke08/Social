import { fetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import React from 'react'
import { redirect } from "next/navigation"
import { fetchthreadById } from '@/lib/actions/thread.actioin'
import ThreadCard from '@/components/ThreadCard'
import Comment from '@/components/Comment'
import CommentCard from '@/components/CommentCard'
import Image from 'next/image'
import Link from "next/link"
import CardIcons from '@/components/CardIcons'
import { twMerge } from 'tailwind-merge'


export default async function page({ params }) {
    if (!params.id) { return null }
    const user = await currentUser()
    if (!user) { return null }
    const userInfo = await fetchUser(user.id)
    if (!userInfo.onboarded) { redirect("/onboarding") }
    const thread = await fetchthreadById(params.id)


    return (
        <div className=' p-5 w-full pb-10'>
            <div className=' w-full h-full bg-neutral-900 px-4 pt-3 pb-3 rounded-lg'>
                <div className='flex gap-5 w-full h-full items-center '>
                    <div className='w-fit h-full items-center py-2'>
                        <Link href={`/profile/${thread.author._id}`} className=" flex gap-2 relative aspect-square h-12 " >
                            <Image src={thread?.author?.image} fill alt='img' className='rounded-full' />
                        </Link>
                    </div>
                    <div>
                        {thread.author.name}
                    </div>
                </div>
                <div className=' ml-6 pl-6 border-neutral-800 border-l' >
                    <div className=''>
                        {thread.text}
                    </div>
                    <div className={twMerge("hidden", thread?.imageUrl && "block mt-5")}>
                        <Image src={thread.imageUrl} alt="image" width={250} height={250} className=' rounded-lg' />
                    </div>
                    <CardIcons postId={thread._id} liked={thread.liked} text={thread.text} user={userInfo} />
                </div>
                <div className=' ml-6 pl-3'>
                    <div className=' w-5 aspect-square flex text-xs gap-1 opacity-50'>
                        {thread.liked.length}<p> Likes</p>
                    </div>
                </div>
            </div>
            <div className=' mt-10'>
                <Comment threadId={params.id} userImage={userInfo.image} user={userInfo._id} />
            </div>
            <p className=' mt-5 text-neutral-500'>
                Replys
            </p>
            <div className=' mt-4 px-10 flex flex-col gap-5'>
                {thread?.children.map((comment) => {
                    return <CommentCard key={comment._id} comment={comment} userImage={userInfo.image} user={userInfo._id} />
                })}
            </div>
        </div>
    )
}
