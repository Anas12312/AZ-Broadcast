import { useEffect, useRef, useState } from 'react'
import Members, { Member } from '../Components/Members'
import Chat, { currentTime } from '../Components/Chat'
import RoomInfo from '../Components/RoomInfo'
import { useLocation, useNavigate } from 'react-router-dom'
import { BASE_URL, socket } from '../Socket/socket'
import Music from '../Components/Player/Music'
import Cookies from 'cookies-js';
import Player from '../Components/Player/Player'
import { track } from '../Components/Player/Track'

export default function RoomNew() {

  const [members, setMembers] = useState<Member[]>([])
  const [messages, setMessages] = useState([] as { type: string, text: string, from: string, image: string, time: string }[])
  const {state: params} = useLocation();
  const roomId = params?.roomId;
  const nav = useNavigate()
  const [busy, setBusy] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [queue, setQueue] = useState<track[]>([])
  const [currentTrack, setCurrentTrack] = useState(0)
  const refreshQueue = async () => {
    const response = await fetch(BASE_URL + '/queue/' + roomId + "/" + socket.id)
    const newQueue = await response.json()
    if (newQueue.tracks) {
      setQueue(newQueue.tracks)
      setCurrentTrack(newQueue.currentTrack)
    }
  }
  const [username, setUsername] = useState(Cookies.get("username") || 'Not Loaded')
  const [image, setImage] = useState(Cookies.get("image") || '')

  useEffect(() => {
    if(!roomId) {
      nav('/')
      return
    }
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
        time: currentTime()
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
    <div className='relative flex flex-col bg-gradient-to-bl from-accent to-primary-alt  w-full h-full'>
      <div className='w-full flex h-[90%]'>
        {/* Members */}
        <Members 
          members={members} 
          image={image}
          setImage={setImage}
          leaveRoom={leaveRoom}
          setUsername={setUsername}
          username={username}
        />


        {/* Playlist */}
        <Music 
          roomId={roomId} 
          audioRef={audioRef}
          busy={busy}
          currentTrack={currentTrack}
          queue={queue}
          setBusy={setBusy}
          refreshQueue={refreshQueue}
          setCurrentTrack={setCurrentTrack}
          setQueue={setQueue}
        />

        {/* Chat */}
        <Chat messages={messages} sendMessage={sendMessage} />

        <RoomInfo roomId={roomId!} />
      </div>
      <div className='w-full h-[10%]'>
        <Player
          audioRef={audioRef}
          roomId={roomId}
          refreshQueue={refreshQueue}
          busy={busy}
          setBusy={setBusy}
          currentTrack={queue.at(currentTrack)}
        />
      </div>
    </div>
  )
}
