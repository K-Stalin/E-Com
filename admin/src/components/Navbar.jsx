import React from 'react'
import { assets} from "../assets/admin_assets/assets"

const Navbar = ({setToken}) => {

 const logout = () =>{
      setToken('')
      localStorage.clear()
 }

  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
      <button onClick={logout}   className='bg-gray-600 text-white px-5 py-2 rounded-full sm:px-7'>Logout</button>
    </div>
  )
}

export default Navbar
