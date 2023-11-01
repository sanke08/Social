import React from 'react'
import EditThread from './EditThread'


export default  function ThreadTab({ posts }) {
  return (
    <div className=' flex flex-col gap-3'>
      {
        posts && posts.threads.map((post) => (
          <EditThread key={post._id} post={post}  />
        ))
      }
    </div>
  )
}
