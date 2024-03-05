import { useState } from 'react'
import { track } from './Track'
import { BASE_URL, socket } from '../../Socket/socket'
import SearchCard from './SearchCard'
import { RotatingLines } from 'react-loader-spinner'
interface props {
    refreshQueue: Function,
    roomId: string
    queue: track[]
}
export default function Search({ refreshQueue, roomId, queue }: props) {
    const [searchResults, setSearchResults] = useState<track[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(false)
    const searchYT = async () => {
        if (searchTerm) {
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
                    <RotatingLines />
                </div>
            ) : (
                <div className='mt-8 h-full border overflow-y-scroll'>
                    {
                        searchResults.map((searchResult: track, index: number) => {
                            return <SearchCard
                                index={index}
                                {...searchResult}
                                onClick={addToQueue}
                                exist = {queue.filter((t)=>{
                                    return t.url === searchResult.url
                                }).length > 0}
                            />
                        })
                    }
                </div>
            )}

        </div>
    )
}
