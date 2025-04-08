import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const MarksEntry = () => {
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [marks, setMarks] = useState({});
  const [maxMark, setMaxMark] = useState(100);
  const [examName, setExamName] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedClass) return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LINK}/api/students/class/${selectedClass}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setFilteredStudents(response.data);
        
        const initialMarks = {};
        response.data.forEach((student) => {
          initialMarks[student.roll] = "";
        });

        setMarks(initialMarks);
      } catch (error) {
        console.error("Error fetching students:", error);
        Swal.fire("Error", "Failed to fetch students", "error");
      }
    };

    const fetchSubjects = async () => {
      if (!selectedClass) return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LINK}/api/subjects/class/${selectedClass}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
        Swal.fire("Error", "Failed to fetch subjects", "error");
      }
    };

    fetchStudents();
    fetchSubjects();
  }, [selectedClass]);

  const handleClassChange = (value) => {
    setSelectedClass(value);
    setSelectedSubject(""); // Reset subject selection
  };

  const handleMarkChange = (studentRoll, value) => {
    if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= maxMark)) {
      setMarks((prev) => ({ ...prev, [studentRoll]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!user || !user.email) {
      Swal.fire("Error", "Teacher email is missing. Please log in again.", "error");
      return;
    }
  
    if (!examName.trim()) {
      Swal.fire("Error", "Please enter the exam name.", "error");
      return;
    }
  
    if (!selectedSubject) {
      Swal.fire("Error", "Please select a subject.", "error");
      return;
    }
  
    Swal.fire({
      title: "Confirm Submission",
      text: "Are you sure you want to submit the marks?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          const marksData = filteredStudents.map((student) => ({
            roll: student.roll,
            name: student.name, // শিক্ষার্থীর নাম যোগ করা হয়েছে
            mark: marks[student.roll],
          }));
  
          const requestData = {
            class: selectedClass,
            subject: selectedSubject,
            examName: examName,
            marks: marksData,
            teacherEmail: user.email,
            maxMark: maxMark,
          };
  
          await axios.post(`${import.meta.env.VITE_LINK}/api/marks`, requestData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
  
          Swal.fire("Success", "Marks submitted successfully!", "success");
        } catch (error) {
          if (error.response?.status === 409) {
            Swal.fire("Duplicate Entry", error.response.data.error, "warning");
          } else {
          console.error("Error submitting marks:", error);
          Swal.fire("Error", "Failed to submit marks", "error");
          }
        }
      }
    });
  };
  

  const sortedStudents = filteredStudents.sort((a, b) => a.roll - b.roll);

  return (
    <div className="container mx-auto p-6 bg-white rounded-xl h-full shadow-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center text-blue-700">Marks Entry System</h1>

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

      {/* Subject Selection */}
      {subjects.length > 0 && (
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Select Subject:</label>
          <select
            className="select select-bordered w-full max-w-md"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">-- Select a Subject --</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Exam Name Input */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Enter Exam Name:</label>
        <input
          type="text"
          className="input input-bordered w-full max-w-md"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          placeholder="e.g., Mid-Term Exam"
        />
      </div>

      {/* Maximum Marks Input */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Set Maximum Marks:</label>
        <input
          type="number"
          className="input input-bordered w-full max-w-md"
          value={maxMark}
          onChange={(e) => setMaxMark(e.target.value)}
        />
      </div>

      {/* Student Marks Table */}
      {filteredStudents.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Roll</th>
                <th>Name</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student, index) => (
                <tr key={student._id}>
                  <td>{index + 1}</td>
                  <td>{student.roll}</td>
                  <td>{student.name}</td>
                  <td>
                    <input
                      type="number"
                      className="input input-bordered w-24"
                      value={marks[student.roll]}
                      onChange={(e) => handleMarkChange(student.roll, e.target.value)}
                      placeholder={`0 - ${maxMark}`}
                    />
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
            Submit Marks
          </button>
        </div>
      )}
    </div>
  );
};

export default MarksEntry;
