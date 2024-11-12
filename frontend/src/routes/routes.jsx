import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import AddSubject from "../pages/AddSubject";
import AddTeacher from "../pages/AddTeacher";
import AddStudent from "../pages/AddStudent";
import AllStudent from "../pages/AllStudent";
import AllTeacher from "../pages/AllTeacher";
import Notice from "../pages/Notice";
import StudentDetails from "../components/StudentDetails";
import EditStudent from "../components/EditStudent";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute><Main/></PrivateRoute>,
      children:[
        {
            path:"/",
            element: <Home/>,
        },
        {
            path:"/profile",
            element: <Profile/>,
        },
        {
            path:"/add_subject",
            element: <AddSubject/>,
        },
        {
            path:"/add_teacher",
            element: <AddTeacher/>,
        },
        {
            path:"/add_student",
            element: <AddStudent/>,
        },
        {
            path:"/all_student",
            element: <AllStudent/>,
        },
        {
          path:"/student_details/:id",
          element: <StudentDetails/>,
          loader: ({params}) => fetch(`${import.meta.env.VITE_LINK}/api/students/${params.id}`),
        },
        {
          path:"/edit_student/:id",
          element: <EditStudent/>,
          loader: ({params}) => fetch(`${import.meta.env.VITE_LINK}/api/students/${params.id}`),
        },
        {
            path:"/all_teacher",
            element: <AllTeacher/>,
        },
        {
            path:"/notice",
            element: <Notice/>,
        },
        
      ]
    },
    {
      path:"/login",
      element: <Login/>
    }
  ]);