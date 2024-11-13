import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase/firebase.config";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";

const TeacherPrivateRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <Loading />;
    }

    // Check if the user is authenticated and has the "teacher" role
    if (!user) {
        return <Navigate to="/login" />;
    }

    const role = localStorage.getItem("role");

    if (role !== import.meta.env.VITE_TEACHER) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default TeacherPrivateRoute;
