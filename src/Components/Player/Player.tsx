import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { Circles } from 'react-loader-spinner'
import { BASE_URL } from '../../Socket/socket'

interface props {
    roomId: string
}

export default function Player({roomId}: props) {
    const [volume, setVolume] = useState(50)
    const [loading, setLoading] = useState(true)
    const [defean, setDefean] = useState(1)
    const togglePlay = () => {
        if(defean) {
            setDefean(0)
        }else {
            setDefean(1)
        }
    }
    return (
        <div>
            {loading ? (
                <div>
                    <Circles />
                </div>
            ) : (
                <div>
                    <input type="range" min={0} max={100} value={volume} step={5} onChange={
                        (e) => {
                            setVolume(Number(e.target.value));
                        }} />
                    <div onClick={togglePlay} className=''>
                        {defean ? (
                            <img className='w-32' src="../../../public/icons/pause.png" alt="" />
                        ) : (
                            <img className='w-32' src="../../../public/icons/play-button.png" alt="" />
                        )}
                    </div>
                </div>
            )
            }
            {/* <div className="">
                <ReactPlayer url={BASE_URL + "/stream/" + roomId} volume={(volume / 100) * defean} onReady={() => {
                    console.log("anas")
                    setLoading(false)
                }} />
            </div> */}
            <audio autoPlay>
                <source src={BASE_URL + "/stream/" + roomId} type='audio/webm' />
            </audio>
        </div>
    )
}
