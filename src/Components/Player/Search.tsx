import { useState } from 'react'
import { track } from './Track'
import { BASE_URL, socket } from '../../Socket/socket'
import SearchCard from './SearchCard'
import {ColorRing} from 'react-loader-spinner'
interface props {
    refreshQueue: Function,
    roomId: string
    queue: track[]
    deleteTrackByURL: Function
}
export default function Search({ refreshQueue, roomId, queue, deleteTrackByURL }: props) {
    const [searchResults, setSearchResults] = useState<track[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(false)
    const searchYT = async () => {
        if (searchTerm) {
            setLoading(true)
            const results = await fetch(BASE_URL + '/yt2', {
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
    }
    const addToQueue = async (url: string) => {
        await fetch(BASE_URL + '/add/' + roomId + "/" + socket.id, {
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
        <div className='w-full h-full flex flex-col '>
            <div className='w-full flex justify-center mt-6'>
                <input
                    type="text"
                    className='w-[95%] rounded-xl pl-3 text-base h-10'
                    placeholder='What do you want to play?'
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
                <div className='flex flex-col items-center w-full h-full'>
                    <div className='h-[20%]'></div>
                    <ColorRing height={150} width={150} />
                </div>
            ) : (
                searchResults.length ? (
                    <div className='mt-8 h-full overflow-y-scroll'>
                        {
                            searchResults.map((searchResult: track, index: number) => {
                                return <SearchCard
                                    index={index}
                                    {...searchResult}
                                    onClick={addToQueue}
                                    removeTrack={deleteTrackByURL}
                                    exist={queue.filter((t) => {
                                        return t.url === searchResult.url
                                    }).length > 0}
                                />
                            })
                        }
                    </div>
                ) : (
                    <div className='mt-8 h-full flex flex-col items-center font-main text-white overflow-y-scroll'>
                        <div className='h-[10%]'></div>
                        <div className='text-center'>Search Something to Play <br /> on Youtube</div>
                        <div className='relative'>
                            <img className='w-20' src="../../../icons/youtube.png" alt="" />
                        </div>
                    </div>
                )
            )}

        </div>
    )
}
