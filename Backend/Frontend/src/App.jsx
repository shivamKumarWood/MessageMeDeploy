import React, { use } from 'react'
import Left from './home/Leftpart/Left'
import Right from './home/Rightpart/Right'
import Signup from './components/Signup'
import Login from "./components/Login"
import {useAuth} from './context/AuthProvider'
import { Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Loading from './components/Loading'
function App() {
  const [authUser, setAuthUser] = useAuth();
  return (
    <>
    <Routes>
      <Route path="/" element={authUser?(<div className='flex h-screen'>
     <Left/>
    <Right/>

    </div>):(<Navigate to={"/login"} />)} />
      <Route path="/login" element={authUser?<Navigate to={"/"}/>:<Login/>} />
      <Route path="/signup" element={authUser?<Navigate to={"/"}/>:<Signup />} />
      
    </Routes>
    <Toaster/>
    {/* <Loading/> */}
    </>
  );
}

export default App
