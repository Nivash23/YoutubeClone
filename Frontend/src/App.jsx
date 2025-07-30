import React, { useState } from 'react'
import Header from './Components/Header'
import InnerBody from './Components/InnerBody'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div id="wholebody">
     <Outlet/>
    </div>
  )
}

export default App