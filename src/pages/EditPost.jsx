import React, { useEffect, useState } from 'react'

import { Conatainer,PostCard,PostForm } from '../components'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router';

const EditPost = () => {

  const [post,setPosts]=useState(null);
  const {slug}=useParams()
  const navigate = useNavigate();

  useEffect(() => {
    if(slug){
        appwriteService.getPost(slug).then((post)=>{
          if (post) {
            setPosts(post)
          }
      })
    }else{
      navigate('/')
    }

  },[slug,navigate])

  return post ?(
    <div className='py-8'>
      <Conatainer>
          <PostCard post={post}/>
      </Conatainer>
    </div>
  ) : null
}
export default EditPost
