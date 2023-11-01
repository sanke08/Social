import React from 'react'
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { fetchUser } from '@/lib/actions/user.actions'
import Thread from '@/components/Thread'

export default async function page() {
    const user = await currentUser()
    if (!user) return null
    const userInfo = await fetchUser(user.id)
    if (!userInfo?.onboarded) {
        redirect("/onboarding")
    }
    return (
        <div className=' w-full sm:px-10 pb-10'>
            <Thread userId={userInfo._id} />
        </div>
    )
}
