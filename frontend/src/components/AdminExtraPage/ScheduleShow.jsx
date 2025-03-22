import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ScheduleShow = () => {
    const [schedule, setSchedule] = useState([]);
    const {user} = useAuth();

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const email = encodeURIComponent(user.email);
                const response = await fetch(`${import.meta.env.VITE_LINK}/api/schedule?email=${email}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!response.ok) throw new Error("Failed to fetch schedule data");
                const data = await response.json();
                setSchedule(data);
            } catch (error) {
                console.error(error.message);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Unable to fetch schedule data.",
                });
            }
        };

        fetchSchedule();
    }, [schedule]);

    const handleDeletePeriod = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will delete the selected period.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const email = encodeURIComponent(user.email);
                    const response = await fetch(`${import.meta.env.VITE_LINK}/api/schedule/${id}?email=${email}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });

                    if (!response.ok) throw new Error("Failed to delete period");

                    // Filter out the deleted item from the schedule state
                    setSchedule((prevSchedule) =>
                        prevSchedule.filter((scheduleItem) => scheduleItem._id !== id)
                    );

                    Swal.fire("Deleted!", "The period has been removed.", "success");
                } catch (error) {
                    console.error(error.message);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to delete period",
                    });
                }
            }
        });
    };



    // Group schedule by classNumber and day
    const groupedSchedule = schedule.reduce((acc, item) => {
        if (!acc[item.classNumber]) {
            acc[item.classNumber] = {};
        }
        if (!acc[item.classNumber][item.day]) {
            acc[item.classNumber][item.day] = [];
        }
        acc[item.classNumber][item.day].push(item);
        return acc;
    }, {});

    return (
        <div>
            {Object.keys(groupedSchedule).length > 0 ? (
                Object.keys(groupedSchedule).map((classNumber) => (
                    <div key={classNumber} className="mb-10">
                        <h3 className="text-xl font-semibold mb-3">Class {classNumber} Schedule</h3>
                        {Object.keys(groupedSchedule[classNumber]).map((day) => (
                            <div key={day} className="mb-5">
                                <h4 className="text-lg font-medium mb-2">{day}</h4>
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Period</th>
                                                <th>Subject</th>
                                                <th>Teacher</th>
                                                <th>Time</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {groupedSchedule[classNumber][day].map((scheduleItem, index) =>
                                                scheduleItem.periods.map((periodItem, periodIndex) => (
                                                    <tr key={periodIndex} className="hover">
                                                        <th>{index + 1}</th>
                                                        <td>{periodItem.period}</td>
                                                        <td>{periodItem.subject}</td>
                                                        <td>{periodItem.teacher}</td>
                                                        <td>{periodItem.time}</td>
                                                        <td className="flex gap-1 flex-wrap">
                                                            <button
                                                                onClick={() => handleDeletePeriod(scheduleItem._id)}
                                                                className="btn text-white btn-error btn-sm"
                                                            >
                                                                Delete
                                                            </button>
                                                            <Link to={`/schedule/${scheduleItem._id}`}
                                                                className="btn text-white btn-warning btn-sm"
                                                            >
                                                                Edit
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <div>No schedules available.</div>
            )}

            {/* Modal for editing period */}
        </div>
    );
};

export default ScheduleShow;