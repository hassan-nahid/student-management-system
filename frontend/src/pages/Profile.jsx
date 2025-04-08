import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase/firebase.config";

const Profile = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br w-full from-indigo-100 to-purple-200">
      <div className="card w-96 shadow-2xl bg-white">
        <div className="card-body items-center text-center">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL || "https://i.ibb.co/ck1SGFJ/avatar.png"} alt="User Avatar" />
            </div>
          </div>
          <h2 className="card-title text-2xl mt-4">{user?.displayName || "Anonymous User"}</h2>
          <p className="text-gray-500">{user?.email}</p>
          <div className="card-actions mt-4">
            <button className="btn btn-outline btn-primary">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
