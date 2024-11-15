import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import auth from '../../firebase/firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';

const AllTeacher = () => {
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [user] = useAuthState(auth);


    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const email = encodeURIComponent(user.email); // Encode email for URL
                const response = await fetch(`${import.meta.env.VITE_LINK}/api/teachers?email=${email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch teachers');
                }
                const data = await response.json();
                setTeachers(data);
                setFilteredTeachers(data); // Initialize filtered teachers with all teachers
            } catch (error) {
                console.error(error.message);
            }
        };
    
        fetchTeachers();
    }, []);
    

    useEffect(() => {
        const filterTeachers = () => {
            const filtered = teachers.filter((teacher) => 
                teacher.name.toLowerCase().includes(searchName.toLowerCase()) &&
                teacher.email.toLowerCase().includes(searchEmail.toLowerCase())
            );
            setFilteredTeachers(filtered);
        };
        filterTeachers();
    }, [searchName, searchEmail, teachers]);

    const handleDelete = async (teacherId) => {
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
                const response = await fetch(`${import.meta.env.VITE_LINK}/api/teachers/${teacherId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ email: user.email })
                });
                if (!response.ok) {
                    throw new Error('Failed to delete teacher');
                }
                Swal.fire('Deleted!', 'The teacher has been deleted.', 'success');
                setTeachers(teachers.filter(teacher => teacher._id !== teacherId));
                setFilteredTeachers(filteredTeachers.filter(teacher => teacher._id !== teacherId));
            } catch (error) {
                console.error(error.message);
                Swal.fire('Error!', 'Failed to delete teacher.', 'error');
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
                    placeholder="Search by email"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
                <div className='p-3 font-bold'>
                    Total Teacher: {teachers?.length}
                </div>
            </div>
            
            {filteredTeachers.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTeachers.map((teacher, index) => (
                                <tr key={teacher._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={"https://i.ibb.co.com/kg6fMYC/placeholder.jpg"}
                                                        alt="Teacher Avatar"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{teacher?.name}</div>
                                                <div className="text-sm opacity-50">{teacher?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {teacher?.email}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Role: {teacher?.role}</span>
                                    </td>
                                    <th className='flex flex-wrap gap-1'>
                                        <Link to={`/teacher_details/${teacher?._id}`} className="btn btn-primary btn-xs text-white">Details</Link>
                                        <Link to={`/edit_teacher/${teacher?._id}`} className="btn btn-warning btn-xs text-white">Edit</Link>
                                        <button 
                                            onClick={() => handleDelete(teacher._id)} 
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
                <div>No teachers found</div>
            )}
        </div>
    );
};

export default AllTeacher;
