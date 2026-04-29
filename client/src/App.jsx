import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import Auth from './page/Auth'

export const ServerUrl = 'http://localhost:3000';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
    </Routes>
  )
}

export default App