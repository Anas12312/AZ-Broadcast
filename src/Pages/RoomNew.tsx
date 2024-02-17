import React from 'react'
import Members from '../Components/Members'
import ProfilePanel from '../Components/ProfilePanel'
import Chat from '../Components/Chat'
import RoomInfo from '../Components/RoomInfo'

export default function RoomNew() {
    return (
        <div className='relative bg-white w-full h-full'>
            <div className='flex justify-center items-end w-full h-full'>

                {/* Members */}
                <Members />

                <ProfilePanel username='Zyad' image='./profile.png'/>

                {/* Playlist */}
                <div className='bg-slate-800 h-full w-[53%]'>

                </div>

                {/* Chat */}
                <Chat />

                <RoomInfo roomId='123456'/>
            </div>
        </div>
    )
}
