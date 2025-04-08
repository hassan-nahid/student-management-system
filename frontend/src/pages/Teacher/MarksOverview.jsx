import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const MarksOverview = ({ teacherEmail }) => {
  const [marks, setMarks] = useState([]);
  const [groupedMarks, setGroupedMarks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [filteredMarks, setFilteredMarks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const teacherEmail = user?.email;
    const fetchMarks = async () => {
      if (!teacherEmail) return;
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LINK}/api/marks/${teacherEmail}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMarks(response.data);
        groupMarks(response.data);
      } catch (error) {
        console.error("Error fetching marks", error);
        setError("Failed to fetch marks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMarks();
  }, [teacherEmail, user]);

  const groupMarks = (marksData) => {
    const grouped = {};
    marksData.forEach((mark) => {
      const key = `${mark.class}-${mark.subject}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(mark);
    });
    setGroupedMarks(grouped);
  };

  useEffect(() => {
    if (selectedClass && selectedSubject && selectedExam) {
      const key = `${selectedClass}-${selectedSubject}`;
      const allMarks = groupedMarks[key] || [];
      const examMarks = allMarks.filter((mark) => mark.examName === selectedExam);
      setFilteredMarks(examMarks);
    } else {
      setFilteredMarks([]);
    }
  }, [selectedClass, selectedSubject, selectedExam, groupedMarks]);

  const classes = [...new Set(marks.map((mark) => mark.class))];
  const subjects = selectedClass
    ? [...new Set(marks.filter((mark) => mark.class === selectedClass).map((mark) => mark.subject))]
    : [];
  const exams = selectedClass && selectedSubject
    ? [...new Set(marks
        .filter((mark) => mark.class === selectedClass && mark.subject === selectedSubject)
        .map((mark) => mark.examName))]
    : [];

  const calculateAverage = () => {
    let totalMarks = 0;
    let totalMaxMarks = 0;
    let studentCount = 0;

    filteredMarks.forEach((mark) => {
      mark.marks.forEach((m) => {
        totalMarks += m.mark;
        totalMaxMarks += mark.maxMark;
        studentCount++;
      });
    });

    const averageMark = (totalMarks / studentCount).toFixed(2);
    const averagePercentage = ((totalMarks / totalMaxMarks) * 100).toFixed(2);

    return { averageMark, averagePercentage, studentCount };
  };

  return (
    <div className="container mx-auto p-6 w-full h-full">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">Marks Overview</h2>
      {loading && <p className="text-gray-500">Loading marks...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          <div className="mb-4">
            <label className="mr-2 font-medium">Select Class: </label>
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedSubject("");
                setSelectedExam("");
              }}
              className="select select-bordered w-48"
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {selectedClass && (
            <div className="mb-4">
              <label className="mr-2 font-medium">Select Subject: </label>
              <select
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  setSelectedExam("");
                }}
                className="select select-bordered w-48"
              >
                <option value="">Select Subject</option>
                {subjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedClass && selectedSubject && (
            <div className="mb-6">
              <label className="mr-2 font-medium">Select Exam: </label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="select select-bordered w-48"
              >
                <option value="">Select Exam</option>
                {exams.map((exam) => (
                  <option key={exam} value={exam}>
                    {exam}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedClass && selectedSubject && selectedExam && (
            <>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Roll</th>
                      <th>Name</th>
                      <th>Exam</th>
                      <th>Max Mark</th>
                      <th>Obtained Mark</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMarks.length > 0 ? (
                      filteredMarks.map((mark, markIndex) =>
                        mark.marks.map((mar, marIndex) => (
                          <tr key={`${markIndex}-${marIndex}`} className="hover:bg-blue-50 transition-all">
                            <td>{mar.roll}</td>
                            <td>
                              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                                {mar.name}
                              </span>
                            </td>
                            <td>{mark.examName}</td>
                            <td>{mark.maxMark}</td>
                            <td>{mar.mark}</td>
                            <td>
                              <div className="w-full bg-gray-200 rounded-full h-4">
                                <div
                                  className="bg-green-500 h-4 rounded-full"
                                  style={{ width: `${(mar.mark / mark.maxMark) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-xs ml-2">
                                {((mar.mark / mark.maxMark) * 100).toFixed(2)}%
                              </span>
                            </td>
                          </tr>
                        ))
                      )
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center text-gray-500">
                          No marks available for this class, subject, and exam.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {filteredMarks.length > 0 && (
                <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm w-full md:w-2/3 mx-auto text-center">
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">📊 Average Summary</h3>
                  {(() => {
                    const { averageMark, averagePercentage, studentCount } = calculateAverage();
                    return (
                      <>
                        <p className="text-sm text-gray-700">
                          Total Students: <strong>{studentCount}</strong>
                        </p>
                        <p className="text-sm text-gray-700">
                          Average Mark: <strong>{averageMark}</strong>
                        </p>
                        <p className="text-sm text-gray-700">
                          Average Percentage: <strong>{averagePercentage}%</strong>
                        </p>
                      </>
                    );
                  })()}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MarksOverview;
