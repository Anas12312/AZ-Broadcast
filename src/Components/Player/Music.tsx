import React, { useEffect, useRef, useState } from 'react'
import Player from './Player'
import Queue from './Queue'
import { track } from './Track'
import { BASE_URL, socket } from '../../Socket/socket'
import Search from './Search'

export default function Music({ roomId }: { roomId: string }) {
    const [queue, setQueue] = useState<track[]>([])
    const [currentTrack, setCurrentTrack] = useState("")
    const [busy, setBusy] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)
    audioRef.current?.addEventListener("loadeddata", () => setBusy(false))
    const refreshQueue = async () => {
        const response = await fetch(BASE_URL + '/queue/' + roomId + "/" + socket.id)
        const newQueue = await response.json()
        if(newQueue.tracks) {
            setQueue(newQueue.tracks)
            setCurrentTrack(newQueue.currentTrack)
        } 
    }
    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        event.dataTransfer.setData('index', index.toString());
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
        const dragIndex = parseInt(event.dataTransfer.getData('index'));
        const dragItem = queue[dragIndex];
        const newItems = [...queue];

        newItems.splice(dragIndex, 1);
        newItems.splice(dropIndex, 0, dragItem);

        setQueue(newItems);
        
    };
    const playTrack = (_url: string) => {

    }
    const deleteTrack = (_url: string) => {

    }
    useEffect(() => {
        socket.on("track_added", () => {
            refreshQueue()
        })  
    })
    return (
        <div className='bg-slate-800 h-full w-[53%]'>
            <div className='w-full h-[86%] flex'>
                <div className='w-[60%]'>
                    <Search refreshQueue={refreshQueue} roomId={roomId} />
                </div>
                <div className=' w-[40%] border-l '>
                    <Queue
                        handleDragOver={handleDragOver}
                        handleDragStart={handleDragStart}
                        handleDrop={handleDrop}
                        queue={queue}
                        currentTrack={currentTrack}
                        setCurrentTrack={setCurrentTrack}
                        playTrack={playTrack}
                        deleteTrack={deleteTrack}
                    />
                </div>
            </div>
            <div className='w-full h-[14%] bg-black'>
                <Player 
                    audioRef={audioRef} 
                    roomId={roomId} 
                    refreshQueue={refreshQueue}
                    busy={busy}
                    setBusy={setBusy}
                />
            </div>
        </div>
    )
}
