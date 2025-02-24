import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'



import RootLayout from './components/RootLayout'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import StudentProfile from './pages/StudentProfile'
import CompanyProfile from './pages/CompanyProfile'
import Hackthons from './components/student/Hackthons' // Corrected import - Hackathons
import Interviews from './components/student/Interviews'
import Jobs from './components/student/Jobs'
import Mocktests from './components/student/Mocktests'
import Profile from './components/student/Profile'

function App() {
  let router=createBrowserRouter([
    {
      path:'',
      element:<RootLayout/>,
      children:[
        {
          path:'',
          element:<Home/>
        },
        {
          path:'Register',
          element:<Register/>
        },
        {
          path:'Login',
          element:<Login/>
        },
        {
          path:'studentprofile',
          element:<StudentProfile/>,
          children:[
            {
              path:'Hackathons', 
              element:<Hackthons/>
            },
            {
              path:'Interviews',
              element:<Interviews/>
            },
            {
              path:'Jobs',
              element:<Jobs/>
            },
            {
              path:'Mocktests',
              element:<Mocktests/>
            },
            {
              path:'Profile',
              element:<Profile/>
            },
          ]
        },
        {
          path:'companyprofile',
          element:<CompanyProfile/>
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;

