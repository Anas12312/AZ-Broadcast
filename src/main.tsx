import ReactDOM from 'react-dom/client'
import './styles/index.css'
import AppRouter from './router/AppRouter.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div className='w-screen h-screen'>
    <AppRouter />
  </div>
)

postMessage({ payload: 'removeLoading' }, '*')