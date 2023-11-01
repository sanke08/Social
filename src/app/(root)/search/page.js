import SearchInput from '@/components/SearchInput'
import UserCard from '@/components/UserCard'
import { fetchUsers } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import React from 'react'

export default async function page({ searchParams }) {

  const user = await currentUser()
  const { users, isNext } = await fetchUsers({ userId: user?.id, searchString: searchParams.name })
  // const { users, isNext } = await fetchUsers({ userId: "user_2VGGyCT4isUFNnLqSDHSjLC41BW", searchString: searchParams.name })
  return (
    <div className=' m-5 '>
      <h1 className='text-3xl font-bold '>
        search
      </h1>
      <div>
        <SearchInput />
      </div>
      <div className=' mt-5'>
        {users.length === 0 ?
          <div className=' text-neutral-700'>
            No Users
          </div>
          :
          <div>
            {users.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        }
      </div>


    </div>
  )
}
