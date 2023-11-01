import React from 'react'
// import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"


export default function ProfileHeader({ name,username,bio,image}) {
    return (
        <div>
            <div className=' border-b p-4 pb-10 border-neutral-700'>
                <div className=' flex items-center gap-5'>
                    <div className=' relative  bg-neutral-900 rounded-full'>
                        <Image src={image} width={70} height={70} alt='img' className=' bg-neutral-900 rounded-full object-contain' />
                    </div>
                    <div>
                        <p className=' text-2xl font-bold'>
                            {name}
                        </p>
                        <p>
                            {username}
                        </p>
                    </div>
                </div>
                <div className=' sm:ml-10 ml-3 mt-5'>
                    {bio}
                </div>
            </div>
        </div>
    )
}
