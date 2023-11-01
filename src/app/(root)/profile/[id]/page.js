import { currentUser } from '@clerk/nextjs'
import React from 'react'
import { redirect } from "next/navigation"
import { fetchUser, fetchUserPost } from '@/lib/actions/user.actions'
import ProfileHeader from '@/components/Profile/ProfileHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { profileTabs } from '@/lib/constences'
import ThreadCard from '@/components/ThreadCard'
import ThreadTab from '@/components/Profile/ThreadTab'
import { fetchPost } from '@/lib/actions/thread.actioin'



export default async function page({ params }) {

  const user = await currentUser()
  if (!user) return (
    <div className=' w-full flex justify-center mt-20'>
      Please Login
    </div>
  )
  const userInfo = await fetchUser(params.id)
  if (!userInfo?.onboarded) redirect("/onboarding")
  const posts = await fetchUserPost(userInfo.userId)
  if (!posts) {
    redirect("/")
  }



  return (
    <div className=' p-3 w-full pb-16 sm:pb-5'>
      <ProfileHeader name={userInfo?.name} username={userInfo?.username} image={userInfo?.image} bio={userInfo?.bio} />
      <div className=' mt-5'>
        <Tabs defaultValue='threads' className=' w-full'>
          <TabsList className=" w-full grid grid-cols-3 bg-neutral-900">
            {profileTabs.map((tab) => {
              return <TabsTrigger key={tab.label} value={tab.value} className=" hover:bg-neutral-400/5 py-2 text-neutral-400 flex gap-2">
                <tab.icon />  {tab.label} {tab.label === "Threads" && userInfo?.threads.length}
              </TabsTrigger>
            })}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent key={`content-${tab.label}`} value={tab.value}>
              {/* <ThreadTab currentUserId={user?.id} accountId={userInfo.id} /> */}
              {
                tab.label === "Threads" &&
                <ThreadTab accountId={userInfo?.userId} posts={posts} />
              }
            </TabsContent>
          ))}
        </Tabs>
      </div>

    </div>
  )
}
