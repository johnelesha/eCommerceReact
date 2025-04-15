import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UsersContext = createContext();

const UserContext = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/users");
                setUsers(response.data);
                setUserLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
                setUserLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            axios.get(`http://localhost:3000/users/${userId}`).then((res) => {
                setCurrentUser(res.data);
            });
        }
    }, []);

    return (
        <UsersContext.Provider value={{ users, currentUser, setCurrentUser, userLoading }}>
            {children}
        </UsersContext.Provider>
    );
};

export default UserContext;
