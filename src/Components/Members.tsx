import React from 'react'
import ProfilePanel from './ProfilePanel'

export default function Members() {
    return (
        <div className='bg-slate-900 h-full w-[17%]'>

            <div className=' flex flex-col space-y-1 pt-5 px-3 justify-start items-center'>

                <MemberCard username={'Zyad'} image={'./profile.png'}/>
                <MemberCard username={'Anazz'} image={'./profile.png'}/>
                <MemberCard username={'Zika'} image={'./profile.png'}/>
                <MemberCard username={'Ay ebn 3arsaaaaaaaaaaaaaaaaaaaaaa'} image={'./profile.png'}/>
                
            </div>

            

        </div>
    )
}


function MemberCard({username, image} : {username: string, image: string}) {
    return (
        <div className='flex justify-start space-x-3 items-center pl-2 h-14 w-full rounded-lg hover:bg-slate-800 hover:cursor-pointer'>

            <div className='rounded-full w-10 h-10 flex items-center justify-center'>
                <img src={image} className='w-10 h-10 rounded-full object-cover'/>
            </div>

            <div className='font-main text-white select-none truncate max-w-[70%]'>
                {username}
            </div>

        </div>
    )
}
