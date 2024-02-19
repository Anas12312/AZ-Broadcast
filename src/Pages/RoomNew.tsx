import React, { useContext, useEffect, useState } from 'react'
import Members, { Member } from '../Components/Members'
import ProfilePanel from '../Components/ProfilePanel'
import Chat from '../Components/Chat'
import RoomInfo from '../Components/RoomInfo'
import { useNavigate, useParams } from 'react-router-dom'
import { socket } from '../Socket/socket'

export default function RoomNew() {

  const [members, setMembers] = useState<Member[]>([])
  const [messages, setMessages] = useState([] as { type: string, text: string, from: string }[])
  const params = useParams();
  const nav = useNavigate()

  const roomId = params.id;

  const [username, setUsername] = useState(localStorage.getItem('username')!)
  const [image, setImage] = useState(localStorage.getItem('image')!)

  useEffect(() => {

    function onMemberJoined(data: any) {
      setMembers(data.members)
      setMessages(oldState => [...oldState, {
        type: "GENERAL",
        text: `${data.memberUsername} has joined the room`,
        from: "SYSTEM"
      }])
    }

    function onUsernameChanged(data: any) {
      setMembers(data.members)
      setUsername(localStorage.getItem('username')!)
      setImage(localStorage.getItem('image')!)
    }

    function onMemberLeft(data: any) {
      setMembers(data.members)
      setMessages(oldState => [...oldState, {
        type: "GENERAL",
        text: `${data.memberUsername} has left the room`,
        from: "SYSTEM"
      }])
    }

    function onRoomCreated(data: any) {
      console.log('test', data.members);
      setMembers(data.members)
      setMessages([{
        type: "GENERAL",
        text: "You Have just Created This Channel Invite People to Join",
        from: "SYSTEM"
      }])
    }

    function onMessageRecieved(data: any) {
      setMessages(oldState => [...oldState, {
        type: "MESSAGE",
        text: data.message,
        from: data.senderUsername
      }])
    }

    socket.on('message_recieved', onMessageRecieved);

    socket.on('room-created', onRoomCreated);


    socket.on('member-left', onMemberLeft);

    socket.on('username_changed', onUsernameChanged);

    socket.on('member-joined', onMemberJoined);

    return () => {
      socket.off('member-joined', onMemberJoined);
      socket.off('message_recieved', onMessageRecieved);
      socket.off('room-created', onRoomCreated);
      socket.off('member-left', onMemberLeft);
      socket.off('username_changed', onUsernameChanged);
    }
  }, [])

  useEffect(() => {
    const elem = document.getElementById('messages') as Element;
    if (elem) {
      elem.scrollTop = elem.scrollHeight;
    }
  }, [messages])

  const sendMessage = (message: string): void => {
    if (message) {
      socket.emit("message_send", {

      })
      setMessages(oldState => [...oldState, {
        type: "SELF",
        text: message,
        from: 'ME'
      }])
    }
  }

  useEffect(() => {
    console.log(members);
    console.log(socket);
  }, [members])

  // useEffect(() => {
  //   setRoomId(params.id as string)
  // }, [])

  const leaveRoom = () => {
    socket.timeout(100).emit('leave', {
      roomId
    }, () => {
      nav('/');
    })
  }

  return (
    <div className='relative bg-white w-full h-full'>
      <div className='flex justify-center items-end w-full h-full'>

        {/* Members */}
        <Members members={members} />

        <ProfilePanel leaveRoom={leaveRoom} username={username} image={image} />

        {/* Playlist */}
        <div className='bg-slate-800 h-full w-[53%]'>

        </div>

        {/* Chat */}
        <Chat messages={messages} sendMessage={sendMessage} />

        <RoomInfo roomId={roomId!} />
      </div>
    </div>
  )
}
