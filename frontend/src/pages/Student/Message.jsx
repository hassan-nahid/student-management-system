import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useUserData } from "../../context/UserContext";

const Message = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("send");
  const [messages, setMessages] = useState([]);

  const { user } = useAuth();
  const role = localStorage.getItem("role");
  const { userData } = useUserData();
  console.log(userData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_LINK}/api/message/student`,
        {
          senderEmail: user?.email,
          senderName: user?.displayName || "Anonymous",
          recipientType: "admin",
          className: "",
          message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Message sent!");
      setMessage("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Fetch messages by class if student
  useEffect(() => {
    const fetchMessages = async () => {
      if (
        view === "see" &&
        role === import.meta.env.VITE_STUDENT &&
        userData?.class
      ) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_LINK}/api/message/class/${userData.class}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log(response)
          setMessages(response.data);
        } catch (error) {
          toast.error(error.message);
        }
      }
    };

    fetchMessages();
  }, [view, role, userData?.class]);
  console.log(messages)

  return (
    <div className="w-full h-full mx-auto bg-white p-6 rounded-xl shadow-lg">
      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`btn ${view === "send" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setView("send")}
        >
          Send Message
        </button>
        <button
          className={`btn ${view === "see" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setView("see")}
        >
          See Message
        </button>
      </div>

      {/* Send View */}
      {view === "send" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label font-medium">Message to Admin</label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}

      {/* See View */}
      {view === "see" && role === import.meta.env.VITE_STUDENT && (
        <div className="space-y-4">
          <p className="text-lg font-semibold text-center">Messages for Class {userData?.class}</p>
          {messages.length === 0 ? (
            <p className="text-center text-gray-500">No messages found.</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className="p-4 bg-gray-100 rounded-lg border shadow"
              >
                <p className="text-sm text-gray-600 mb-1">
                  From: <span className="font-medium">{msg.sender.name ? msg.sender.name : "Anonymous"}</span> (
                  {msg.sender.email ? msg.sender.email : "Anonymous"})
                </p>
                <p className="text-gray-800">{msg.message}</p>
                <p className="text-xs text-right text-gray-400">
                  {new Date(msg.timestamp).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Message;
