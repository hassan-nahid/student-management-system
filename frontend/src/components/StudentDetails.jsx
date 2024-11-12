import { useLoaderData } from "react-router-dom";
import { format } from "date-fns";

const StudentDetails = () => {
    const studentData = useLoaderData();

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
            {studentData && (<div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md mt-10">
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
                        <p className="text-gray-600">Address: {address.street}, {address.city}, {address.state} - {address.postalCode}</p>
                    </div>
                    <div className="my-4">
                        <h2 className="text-xl font-bold text-gray-700">Guardian Details</h2>
                        <p className="text-gray-600">Name: {guardianDetails.name}</p>
                        <p className="text-gray-600">Relation: {guardianDetails.relation}</p>
                        <p className="text-gray-600">Phone: {guardianDetails.phone}</p>
                    </div>
                </div>
            </div>)}
        </>
    );
};

export default StudentDetails;
