import React, { useEffect, useState } from 'react'
import { Conatainer, PostCard } from '../components'
import appwriteservice from '../appwrite/config'

const AllPosts = () => {
    const [postes,setPosts]=useState([]);
    useEffect(()=>{},[])
    appwriteservice.getPosts([]).then((postes)=>{
        if (postes) {
            setPosts(postes.documents)
        }
    })
  return (
    <div className='w-full py-8'>
      <Conatainer>
        <div className='flex flex-wrap'>
            {postes.map((post) =>(
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard post={post}/>
                </div>
            ))}
        </div>
      </Conatainer>
    </div>
  )
}

export default AllPosts
