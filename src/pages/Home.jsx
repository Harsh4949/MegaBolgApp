import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Conatainer,PostCard } from '../components'

const Home = () => {

    const [posts,setPosts] = useState([])

    useEffect(()=>{
        appwriteService.getPosts().then((posts)=>{

            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Conatainer>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Conatainer>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Conatainer>
                <div className='flex flex-wrap '>
                    {posts.map((post)=>(
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post}/>
                        </div>
                    ))}
                </div>
            </Conatainer>
        </div>
    )
}

export default Home
