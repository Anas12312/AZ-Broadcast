import React, { useContext, useEffect, useState } from 'react'
import Members, { Member } from '../Components/Members'
import ProfilePanel from '../Components/ProfilePanel'
import Chat from '../Components/Chat'
import RoomInfo from '../Components/RoomInfo'
import { socketContext } from '../main'
import { useNavigate, useParams } from 'react-router-dom'

export default function RoomNew() {

    const [members, setMembers] = useState<Member[]>([])
    const [messages, setMessages] = useState([] as { type: string, text: string, from: string }[])
    const socket = useContext(socketContext);
    const params = useParams();
    const nav = useNavigate()
    const [roomId, setRoomId] = useState('000000')
    useEffect(() => {
        setRoomId(params.id as string);
        socket.on('member-joined', (data) => {
            console.log(data)
            setMembers(data.members)
        })
    }, [])
   useEffect(() => {
        const elem = document.getElementById('messages') as Element;
        if (elem) {
            elem.scrollTop = elem.scrollHeight;
        }
    }, [messages]) 
    const sendMessage = (message: string): void => {
        if(message) {
            socket.emit("message_send", {
                message: message,
                roomId
            })
            setMessages(oldState => [...oldState, {
                type: "SELF",
                text: message,
                from: 'ME'
            }])
        }
    }
    useEffect(() => {
        setRoomId(params.id as string)
      }, [])
    const leaveRoom = () => {
        socket.emit('leave', {
            roomId
        })
        nav('/')
    }
    useEffect(() => {
        socket.on('member-joined', (data) => {
          setMembers(data.members)
          setMessages(oldState => [...oldState, {
            type: "GENERAL",
            text: `${data.memberUsername} has joined the room`,
            from: "SYSTEM"
          }])
    
        })
        socket.on('username_changed', (data) => {
          setMembers(data.members)
        })
        socket.on('member-left', (data) => {
          setMembers(data.members)
          setMessages(oldState => [...oldState, {
            type: "GENERAL",
            text: `${data.memberUsername} has left the room`,
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
          setMessages(oldState => [...oldState, {
            type: "MESSAGE",
            text: data.message,
            from: data.senderUsername
          }])
        })
      }, [socket])
    return (
        <div className='relative bg-white w-full h-full'>
            <div className='flex justify-center items-end w-full h-full'>

                {/* Members */}
                <Members members={members} />

                <ProfilePanel leaveRoom={leaveRoom} username='Zyad' image='./profile.png' />

                {/* Playlist */}
                <div className='bg-[#2b2d33] h-full w-[53%]'>

                </div>

                {/* Chat */}
                <Chat messages={messages} sendMessage={sendMessage} />

                <RoomInfo roomId={roomId} />
            </div>
        </div>
    )
}
