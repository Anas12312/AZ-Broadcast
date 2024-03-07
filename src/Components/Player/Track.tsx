import { DragEventHandler } from 'react'
export interface track {
    id: string,
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
    index: number,
    playing?: boolean,
    deleteTrack: Function,
    playTrack: Function
}
export function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
export default function Track({ name, playing, url: _, deleteTrack, playTrack, id, thumbnail, handleDragStart, handleDragOver, handleDrop, index, author, duration }: props) {
    return (
        <div className='w-full'>
            {playing ? (
                <div draggable
                    key={index}
                    onDragStart={(event) => handleDragStart(event, index)}
                    onDragOver={handleDragOver}
                    onDrop={(event) => handleDrop(event, index)}
                    className='w-full h-20 mt-1 bg-green-800 p-2 flex items-center relative'>
                    <div>
                        <img className='w-28' src={thumbnail} alt="" />
                    </div>
                    <div className='ml-2 flex flex-col h-full w-[60%]'>
                        <div className='text-base font-bold truncate'>{name}</div>
                        <div className='text-sm'>{author}</div>
                        <div className='text-sm'>{formatTime(duration)}</div>
                    </div>
                    <img onClick={(e) => {
                        deleteTrack(id)
                        e.stopPropagation()
                    }} className='w-4' src='../../../icons/remove.png' />
                </div>
            ) : (
                <div draggable
                    key={index}
                    onDragStart={(event) => handleDragStart(event, index)}
                    onDragOver={handleDragOver}
                    onDrop={(event) => handleDrop(event, index)}
                    onClick={() => playTrack(id)}
                    className='w-full h-20 mt-1 bg-slate-700 hover:bg-green-900 p-2 flex items-center relative'>
                    <div>
                        <img className='w-28' src={thumbnail} alt="" />
                    </div>
                    <div className='ml-2 flex flex-col h-full w-[60%]'>
                        <div className='text-base font-bold truncate'>{name}</div>
                        <div className='text-sm'>{author}</div>
                        <div className='text-sm'>{formatTime(duration)}</div>
                    </div>
                    <div className='absolute top-[40%] right-3 hover:bg-red-800 p-2 cursor-pointer rounded-lg'>
                        <img onClick={(e) => {
                            e.stopPropagation()
                            deleteTrack(id)
                        }} className='w-4' src='../../../icons/remove.png' />
                    </div>
                </div>
            )}
        </div>
    )
}
