import React from 'react'
import { Link, Route , Routes } from 'react-router-dom'
import UserRegistration from './components/UserRegistration';
import Home from './components/Home';

const App = () => {
  return (
    <>
    <div>
    <Link to="/" ></Link>
    <Link to="/home" ></Link>
    </div>

    <Routes>
      <Route path='/' element={ <UserRegistration />} />
         <Route path='/home' element={ <Home />} />
    </Routes>
    </>
  )
}

export default App
