import React, { useEffect, useState } from 'react'

import { Container,PostCard,PostForm } from '../components'
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
      <Container>
          <PostCard post={post}/>
      </Container>
    </div>
  ) : null
}
export default EditPost
