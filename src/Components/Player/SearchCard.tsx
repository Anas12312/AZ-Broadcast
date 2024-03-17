import { track } from './Track'
interface props extends track {
    index: number,
    onClick: Function
    exist: boolean
    removeTrack: Function
}
export default function SearchCard({ name, url, thumbnail, author, duration: _, index, onClick, exist, removeTrack }: props) {
    const selectedStyle = 'relative w-full my-2 text-white cursor-pointer py-2 flex flex-col items-center justify-center group'
    const normalStyle = 'relative w-full my-2 text-white cursor-pointer py-2 flex flex-col items-center justify-center group'
    return (
        <div
            key={index}
            className={exist ? selectedStyle : normalStyle}>
            {exist ? (
                <div onClick={() => {
                    removeTrack(url)
                }} className='w-[100%] h-full flex justify-center relative'>
                    <div className='absolute z-10 trans flex flex-col justify-center items-center w-full h-full'>
                        <img className='block group-hover:hidden w-16' src="../../../icons/correct.png" alt="" />
                        <img className='hidden group-hover:block w-16' src="../../../icons/delete.png" alt="" />
                        <div className='block group-hover:hidden font-bold'>Added</div>
                        <div className='hidden group-hover:block font-bold'>Remove from Queue</div>
                    </div>
                    <div className='w-[85%] h-full flex justify-center relative'>
                        <img className='w-full rounded-xl brightness-[0.25] group-hover:scale-105 trans' src={thumbnail} alt="" />
                    </div>
                </div>
            ) : (
                <div onClick={() => {
                    onClick(url)
                }} className='w-[100%] h-full flex relative justify-center'>
                    <div className='absolute scale-0 group-hover:scale-100 z-10 trans flex flex-col justify-center items-center w-full h-full'>
                        <img className=' w-16' src="../../../icons/add.png" alt="" />
                        <div className='font-bold'>Add to Queue</div>
                    </div>
                    <div className='w-[85%] h-full flex justify-center relative'>
                        <img className='w-full rounded-xl group-hover:scale-105 group-hover:brightness-[0.25] trans z-0' src={thumbnail} alt="" />
                    </div>
                </div>
            )}
            <div className='mt-2 flex flex-col h-full w-[85%]'>
                <div className='text-base font-bold truncate'>{name}</div>
                <div className='text-sm'>{author}</div>
            </div>
        </div>
    )
}
