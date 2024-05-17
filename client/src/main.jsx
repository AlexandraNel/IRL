import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

import App from './App.jsx';
import Error from './Pages/Error';
import Landing from './Pages/Landing';
import LoginPage from './Pages/Login';
import Event from './Pages/Event';
import MyProfile from './Pages/MyProfile';
import Matches from './Pages/Matches'
import Discover from './Pages/Discover'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true, 
        element: <Landing />
      }, {
        path: '/login',
        element: <LoginPage />
      }, {
        path: '/event',
        element: <Event />
      }, {
        path: '/myprofile',
        element: <MyProfile />
      }, {
        path: '/matches',
        element: <Matches />
      }, {
        path: '/discover',
        element: <Discover />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
