import { DragEventHandler } from 'react'
import Track, { track } from './Track'

interface props {
    queue: track[],
    handleDragStart: Function,
    handleDragOver: DragEventHandler<HTMLDivElement>,
    handleDrop: Function
    currentTrack: string
    setCurrentTrack: Function
    deleteTrack: Function
    playTrack: Function
}
export default function Queue({ deleteTrack, playTrack, queue, handleDragOver, handleDragStart, handleDrop, currentTrack, setCurrentTrack: _ }: props) {

    return (
        <div className='flex flex-col h-full w-full justify-center items-center'>
            <div className='text-white font-main text-2xl mt-6'>Queue</div>
            <div className='w-full h-full flex flex-col items-center text-white bg-slate-500 mt-10 overflow-y-scroll'>
                {queue?.map((track: track, index: number) => {
                    return <Track
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
                        playing={currentTrack === track.url}
                    />
                })}
            </div>
        </div>
    )
}
