import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const role = localStorage.getItem("role")


    useEffect(() => {
        const fetchData = async () => {
            if (!authLoading && user?.email && role) {
                setLoading(true);

                try {
                    const encodedEmail = encodeURIComponent(user.email);
                    console.log(encodedEmail)
                    let res;

                    if (role === import.meta.env.VITE_TEACHER) {
                        console.log(encodedEmail)
                        res = await axios.get(`${import.meta.env.VITE_LINK}/api/teachers/email/${encodedEmail}`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                        });
                    } else if (role === import.meta.env.VITE_STUDENT) {
                        res = await axios.get(`${import.meta.env.VITE_LINK}/api/students/email/${encodedEmail}`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                        });
                    } else {
                        console.warn("Unknown role:", role);
                        setLoading(false);
                        return;
                    }

                    setData(res.data); // ✅ set only the actual data
                } catch (error) {
                    console.error("Failed to fetch user data:", error.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [user, authLoading]);

    return (
        <UserContext.Provider value={{ userData: data, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserData = () => useContext(UserContext);
