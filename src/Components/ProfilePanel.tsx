import { useState } from 'react'
import SettingsModal from '../Modals/SettingsModal';


type ProfilePanel = {
    username: string,
    image: string
    leaveRoom: Function
    setUsername: Function
    setImage: Function
}

export default function ProfilePanel({ leaveRoom, username, image, setUsername, setImage }: ProfilePanel) {
    const [settingsModal, setSettingModal] = useState(false);

    const openSettingModal = () => {
        setSettingModal(true);
    }
    return (
        <div className='h-[73px] w-full ' >
            <SettingsModal
                isOpen={settingsModal}
                setIsOpen={setSettingModal}
                oldUsername={username}
                OldImage={image}
                setImage={setImage}
                setUsername={setUsername}
            />
            {/* Profile & Mute */}
            < div className='h-[100%] pl-2 flex justify-between items-center ' >

                <div className='w-[50%] flex justify-start space-x-3 items-center pl-2 h-10 rounded-md hover:bg-slate-600 hover:cursor-pointer'>

                    <div className='rounded-full w-8 h-8'>
                        <img src={image} className='w-8 h-8 rounded-full object-cover' />
                    </div>

                    <div className='text-xs text-white select-none truncate ' title={username}>
                        {username}
                    </div>

                </div>

                <div className='w-[50%] h-full px-2 flex justify-end items-center'>
                    <div onClick={openSettingModal} className='p-1 rounded-md flex justify-center items-center hover:bg-slate-600 hover:cursor-pointer select-none'>
                        <img src={'./icons/settings.svg'} className='w-6 h-6' />
                    </div>
                    <div onClick={() => {
                        leaveRoom()
                    }} className='p-1 rounded-md flex justify-center items-center hover:bg-slate-600 hover:cursor-pointer'>
                        <img src='./icons/hangup.svg' className='w-6 h-6' />
                    </div>

                </div>


            </div >

        </div >
    )
}