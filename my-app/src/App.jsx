import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentProfile from './pages/StudentProfile';
import CompanyProfile from './pages/CompanyProfile';
import Hackathons from './components/student/Hackthons';
import Interviews from './components/student/Interviews';
import Jobs from './components/student/Jobs';
import Mocktests from './components/student/Mocktests';
import Profile from './components/student/Profile';
import AtsScore from './components/student/AtsScore';

const router = createBrowserRouter([
  {
    path: '',
    element: <RootLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'studentprofile', element: <StudentProfile /> },
      { path: 'companyprofile', element: <CompanyProfile /> },

      // Now all these routes open in fresh pages
      { path: 'hackathons', element: <Hackathons /> },
      { path: 'interviews', element: <Interviews /> },
      { path: 'jobs', element: <Jobs /> },
      { path: 'mocktests', element: <Mocktests /> },
      { path: 'profile', element: <Profile /> },
      { path: 'ats-score', element: <AtsScore /> }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
