import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../firebase/firebase.config";
import { toast } from "react-toastify";
import axios from "axios"; // Import Axios

const AddStudent = () => {
  const [createUserWithEmailAndPassword, , , error] = useCreateUserWithEmailAndPassword(auth);

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
    const className = form.class.value; // Get class value
    const session = form.session.value; // Get session value
    const guardianDetails = {
      name: form.guardianName.value,
      relation: form.guardianRelation.value,
      phone: form.guardianPhone.value,
    };

    try {
      // Create the student in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(email, password);
      
      if (userCredential) {
        // Define student data to send to MongoDB
        const studentData = {
          name,
          roll,
          email,
          dateOfBirth,
          gender,
          address,
          courseEnrolled,
          class: className, // Include class in the student data
          session, // Include session in the student data
          guardianDetails,
        };
        
        // Send student data to the backend API using Axios
        const response = await axios.post(`${import.meta.env.VITE_LINK}/api/students`, studentData);

        if (response.status === 201) {
          toast.success("Student added successfully.");
          form.reset();
        }
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        toast.error("Failed to add student data to the database.");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Add New Student</h2>

        <form onSubmit={handleAddStudent} className="space-y-4">
          {/* Other form fields remain unchanged */}
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
            <input type="text" name="guardianRelation" placeholder="Enter relation" className="input input-bordered w-full" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Guardian&apos;s Phone</span>
            </label>
            <input type="text" name="guardianPhone" placeholder="Enter phone number" className="input input-bordered w-full" required />
          </div>

          <button type="submit" className="btn btn-primary text-white w-full mt-4">Add Student</button>
        </form>

        {error && <p className="mt-4 text-center text-red-500">{error.message}</p>}
      </div>
    </div>
  );
};

export default AddStudent;
