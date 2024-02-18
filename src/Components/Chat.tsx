import React, { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react'

export default function Chat() {

    const [chatInput, setChatInput] = useState('')
    const [messages, setMessages] = useState<Message[]>([
        { username: 'Zyad', image: './profile.png', content: 'a7aaaaaaa', timeStamp: 'now' },
        { username: 'Zyad', image: './profile.png', content: 'a7aaaaaaaaaaaaaaaaaaa', timeStamp: 'now' }
    ])

    const onChatSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Send

        setChatInput('')

        setMessages([...messages].concat({ username: 'Zyad', image: './profile.png', content: 'a7aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa7aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa7aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa7aaaaaaaaaaaaaaaaaaaaaa7aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', timeStamp: 'now' }))
    }

    return (
        <div className='bg-slate-900 h-[92%] w-[30%]'>
            <div className='flex flex-col w-full h-full '>

                <div className='relative w-full h-full pt-1  '>
                    <div className='absolute w-full bottom-0 pr-3 flex flex-col justify-end items-center space-y-1 overflow-auto'>
                        {
                            messages.map(message => {
                                return <Message {...message} />
                            })
                        }
                    </div>
                </div>


                <form className='h-[8%] w-full px-3 py-2 flex space-x-2'
                    onSubmit={onChatSubmit}
                >
                    <input className='w-full h-full rounded-lg px-2 bg-slate-800 text-white outline-none font-main'
                        placeholder='Message'
                        tabIndex={-1}
                        value={chatInput}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => { setChatInput(e.target.value) }}
                    />
                </form>
            </div>
        </div>
    )
}


type Message = {
    username: string,
    image: string,
    timeStamp: string,
    content: string
}
function Message({ username, image, content, timeStamp }: Message) {
    return (
        <div className='w-full min-h-14 hover:bg-slate-700 flex justify-start items-center pl-3'>

            <div className='rounded-full w-8 h-8 hover:cursor-pointer'>
                <img src={image} className='w-8 h-8 rounded-full object-cover select-none' />
            </div>

            <div className='w-full h-full pl-3 pr-7 mx-1  justify-center items-start text-white'>
                <div>
                    <span className='w-fit text-slate-300 font-main select-none hover:underline hover:cursor-pointer'>
                        {username}
                    </span>
                    <span className='select-none pl-2 text-sm text-slate-400'>
                        {timeStamp}
                    </span>
                </div>

                <div >
                    <p className='break-words text-sm'>
                        {content}
                    </p>
                </div>
            </div>
        </div>
    )
}
