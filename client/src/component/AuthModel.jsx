import React from 'react'
import {useSelector} from 'react-redux'
import { useEffect } from 'react'
import Auth from '../page/Auth';

function AuthModel({onClose}) {
  const {userDate} = useSelector((state) => state.user)

  useEffect(() => {
    if(userDate){
      onClose()
    }
  }, [userDate,onClose])

  return (
    <div
    className='fixed inset-0 z-[999] flex items-center justify-center
     bg-black/10 backdrop-blur-sm px-4'>
        <div className='w-full max-w-md'>
            <Auth ismodel={true} onClose={onClose}/>
        </div>  
    </div>
  )
}

export default AuthModel