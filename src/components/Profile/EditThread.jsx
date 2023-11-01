import Image from 'next/image'
import React from 'react'
import Edit from './Edit'


export default function EditThread({ post }) {
  return (
    < div >
      <div className=' bg-neutral-900 w-full rounded-xl px-5 py-3'>
        <p className=' flex justify-between items-center'>
          {post.text}
          {/* <Edit postId={post._id} /> */}
        </p>
        <div>
          <Image width={300} height={300} src={post.imageUrl} alt="image" className=" rounded-xl mt-2"  />
        </div>
      </div>
    </div >
  )
}
