import { format } from "date-fns";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";



const StudentDetails = () => {
    const [studentData, setStudentData] = useState(null);
    const { id } = useParams(); // Get the student ID from the URL parameters
    const { user } = useAuth(); // Get the user from the useAuth hook

    useEffect(() => {
        // Fetch the student data when the component mounts
        const fetchStudentData = async () => {
            try {
                const veriemail = encodeURIComponent(user.email);
                const response = await fetch(`${import.meta.env.VITE_LINK}/api/students/${id}?email=${veriemail}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }});
                if (response.ok) {
                    const data = await response.json();
                    setStudentData(data);
                } else {
                    toast.error("Failed to fetch student data.");
                }
            } catch (error) {
                toast.error("An error occurred while fetching student data.");
                console.log(error.message);
            }
        };

        fetchStudentData();
    }, [id]);

    if (!studentData) {
        return <div>Loading...</div>; // Show a loading state while fetching data
    }

    const {
        name,
        roll,
        email,
        dateOfBirth,
        gender,
        class: studentClass,
        courseEnrolled,
        session,
        address,
        guardianDetails,
    } = studentData;

    return (
        <>
            {studentData && (
                <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md mt-10">
                    <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">{name}</h1>
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-lg font-semibold">
                                <span className="text-gray-600">Roll:</span> {roll}
                            </div>
                            <div className="text-lg font-semibold">
                                <span className="text-gray-600">Class:</span> {studentClass}
                            </div>
                            <div className="text-lg font-semibold">
                                <span className="text-gray-600">Course:</span> {courseEnrolled}
                            </div>
                            <div className="text-lg font-semibold">
                                <span className="text-gray-600">Session:</span> {session}
                            </div>
                            <div className="text-lg font-semibold">
                                <span className="text-gray-600">Gender:</span> {gender}
                            </div>
                            <div className="text-lg font-semibold">
                                <span className="text-gray-600">Date of Birth:</span> {format(new Date(dateOfBirth), "MMMM d, yyyy")}
                            </div>
                        </div>
                        <div className="my-4">
                            <h2 className="text-xl font-bold text-gray-700">Contact Information</h2>
                            <p className="text-gray-600">Email: {email}</p>
                            <p className="text-gray-600">
                                Address: {address.street}, {address.city}, {address.state} - {address.postalCode}
                            </p>
                        </div>
                        <div className="my-4">
                            <h2 className="text-xl font-bold text-gray-700">Guardian Details</h2>
                            <p className="text-gray-600">Name: {guardianDetails.name}</p>
                            <p className="text-gray-600">Relation: {guardianDetails.relation}</p>
                            <p className="text-gray-600">Phone: {guardianDetails.phone}</p>
                            <p className="text-gray-600">Phone: {guardianDetails.email &&  guardianDetails.email}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default StudentDetails;