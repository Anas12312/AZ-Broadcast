import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'
import AppRouter from './AppRouter.tsx'
import { connect } from 'socket.io-client'
const socket = connect("https://webrtc-test-l40m.onrender.com/")
// const socket = connect("http://localhost:4000")
export const socketContext = React.createContext(socket);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <socketContext.Provider value={socket}>
    <div className='w-screen h-screen'>
      <AppRouter />
    </div>
  </socketContext.Provider>
)

postMessage({ payload: 'removeLoading' }, '*')