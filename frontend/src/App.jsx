import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/Login/Login'
import Footer from './components/Footer'
import Singup from './pages/Singup/Singup'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authUser'
import { Loader } from "lucide-react";
import WatchPage from './pages/Watch/WatchPage'
import SearchPage from './pages/Search/SearchPage'
import SearchHistoryPage from './pages/History/SearchHistoryPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

const App = () => {
  const { user ,isCheckingAuth,authCheck } = useAuthStore()
  console.log("Usuario autenticado: ", user)
  


  // Chamar a função authCheck para verificar se o usuário está autenticado
  useEffect(() => {
    authCheck()
  }, [authCheck ])

  // Enquando estiver checando a autenticação, mostrar um loader
  if (isCheckingAuth) {

    return <div className='h-screen'>
           <div className='flex items-center justify-center bg-black h-full'>
            <Loader className='animate-spin text-red-600 size-10' />  
           </div>
           </div>
  }
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={!user ? <Login />:<Navigate to={'/'}/>} />
      {/* Se o usuário não estiver autenticado, redirecionar para a página de cadastro, caso contrário, redirecionar para a página inicial */}
      <Route path="/cadastro" element={!user ? <Singup />:<Navigate to={'/'}/>} />
      <Route path="/assistir/:id" element={ user ? <WatchPage/>:<Navigate to={'/login'}/>} />
      <Route path="/search" element={ user ? <SearchPage/>:<Navigate to={'/login'}/>} />
      <Route path="/history" element={ user ? <SearchHistoryPage/>:<Navigate to={'/login'}/>} />
      <Route path='/*' element={<NotFoundPage />} />


    </Routes>
    <Footer/>
    <Toaster/>
    </>
  )
}

export default App
