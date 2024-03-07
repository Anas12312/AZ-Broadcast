import React, { useEffect, useState } from 'react'
import { BASE_URL, socket } from '../../Socket/socket'

interface props {
    roomId: string,
    audioRef: React.RefObject<HTMLAudioElement>
    refreshQueue: Function
    busy: boolean
    setBusy: Function
}

export default function Player({ setBusy, busy, refreshQueue, audioRef, roomId }: props) {
    const [volume, setVolume] = useState(20)
    const [shuffle, setShuffle] = useState(false)
    const [defean, setDefean] = useState(1)
    const [loop, setLoop] = useState("")
    const togglePlay = () => {
        if (defean) {
            setDefean(0)
            // audioRef.current!.volume = 0;
        } else {
            setDefean(1)
            // audioRef.current!.volume = volume / 100;
        }
    }
    const toggleShuffule = () => {
        setShuffle(!shuffle)
    }
    const repeat = () => {
        if (loop == "ALL") {
            setLoop("ONE")
        } else if (loop == "ONE") {
            setLoop("NONE")
        } else {
            setLoop("ALL")
        }
    }
    const next = async () => {
        if (!busy) {
            await fetch(BASE_URL + '/skip/' + roomId + "/" + socket.id)
            setBusy(true)
            audioRef.current?.load()
            refreshQueue()
        }
    }
    const prev = async () => {
        if (!busy) {
            await fetch(BASE_URL + '/prev/' + roomId + "/" + socket.id)
            setBusy(true)
            audioRef.current?.load()
            refreshQueue()
        }
    }
    useEffect(() => {
        audioRef.current!.volume = defean * volume / 100;
    }, [volume, defean])
    useEffect(() => {
        function skipped() {
            setBusy(true)
            audioRef.current?.load()
            refreshQueue()
        }
        socket.on('skip',  skipped)
        return () => {
            socket.off('skip', skipped)
        }
    })
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className='flex items-center w-full justify-center relative'>
                    <div className='absolute left-0 flex flex-col-reverse ml-10'>
                        <input
                            className='appearance-none h-1 w-20 bg-green-300 rounded-full outline-none cursor-pointer'
                            type="range" min={0} max={100} value={volume} step={2} onChange={
                                (e) => {
                                    const newVolume = parseFloat(e.target.value);
                                    setVolume(newVolume);
                                }} />
                    </div>

                    <div onClick={toggleShuffule} className='relative icon'>
                        {shuffle ? (
                            <img className='w-7' src="./icons/shuffle.png" alt="" />
                        ) : (
                            <img className='w-7' src="./icons/shuffleSelected.png" alt="" />
                        )}
                        <div className='absolute inset-0 bg-black opacity-20 hover:opacity-0'></div>
                    </div>
                    <div onClick={prev} className='icon relative'>
                        <img className='w-4' src="./icons/prev.png" alt="" />
                        <div className='absolute inset-0 bg-black opacity-30 hover:opacity-0'></div>
                    </div>
                    <div onClick={togglePlay} className='icon'>
                        {defean ? (
                            <img className='w-10 hover:scale-110 trans' src="./icons/pause.png" alt="" />
                        ) : (
                            <img className='w-10 hover:scale-110 trans' src="./icons/play-button.png" alt="" />
                        )}
                    </div>
                    <div onClick={next} className='icon relative'>
                        <img className='w-4' src="./icons/next.png" alt="" />
                        <div className='absolute inset-0 bg-black opacity-30 hover:opacity-0'></div>
                    </div>
                    <div onClick={repeat} className='icon relative'>
                        {loop == "ALL" ? (
                            <img className='w-6 trans' src="./icons/repeatSelected.png" alt="" />
                        ) : loop == "ONE" ? (
                            <img className='w-6' src="./icons/repeat1.png" alt="" />
                        ) : (
                            <img className='w-6' src="./icons/repeat.png" alt="" />
                        )}
                        <div className='absolute inset-0 bg-black opacity-20 hover:opacity-0'></div>
                    </div>

                </div>
            {/* <div className="">
                <ReactPlayer url={BASE_URL + "/stream/" + roomId} volume={(volume / 100) * defean} onReady={() => {
                    console.log("anas")
                    setLoading(false)
                }} />
            </div> */}
            <audio autoPlay={true} className='hidden' ref={audioRef}>
                <source src={BASE_URL + "/stream/" + roomId + "/" + socket.id} type='audio/webm' />
            </audio>
        </div>
    )
}
