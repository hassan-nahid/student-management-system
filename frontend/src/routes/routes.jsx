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
import AdminPrivateRoute from "./AdminPrivateRoute";
import ErrorPage from "../pages/ErrorPage";
import TeacherDetails from "../components/TeacherDetails";
import EditTeacher from "../components/EditTeacher";

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
        path: "/add_subject",
        element: <AdminPrivateRoute><AddSubject /></AdminPrivateRoute>,
      },
      // student functionality
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
        loader: ({ params }) => fetch(`${import.meta.env.VITE_LINK}/api/students/${params.id}`),
      },
      {
        path: "/edit_student/:id",
        element: <AdminPrivateRoute><EditStudent /></AdminPrivateRoute>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_LINK}/api/students/${params.id}`),
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
        loader: ({ params }) => fetch(`${import.meta.env.VITE_LINK}/api/teachers/${params.id}`),
      },
      {
        path: "/edit_teacher/:id",
        element: <AdminPrivateRoute><EditTeacher /></AdminPrivateRoute>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_LINK}/api/teachers/${params.id}`),
      },
      {
        path: "/notice",
        element: <AdminPrivateRoute><Notice /></AdminPrivateRoute>,
      },


      // Teacher routes


    ]
  },
  {
    path: "/login",
    element: <Login />
  }
]);