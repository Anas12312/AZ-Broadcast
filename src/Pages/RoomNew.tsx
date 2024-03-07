import { useEffect, useState } from 'react'
import Members, { Member } from '../Components/Members'
import ProfilePanel from '../Components/ProfilePanel'
import Chat, { currentTime } from '../Components/Chat'
import RoomInfo from '../Components/RoomInfo'
import { useNavigate, useParams } from 'react-router-dom'
import { socket } from '../Socket/socket'
import Music from '../Components/Player/Music'
import Cookies from 'cookies-js';

export default function RoomNew() {

  const [members, setMembers] = useState<Member[]>([])
  const [messages, setMessages] = useState([] as { type: string, text: string, from: string, image: string, time: string }[])
  const params = useParams();
  const nav = useNavigate()

  const roomId = params.id!;

  const [username, setUsername] = useState(Cookies.get("username") || 'Not Loaded')
  const [image, setImage] = useState(Cookies.get("image") || '')

  useEffect(() => {
    function onMemberJoined(data: any) {
      setMembers(data.members)
      setMessages(oldState => [...oldState, {
        type: "GENERAL",
        text: `${data.memberUsername} has joined the room`,
        from: "SYSTEM",
        image: "anas",
        time: ""
      }])
    }

    function onUsernameChanged(data: any) {
      setMembers(data.members)
      // Cookies.set("image", image)
      // Cookies.set("username", username)
    }

    function onMemberLeft(data: any) {
      setMembers(data.members)
      setMessages(oldState => [...oldState, {
        type: "GENERAL",
        text: `${data.memberUsername} has left the room`,
        from: "SYSTEM",
        image: "anas",
        time: ""
      }])
    }

    function onRoomCreated(data: any) {
      setMembers(data.members)
      setMessages([{
        type: "GENERAL",
        text: "You Have just Created This Channel Invite People to Join",
        from: "SYSTEM",
        image: "anas",
        time: ""
      }])
    }

    function onMessageRecieved(data: any) {
      setMessages(oldState => [...oldState, {
        type: "MESSAGE",
        text: data.message,
        from: data.senderUsername,
        image: data.sernderImage,
        time: currentTime()
      }])
    }
    function onTrackAdded(data: any) {
      setMessages(oldState => [...oldState, {
        type: "GENERAL",
        text: data,
        from: "SYSTEM",
        image: "SYSTEM",
        time: ""
      }])
    }
    function onSkip(data: any) {
      setMessages(oldState => [...oldState, {
        type: "GENERAL",
        text: data,
        from: "SYSTEM",
        image: "SYSTEM",
        time: ""
      }])
    }
    function onPrev(data: any) {
      setMessages(oldState => [...oldState, {
        type: "GENERAL",
        text: data,
        from: "SYSTEM",
        image: "SYSTEM",
        time: ""
      }])
    }
    socket.on('message_recieved', onMessageRecieved);

    socket.on('room-created', onRoomCreated);


    socket.on('member-left', onMemberLeft);

    socket.on('username_changed', onUsernameChanged);

    socket.on('member-joined', onMemberJoined);

    socket.on('track_added', onTrackAdded)

    socket.on('track_skiped', onSkip)

    socket.on('track_preved', onPrev)

    return () => {
      socket.off('member-joined', onMemberJoined);
      socket.off('message_recieved', onMessageRecieved);
      socket.off('room-created', onRoomCreated);
      socket.off('member-left', onMemberLeft);
      socket.off('username_changed', onUsernameChanged);
      socket.off('track_added', onTrackAdded)
      socket.off('track_skiped', onSkip)
      socket.off('track_preved', onPrev)

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
        roomId,
        message
      })
      setMessages(oldState => [...oldState, {
        type: "SELF",
        text: message,
        from: 'ME',
        image: image,
        time: ""
      }])
    }
  }


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

        <ProfilePanel setUsername={setUsername} setImage={setImage} leaveRoom={leaveRoom} username={username} image={image} />

        {/* Playlist */}
        <Music roomId={roomId} />

        {/* Chat */}
        <Chat messages={messages} sendMessage={sendMessage} />

        <RoomInfo roomId={roomId!} />
      </div>
    </div>
  )
}
