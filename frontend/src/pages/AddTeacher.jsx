import { toast } from "react-toastify";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../firebase/firebase.config";

const AddTeacher = () => {

  const [createUserWithEmailAndPassword, , , error] = useCreateUserWithEmailAndPassword(auth);


  const handleAddTeacher = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value; 
    const phone = form.phone.value;
    const address = {
      street: form.street.value,
      city: form.city.value,
      state: form.state.value,
      postalCode: form.postalCode.value,
    };
  
    try {
      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(email, password);
  
      if (userCredential) {
        // Define teacher data to send to the backend
        const teacherData = {
          name,
          email,
          phone,
          address,
        };
  
        const response = await fetch(`${import.meta.env.VITE_LINK}/api/teachers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(teacherData),
        });
  
        if (response.ok) {
          toast.success("Teacher added successfully.");
          form.reset();
        } else {
          toast.error("Failed to add teacher data to the database.");
        }
      }
    } catch (error) {
      // Handle errors returned by createUserWithEmailAndPassword
      toast.error(error.message);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Add New Teacher</h2>

        <form onSubmit={handleAddTeacher} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" name="name" placeholder="Enter teacher's name" className="input input-bordered w-full" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name="email" placeholder="Enter teacher's email" className="input input-bordered w-full" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" name="password" placeholder="Enter password" className="input input-bordered w-full" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input type="text" name="phone" placeholder="Enter phone number" className="input input-bordered w-full" required />
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

          <button type="submit" className="btn btn-primary text-white w-full mt-4">Add Teacher</button>
        </form>

        {error && <p className="mt-4 text-center text-red-500">{error.message}</p>}
      </div>
    </div>
  );
};

export default AddTeacher;
