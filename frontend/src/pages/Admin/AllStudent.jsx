import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const AllStudent = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchRoll, setSearchRoll] = useState('');
    const {user} = useAuth();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const email = encodeURIComponent(user.email);
                const response = await fetch(`${import.meta.env.VITE_LINK}/api/students?email=${email}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch students');
                }
                const data = await response.json();
                setStudents(data);
                setFilteredStudents(data); // Initialize filtered students with all students
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchStudents();
    }, []);

    useEffect(() => {
        const filterStudents = () => {
            const filtered = students.filter((student) =>
                student.name.toLowerCase().includes(searchName.toLowerCase()) &&
                student.roll.toString().includes(searchRoll)
            );
            setFilteredStudents(filtered);
        };
        filterStudents();
    }, [searchName, searchRoll, students]);

    const handleDelete = async (studentId) => {
        const confirmResult = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirmResult.isConfirmed) {
            try {
                const veriemail = encodeURIComponent(user.email);
                const response = await fetch(`${import.meta.env.VITE_LINK}/api/students/${studentId}?email=${veriemail}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to delete student');
                }
                Swal.fire('Deleted!', 'The student has been deleted.', 'success');
                setStudents(students.filter(student => student._id !== studentId));
                setFilteredStudents(filteredStudents.filter(student => student._id !== studentId));
            } catch (error) {
                console.error(error.message);
                Swal.fire('Error!', 'Failed to delete student.', 'error');
            }
        }
    };

    return (
        <div className="w-full h-screen p-4">
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
                <input
                    type="text"
                    placeholder="Search by roll"
                    value={searchRoll}
                    onChange={(e) => setSearchRoll(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
                <div className='p-3 font-bold'>
                    Total Student: {students?.length}
                </div>
            </div>

            {filteredStudents.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Name</th>
                                <th>Roll</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student, index) => (
                                <tr key={student._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={"https://i.ibb.co.com/kg6fMYC/placeholder.jpg"}
                                                        alt="Student Avatar"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{student?.name}</div>
                                                <div className="text-sm opacity-50">{student?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {student?.roll}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">class: {student?.class}</span>
                                    </td>
                                    <th className='flex flex-wrap gap-1'>
                                        <Link to={`/student_details/${student?._id}`} className="btn btn-primary btn-xs text-white">Details</Link>
                                        <Link to={`/edit_student/${student?._id}`} className="btn btn-warning btn-xs text-white">Edit</Link>
                                        <button
                                            onClick={() => handleDelete(student._id)}
                                            className="btn btn-error btn-xs text-white"
                                        >
                                            Delete
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>No students found</div>
            )}
        </div>
    );
};

export default AllStudent;
