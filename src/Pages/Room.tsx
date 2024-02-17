import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { socketContext } from '../main'
import { FaCopy } from 'react-icons/fa'
export default function Room() {
    const [roomId, setRoomId] = useState('')
    const [copied, setCopied] = useState(false)
    const [message, setMessage] = useState('')
    const [members, setMembers] = useState([] as string[])
    const [messages, setMessages] = useState([] as { type: string, text: string, from: string }[])
    const nav = useNavigate()
    const params = useParams()
    const socket = useContext(socketContext)
    useEffect(() => {
        mainFunction(200);
    })
    function mainFunction(time: number) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const madiaRecorder = new MediaRecorder(stream);
        madiaRecorder.start();
    
        let audioChunks = [] as any[];
    
        madiaRecorder.addEventListener("dataavailable", function (event) {
          audioChunks.push(event.data);
        });
        
        madiaRecorder.addEventListener("stop", function () {
          const audioBlob = new Blob(audioChunks);
    
          audioChunks = [];
          const fileReader = new FileReader();
          fileReader.readAsDataURL(audioBlob);
          fileReader.onloadend = function () {      
            const base64String = fileReader.result;
            socket.emit("voice", {
              audio: base64String,
              roomId: roomId
            });
    
          };
    
          madiaRecorder.start();
    
    
          setTimeout(function () {
            madiaRecorder.stop();
          }, time);
        });
    
        setTimeout(function () {
          madiaRecorder.stop();
        }, time);
      });
    
      socket.on("send", function (data) {
        const audio = new Audio(data);
        audio.play();
        console.log(data)
      });
    }
    useEffect(() => {
      const elem = document.getElementById('messages') as Element;
      if(elem)
      {
        elem.scrollTop = elem.scrollHeight;
      }
    }, [messages])

    const leaveRoom = () => {
      socket.emit('leave', {
        roomId
      })
      nav('/')
    }
    const sendMessage = (message: string):void => {
      socket.emit("message_send", {
        message: message,
        roomId
      })
      setMessages(oldState => [...oldState , {
        type: "SELF",
        text: message,
        from: 'ME'
      }])
    }
    useEffect(() => {
        setRoomId(params.id as string)
    }, [])
    useEffect(() => {
      socket.on('member-joined', (data) => {
        setMembers(data.members)
        setMessages(oldState => [...oldState, {
          type: "GENERAL",
          text: `${data.member.slice(0,10)} has joined the room`,
          from: "SYSTEM"
        }])

      })
      socket.on('member-left', (data) => {
        setMembers(data.members)
        setMessages(oldState => [...oldState , {
          type: "GENERAL",
          text: `${data.member.slice(0,10)} has left the room`,
          from: "SYSTEM"
        }])
      })
      socket.on('room-created', (data) => {
        setMembers(data.members)
        setMessages([{
          type: "GENERAL",
          text: "You Have just Created This Channel Invite People to Join",
          from: "SYSTEM"
        }])
      })
      socket.on('message_recieved', (data) => {
        setMessages(oldState => [...oldState , {
          type: "MESSAGE",
          text: data.message,
          from: data.sender
        }])
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
          <span className='mt-1 text-[#594646] hover:cursor-pointer relative group' onMouseLeave={() => {
            setCopied(false)
            navigator.clipboard.writeText(roomId)
          }} onClick={() => {
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
        <div id='messages' className='h-[70%] w-[95%] bg-white rounded-sm border border-black flex flex-col py-3 overflow-auto'>
            {messages.map((message) => {
              if(message.type === "GENERAL") {
                return (
                  <div className='my-2 font-bold'>
                    {message.text}
                  </div>
                )
              }else if(message.type === "MESSAGE") {
                return (
                  <div className='flex flex-col items-start justify-center m-2'>
                    <div className='my-1 font-bold text-sm'>{message.from.slice(0,10)}</div>
                    <div className='text-sm flex justify-start items-center rounded-md border border-yellow-600 max-w-[60%] min-h-[3rem] p-2 break-words text-left overflow-clip'>
                      <div>{message.text}</div>
                    </div>
                  </div>
                )
              }else if(message.type === "SELF") {
                return (
                  <div className='flex flex-col items-end justify-center m-2'>
                    <div className='my-1 font-bold text-sm'>{message.from.slice(0,10)}</div>
                    <div className='text-sm flex justify-start items-center rounded-md border border-green-600 max-w-[60%] min-h-[3rem] p-2 break-words text-left overflow-clip'>
                      <div>{message.text}</div>
                    </div>
                  </div>
                )
              }
            })}
        </div>
        <div className='h-[2%] w-[95%] rounded-sm '>

        </div>
        <div className='h-[10%] w-[95%] bg-white rounded-sm  border-black flex justify-start items-center'>
            <input 
            value={message}
            onChange={(e) => {setMessage(e.target.value)}}
            onKeyDown={(e) => {
              if(e.keyCode === 13) {
                sendMessage(message)
                setMessage("")
              }
            }}
            className='h-[70%] w-[79%] border border-black p-1 px-3 rounded-md' />
            <div className='h-[70%] w-[3%]'></div>
            <div className='h-[70%] w-[18%] border flex justify-center text-lg
                            items-center bg-[#997373] text-white rounded-md
                            border-black hover:cursor-pointer hover:bg-[#C69898]'
                 onClick={() => {
                  if(message) {
                    sendMessage(message)
                    setMessage("")
                  }
                 }}>Send</div>
            <div></div>
        </div>
      </div>
    </div>
  )
}
