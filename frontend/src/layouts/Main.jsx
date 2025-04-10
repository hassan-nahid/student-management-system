import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom"
import auth from "../firebase/firebase.config";
import { IoIosLogOut } from "react-icons/io";
import { FaBook } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import { FaPeopleRoof } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { TbBookmarksFilled } from "react-icons/tb";
import { TiMessageTyping } from "react-icons/ti";



const Main = () => {
    const [user] = useAuthState(auth);
    const [signOut,] = useSignOut(auth);

    const role = localStorage.getItem("role")

    const handleLogout = async () => {
        await signOut()
        localStorage.removeItem("token")
        localStorage.removeItem("role")
    }

    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content my-1 flex flex-col items-center justify-center">
                    <label htmlFor="my-drawer-2" className="btn btn-primary text-white drawer-button lg:hidden">
                        Open Menu
                    </label>
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex justify-between">
                        {/* Sidebar content here */}
                        <div>
                            <Link to={"/"} className="text-2xl font-bold text-primary"><img className="w-full py-2" src="/nexschola.png" alt="" /></Link>
                            {role === import.meta.env.VITE_ADMIN && (<>
                                <li><Link to={"/add_teacher"}>Add Teacher<GiTeacher />
                                </Link></li>
                                <li><Link to={"/add_student"}>Add Student<PiStudentBold />
                                </Link></li>
                                <li><Link to={"/all_student"}>All Student<FaPeopleRoof />
                                </Link></li>
                                <li><Link to={"/all_teacher"}>All Teacher<IoIosPeople />
                                </Link></li>
                                <li><Link to={"/add_subject"}>Add Subject<FaBook />
                                </Link></li>
                                <li><Link to={"/schedule"}>Schedule<FaBook />
                                </Link></li>
                                <li><Link to={"/admin_notice"}>Notices<TfiWrite />
                                </Link></li>
                                <li><Link to={"/admin_message"}>Message<TiMessageTyping />

                                </Link></li>
                            </>)}
                            {role === import.meta.env.VITE_TEACHER && (<>
                                <li><Link to={"/attendance_entry"}>Attendance<TfiWrite />
                                </Link></li>
                                <li><Link to={"/marks_entry"}>Marks Entry<IoCheckmarkDoneSharp /> </Link></li>
                                <li><Link to={"/attendance_overview"}>Attendance Overview<FaPeopleRoof /> </Link></li>
                                <li><Link to={"/marks_overview"}>Marks Overview<TbBookmarksFilled /> </Link></li>
                                <li><Link to={"/teacher_notice"}>Teacher Notice<TfiWrite /> </Link></li>
                                <li><Link to={"/teacher_message"}>Teacher Message<TiMessageTyping /> </Link></li>
                            </>)}
                            {role === import.meta.env.VITE_STUDENT && (<>
                                <li><Link to={"/attendance"}>Attendance<FaPeopleRoof /> </Link></li>
                                <li><Link to={"/result"}>Result<TbBookmarksFilled /> </Link></li>
                                <li><Link to={"/message"}>Message<TiMessageTyping /> </Link></li>
                                <li><Link to={"/notice"}>Notice<TfiWrite /> </Link></li>

                            </>)}

                        </div>
                        <div className="flex gap-2 p-2 w-full">
                            <button onClick={handleLogout} className="btn text-white btn-error w-[70%] font-semibold">Logout <IoIosLogOut /></button>
                            <Link to={"/profile"} className="w-[30%]">
                                {user?.photoURL ? <img className="w-12 h-12 rounded-full" src={user?.photoURL} alt="profile" title={user?.email} /> : <img className="w-12 h-12 rounded-full" src="https://i.ibb.co.com/kg6fMYC/placeholder.jpg" alt="profile" title={user?.email} />}
                            </Link>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Main