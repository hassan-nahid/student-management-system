import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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

  const handleAddNotice = async (e) => {
    e.preventDefault();
    const newNotice = {
      title,
      content,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_LINK}/api/notices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNotice),
      });

      if (response.ok) {
        const createdNotice = await response.json(); // Get the notice with _id from server
        toast.success("Notice posted successfully.");
        setTitle("");
        setContent("");
        setNotices((prevNotices) => [...prevNotices, createdNotice]);
        setFilteredNotices((prevFiltered) => [...prevFiltered, createdNotice]);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to post notice.");
      }
    } catch (error) {
      console.error("Add Notice Error:", error.message);
      toast.error("An error occurred while posting the notice.");
    }
  };

  // Handle notice deletion with confirmation
  const handleDeleteNotice = async (id) => {
    if (!id) {
      toast.error("Invalid notice ID.");
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmResult.isConfirmed) {
      try {
        const response = await fetch(`${import.meta.env.VITE_LINK}/api/notices/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setNotices((prevNotices) => prevNotices.filter((notice) => notice._id !== id));
          setFilteredNotices((prevFiltered) => prevFiltered.filter((notice) => notice._id !== id));
          Swal.fire("Deleted!", "Notice has been deleted.", "success");
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Failed to delete notice.");
        }
      } catch (error) {
        console.error("Delete Notice Error:", error.message);
        toast.error("An error occurred while deleting the notice.");
      }
    }
  };

  // Search function to filter notices by title
  useEffect(() => {
    const filtered = notices.filter((notice) =>
      notice.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNotices(filtered);
  }, [searchQuery, notices]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Post a New Notice</h2>

      <form onSubmit={handleAddNotice} className="space-y-4 mb-8">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            required
            placeholder="Enter notice title"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Content</span>
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
            placeholder="Enter notice content"
          />
        </div>

        <button type="submit" className="btn text-white btn-primary w-full">
          Post Notice
        </button>
      </form>

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
              className="p-4 bg-white rounded-lg shadow-md flex justify-between items-start"
            >
              <div>
                <h3 className="text-xl font-semibold">{notice.title}</h3>
                <p className="text-gray-600">{notice.content}</p>
                <p className="text-sm text-gray-400">
                  Posted on: {new Date(notice.date).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDeleteNotice(notice._id)} // Pass valid _id
                className="btn btn-sm btn-error text-white ml-4"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No notices found.</p>
        )}
      </ul>
    </div>
  );
};

export default Notice;
