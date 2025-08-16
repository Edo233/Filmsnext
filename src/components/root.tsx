import React from 'react'
import Srch from './srch'

export default function Root() {
  return (
    <div className='w-[100%] flex flex-col items-center bg-[#1A1818]'>
      <div className='W-[100%]'>
            <div className='w-[100%] text-white text-center flex flex-col gap-2 my-10'>
                <h1 className='text-3xl whitespace-nowrap'>Welcome to my movie web-page</h1>
                <h3>Find movies, Tv shows and more</h3>
            </div>
            <div>
                <Srch/>
            </div>
      </div>
    </div>
  )
}