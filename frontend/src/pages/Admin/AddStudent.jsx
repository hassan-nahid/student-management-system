import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.config";
import { toast } from "react-toastify";
import axios from "axios"; // Import Axios
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
// import { updateProfile } from "firebase/auth";

const AddStudent = () => {
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const { user } = useAuth(); // Get the user from the useAuth hook

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const roll = form.roll.value;
    const email = form.email.value;
    const password = form.password.value;
    const dateOfBirth = form.dateOfBirth.value;
    const gender = form.gender.value;
    const address = {
      street: form.street.value,
      city: form.city.value,
      state: form.state.value,
      postalCode: form.postalCode.value,
    };
    const courseEnrolled = form.courseEnrolled.value;
    const className = form.class.value;
    const session = form.session.value;
    const guardianDetails = {
      name: form.guardianName.value,
      relation: form.guardianRelation.value,
      phone: form.guardianPhone.value,
      email: form.guardianEmail.value,
    };

    try {
      const USER_HEADER = import.meta.env.VITE_HEADOFABC;
      const USER_BODY = import.meta.env.VITE_HEADOFDEF;

      // Create the student in Firebase Authentication (without logging them in)
      const userCredential = await createUserWithEmailAndPassword(email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      // await updateProfile(userCredential.user, {
      //   displayName: name,
      // });
      // Ensure the admin is still logged in after creating the student
      if (userCredential && userCredential.user) {
        // Define student data to send to MongoDB
    
        const studentData = {
          name,
          roll,
          email,
          dateOfBirth,
          gender,
          address,
          courseEnrolled,
          class: className,
          session,
          guardianDetails,
        };

        // Ensure a valid token is present for admin authentication
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Authentication token not found. Please login.");
          return;
        }

        // Send student data to the backend API using Axios
        const veriemail = encodeURIComponent(user.email);

        const response = await axios.post(`${import.meta.env.VITE_LINK}/api/students?email=${veriemail}`, studentData, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if (response.status === 201) {
          toast.success("Student added successfully.");
          form.reset();

          // Reauthenticate the admin user to keep them logged in
          await signInWithEmailAndPassword(USER_HEADER, USER_BODY);

        }
      }
    } catch (error) {
      if (error.response) {
        toast.error("Failed to add student data to the database.");
      } else {
        toast.error(error.message || "An unexpected error occurred.");
      }
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Add New Student</h2>

        <form onSubmit={handleAddStudent} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" name="name" placeholder="Enter student's name" className="input input-bordered w-full" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Roll</span>
            </label>
            <input type="text" name="roll" placeholder="Enter student's roll number" className="input input-bordered w-full" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Date of Birth</span>
            </label>
            <input type="date" name="dateOfBirth" className="input input-bordered w-full" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <select name="gender" className="input input-bordered w-full" required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name="email" placeholder="Enter student's email" className="input input-bordered w-full" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" name="password" placeholder="Enter password" className="input input-bordered w-full" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Course Enrolled</span>
            </label>
            <input type="text" name="courseEnrolled" placeholder="Enter course name" className="input input-bordered w-full" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Class</span>
            </label>
            <select name="class" className="input input-bordered w-full" required>
              <option value="">Select Class</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Session</span>
            </label>
            <select name="session" className="input input-bordered w-full" required>
              <option value="">Select Session</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2022-2023">2022-2023</option>
              <option value="2021-2022">2021-2022</option>
              {/* Add more session options as needed */}
            </select>
          </div>

          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input type="text" name="street" placeholder="Street" className="input input-bordered w-full" required />
            <input type="text" name="city" placeholder="City" className="input input-bordered w-full" required />
            <input type="text" name="state" placeholder="State" className="input input-bordered w-full" required />
            <input type="text" name="postalCode" placeholder="Postal Code" className="input input-bordered w-full" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Guardian&apos;s Name</span>
            </label>
            <input type="text" name="guardianName" placeholder="Enter guardian's name" className="input input-bordered w-full" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Guardian&apos;s Relation</span>
            </label>
            <input type="text" name="guardianRelation" placeholder="Enter guardian's relation" className="input input-bordered w-full" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Guardian&apos;s Phone</span>
            </label>
            <input type="text" name="guardianPhone" placeholder="Enter guardian's phone" className="input input-bordered w-full" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Guardian&apos;s Email</span>
            </label>
            <input type="email" name="guardianEmail" placeholder="Enter guardian's email" className="input input-bordered w-full" required />
          </div>

          <div className="form-control">
            <button type="submit" className="btn text-white btn-primary w-full">
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
