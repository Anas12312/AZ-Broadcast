import { DragEventHandler } from 'react'
import Track, { track } from './Track'

interface props {
    queue: track[],
    handleDragStart: Function,
    handleDragOver: DragEventHandler<HTMLDivElement>,
    handleDrop: Function
    currentTrack: number
    setCurrentTrack: Function
    deleteTrack: Function
    playTrack: Function
}
export default function Queue({ deleteTrack, playTrack, queue, handleDragOver, handleDragStart, handleDrop, currentTrack, setCurrentTrack: _ }: props) {
    return (
        <div className='flex flex-col h-full w-full justify-center items-center pr-2'>
            <div className='text-white font-main text-2xl mt-6'>Queue</div>
            {queue.length ? (
                <div className='w-full h-full flex flex-col items-center text-white mt-10 overflow-y-scroll'>
                    {queue?.map((track: track, index: number) => {
                        return <Track
                            id={track.id}
                            index={index}
                            name={track.name}
                            url={track.url}
                            author={track.author}
                            duration={track.duration}
                            thumbnail={track.thumbnail}
                            handleDragOver={handleDragOver}
                            handleDragStart={handleDragStart}
                            handleDrop={handleDrop}
                            deleteTrack={deleteTrack}
                            playTrack={playTrack}
                            playing={currentTrack === index}
                        />
                    })}
                </div>
            ) : (
                <div className='w-full h-full flex flex-col items-center text-center text-white mt-10 overflow-y-scroll'>
                    <div className='h-[10%]'></div>
                    <div className='w-[80%] font-main'>The queue is currently empty add something to play</div>
                    <img className='mt-5 w-16' src="../../../icons/add.png" alt="" />
                </div>
            )}
        </div>
    )
}
