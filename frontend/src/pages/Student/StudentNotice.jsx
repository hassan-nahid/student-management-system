import { useState, useEffect } from "react";
import { toast } from "react-toastify";
const StudentNotice = () => {

  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all notices when the component mounts
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_LINK}/api/notices`);
        if (response.ok) {
          const data = await response.json();
          setNotices(data);
          setFilteredNotices(data); // Initialize filteredNotices with all notices
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Failed to fetch notices.");
        }
      } catch (error) {
        console.error("Fetch Notices Error:", error.message);
        toast.error("An error occurred while fetching notices.");
      }
    };
    fetchNotices();
  }, []); // Empty dependency array ensures it runs only once

  // Search function to filter notices by title
  useEffect(() => {
    const filtered = notices.filter((notice) =>
      notice.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNotices(filtered);
  }, [searchQuery, notices]);


  return (
    <div className="container mx-auto p-6 w-full h-full">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">Teacher Notices</h2>

      <div className="my-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full mb-4"
        />
      </div>

      <h2 className="text-2xl font-bold mb-4">All Notices</h2>
      <ul className="space-y-4">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <li
              key={notice._id} // Ensure unique key using _id
              className="p-4 bg-white rounded-lg shadow-md"
            >
              <div>
                <h3 className="text-xl font-semibold">{notice.title}</h3>
                <p className="text-gray-600">{notice.content}</p>
                <p className="text-sm text-gray-400">
                  Posted on: {new Date(notice.date).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))
        ) : (
          <p>No notices found.</p>
        )}
      </ul>
    </div>
  );
}

export default StudentNotice