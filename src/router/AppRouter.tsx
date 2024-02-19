import { Routes, Route, HashRouter } from 'react-router-dom'
import MainMenu from '../Pages/MainMenu'
import Room from '../Pages/Room'
import RoomNew from '../Pages/RoomNew'
import { connect } from 'socket.io-client'
import { createContext, useEffect } from 'react'
import { BASE_URL, socket } from '../Socket/socket'

export default function AppRouter() {

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<MainMenu />} />
        <Route path='/room/:id' element={<RoomNew />} />
      </Routes>
    </HashRouter>
  )
}
