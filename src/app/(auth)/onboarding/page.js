import React from 'react'
import AccountForms from '@/components/AccountForms'
import { currentUser } from '@clerk/nextjs'
import { fetchUser } from '@/lib/actions/user.actions'


export default async function page() {

  const user = await currentUser()


  const userInfo = await fetchUser(user.id)
  console.log(userInfo)
  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username || "",
    name: userInfo?.name || user.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user.imageUrl,
  }

  return (
    <div className='py-10 h-full w-full flex flex-col '>
      <div className=' ml-5 sm:ml-[15vw]'>
        <p className=' text-3xl font-bold'>Onboarding</p>
        <p>Complete your profile</p>
      </div>
      <div className=' w-full flex justify-center  p-10'>
        <AccountForms user={userData} btnTitle="continue" />
      </div>
    </div>
  )
}
