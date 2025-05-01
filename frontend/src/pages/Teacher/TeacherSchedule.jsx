import { useEffect, useState } from "react";
import { useUserData } from "../../context/UserContext";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

const TeacherSchedule = () => {
  const { userData } = useUserData();
  const [groupedSchedules, setGroupedSchedules] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_LINK}/api/schedule/teacher/${encodeURIComponent(userData.email)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          // Group schedules by day
          const grouped = {};
          data.forEach((schedule) => {
            const day = schedule.day;
            // filter periods matching teacher email
            const teacherPeriods = schedule.periods.filter(
              (p) => p.teacher.email === userData.email
            );

            if (teacherPeriods.length > 0) {
              if (!grouped[day]) {
                grouped[day] = [];
              }
              // push classNumber along with periods info
              teacherPeriods.forEach((p) => {
                grouped[day].push({
                  ...p,
                  classNumber: schedule.classNumber,
                });
              });
            }
          });
          setGroupedSchedules(grouped);
        } else {
          toast.error("Failed to fetch schedules");
        }
      } catch (err) {
        toast.error("An error occurred while fetching schedules");
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userData?.email) {
      fetchSchedules();
    }
  }, [userData?.email]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto w-full h-full">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        My Schedules
      </h2>

      {Object.keys(groupedSchedules).length === 0 ? (
        <p className="text-gray-500 text-center">No schedules found</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSchedules).map(([day, periods]) => (
            <div
              key={day}
              className="border border-gray-200 p-6 rounded-2xl shadow-lg bg-white w-full"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Day: <span className="text-indigo-500">{day}</span>
              </h3>

              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-indigo-100">
                    <th className="border p-3 text-left text-gray-700">Class</th>
                    <th className="border p-3 text-left text-gray-700">Period</th>
                    <th className="border p-3 text-left text-gray-700">Subject</th>
                    <th className="border p-3 text-left text-gray-700">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {periods.map((p, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition">
                      <td className="border p-3">Class {p.classNumber}</td>
                      <td className="border p-3">{p.period}</td>
                      <td className="border p-3">{p.subject}</td>
                      <td className="border p-3">{p.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherSchedule;
