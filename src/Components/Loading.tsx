import React from 'react'

export default function Loading() {
    let circleCommonClasses = 'h-2 w-2 bg-primary-1   rounded-full';
    return (
    <div className='bg-white bg-opacity-90 w-full h-full absolute z-50'>
        <div className='flex justify-center items-center h-full w-full'>
                <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
                <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
                <div className={`${circleCommonClasses} animate-bounce400`}></div>
        </div>
    </div>
  )
}
