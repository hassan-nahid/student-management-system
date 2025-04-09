import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const TeacherMessage = () => {
    const [recipientType, setRecipientType] = useState("admin");
    const [className, setClassName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState("send"); // "send" or "see"

    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(`${import.meta.env.VITE_LINK}/api/message`, {
                senderEmail: user?.email,
                senderName: user?.displayName || "Anonymous",
                recipientType,
                className: recipientType === "class" ? className : "",
                message,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            toast.success("Message sent!");
            setMessage("");
            setClassName("");
        } catch (error) {
            toast.error(error.message)
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
                            <option value="admin">Admin</option>
                            <option value="class">Specific Class</option>
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

            {/* View: See Message Placeholder */}
            {view === "see" && (
                <div className="text-center text-gray-500">
                    <p className="text-lg font-semibold">See Messages</p>
                    <p className="mt-2">This section will show received messages. Coming soon...</p>
                </div>
            )}
        </div>
    );
};

export default TeacherMessage;
