import { useEffect, useState } from "react";
import axios from "axios";
import { useUserData } from "../../context/UserContext";

const StudentAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);

  const { userData } = useUserData();
  const roll = userData?.roll;

  const fetchAttendance = async () => {
    if (!roll) return;

    setLoading(true);
    setAttendance([]);
    setStudentInfo(null);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LINK}/api/attendance/student/${roll}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const records = response.data.data || [];

      const studentRecords = [];

      records.forEach((record) => {
        const entry = record.attendance.find((a) => a.roll === roll);
        if (entry) {
          studentRecords.push({ date: record.date, ...entry });
        }
      });

      setAttendance(studentRecords);

      if (studentRecords.length > 0) {
        const { name } = studentRecords[0];
        const total = studentRecords.length;
        const present = studentRecords.filter((r) => r.status === "Present").length;

        setStudentInfo({
          name,
          total,
          present,
          percentage: ((present / total) * 100).toFixed(2),
        });
      }
    } catch (error) {
      console.error("Error fetching student attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (roll) {
      fetchAttendance();
    }
  }, [roll]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-8">
        📊 Attendance Report
      </h1>

      {loading ? (
        <div className="text-center text-lg text-gray-500">Loading attendance...</div>
      ) : studentInfo ? (
        <div className="card bg-base-100 shadow-xl mb-6 border">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl text-primary">{studentInfo.name}</h2>
            <p className="text-sm text-gray-500">Roll: <span className="font-semibold">{roll}</span></p>

            <div className="mt-4 grid grid-cols-2 gap-4 w-full">
              <div className="bg-green-100 text-green-800 p-3 rounded-xl">
                <p className="text-sm">Total Classes</p>
                <p className="text-xl font-bold">{studentInfo.total}</p>
              </div>
              <div className="bg-blue-100 text-blue-800 p-3 rounded-xl">
                <p className="text-sm">Present</p>
                <p className="text-xl font-bold">{studentInfo.present}</p>
              </div>
              <div className="bg-red-100 text-red-800 p-3 rounded-xl">
                <p className="text-sm">Absent</p>
                <p className="text-xl font-bold">
                  {studentInfo.total - studentInfo.present}
                </p>
              </div>
              <div className="bg-yellow-100 text-yellow-800 p-3 rounded-xl">
                <p className="text-sm">Percentage</p>
                <p className="text-xl font-bold">{studentInfo.percentage}%</p>
              </div>
            </div>

            <div className="w-full mt-4">
              <progress
                className="progress progress-success w-full"
                value={studentInfo.percentage}
                max="100"
              ></progress>
              <p className="text-sm mt-1 text-gray-600">
                Overall attendance rate: <span className="font-semibold">{studentInfo.percentage}%</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-6">No attendance data available.</div>
      )}

      {attendance.length > 0 && (
        <div className="overflow-x-auto shadow-lg rounded-lg border bg-white">
          <table className="table table-zebra w-full">
            <thead className="bg-green-600 text-white text-md">
              <tr>
                <th className="px-4 py-3">📅 Date</th>
                <th className="px-4 py-3">📌 Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((entry, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{new Date(entry.date).toLocaleDateString("en-GB")}</td>
                  <td className="px-4 py-2">
                    {entry.status === "Present" ? (
                      <span className="badge badge-success gap-2">✅ Present</span>
                    ) : (
                      <span className="badge badge-error gap-2">❌ Absent</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;
