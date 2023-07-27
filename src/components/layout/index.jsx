import React from 'react'
import Topnav from './Topnav'
import { Outlet } from 'react-router-dom'

const index = () => {
  return (
    <div className='d-flex flex-column p-2 px-0 mx-0'>
        <Topnav/>
        <Outlet/>
    </div>
  )
}

export default index