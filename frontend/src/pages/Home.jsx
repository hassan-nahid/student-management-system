import { useUserData } from "../context/UserContext";

const Home = () => {
  const { userData, loading } = useUserData();
  const role = localStorage.getItem("role");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-primary text-xl"></span>
      </div>
    );
  }

  // Check if the user data is not available or role doesn't match the correct role
  if (!userData) {
    return (
      <div className="text-center mt-10 text-gray-500 text-lg">
        User data not available.
      </div>
    );
  }

  if (role === import.meta.env.VITE_TEACHER) {
    const { name, email, phone, role: userRole, address } = userData;

    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-4">
        <h2 className="text-3xl font-bold text-blue-600 text-center">Teacher Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-semibold">Name:</p>
            <p>{name}</p>
          </div>
          <div>
            <p className="font-semibold">Email:</p>
            <p>{email}</p>
          </div>
          <div>
            <p className="font-semibold">Phone:</p>
            <p>{phone}</p>
          </div>
          <div>
            <p className="font-semibold">Role:</p>
            <p className="capitalize">{userRole}</p>
          </div>
          {address && (
            <>
              <div>
                <p className="font-semibold">Street:</p>
                <p>{address.street}</p>
              </div>
              <div>
                <p className="font-semibold">City:</p>
                <p>{address.city}</p>
              </div>
              <div>
                <p className="font-semibold">State:</p>
                <p>{address.state}</p>
              </div>
              <div>
                <p className="font-semibold">Postal Code:</p>
                <p>{address.postalCode}</p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  if (role === import.meta.env.VITE_STUDENT) {
    const { name, roll, email, dateOfBirth, gender, address, courseEnrolled, class: studentClass, session, guardianDetails } = userData;

    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-4">
        <h2 className="text-3xl font-bold text-blue-600 text-center">Student Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-semibold">Name:</p>
            <p>{name}</p>
          </div>
          <div>
            <p className="font-semibold">Roll:</p>
            <p>{roll}</p>
          </div>
          <div>
            <p className="font-semibold">Email:</p>
            <p>{email}</p>
          </div>
          <div>
            <p className="font-semibold">Date of Birth:</p>
            <p>{new Date(dateOfBirth).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-semibold">Gender:</p>
            <p>{gender}</p>
          </div>
          <div>
            <p className="font-semibold">Course Enrolled:</p>
            <p>{courseEnrolled}</p>
          </div>
          <div>
            <p className="font-semibold">Class:</p>
            <p>{studentClass}</p>
          </div>
          <div>
            <p className="font-semibold">Session:</p>
            <p>{session}</p>
          </div>
          {address && (
            <>
              <div>
                <p className="font-semibold">Street:</p>
                <p>{address.street}</p>
              </div>
              <div>
                <p className="font-semibold">City:</p>
                <p>{address.city}</p>
              </div>
              <div>
                <p className="font-semibold">State:</p>
                <p>{address.state}</p>
              </div>
              <div>
                <p className="font-semibold">Postal Code:</p>
                <p>{address.postalCode}</p>
              </div>
            </>
          )}
          {guardianDetails && (
            <>
              <div>
                <p className="font-semibold">Guardian Name:</p>
                <p>{guardianDetails.name}</p>
              </div>
              <div>
                <p className="font-semibold">Guardian Relation:</p>
                <p>{guardianDetails.relation}</p>
              </div>
              <div>
                <p className="font-semibold">Guardian Phone:</p>
                <p>{guardianDetails.phone}</p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
  if (role === import.meta.env.VITE_ADMIN) {
    return(
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-4">
        <h2 className="text-blue-500 text-2xl">Welcome Admin</h2>
      </div>
    )
  }

  return (
    <div className="text-center mt-10 text-gray-500 text-lg">
      Unauthorized Access
    </div>
  );
};

export default Home;
