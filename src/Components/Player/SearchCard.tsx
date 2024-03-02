import React from 'react'
import { formatTime, track } from './Track'
interface props extends track {
    index: number,
    onClick: Function
}
export default function SearchCard({ name, url, thumbnail, author, duration, index, onClick }: props) {
    return (
        <div
            key={index}
            onClick={() => {
                onClick(url)
            }}
            className='w-full h-20 mt-1 text-white bg-slate-700 hover:bg-slate-400 cursor-pointer p-2 flex items-center'>
            <div>
                <img className='w-28' src={thumbnail} alt="" />
            </div>
            <div className='ml-2 flex flex-col h-full w-[60%]'>
                <div className='text-base font-bold truncate'>{name}</div>
                <div className='text-sm'>{author}</div>
                <div className='text-sm'>{formatTime(duration)}</div>
            </div>
        </div>
    )
}
