import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const AttendanceSystem = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [attendance, setAttendance] = useState({});
  const { user } = useAuth();

  // Fetch student data by class
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (!selectedClass) return;

        const response = await axios.get(
          `${import.meta.env.VITE_LINK}/api/students/class/${selectedClass}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setStudents(response.data);
        setFilteredStudents(response.data);

        // Initialize attendance state (default: "Absent")
        const initialAttendance = {};
        response.data.forEach((student) => {
          initialAttendance[student.roll] = "Absent";
        });

        setAttendance(initialAttendance);
      } catch (error) {
        console.error("Error fetching students:", error);
        Swal.fire("Error", "Failed to fetch students", "error");
      }
    };

    fetchStudents();
  }, [selectedClass]);

  // Handle class selection
  const handleClassChange = (selectedClass) => {
    setSelectedClass(selectedClass);
    const filtered = students.filter((student) => student.class === selectedClass);
    setFilteredStudents(filtered);

    // Reset attendance state
    const initialAttendance = {};
    filtered.forEach((student) => {
      initialAttendance[student.roll] = "Absent";
    });
    setAttendance(initialAttendance);
  };

  // Toggle attendance status
  const toggleAttendance = (studentRoll) => {
    setAttendance((prev) => ({
      ...prev,
      [studentRoll]: prev[studentRoll] === "Present" ? "Absent" : "Present",
    }));
  };

  // Submit attendance to backend
  const handleSubmit = async () => {
    if (!user || !user.email) {
      Swal.fire("Error", "Teacher email is missing. Please log in again.", "error");
      return;
    }

    Swal.fire({
      title: "Confirm Submission",
      text: "Are you sure you want to submit the attendance?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");

          // Preparing attendance data in array format with roll number
          const attendanceData = Object.keys(attendance).map((roll) => ({
            roll: roll,
            status: attendance[roll],
          }));

          const requestData = {
            class: selectedClass,
            attendance: attendanceData,
            teacherEmail: user.email,
          };

          console.log("📤 Sending Data:", requestData); // Debugging log

          const response = await axios.post(
            `${import.meta.env.VITE_LINK}/api/attendance`,
            requestData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          Swal.fire("Success", "Attendance submitted successfully!", "success");
          console.log("✅ Attendance saved:", response.data);
        } catch (error) {
          console.error("❌ Error submitting attendance:", error.response?.data || error);
          Swal.fire("Error", error.response?.data?.message || "Failed to submit attendance", "error");
        }
      }
    });
  };

  // Sort students by roll number
  const sortedStudents = filteredStudents.sort((a, b) => a.roll - b.roll);

  return (
    <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center text-blue-700">Attendance System</h1>

      {/* Class Selection */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Select Class:</label>
        <select
          className="select select-bordered w-full max-w-md"
          value={selectedClass}
          onChange={(e) => handleClassChange(e.target.value)}
        >
          <option value="">-- Select a Class --</option>
          {[...Array(10).keys()].map((i) => (
            <option key={i + 1} value={i + 1}>
              Class {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Student List */}
      {filteredStudents.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Roll</th>
                <th>Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student, index) => (
                <tr key={student._id}>
                  <td>{index + 1}</td>
                  <td>{student.roll}</td>
                  <td>{student.name}</td>
                  <td>
                    <span
                      className={`badge text-zinc-100 ${
                        attendance[student.roll] === "Present"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {attendance[student.roll]}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => toggleAttendance(student.roll)}
                      className="btn btn-sm btn-info text-white"
                    >
                      Toggle Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No students found for this class.</p>
      )}

      {/* Submit Button */}
      {filteredStudents.length > 0 && (
        <div className="flex justify-center mt-6">
          <button onClick={handleSubmit} className="btn btn-primary text-white">
            Submit Attendance
          </button>
        </div>
      )}
    </div>
  );
};

export default AttendanceSystem;
