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
import MarksEntry from "../pages/Teacher/MarksEntry";
import AddSubject from "../pages/Admin/AddSubject";
import AttendanceOverview from "../pages/Teacher/AttendanceOverview";
import MarksOverview from "../pages/Teacher/MarksOverview";
import TeacherMessage from "../pages/Teacher/TeacherMessage";
import StudentPrivateRoute from "./StudentPrivateRoute";
import StudentAttendance from "../pages/Student/StudentAttendance";
import Result from "../pages/Student/Result";
import Message from "../pages/Student/Message";
import StudentNotice from "../pages/Student/StudentNotice";
import AdminMessage from "../pages/Admin/AdminMessage";
import TeacherNotice from "../pages/Teacher/TeacherNotice";




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
        path: "/add_subject",
        element: <AdminPrivateRoute><AddSubject /></AdminPrivateRoute>,
      },
      {
        path: "/admin_notice",
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
      {
        path: "/admin_message",
        element: <AdminPrivateRoute><AdminMessage /></AdminPrivateRoute>,
      },


      // Teacher routes
      {
        path: "/attendance_entry",
        element: <TeacherPrivateRoute><Attendance /></TeacherPrivateRoute>,
      },
      {
        path: "/marks_entry",
        element: <TeacherPrivateRoute><MarksEntry /></TeacherPrivateRoute>,
      },
      {
        path: "/attendance_overview",
        element: <TeacherPrivateRoute><AttendanceOverview /></TeacherPrivateRoute>,
      },
      {
        path: "/marks_overview",
        element: <TeacherPrivateRoute><MarksOverview /></TeacherPrivateRoute>,
      },
      {
        path: "/teacher_notice",
        element: <TeacherPrivateRoute><TeacherNotice /></TeacherPrivateRoute>,
      },
      {
        path: "/teacher_message",
        element: <TeacherPrivateRoute><TeacherMessage /></TeacherPrivateRoute>,
      },
      // Student routes
      {
        path: "/attendance",
        element: <StudentPrivateRoute><StudentAttendance /></StudentPrivateRoute>,
      },
      {
        path: "/result",
        element: <StudentPrivateRoute><Result /></StudentPrivateRoute>,
      },
      {
        path: "/message",
        element: <StudentPrivateRoute><Message /></StudentPrivateRoute>,
      },
      {
        path: "/notice",
        element: <StudentPrivateRoute><StudentNotice /></StudentPrivateRoute>,
      },


    ]
  },
  {
    path: "/login",
    element: <Login />
  }
]);