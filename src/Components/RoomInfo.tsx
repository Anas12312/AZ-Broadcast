import React from 'react'

export default function RoomInfo({roomId}: {roomId: string}) {
  return (
    <div className='absolute bg-slate-900 top-0 right-0 w-[30%] h-[8%] px-4 flex items-center space-x-2 border-b border-slate-700 z-50'>

        
        <span className='font-main text-2xl select-none text-slate-300' >Room </span>
        <span className='text-white font-main text-2xl select-none cursor-pointer hover:bg-slate-700 rounded-md px-1'>#{roomId}</span>

    </div>
  )
}
