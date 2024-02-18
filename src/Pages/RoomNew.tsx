import React, { useContext, useEffect, useState } from 'react'
import Members, { Member } from '../Components/Members'
import ProfilePanel from '../Components/ProfilePanel'
import Chat from '../Components/Chat'
import RoomInfo from '../Components/RoomInfo'
import { socketContext } from '../main'
import { useParams } from 'react-router-dom'

export default function RoomNew() {

    const [members, setMembers] = useState<Member[]>([])

    const socket = useContext(socketContext);
    const params = useParams();
    
    const [roomId, setRoomId] = useState('000000')

    useEffect(() => {
         
        setRoomId(params.id as string);

        socket.on('member-joined', (data) => {
            console.log(data)
            setMembers(data.members)
          })
    }, [])

    return (
        <div className='relative bg-white w-full h-full'>
            <div className='flex justify-center items-end w-full h-full'>

                {/* Members */}
                <Members  members={members}/>

                <ProfilePanel username='Zyad' image='./profile.png'/>

                {/* Playlist */}
                <div className='bg-slate-800 h-full w-[53%]'>

                </div>

                {/* Chat */}
                <Chat />

                <RoomInfo roomId={roomId}/>
            </div>
        </div>
    )
}
