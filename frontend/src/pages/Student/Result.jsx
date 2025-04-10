import { useEffect, useState } from "react";
import axios from "axios";
import { useUserData } from "../../context/UserContext";

const Result = () => {
  const { userData } = useUserData();
  const roll = userData?.roll;

  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(resultData)

  useEffect(() => {
    const fetchResult = async () => {
      if (!roll) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LINK}/api/marks/result/${roll}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setResultData(response.data);
      } catch (err) {
        console.error("Error fetching result:", err);
        setError("Failed to load result. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [roll]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-green-700 mb-6">Your Result</h2>
      {loading && <p className="text-gray-500">Loading result...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && resultData.length === 0 && (
        <p className="text-gray-600 text-center">No results found for your roll.</p>
      )}
      {!loading && !error && resultData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Class</th>
                <th>Subject</th>
                <th>Exam</th>
                <th>Max Mark</th>
                <th>Obtained Mark</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {resultData.map((entry, index) =>
                entry.marks.map((m, idx) => (
                  <tr key={`${index}-${idx}`} className="hover:bg-green-50 transition-all">
                    <td>{entry.class}</td>
                    <td>{entry.subject}</td>
                    <td>{entry.examName}</td>
                    <td>{entry.maxMark}</td>
                    <td>{m.mark}</td>
                    <td>{((m.mark / entry.maxMark) * 100).toFixed(2)}%</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Result;
