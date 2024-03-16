import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../Socket/socket';
function MainMenu() {
  const nav = useNavigate();

  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const _1 = 1;
  console.log(_1);
  // const [username, _setUsername] = useState(Cookies.get("username") || 'Not Loaded')
  // const [image, _setImage] = useState(Cookies.get("image") || '')
  // const onSubmitUserData = () => {
  //   socket.emit('change_name', { username, image });
  //   Cookies.set("image", image)
  //   Cookies.set("username", username)
  // }

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
    {/* <form
      className='flex flex-col absolute bottom-0 left-0 space-y-1 bg-slate-700 p-4 border border-slate-800 rounded-tr-xl '

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
    </form> */}

    <div className='w-screen h-screen text-main bg-gradient-to-tl from-gray-800 from-60% to-black text-white select-none'>
      <div className='w-full h-full flex justify-start items-center flex-col'>
        <div className='w-full text-xl font-bold flex justify-center items-center mt-[50px]'>
          <img className='w-[400.15px]' src='../../images/logo-2.png' />
        </div>
        <div className='font-main text-[36px] text-center mt-[32px] font-bold'>
          Free radio rooms for everyone to chat,  <br></br> play music, and hangout
        </div>
        <div className='w-[250px] h-[60px] flex justify-center items-center  font-main text-[24px]
                        bg-accent rounded-md text-white m-2 mr-6 mt-[20px] font-bold
                        hover:cursor-pointer hover:shadow hover:bg-accent-alt'
          onClick={createRoom}>Create Room <img className='w-[40px] ml-4' src="../../icons/plus.png" alt="" /></div>
        <div className='flex items-center m-[20px]'>
          <input
            className='w-[21.5rem] h-12 p-2 pb-3 border border-black rounded-l-[10px] text-main text-black bg-gray-100'
            value={code}
            placeholder='Type the ID of the room'
            onChange={(e) => {
              setCode(e.target.value)
            }}
            onKeyDown={(e) => {
              if(e.key === "Enter") {
                joinRoom()
              }
            }}
          />
          <div className='w-[100px] h-12 rounded-r-[10px] bg-accent
                        flex justify-center items-center 
                        text-white text-main text-[24px]
                        hover:cursor-pointer hover:bg-accent-alt font-main'
            onClick={joinRoom}>Join</div>
        </div>
        <div className=' text-red-600 font-bold'>{error}</div>
        <div className='text-center mt-3 text-lg font-main'>
          AZ Broadcast Provides secure and easy-to-use music player  <br></br>  for everyone, on any device
        </div>
      </div>
    </div>
  </div>)
}

export default MainMenu
