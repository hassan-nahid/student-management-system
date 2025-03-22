import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import AddTeacher from "../pages/Admin/AddTeacher";
import AddStudent from "../pages/Admin/AddStudent";
import AllStudent from "../pages/Admin/AllStudent";
import AllTeacher from "../pages/Admin/AllTeacher";
import Notice from "../pages/Admin/Notice";
import StudentDetails from "../components/AdminExtraPage/StudentDetails";
import EditStudent from "../components/AdminExtraPage/EditStudent";
import PrivateRoute from "./PrivateRoute";
import AdminPrivateRoute from "./AdminPrivateRoute";
import ErrorPage from "../pages/ErrorPage";
import TeacherDetails from "../components/AdminExtraPage/TeacherDetails";
import EditTeacher from "../components/AdminExtraPage/EditTeacher";
import Schedule from "../pages/Admin/Schedule";
import EditSchedule from "../components/AdminExtraPage/EditSchedule";
import Attendance from "../pages/Teacher/Attendance";
import TeacherPrivateRoute from "./TeacherPrivateRoute";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><Main /></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },

      // Admin routes

     
      {
        path: "/add_student",
        element: <AdminPrivateRoute><AddStudent /></AdminPrivateRoute>,
      },
      {
        path: "/all_student",
        element: <AdminPrivateRoute><AllStudent /></AdminPrivateRoute>,
      },
      {
        path: "/student_details/:id",
        element: <AdminPrivateRoute><StudentDetails /></AdminPrivateRoute>,
      },
      {
        path: "/edit_student/:id",
        element: <AdminPrivateRoute><EditStudent /></AdminPrivateRoute>,
      },
      // teacher functionality
      {
        path: "/add_teacher",
        element: <AdminPrivateRoute><AddTeacher /></AdminPrivateRoute>,
      },
      {
        path: "/all_teacher",
        element: <AdminPrivateRoute><AllTeacher /></AdminPrivateRoute>,
      },
      {
        path: "/teacher_details/:id",
        element: <AdminPrivateRoute><TeacherDetails /></AdminPrivateRoute>,
      },
      {
        path: "/edit_teacher/:id",
        element: <AdminPrivateRoute><EditTeacher /></AdminPrivateRoute>,
      },
      {
        path: "/notice",
        element: <AdminPrivateRoute><Notice /></AdminPrivateRoute>,
      },
      {
        path: "/schedule",
        element: <AdminPrivateRoute><Schedule /></AdminPrivateRoute>,
      },
      {
        path: "/schedule/:id",
        element: <AdminPrivateRoute><EditSchedule /></AdminPrivateRoute>,
      },


      // Teacher routes
      {
        path: "/attendance",
        element: <TeacherPrivateRoute><Attendance /></TeacherPrivateRoute>,
      },

    ]
  },
  {
    path: "/login",
    element: <Login />
  }
]);