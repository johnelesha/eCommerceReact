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
                const response = await axios.get("https://a739df56-c549-494e-a20a-cc1785cff50b-00-2yw6hlld82bqs.janeway.replit.dev/users");
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
            axios.get(`https://a739df56-c549-494e-a20a-cc1785cff50b-00-2yw6hlld82bqs.janeway.replit.dev/users/${userId}`).then((res) => {
                setCurrentUser(res.data);
            });
        }
    }, []);

    return (
        <UsersContext.Provider value={{ users, setUsers, currentUser, setCurrentUser, userLoading }}>
            {children}
        </UsersContext.Provider>
    );
};

export default UserContext;
