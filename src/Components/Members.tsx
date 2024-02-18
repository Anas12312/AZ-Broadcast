import React, { useContext, useEffect, useState } from 'react'

export default function Members({ members = [] }: {members: Member[]} ) {

    return (
        <div className='bg-slate-900 h-full w-[17%]'>

            <div className=' flex flex-col space-y-1 pt-5 px-3 justify-start items-center'>

                {
                    members.map((member, i) => {
                        return <MemberCard {...member} key={i} />
                    })
                }

            </div>
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
