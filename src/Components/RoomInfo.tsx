import { useState } from 'react'
import { FaCopy } from 'react-icons/fa'

export default function RoomInfo({ roomId }: { roomId: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className='absolute bg-[#1e1f22] top-0 right-0 w-[30%] h-[8%] px-4 flex items-center space-x-2 border-b border-slate-700'>


      <span className='font-main text-2xl select-none text-slate-300' >Room </span>
      <span onMouseLeave={() => {
        setCopied(false)
        navigator.clipboard.writeText(roomId)
      }} onClick={() => {
        setCopied(true)
      }} className='text-white font-main text-2xl group select-none cursor-pointer flex items-center justify-center hover:bg-slate-700 rounded-md px-1'>
        <span className='mr-2'>
          #{roomId}
        </span>
        <FaCopy color='white' size={18} />
        {!copied ? (
          <span className='title group-hover:scale-100'>Copy</span>
        ) : (
          <span className='done-title group-hover:scale-100'>Copied</span>
        )}
      </span>

    </div>
  )
}
