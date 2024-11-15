import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const EditTeacher = () => {
  const [teacherData, setTeacherData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the teacher ID from the URL parameters
  const {user} = useAuth()

  useEffect(() => {
    // Fetch the teacher data when the component mounts
    const fetchTeacherData = async () => {
      try {
        const email = encodeURIComponent(user.email);
        const response = await fetch(`${import.meta.env.VITE_LINK}/api/teachers/${id}?email=${email}`, 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setTeacherData(data);
        } else {
          toast.error("Failed to fetch teacher data.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching teacher data.");
        console.log(error.message);
      }
    };

    fetchTeacherData();
  }, [id]);

  const handleEditTeacher = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = {
      street: form.street.value,
      city: form.city.value,
      state: form.state.value,
      postalCode: form.postalCode.value,
    };

    try {
      // Define updated teacher data
      const updatedTeacherData = {
        name,
        email,
        phone,
        address,
      };

      // Send a PUT request to update teacher data
      const Veriemail = encodeURIComponent(user.email);
      const response = await fetch(`${import.meta.env.VITE_LINK}/api/teachers/${id}?email=${Veriemail}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,

        },
        body: JSON.stringify(updatedTeacherData),
      });

      if (response.ok) {
        toast.success("Teacher details updated successfully.");
        navigate("/all_teacher"); // Redirect to teachers list or other appropriate page
      } else {
        toast.error("Failed to update teacher data.");
      }
    } catch (error) {
      toast.error("An error occurred while updating teacher details.");
      console.log(error.message);
    }
  };

  if (!teacherData) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Edit Teacher</h2>

        <form onSubmit={handleEditTeacher} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={teacherData.name}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              defaultValue={teacherData.email}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
              type="text"
              name="phone"
              defaultValue={teacherData.phone}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              name="street"
              defaultValue={teacherData.address.street}
              placeholder="Street"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="city"
              defaultValue={teacherData.address.city}
              placeholder="City"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="state"
              defaultValue={teacherData.address.state}
              placeholder="State"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="postalCode"
              defaultValue={teacherData.address.postalCode}
              placeholder="Postal Code"
              className="input input-bordered w-full"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary text-white w-full mt-4">Update Teacher</button>
        </form>
      </div>
    </div>
  );
};

export default EditTeacher;