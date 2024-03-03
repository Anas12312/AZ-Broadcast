import React, { useState } from 'react'
import { track } from './Track'
import { BASE_URL } from '../../Socket/socket'
import SearchCard from './SearchCard'
import { BallTriangle } from 'react-loader-spinner'
interface props {
    refreshQueue: Function,
    roomId: string
}
export default function Search({refreshQueue, roomId} : props) {
    const [searchResults, setSearchResults] = useState<track[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(false)
    const searchYT = async () => {
        setLoading(true)
        const results = await fetch(BASE_URL + '/yt', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                searchTerm
            })
        })
        const videos = await results.json()
        setSearchResults(videos)
        setLoading(false)
    }
    const addToQueue = async (url:string) => {
        await fetch(BASE_URL + '/add/' + roomId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                trackUrl: url
            })
        })
        refreshQueue()
    }
    return (
        <div className='w-full h-full flex flex-col'>
            <div className='w-full flex justify-center mt-6'>
                <input
                    type="text"
                    className='w-[95%] rounded-sm pl-2 text-base h-10'
                    placeholder='Search a youtube video'
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value) }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            searchYT()
                        }
                    }}
                />
            </div>
            {loading ? (
                <div className='flex justify-center items-center w-full h-full'>
                    <BallTriangle />
                </div>
            ) : (
                <div className='mt-8 h-full border overflow-y-scroll'>
                    {
                        searchResults.map((searchResult: track, index: number) => {
                            return <SearchCard
                                index={index}
                                {...searchResult}
                                onClick = {addToQueue}
                            />
                        })
                    }
                </div>
            )}

        </div>
    )
}
