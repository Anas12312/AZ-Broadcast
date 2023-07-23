import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { socketContext } from '../main'
export default function Room() {
    const [roomId, setRoomId] = useState('')
    const nav = useNavigate()
    const params = useParams()
    const socket = useContext(socketContext)
    useEffect(() => {
        setRoomId(params.id as string)
    }, [])
  return (
    <div className='w-full h-full justify-center items-center' onClick={()=>nav(-1)}>
        {roomId}
    </div>
  )
}
