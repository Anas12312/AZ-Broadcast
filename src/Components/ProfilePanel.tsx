import React, { useState } from 'react'
import SettingsModal from '../Modals/SettingsModal'


type ProfilePanel = {
    username: string,
    image: string
    leaveRoom: Function
}


export default function ProfilePanel({ leaveRoom, username, image }: ProfilePanel) {

    const [settingsModal, setSettingModal] = useState(false);

    const openSettingModal = () => {
        setSettingModal(true);
    }

    return (
        <>
            <SettingsModal
                isOpen={settingsModal}
                setIsOpen={setSettingModal}
                oldUsername={username}
                OldImage={image}
            />
            < div className='absolute bottom-0 left-0 h-28 w-[17%] bg-slate-200' >

                {/* Status */}
                < div className='h-[45%] bg-slate-950 flex justify-between items-center px-3' >

                    <div className='text-green-600 font-main select-none hover:cursor-pointer hover:underline'>
                        Status
                    </div>


                    <div onClick={() => {
                        leaveRoom()
                    }} className='w-8 h-[65%] rounded-md flex justify-center items-center hover:bg-slate-800 hover:cursor-pointer'>
                        <img src='./icons/hangup.svg' className='w-6 h-6' />
                    </div>
                </div >

                <div className='w-8 h-[65%] rounded-md flex justify-center items-center hover:bg-slate-800 hover:cursor-pointer'>
                    <img src='./icons/hangup.svg' className='w-6 h-6' />
                </div>
            </div >

            {/* Profile & Mute */}
            < div className='h-[55%] pl-2 flex justify-center items-center border-t border-slate-800 bg-slate-950' >

                <div className='w-[50%] flex justify-start space-x-3 items-center pl-2 h-10 rounded-md hover:bg-slate-800 hover:cursor-pointer'>

                    <div className='rounded-full w-8 h-8'>
                        <img src={image} className='w-8 h-8 rounded-full object-cover' />
                    </div>

                    <div className='font-main text-white select-none'>
                        {username}
                    </div>

                </div>

                <div className='w-[50%] h-full px-2 flex justify-center items-center'>
                    <div className='w-full h-[65%] rounded-md flex justify-center items-center hover:bg-slate-800 hover:cursor-pointer select-none'>
                        <img src='./icons/mic.svg' className='w-6 h-6' />
                    </div>
                    <div className='w-full h-[65%] rounded-md flex justify-center items-center hover:bg-slate-800 hover:cursor-pointer select-none'>
                        <img src='./icons/headset.svg' className='w-6 h-6' />
                    </div>
                    <div
                        onClick={openSettingModal}
                        className='w-full h-[65%] rounded-md flex justify-center items-center hover:bg-slate-800 hover:cursor-pointer select-none'>
                        <img src={'./icons/settings.svg'} className='w-6 h-6' />
                    </div>

                </div>


            </div >

        </>
    )
}
