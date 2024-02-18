import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { socketContext } from '../main'

function MainMenu() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const socket = useContext(socketContext)
  const nav = useNavigate();
  useEffect(() => {
    const savedUN = localStorage.getItem("username")
    if (savedUN) {
      socket.emit("change_name", {
        username: savedUN
      })
      setUsername(savedUN)
    }
    socket.on('error', (data) => {
      setError(data.message)
    })
    socket.on('joined', (data) => {
      nav('/room/' + data.roomId)
    })
    socket.on('created', (data) => {
      nav('/room/' + data.roomId)
    })

  }, [socket, nav])
  return (
    <div className='w-screen h-screen'>
      <div className='w-full h-full flex justify-start items-center flex-col'>
        <div className='w-full text-xl font-bold flex justify-center items-center  mt-10'>
          <img className='w-52' src='../../images/logo.png' />
        </div>
        <div className='font-main text-4xl text-center mt-4'>
          Free video calls and meeting rooms for everyone <br></br> to talk, play music, and hangout
        </div>
        <div className='font-main text-gray-600 text-center mt-8'>
          AZ Broadcast Provides secure and easy-to-use video calls and meetings <br></br>with a music player for everyone, on any device
        </div>
        <div className='mt-5 text-red-600 font-bold'>{error}</div>
        <div className='flex items-center'>
          <div className='w-32 h-12 flex justify-center items-center 
                        bg-gray-600 rounded-md text-white m-2 mr-6 font-bold
                          hover:cursor-pointer hover:shadow hover:bg-gray-700'
            onClick={() => {
              socket.emit("create")
            }}>New Room</div>

          <input
            className='w-[21.5rem] h-12 p-2 pb-3 border border-black rounded-md'
            value={code}
            placeholder='Type the ID of the room'
            onChange={(e) => {
              setCode(e.target.value)
            }}
          />
          <div className='w-12 h-12
          
           flex justify-center items-center 
                        text-gray-600 rounded-md m-1 font-bold
                          hover:cursor-pointer hover:text-gray-800'
            onClick={() => {
              socket.emit("join", {
                roomId: code
              })
            }}>Join</div>
        </div>
        
      </div>
    </div>
  )
}

export default MainMenu
