import Image from 'next/image'
import React from 'react'
import Link from "next/link"
import { twMerge } from 'tailwind-merge'
import CardIcons from './CardIcons'




export default function ThreadCard({ user, post }) {
    return (
        <div className=' flex flex-col gap-3'>
            {
                post && post.map((p) => (
                    <div key={p._id} className=' w-full h-full bg-neutral-900 px-4 pt-3 pb-3 rounded-lg'>
                        <div className='flex gap-5 w-full h-full items-center '>
                            <div className='w-fit h-full items-center py-2'>
                                <Link href={`/profile/${p.author._id}`} className=" flex gap-2 relative aspect-square h-12 " >
                                    <Image src={p?.author?.image} fill alt='img' className='rounded-full' />
                                </Link>
                            </div>
                            <div>
                                {p.author.name}
                            </div>
                        </div>
                        <div className=' ml-6 pl-6 border-neutral-800 border-l' >
                            <div className=''>
                                {p.text}
                            </div>
                            <div className={twMerge("hidden", p?.imageUrl && "block mt-5")}>
                                <Image src={p.imageUrl} alt="image" width={250} height={250} className=' rounded-lg' />
                            </div>
                            {/* <CardIcons postId={p._id} liked={p.liked} text={p.text} userClerkId={user} /> */}
                            <CardIcons postId={p._id} liked={p.liked} text={p.text} user={user} />
                        </div>
                        <div className=' ml-6 pl-3'>
                            <div className=' w-5 aspect-square flex text-xs gap-1 opacity-50'>
                                {p.liked.length}<p> Likes</p>
                            </div>
                        </div>
                    </div>

                ))
            }
        </div>
    )
}
