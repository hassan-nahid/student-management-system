import { useLoaderData } from "react-router-dom";

const TeacherDetails = () => {
    const teacherData = useLoaderData();

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
