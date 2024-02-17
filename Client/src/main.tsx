import ReactDOM from 'react-dom/client'
import  React from 'react'
import './index.css'
import AppRouter from './AppRouter.tsx'
import { connect } from 'socket.io-client'
const socket = connect("https://olive-steaks-dress.loca.lt")
export const socketContext = React.createContext(socket);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <socketContext.Provider value={socket}>
    <AppRouter />
  </socketContext.Provider>
)

postMessage({ payload: 'removeLoading' }, '*')