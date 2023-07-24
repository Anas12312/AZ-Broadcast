import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { socketContext } from '../main'

function MainMenu() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const socket = useContext(socketContext)
  const nav = useNavigate();
  const sendMessage = (message: string):void => {
    socket.emit("message_send", {
      message: message
    })
  }
  useEffect(()=>{
    socket.on('error', (data) => {
        setError(data.message)
    })
    socket.on('joined', (data) => {
      nav('/room/' + data.roomId)
    })
    socket.on('created', (data) => {
      nav('/room/' + data.roomId)
    })

  },[socket])
  return (
    <div className='w-full h-full'>
      <div className='w-full h-full flex justify-start items-center flex-col'>
        <input
         className='w-[21.5rem] h-10 p-2 pb-3 border border-black rounded-md'
         value={code}
         placeholder='Type the ID of the room'
         onChange={(e)=>{
          setCode(e.target.value)
         }}
        />
        <div className='flex'>  
          <div className='w-40 h-20 flex justify-center items-center 
                        bg-gray-600 rounded-md text-white m-3 
                          hover:cursor-pointer hover:bg-slate-500'
               onClick={()=>{
                socket.emit("join", {
                  roomId: code
                })
               }}>Join Room</div>
          <div className='w-40 h-20 flex justify-center items-center 
                        bg-gray-600 rounded-md text-white m-3 
                          hover:cursor-pointer hover:bg-slate-500'
               onClick={()=>{
                socket.emit("create")
               }}>Create Room</div>
        </div>
        <div>{error}</div>
      </div>
    </div>
  )
}

export default MainMenu
