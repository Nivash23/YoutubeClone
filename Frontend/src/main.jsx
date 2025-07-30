import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { commonstore } from './Components/Reduxstore.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './Components/ErrorPage.jsx'
import Loginpage from './Components/Loginpage.jsx'
import Videoplayer from './Components/Videoplayer.jsx'
import Home from './Components/Home.jsx'
import Subscriptions from './Components/Subscriptions.jsx'
import ChannelManagement from './Components/ChannelManagement.jsx'

export const Routes = createBrowserRouter([{
  path: "/",
  element: <App />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: '/',
      element:<Home/>
  },
     {
    path: "/userlogin",
    element: <Loginpage />,
  },
  {
    path: "/videoplayer/:_id/:subscribingtxt",
    element: <Videoplayer />,
  },
  {
    path: "/mychannel",
    element: <ChannelManagement />,
  },
  {
    path: "/subscriptions",
    element: <Subscriptions />,
  }
  ]
}
 ]) 

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={commonstore}>
  <RouterProvider router={Routes}>

        
      <App />
  </RouterProvider>
  </Provider>
)
