import { Routes, Route, HashRouter } from 'react-router-dom'
import MainMenu from '../Pages/MainMenu'
import RoomNew from '../Pages/RoomNew'
import Test from '../Pages/Test'


export default function AppRouter() {

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<MainMenu />} />
        <Route path='/test' element={<Test />} />
        <Route path='/room' element={<RoomNew />} />
      </Routes>
    </HashRouter>
  )
}
