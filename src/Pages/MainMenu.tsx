import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../Socket/socket';
import Cookies from 'cookies-js';
function MainMenu() {
  const nav = useNavigate();

  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [username, setUsername] = useState(Cookies.get("username") || 'Not Loaded')
  const [image, setImage] = useState(Cookies.get("image") || '')
  const onSubmitUserData = () => {
    socket.emit('change_name', { username, image });
    Cookies.set("image", image)
    Cookies.set("username", username)
  }

  const createRoom = () => {
    socket.emit('create');
  }

  const joinRoom = () => {
    socket.emit('join', { roomId: code });
  }

  useEffect(() => {
    function onError(data: any) {
      setError(data.message)
    }
 
    function onJoined(data: any) {
      nav('/room/' + data.roomId)
    }

    function onCreated(data: any) {
      nav('/room/' + data.roomId)
    }

    socket.on('error', onError);
    socket.on('joined', onJoined);
    socket.on('created', onCreated);

    return () => {
      socket.off('error', onError);
      socket.off('joined', onJoined);
      socket.off('created', onCreated);        
    }

  }, [])


  return (<div onKeyDown={(e) => {
    console.log(e.keyCode)
    // if(e.key = "p") {
    //   nav('/test')
    // }
  }}>
    <form
      className='flex flex-col absolute bottom-0 left-0 space-y-1 bg-slate-700 p-4 border border-slate-800 rounded-tr-xl'
      
    >
      <label className='text-white' >Username</label>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='pl-1'
      />

      <label className='text-white'>Image</label>
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className='pl-1'
      />

      <button
        className='w-full bg-slate-200 border-2 border-slate-800 rounded-md'
        onClick={onSubmitUserData}
      >Save</button>
    </form>

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
            onClick={createRoom}>New Room</div>

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
            onClick={joinRoom}>Join</div>
        </div>

      </div>
    </div>
  </div>)
}

export default MainMenu
