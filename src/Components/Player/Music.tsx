import React, { useEffect, useState } from 'react'
import Player from './Player'
import Queue from './Queue'
import { track } from './Track'
import { BASE_URL } from '../../Socket/socket'
import Search from './Search'

export default function Music({ roomId }: { roomId: string }) {
    const [queue, setQueue] = useState<track[]>([])
    const refreshQueue = async () => {
        const response = await fetch(BASE_URL + '/queue/' + roomId)
        const newQueue = await response.json()
        if(newQueue.tracks) {
            setQueue(newQueue.tracks)
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
                        setQueue={setQueue}
                    />
                </div>
            </div>
            <div className='w-full h-[14%] bg-black'>
                <Player roomId={roomId} />
            </div>
        </div>
    )
}
