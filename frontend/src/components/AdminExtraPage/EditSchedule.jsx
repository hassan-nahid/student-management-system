import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loading";

const EditSchedule = () => {
  const [scheduleData, setScheduleData] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the schedule ID from the URL parameters
  const { user } = useAuth();


  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        // const email = encodeURIComponent(user.email);
        const response = await fetch(
          `${import.meta.env.VITE_LINK}/api/schedule/single/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setScheduleData(data);
        } else {
          toast.error("Failed to fetch schedule data.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching schedule data.");
        console.log(error.message);
      }
    };

    const fetchTeachers = async () => {
      try {
        const email = encodeURIComponent(user.email);
        const response = await fetch(
          `${import.meta.env.VITE_LINK}/api/teachers?email=${email}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setTeachers(data);
        } else {
          toast.error("Failed to fetch teachers.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching teachers.");
        console.log(error.message);
      }
    };

    fetchScheduleData();
    fetchTeachers();
  }, [id]);

  const handleEditSchedule = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedScheduleData = {
      classNumber: form.classNumber.value,
      day: form.day.value,
      period: form.period.value,
      subject: form.subject.value,
      teacher: form.teacher.value,
      time: form.time.value,
    };

    try {
      const email = encodeURIComponent(user.email); 
      const response = await fetch(
        `${import.meta.env.VITE_LINK}/api/schedule/${id}?email=${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedScheduleData),
        }
      );

      if (response.ok) {
        toast.success("Schedule updated successfully.");
        navigate("/schedule"); // Redirect to schedules list
      } else {
        toast.error("Failed to update schedule.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the schedule.");
      console.log(error.message);
    }
  };

  if (!scheduleData) {
    return <Loading />; // Show a loading state while fetching data
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Edit Schedule</h2>

        <form onSubmit={handleEditSchedule} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Class Number</span>
            </label>
            <select
              name="classNumber"
              defaultValue={scheduleData.classNumber}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Class</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Day</span>
            </label>
            <select
              name="day"
              defaultValue={scheduleData.day}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Day</option>
              {["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Period</span>
            </label>
            <input
              type="text"
              name="period"
              defaultValue={scheduleData.periods[0]?.period}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Subject</span>
            </label>
            <input
              type="text"
              name="subject"
              defaultValue={scheduleData.periods[0]?.subject}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Teacher</span>
            </label>
            <select
              name="teacher"
              defaultValue={scheduleData.periods[0]?.teacher} // Default value from scheduleData
              className="select select-bordered w-full"
              required
            >
              {/* Default value option */}
              <option value={scheduleData.periods[0]?.teacher}>
                {scheduleData.periods[0]?.teacher}
              </option>

              {/* Dynamic options from teachers */}
              {teachers
                .filter((teacher) => teacher.name !== scheduleData.periods[0]?.teacher) // Exclude default value to avoid duplication
                .map((teacher) => (
                  <option key={teacher._id} value={teacher.name}>
                    {teacher.name}
                  </option>
                ))}
            </select>
          </div>


          <div className="form-control">
            <label className="label">
              <span className="label-text">Time</span>
            </label>
            <input
              type="text"
              name="time"
              defaultValue={scheduleData.periods[0]?.time}
              className="input input-bordered w-full"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary text-white w-full mt-4">
            Update Schedule
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSchedule;
