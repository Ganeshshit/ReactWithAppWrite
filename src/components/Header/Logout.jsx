import React from 'react'
import { UseDispatch, useDispatch } from 'react-redux'
import authService from '../../Appwrite/config'
import {logout} from '../../Store/authSlice'


const Logout = () => {
    const dispatch =useDispatch()
    const logoutHandeler=()=>{

        authService.logout().then(()=>{
            dispatch(logout())

        })
    }
  return (
    <button className=''>
        logout
    </button>
  )
}

export default Logout