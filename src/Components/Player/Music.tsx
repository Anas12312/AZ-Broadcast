import React, { useEffect } from 'react'
import Queue from './Queue'
import { track } from './Track'
import { BASE_URL, socket } from '../../Socket/socket'
import Search from './Search'
interface props { 
    roomId: string, 
    audioRef: React.RefObject<HTMLAudioElement> 
    busy: boolean
    setBusy: Function
    refreshQueue: Function
    queue: track[]
    currentTrack: number
    setQueue: Function
    setCurrentTrack: Function
}
export default function Music({ roomId, audioRef, setBusy, refreshQueue, queue, currentTrack, setCurrentTrack, setQueue }: props) {
    
    audioRef.current?.addEventListener("loadeddata", () => setBusy(false))
    
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
        fetch(BASE_URL + '/edit/' + roomId + "/" + socket.id, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                tracks: newItems
            })
        })
    };
    const playTrack = (id: string) => {
        fetch(BASE_URL + '/play/' + roomId + "/" + socket.id + "/" + id)
        audioRef.current?.load()
    }
    const deleteTrack = async (id: string) => {
        fetch(BASE_URL + '/remove/' + roomId + "/" + socket.id + "/" + id)
        // refreshQueue()
    }
    useEffect(() => {
        const trackAdded = () => {
            refreshQueue()
        }
        const trackRemoved = () => {
            refreshQueue()
        }
        const trackChanged = () => {
            audioRef.current?.load()
            refreshQueue()
        }
        const onModified = () => {
            refreshQueue()
        }
        socket.on("track_added", trackAdded)  
        socket.on("removed", trackRemoved)  
        socket.on("played", trackChanged)  
        socket.on("modified", onModified)  
        return () => {
            socket.off("track_added", trackAdded)
            socket.off("removed", trackRemoved)
            socket.off("played", trackChanged)
            socket.off("modified", onModified)
        }
    })
    useEffect(() => {
        refreshQueue()
    }, [])
    return (
        <div className='h-full w-[53%]'>
            <div className='w-full h-full flex'>
                <div className='w-[60%]'>
                    <Search refreshQueue={refreshQueue} roomId={roomId} queue={queue} />
                </div>
                <div className=' w-[40%] '>
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
        </div>
    )
}
