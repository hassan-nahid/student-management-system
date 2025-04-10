import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const AdminMessage = () => {
    const [recipientType, setRecipientType] = useState("class");
    const [className, setClassName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState("send");

    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [adminMessages, setAdminMessages] = useState([]);

    const { user } = useAuth();
    const role = localStorage.getItem("role");

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_LINK}/api/teachers`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setTeachers(res.data || []);
            } catch (err) {
                console.log(err.message)
                toast.error("Failed to fetch teachers");
            }
        };

        fetchTeachers();
    }, []);

    useEffect(() => {
        if (view === "see" && role === import.meta.env.VITE_ADMIN) {
            const fetchMessages = async () => {
                try {
                    const res = await axios.get(`${import.meta.env.VITE_LINK}/api/message/admin`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                    setAdminMessages(res.data || []);
                } catch (err) {
                    console.log(err.message)

                    toast.error("Failed to fetch messages");
                }
            };

            fetchMessages();
        }
    }, [view, role]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(
                `${import.meta.env.VITE_LINK}/api/message/admin`,
                {
                    senderEmail: user?.email,
                    senderName: "Admin",
                    recipientType,
                    className: recipientType === "class" ? className : "",
                    teacherEmail: recipientType === "teacher" ? selectedTeacher : "",
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
            setClassName("");
            setSelectedTeacher("");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

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

            {/* View: Send Message */}
            {view === "send" && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label font-medium">Send To</label>
                        <select
                            className="select select-bordered w-full"
                            value={recipientType}
                            onChange={(e) => setRecipientType(e.target.value)}
                        >
                            <option value="class">Specific Class</option>
                            <option value="teacher">Specific Teacher</option>
                        </select>
                    </div>

                    {recipientType === "class" && (
                        <div>
                            <label className="label font-medium">Class Name</label>
                            <select
                                className="select select-bordered w-full"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                                required
                            >
                                <option value="">Select a class</option>
                                {[...Array(10)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {recipientType === "teacher" && (
                        <div>
                            <label className="label font-medium">Select Teacher</label>
                            <select
                                className="select select-bordered w-full"
                                value={selectedTeacher}
                                onChange={(e) => setSelectedTeacher(e.target.value)}
                                required
                            >
                                <option value="">Select a teacher</option>
                                {teachers.map((teacher) => (
                                    <option key={teacher._id} value={teacher.email}>
                                        {teacher.name} ({teacher.email})
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div>
                        <label className="label font-medium">Message</label>
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

            {/* View: See Message */}
            {view === "see" && role === import.meta.env.VITE_ADMIN && (
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-center">Messages for Admin</h2>
                    {adminMessages.length === 0 ? (
                        <p className="text-center text-gray-500">No messages found.</p>
                    ) : (
                        <ul className="space-y-4">
                            {adminMessages.map((msg) => (
                                <li
                                    key={msg._id}
                                    className="border border-gray-200 rounded-lg p-4 shadow-sm"
                                >
                                    <p className="text-sm text-gray-600">
                                        From: <strong>{msg.sender.name}</strong> ({msg.sender.email})
                                    </p>
                                    <p className="text-gray-800 mt-2">{msg.message}</p>
                                    <p className="text-xs text-gray-400 mt-2">
                                        {new Date(msg.timestamp).toLocaleString()}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminMessage;
