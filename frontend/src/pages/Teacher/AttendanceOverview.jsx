import { useEffect, useState } from "react";
import axios from "axios";

const AttendanceOverview = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAttendance = async (className) => {
    setLoading(true); // Set loading to true when a new request starts
    setAttendanceData([]); // Reset previous data
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LINK}/api/attendance/${className}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAttendanceData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      setLoading(false); // Set loading to false after the request finishes
    }
  };

  useEffect(() => {
    if (selectedClass) {
      fetchAttendance(selectedClass);
    }
  }, [selectedClass]);

  // Group attendance data by student roll number and calculate stats
  const groupAttendanceByStudent = () => {
    const studentSummary = {};

    // Iterate over all attendance records
    attendanceData.forEach((record) => {
      record.attendance.forEach((entry) => {
        const { roll, name, status } = entry;

        if (!studentSummary[roll]) {
          studentSummary[roll] = {
            name,
            totalClasses: 0,
            presentClasses: 0,
          };
        }

        studentSummary[roll].totalClasses += 1;
        if (status === "Present") {
          studentSummary[roll].presentClasses += 1;
        }
      });
    });

    // Convert the summary object into an array for rendering
    return Object.keys(studentSummary).map((roll) => {
      const student = studentSummary[roll];
      const presentPercentage = (
        (student.presentClasses / student.totalClasses) *
        100
      ).toFixed(2);
      return {
        ...student,
        roll,
        presentPercentage,
      };
    });
  };

  const groupedAttendance = groupAttendanceByStudent();

  return (
    <div className="w-full p-4 h-full">
      <h1 className="text-3xl font-semibold mb-6 text-center text-blue-700">
        Attendance Overview
      </h1>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Select Class:</label>
        <select
          className="select select-bordered w-full"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">-- Select a Class --</option>
          {[...Array(10).keys()].map((i, index) => (
            <option key={index} value={i + 1}>
              Class {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto w-full">
        {loading ? (
          <p className="text-center py-4">Loading attendance data...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll</th>
                <th>Total Classes</th>
                <th>Present Classes</th>
                <th>Present Percentage</th>
              </tr>
            </thead>
            <tbody>
              {groupedAttendance.length > 0 ? (
                groupedAttendance.map((student, index) => (
                  <tr key={index}>
                    <td>{student.name}</td>
                    <td>{student.roll}</td>
                    <td>{student.totalClasses}</td>
                    <td>{student.presentClasses}</td>
                    <td>{student.presentPercentage}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AttendanceOverview;
