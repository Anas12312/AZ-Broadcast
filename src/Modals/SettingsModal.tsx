import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom';

export default function SettingsModal({ isOpen, setIsOpen, oldUsername, OldImage }: { isOpen: boolean, setIsOpen: Function, oldUsername: string, OldImage: string }) {

  const [username, setUsername] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Upload Image
  const [isFilePicked, setIsFilePicked] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  useEffect(() => {
    setUsername(oldUsername);
    setImage(OldImage);
    setError('')
  }, [])

  const closeModal = () => {
    setError(' ');
    setIsOpen(false);
    setIsLoading(false);
  }

  const handleSubmission = () => {
    setIsLoading(true)
    if (selectedFile) {
      const formData = new FormData();

      formData.append('file', selectedFile);

      fetch(
        config.BASE_URL + '/upload',
        {
          method: 'POST',
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((result) => {
          update(result.message)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
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
        {isLoading && (
          <LoadingDefault />
        )}
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
          />
        </div>


        <div className='w-full'>
          <div className='w-full flex justify-center bg-secondary-3 rounded-md border border-primary-1 p-2 mb-1'>
            <div className='relative w-60 h-60 flex justify-center items-center rounded-full border-4 border-white'>
              <img id='preview' className='object-cover w-full h-full flex-shrink-0 rounded-full' src={image ? image : ""}
              />
            </div>
          </div>
          <div className='w-full flex justify-center items-center h-20'>
            <input id='Res-Text' className='hidden'
              type='file'
              accept='.jpg, .jpeg, .png'
              onChange={() => { }} />
            <label className='w-32 h-10 bg-primary-2 border-2 text-white flex justify-center items-center hover:cursor-pointer hover:bg-primary-1 trans' htmlFor='Res-Text'>Upload</label>
          </div>
        </div>
        <div className='w-full'>
          <button className="w-full  h-9 rounded-md border text-sm bg-primary-2 text-white hover:bg-primary-1 trans"
            onClick={() => { }}
          >Save</button>
        </div>
      </Modal>
    </div>
  )
}
