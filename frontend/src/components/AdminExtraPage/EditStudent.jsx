import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const EditStudent = () => {
  const { id } = useParams(); // Get the student ID from the URL
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    courseEnrolled: "",
    class: "",
    session: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
    guardianDetails: {
      name: "",
      relation: "",
      phone: "",
    },
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const veriemail = encodeURIComponent(user.email);

        const response = await axios.get(`${import.meta.env.VITE_LINK}/api/students/${id}?email=${veriemail}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        const studentData = response.data;
        setFormData({
          name: studentData.name,
          roll: studentData.roll,
          email: studentData.email,
          dateOfBirth: studentData.dateOfBirth.slice(0, 10), // Format to 'YYYY-MM-DD'
          gender: studentData.gender,
          courseEnrolled: studentData.courseEnrolled,
          class: studentData.class,
          session: studentData.session,
          address: studentData.address,
          guardianDetails: studentData.guardianDetails,
        });
      } catch (error) {
        console.log(error.message)
        toast.error("Failed to fetch student data.");
      }
    };

    fetchStudentData();
  }, [id]);

  // Handle change for nested objects (address and guardianDetails)
  const handleNestedChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: {
        ...formData[field],
        [e.target.name]: e.target.value,
      },
    });
  };

  // Handle change for other fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const veriemail = encodeURIComponent(user.email);

      const response = await axios.put(`${import.meta.env.VITE_LINK}/api/students/${id}?email=${veriemail}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      if (response.status === 200) {
        toast.success("Student updated successfully!");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Edit Student</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Roll</span>
            </label>
            <input
              type="text"
              name="roll"
              value={formData.roll}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Date of Birth</span>
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Course Enrolled</span>
            </label>
            <input
              type="text"
              name="courseEnrolled"
              value={formData.courseEnrolled}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Class</span>
            </label>
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            >
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
            <select
              name="session"
              value={formData.session}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            >
              <option value="2024-2025">2024-2025</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2022-2023">2022-2023</option>
              <option value="2021-2022">2021-2022</option>
            </select>
          </div>

          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              name="street"
              value={formData.address.street}
              onChange={(e) => handleNestedChange(e, "address")}
              placeholder="Street"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="city"
              value={formData.address.city}
              onChange={(e) => handleNestedChange(e, "address")}
              placeholder="City"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="state"
              value={formData.address.state}
              onChange={(e) => handleNestedChange(e, "address")}
              placeholder="State"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="postalCode"
              value={formData.address.postalCode}
              onChange={(e) => handleNestedChange(e, "address")}
              placeholder="Postal Code"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Guardian&apos;s Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.guardianDetails.name}
              onChange={(e) => handleNestedChange(e, "guardianDetails")}
              placeholder="Guardian's name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Guardian&apos;s Relation</span>
            </label>
            <input
              type="text"
              name="relation"
              value={formData.guardianDetails.relation}
              onChange={(e) => handleNestedChange(e, "guardianDetails")}
              placeholder="Relation"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Guardian&apos;s Phone</span>
            </label>
            <input
              type="text"
              name="phone"
              value={formData.guardianDetails.phone}
              onChange={(e) => handleNestedChange(e, "guardianDetails")}
              placeholder="Guardian&apos;s phone number"
              className="input input-bordered w-full"
              required
            />
          </div>

          <button type="submit" className="btn text-white btn-primary w-full">
            Update Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;