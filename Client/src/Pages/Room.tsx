import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { socketContext } from '../main'
import { FaCopy } from 'react-icons/fa'
export default function Room() {
    const [roomId, setRoomId] = useState('')
    const [copied, setCopied] = useState(false)
    const [members, setMembers] = useState([] as string[])
    const [messages, setMessages] = useState([] as string[])
    const nav = useNavigate()
    const params = useParams()
    const socket = useContext(socketContext)
    const leaveRoom = () => {
      socket.emit('leave', {
        roomId
      })
      nav('/')
    }
    useEffect(() => {
        setRoomId(params.id as string)
    }, [])
    useEffect(() => {
      socket.on('member-joined', (data) => {
        setMembers(data.members)
        setMessages(oldState => [...oldState, `${data.member.slice(0,10)} has joined the room`])

      })
      socket.on('member-left', (data) => {
        setMembers(data.members)
        setMessages(oldState => [...oldState , `${data.member.slice(0,10)} has left the room`])
      })
      socket.on('room-created', (data) => {
        setMembers(data.members)
        setMessages(["You Have just Created This Channel Invite People to Join"])
      })
    }, [socket])
  return (
    <div className='w-full h-full flex justify-center items-center border border-black rounded-md'>
      <div className='h-[40rem] w-1/4  flex flex-col justify-start items-center'>
        <div className='w-full h-[20%] text-xl font-bold flex justify-center items-center'> 
            <img className='w-32' src='../../images/logo.png' />
        </div>
        <div className='w-full h-[6%] text-xl flex justify-center items-center'> 
          <span className='mr-3 text-[#594646] font-bold  '>Room No: {roomId}</span> 
          <span className='mt-1 text-[#594646] hover:cursor-pointer relative group' onMouseLeave={()=>{
            setCopied(false)
            navigator.clipboard.writeText(roomId)
          }} onClick={()=> {
            setCopied(true)
          }}>
            <FaCopy size={18} />
            {!copied?(
              <span className='title group-hover:scale-100'>Copy</span>
            ):(
              <span className='done-title group-hover:scale-100'>Copied</span>
            )}
          </span> 
        </div>
        <div className='w-full h-[5%]'></div>
        <div className='w-full h-[34%] flex flex-col justify-center items-start p-3'>
          <span className='text-xl font-bold text-[#594646]'>Members: {members.length}</span>
          <div className='w-full h-32 flex flex-col border justify-start items-start bg-slate-200 my-2 p-1 px-3  border-black'>
            {members.map((member) => {
              return (
                  <div className='flex items-start my-1 w-full'>
                  {member.slice(0, 10)}
                </div>
              )
            })}
          </div>
        </div>
        <div className='w-full h-[15%]'></div>
        <div className='w-full h-[20%] text-xl flex justify-center items-center'> 
            <div className='bg-red-600 hover:bg-red-700 hover:cursor-pointer 
                            w-1/2 h-1/2 flex justify-center 
                            items-center text-white border 
                            border-black rounded-md'
                 onClick={leaveRoom}>Leave Room</div>
        </div>
      </div>
      <div className='h-[40rem] w-3/4 border-l border-black bg-white flex flex-col justify-center items-center '>
        <div className='h-[10%] w-[95%] bg-slate-50 rounded-sm border border-black'>

        </div>
        <div className='h-[70%] w-[95%] bg-white rounded-sm border border-black flex flex-col py-3'>
            {messages.map((message)=>{
              return (
                <div className='my-2'>
                  {message}
                </div>
              )
            })}
        </div>
        <div className='h-[2%] w-[95%] rounded-sm '>

        </div>
        <div className='h-[10%] w-[95%] bg-white rounded-sm  border-black flex justify-start items-center'>
            <input className='h-[70%] w-[79%] border border-black p-1 px-3 rounded-md' />
            <div className='h-[70%] w-[3%]'></div>
            <div className='h-[70%] w-[18%] border flex justify-center text-lg
                            items-center bg-[#997373] text-white rounded-md
                            border-black hover:cursor-pointer hover:bg-[#C69898]'>Send</div>
            <div></div>
        </div>
      </div>
    </div>
  )
}
