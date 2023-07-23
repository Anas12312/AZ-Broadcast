import { useEffect } from 'react'
import './App.css'
import { connect } from 'socket.io-client'
const socket = connect("http://localhost:3000")
function App() {
  const sendMessage = (message: string):void => {
    socket.emit("message_send", {
      message: message
    })
  }
  useEffect(()=>{
    socket.on('message_recieved', (data) => {
        let textarea = document.getElementById('area') as HTMLInputElement;
        textarea.value = data.message;
    })
  },[socket])
  return (
    <div className=''>
      <div className='w-full h-full flex justify-center items-center flex-col border'>
        <textarea id='area' className='border-2 border-black m-5' />
        <div className='w-32 h-20 bg-red-400 rounded-md border border-black flex justify-center items-center hover:cursor-pointer text-white'
        onClick={(e) => {
          let textarea = document.getElementById('area') as HTMLInputElement;
          sendMessage(textarea.value)
          textarea.value = "";
        }}>Done</div>
      </div>
    </div>
  )
}

export default App
