import React from 'react'
import Link from "next/link"
import Image from "next/image"



export default function UserCard({ user }) {
    return (
        <div className=' flex justify-between px-5 mt-2 items-center bg-neutral-950 rounded-lg p-3'>
            <div className=' flex items-center gap-2'>
                <div className=' relative w-10 aspect-square '>
                    <Image src={user.image} alt='img' fill className=' rounded-full' />
                </div>
                <div className=' flex flex-col'>
                    <p className=' text-lg font-medium'>
                        {user.name}
                    </p>
                    <p className=' text-sm text-neutral-300'>
                        @{user.username}
                    </p>
                </div>
            </div>
            <Link href={`/profile/${user._id}`} className='bg-purple-800 rounded-lg px-3 py-1'>
                View
            </Link>
        </div>
    )
}
