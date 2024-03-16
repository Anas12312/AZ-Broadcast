import { ChangeEvent, useState } from 'react'
type chatProps = {
    messages: {
        type: string,
        text: string,
        from: string,
        image: string,
        time: string
    }[],
    sendMessage: Function
}
export function currentTime() {
    const date = new Date()
    const minutes = date.getMinutes() > 9 ? date.getMinutes() :  "0" + date.getMinutes()

    const time = date.getHours() > 12? date.getHours() - 12 + ":" + minutes + " pm": date.getHours() + ":" + minutes 
    return time
}
export default function Chat({ messages, sendMessage }: chatProps) {

    const [chatInput, setChatInput] = useState('')

    return (

        <div className='bg-[#1e1f22] h-full w-[30%] font-main'>
            <div id='messages' className='w-full h-[92%] pt-20 flex flex-col justify-start items-center space-y-1 overflow-y-scroll'>
                {
                    messages.map((message, i) => {
                        if (message.type === "GENERAL") {
                            return (
                                <div className='w-full text-center text-sm my-2 flex justify-center items-center font-main text-white' key={i}>
                                    {message.text}
                                </div>
                            )
                        } else if (message.type === "MESSAGE") {
                            return (
                                <Message content={message.text} username={message.from} image={message.image} timeStamp={message.time} key={i}/>
                            )
                        } else if (message.type === "SELF") {
                            return (
                                <Message content={message.text} username={'You'} image={message.image} timeStamp={message.time} key={i}/>
                            )
                        }
                    })
                }
            </div>


            <form className='h-[8%] w-full px-3 py-2 flex space-x-2'
                onSubmit={(e) => {
                    e.preventDefault()
                    sendMessage(chatInput)
                    setChatInput('')
                }}
            >
                <input className='w-full h-full rounded-lg px-2 bg-[#383a40] text-white outline-none font-thin'
                    placeholder='Message'
                    tabIndex={-1}
                    value={chatInput}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setChatInput(e.target.value) }}
                />
            </form>
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
        <div className='w-full min-h-14 hover:bg-slate-700 flex justify-start items-center pl-3 text-sm font-sans'>

            <div className='rounded-full w-8 h-8 hover:cursor-pointer'>
                <img src={image} className='w-8 h-8 rounded-full object-cover select-none' />
            </div>

            <div className='w-full h-full pl-3 pr-7 mx-1  justify-center items-start text-gray-300'>
                <div>
                    <span className='w-fit text-gray-200 font-bold select-none hover:underline hover:cursor-pointer'>
                        {username}
                    </span>
                    <span className='select-none pl-2 text-xs text-gray-300'>
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
