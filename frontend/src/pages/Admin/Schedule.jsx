import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import auth from "../../firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import ScheduleShow from "../../components/AdminExtraPage/ScheduleShow";

const Schedule = () => {
  const [user] = useAuthState(auth);
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    classNumber: "",
    day: "",
    period: "",
    subject: "",
    teacher: "",
    time: "",
  });

  // Fetch teachers and schedule on component mount
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const email = encodeURIComponent(user.email);
      const response = await fetch(
        `${import.meta.env.VITE_LINK}/api/teachers?email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch teachers");
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to fetch teachers.",
      });
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddPeriod = async (e) => {
    e.preventDefault();
    const { classNumber, day, period, subject, teacher, time } = formData;

    if (!classNumber || !day || !period || !subject || !teacher || !time) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "All fields are required!",
      });
      return;
    }

    try {
      const email = encodeURIComponent(user.email);
      const response = await fetch(`${import.meta.env.VITE_LINK}/api/schedule?email=${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ classNumber, day, period, subject, teacher, time }),
      });

      if (!response.ok) throw new Error("Failed to save schedule data");

      toast.success("Period added successfully");

      resetForm();
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save schedule data",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      classNumber: "",
      day: "",
      period: "",
      subject: "",
      teacher: "",
      time: "",
    });
  };



  return (
    <div className="p-5 w-full">
     
        <div className="p-5 w-full">
          <div className="bg-base-100 shadow-lg p-5 mb-10 rounded">
            <h2 className="text-2xl font-semibold mb-5">Add Period</h2>
            <form onSubmit={handleAddPeriod}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  name="classNumber"
                  value={formData.classNumber}
                  onChange={handleInputChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Class</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  name="day"
                  value={formData.day}
                  onChange={handleInputChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Day</option>
                  {["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                    (day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    )
                  )}
                </select>
                <input
                  type="text"
                  name="period"
                  placeholder="Period"
                  value={formData.period}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
                <select
                  name="teacher"
                  value={formData.teacher}
                  onChange={handleInputChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher.name}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="time"
                  placeholder="Time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <button type="submit" className="btn text-white btn-primary mt-5 w-full">
                Add Period
              </button>
            </form>
          </div>
        </div>
        <ScheduleShow/>
    </div>
  );
};

export default Schedule;