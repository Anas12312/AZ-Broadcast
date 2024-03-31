import { DragEventHandler } from 'react'
import { Audio } from 'react-loader-spinner';
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
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;
    return `${hours ? hours + ":" : ''}${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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
                    onClick={() => playTrack(id)}
                    className='w-full h-28 flex items-center relative cursor-pointer bg-[#1e2027] rounded-lg'>
                    <div className='group w-5 flex justify-center cursor-move '>
                        <div className='block group-hover:hidden'>{index + 1}</div>
                        <div className='hidden group-hover:block'><img className='w-5' src="../../../public/icons/drag.png" alt="" /></div>
                    </div>
                    <div className='ml-2 relative'>
                        <div className='absolute z-10 trans flex flex-col justify-center items-center w-full h-full'>
                            <Audio height={40} />
                            <div className='text-sm font-bold mt-1'>Playing</div>
                        </div>
                        <img className='w-40 rounded-lg brightness-[0.25]' src={thumbnail} alt="" />
                    </div>
                    <div className='ml-2 flex flex-col w-[60%]'>
                        <div className='font-bold text-base w-full overflow-hidden'>
                            <div className='marquee'>{name}</div>
                        </div>
                        {/* <div className='text-base font-bold truncate'>{name}</div> */}
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
            ) : (
                <div draggable
                    key={index}
                    onDragStart={(event) => handleDragStart(event, index)}
                    onDragOver={handleDragOver}
                    onDrop={(event) => handleDrop(event, index)}
                    onClick={() => playTrack(id)}
                    className='w-full h-28 flex items-center relative cursor-pointer rounded-lg'>
                    <div className='group w-5 flex justify-center cursor-move '>
                        <div className='block group-hover:hidden'>{index + 1}</div>
                        <div className='hidden group-hover:block'><img className='w-5' src="../../../public/icons/drag.png" alt="" /></div>
                    </div>
                    <div className='ml-2'>
                        <img className='w-40 rounded-lg select-none' src={thumbnail} alt="" />
                    </div>
                    <div className='ml-2 flex flex-col w-[60%]'>
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
