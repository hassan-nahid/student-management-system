import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const TeacherDetails = () => {
    const [teacherData, setTeacherData] = useState(null);
    const { id } = useParams(); // Get the teacher ID from the URL parameters
    const {user} = useAuth();

    useEffect(() => {
        // Fetch the teacher data when the component mounts
        const fetchTeacherData = async () => {
            try {
                const email = encodeURIComponent(user.email);

                const response = await fetch(`${import.meta.env.VITE_LINK}/api/teachers/${id}?email=${email}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setTeacherData(data);
                } else {
                    toast.error("Failed to fetch teacher data.");
                }
            } catch (error) {
                toast.error("An error occurred while fetching teacher data.");
                console.log(error.message);
            }
        };

        fetchTeacherData();
    }, [id]);

    if (!teacherData) {
        return <div>Loading...</div>; // Show a loading state while fetching data
    }

    const {
        name,
        email,
        phone,
        address,
        role,
    } = teacherData;

    return (
        <>
            {teacherData && (
                <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md mt-10">
                    <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">{name}</h1>
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-lg font-semibold">
                                <span className="text-gray-600">Role:</span> {role}
                            </div>
                        </div>
                        <div className="my-4">
                            <h2 className="text-xl font-bold text-gray-700">Contact Information</h2>
                            <p className="text-gray-600">Email: {email}</p>
                            <p className="text-gray-600">Phone: {phone}</p>
                            <p className="text-gray-600">
                                Address: {address.street}, {address.city}, {address.state} - {address.postalCode}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TeacherDetails;