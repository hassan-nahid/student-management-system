import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './routes/routes';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './context/UserContext';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
    <ToastContainer />
    <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
)
