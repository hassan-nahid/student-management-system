import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase/firebase.config";

const Profile = () => {

    const [user] = useAuthState(auth);

  return (
    <div>
        
        <h1>Email: {user?.email}</h1>
    </div>
  )
}

export default Profile