import React from 'react'
import Link from "next/link";

const Navbar = () => {
  return (
    <div className='w-full'>
    <div className='font-medium flex justify-center'>
        <div className="bg-white min-w-96 max-w-md mx-30 h-12 border-3 border-black shadow-[4px_4px_0px_black] flex items-center justify-between my-8">
  <div className="pl-4 h-full flex items-center font-semibold w-96 sm:w-96">
    <Link href="/" className="hover:underline">
    GitCompare
    </Link></div>

  <div className="flex space-x-6 h-full px-3">
    <a
      href="https://github.com/Mang0codes/"
      target="_blank"
      rel="noopener noreferrer"
      className="pl-4 border-x-3 flex items-center h-full border-black hover:underline"
    >
    <span className='bg-yellow-200 h-5 w-18'>Give a </span><img src="/imgs/gitstar.png" className='w-4 h-4 gap-2' alt="" />
    </a>

     <a
      href="https://twitter.com/albiahossain"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center h-full hover:underline"
    >
    Twitter
    </a>
  </div>
    </div>
    </div>
    </div>
  )
}

export default Navbar