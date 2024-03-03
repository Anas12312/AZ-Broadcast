import React, { DragEventHandler } from 'react'
export interface track {
    name: string,
    url: string,
    thumbnail: string,
    duration: number,
    author: string
}
interface props extends track {
    handleDragStart: Function, 
    handleDragOver: DragEventHandler<HTMLDivElement>, 
    handleDrop: Function, 
    index: number
}
export function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
export default function Track({ name, url, thumbnail, handleDragStart, handleDragOver, handleDrop, index, author, duration}: props) {
    return (
        <div draggable
            key={index}
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, index)}
            className='w-full h-20 mt-1 bg-slate-700 p-2 flex items-center'>
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
