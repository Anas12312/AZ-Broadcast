import { ChangeEvent, useState } from 'react'
import Modal from 'react-modal'
import { BASE_URL, socket } from '../Socket/socket';

export default function SettingsModal({ isOpen, setIsOpen, oldUsername, OldImage }: { isOpen: boolean, setIsOpen: Function, oldUsername: string, OldImage: string }) {

  const [username, setUsername] = useState(oldUsername)
  const [image, _setImage] = useState(OldImage)
  const [error, setError] = useState('')
  const [_isLoading, setIsLoading] = useState(false)

  // Upload Image
  const [_isFilePicked, setIsFilePicked] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File>()


  const closeModal = () => {
    setError(' ');
    setIsOpen(false);
    setIsLoading(false);
  }

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      setError('No file')
      return
    }

    if (event.target.files![0].type === 'image/jpeg' || event.target.files![0].type === 'image/png' || event.target.files![0].type === 'image/jpg') {
      setSelectedFile(event.target.files![0]);
      setIsFilePicked(true);
      const output = document.getElementById('preview') as HTMLInputElement
      output.src = URL.createObjectURL(event.target.files![0]);
    } else {
      setError("Image Type must be JPG, JPEG or PNG")
    }
  };

  const handleSubmission = async () => {
    setIsLoading(true)
    if (selectedFile) {
      const formData = new FormData();

      formData.append('file', selectedFile);

      fetch(
        BASE_URL + '/upload',
        {
          method: 'POST',
          body: formData
        }
      )
        .then(async (result) => {
          result = await result.json();

          socket.emit('change_name', { username, image: (result as any).image })

          localStorage.setItem('username', username)
          localStorage.setItem('image', (result as any).image)
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    } else {
      socket.emit('change_name', { username, image })
      localStorage.setItem('username', username)
      closeModal()
    }
  };

  return (
    <div>
      <Modal
        appElement={document.getElementById('root')!}
        isOpen={isOpen}
        className='shadow-xl h-fit w-1/3 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2
         absolute flex flex-col justify-center items-center border p-5 rounded-md bg-slate-800 text-white'
        onRequestClose={closeModal}
        shouldFocusAfterRender={false}
        closeTimeoutMS={200}
        style={{
          overlay: {
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(2px)'
          }
        }}
      >
        {/* {isLoading && (
          <Loading />
        )} */}
        <div><span className='text-sm ml-1 text-red-600 font-bold'>{error}</span></div>

        <div className='w-full flex justify-center items-start h-20'>
          <div><label id='Unit-Name-Lable' className='text-2xl ml-1 font-bold'>Edit Profle</label></div>
        </div>

        <div className='my-4 w-full font-main'>
          <label>Username</label>
          <input
            className=' w-full bg-slate-700 h-10 outline-none rounded-lg px-2'
            type='text'
            value={username}
            onChange={(e) => { setUsername(e.target.value) }}
          />
        </div>


        <div className='w-full'>
          <div className='w-full flex justify-center bg-secondary-3 rounded-md border border-primary-1 p-2 mb-1'>
            <div className='relative w-60 h-60 flex justify-center items-center rounded-full border-4 border-white'>
              <img id='preview' className='object-cover w-full h-full flex-shrink-0 rounded-full' src={image ? image : "./profile.png"}
              />
            </div>
          </div>
          <div className='w-full flex justify-center items-center h-20'>
            <input id='Res-Text' className='hidden'
              type='file'
              accept='.jpg, .jpeg, .png'
              onChange={changeHandler} />
            <label className='w-32 h-10 bg-primary-2 border-2 text-white flex justify-center items-center hover:cursor-pointer hover:bg-primary-1 trans' htmlFor='Res-Text'>Upload</label>
          </div>
        </div>
        <div className='w-full'>
          <button className="w-full  h-9 rounded-md border text-sm bg-primary-2 text-white hover:bg-primary-1 trans"
            onClick={handleSubmission}
          >Save</button>
        </div>
      </Modal>
    </div>
  )
}
