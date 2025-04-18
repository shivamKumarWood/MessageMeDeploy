import React from 'react'
import Search from './Search'
import Users from './Users'
import Logout from './Logout'

function Left() {
  return (
    <div className="w-[30%] text-white bg-black">
      <Search/>
      <div className='flex-1 overflow-y-auto' style={{minHeight:"calc(92vh - 13vh)"}}>
      <Users />
      </div>
      <Logout/>
    </div>
  )
}

export default Left
