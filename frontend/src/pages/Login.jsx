import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../firebase/firebase.config';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const [user] = useAuthState(auth);
    const [role, setRole] = useState("Student"); // Default role
    const [email, setEmail] = useState("");      // New State for email
    const [password, setPassword] = useState(""); // New State for password
    const navigate = useNavigate();

    // Auto-fill email & password when role changes
    useEffect(() => {
        if (role === "Admin") {
            setEmail("admin@sms.com");
            setPassword("password");
        } else if (role === "Teacher") {
            setEmail("ironman@nexschola.com");
            setPassword("password");
        } else if (role === "Student") {
            setEmail("s110001@nexschola.com");
            setPassword("110001");
        }
    }, [role]);

    const handleLogin = (e) => {
        e.preventDefault();

        let roleUrl = '';
        if (role === "Admin") {
            roleUrl = `${import.meta.env.VITE_LINK}/api/auth/admin`;
        } else if (role === "Student") {
            roleUrl = `${import.meta.env.VITE_LINK}/api/auth/student`;
        } else if (role === "Teacher") {
            roleUrl = `${import.meta.env.VITE_LINK}/api/auth/teacher`;
        }

        fetch(roleUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("role", data.role);
                    signInWithEmailAndPassword(email, password)
                        .then(() => {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: `${role} Login Successful`,
                                showConfirmButton: false,
                                timer: 1500,
                            }).then(() => {
                                navigate("/");
                            });
                        })
                        .catch((error) => {
                            Swal.fire({
                                position: "top-end",
                                icon: "error",
                                title: `Login Failed`,
                                showConfirmButton: false,
                                timer: 1500,
                            });
                            console.log(error.message);
                        });
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: `Unauthorized ${role} Email`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `Error Verifying ${role}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                console.log(error.message);
            });
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col w-full">
                <div className="text-center my-5">
                    <p className="text-gray-600 mt-2">
                        Just select your Role ➔ Then click Login ✅
                    </p>
                </div>
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-primary">Login</h1>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Role</span>
                                </label>
                                <select
                                    className="select select-bordered"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="Teacher">Teacher</option>
                                    <option value="Student">Student</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="password"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn text-white btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
