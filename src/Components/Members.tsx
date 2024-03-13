import ProfilePanel from "./ProfilePanel"
interface props {
    members: Member[]
    setUsername: Function
    setImage: Function
    leaveRoom: Function
    username: string
    image: string
}
export default function Members({ members = [], setImage, image, leaveRoom, setUsername, username }: props) {

    return (
        <div className=' h-full w-[17%] flex flex-col justify-between'>
            <div className="flex flex-col h-full w-full">
                <div className="w-full h-[20%] flex justify-center items-center">
                    <img className="w-44" src="../../images/logo-2.png" alt="" />
                </div>
                <div className='flex flex-col space-y-1 pt-5 px-3 justify-start items-center'>
                    {
                        members.map((member, i) => {
                            return <MemberCard {...member} key={i} />
                        })
                    }

                </div>
            </div>
            <ProfilePanel setUsername={setUsername} setImage={setImage} leaveRoom={leaveRoom} username={username} image={image} />

        </div>
    )
}

export type Member = {
    username: string,
    image?: string
}
function MemberCard({ username, image = './profile.png' }: Member) {
    return (
        <div className='flex justify-start space-x-3 items-center pl-2 h-14 w-full rounded-lg hover:bg-slate-800 hover:cursor-pointer'>

            <div className='rounded-full w-10 h-10 flex items-center justify-center'>
                <img src={image} className='w-10 h-10 rounded-full object-cover' />
            </div>

            <div className='font-main text-white select-none truncate max-w-[70%]'>
                {username}
            </div>

        </div>
    )
}
