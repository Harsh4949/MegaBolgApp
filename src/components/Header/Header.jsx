import React from 'react'
import {Conatainer,Logo,LogoutBtn } from '../index.js' 
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {

  const authStatus = useSelector((state)=> state.auth.status)

  const navigate = useNavigate()

  const naItems=[
    {
      name :'Home',
      slug : "/",
      active :true
    },
    {
      name :'Login',
      slug : "/login",
      active :!authStatus
    },
    {
      name :'Signup',
      slug : "/signup",
      active :!authStatus
    },

    {
      name :'All Posts',
      slug : "/all-posts",
      active :authStatus
    },
    {
      name :'Add Posts',
      slug : "/add-posts",
      active :authStatus
    },

  ]

  return (
    <div>  Header </div>
  )
}

export default Header
