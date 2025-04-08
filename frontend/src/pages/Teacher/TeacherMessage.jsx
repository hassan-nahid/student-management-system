// components/SendMessageForm.jsx
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const TeacherMessage = () => {
    const [recipientType, setRecipientType] = useState("admin");
    const [className, setClassName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
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
            },{
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
        <div className="w-full mx-auto bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700 text-center">Send a Message</h2>
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
                        <input
                            type="text"
                            placeholder="e.g. Class 8"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
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
        </div>
    );
};

export default TeacherMessage;
