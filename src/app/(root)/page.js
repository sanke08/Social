import { currentUser } from "@clerk/nextjs"
import ThreadCard from "@/components/ThreadCard"
import { fetchPost } from "@/lib/actions/thread.actioin"
import { fetchUser } from "@/lib/actions/user.actions"


export default async function Home() {

  const userinfo = await currentUser()
  let user
  if(userinfo){
     user = await fetchUser(userinfo?.id)
  }
  const { post } = await fetchPost()

  return (
    <main className=" px-5 w-full pb-20 sm:pb-1">
      <h1 className=" font-bold text-3xl mt-5">Home</h1>
      <div className=" mt-10 w-full">
        {
          post.length === 0 ?
            <div className=" text-center opacity-70 text-xl">
              No Thread Found
            </div>
            :
            // <ThreadCard user={user.id} post={post} />
            <div>
              <ThreadCard post={post} user={user} />
            </div>
        }
      </div>
    </main>
  )
}
