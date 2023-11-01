import { fetchUser, getActivity } from '@/lib/actions/user.actions'
import React from 'react'
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import Link from "next/link"
import Image from 'next/image'





export default async function page() {

  const user = await currentUser()
  if (!user) return (
    <div className=' w-full flex justify-center mt-20 opacity-60'>
      Please Login
    </div>
  )
  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect("/onboarding")
  const activity = await getActivity(userInfo._id)

  return (
    <div className=' m-5 '>
      <h1 className='text-3xl font-bold'>
        Activity
      </h1>
      <div className=' mt-10 flex flex-col gap-5 w-full items-center'>
        {activity.length !== 0 ?
          <>
            {activity.map(activity => (
              <Link href={`/thread/${activity.parentId}`} key={activity._id} className=" w-full bg-neutral-950 p-2 rounded-lg flex gap-5 items-center" >
                <Image src="" alt="" width={20} height={20} className=" rounded-full bg-neutral-900" />
                <p className=' flex gap-2 items-center'>
                  <span className=' text-blue-700'>{activity.author.name}</span>
                  Replied to your message
                </p>
              </Link>
            ))}
          </>
          :
          <div className=' text-neutral-400'>
            No activity
          </div>
        }
      </div>
    </div>
  )
}
