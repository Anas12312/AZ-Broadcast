import ReactDOM from 'react-dom/client'
import React from 'react'
import './styles/index.css'
import AppRouter from './router/AppRouter.tsx'
import { connect } from 'socket.io-client'

export const BASE_URL = 'http://localhost:4000'
// export const BASE_URL = "https://webrtc-test-l40m.onrender.com/";

// Connect Socket
const socket = connect(BASE_URL);

// Get user local data
let localUsername = localStorage.getItem('username');
let localImage = localStorage.getItem('image');

if(!localUsername) {
  localUsername = 'USER' + Math.floor(Math.random() * 10000);
  localStorage.setItem('username', localUsername);
}
if(!localImage) localImage = '';

// Init user local data
socket.emit('init', { username: localUsername, image: localImage });

// Export socket context
export const socketContext = React.createContext(socket);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <socketContext.Provider value={socket}>
    <div className='w-screen h-screen'>
      <AppRouter />
    </div>
  </socketContext.Provider>
)

postMessage({ payload: 'removeLoading' }, '*')