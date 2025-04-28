import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme.js";
import LoadingPage from "../components/sharedComponent/LoadingPage.jsx";

const DashboardLayout = () => {
    const theme = useTheme();
    const bgColor = theme === "winter" ? "bg-base-100" : "bg-neutral";
    const navigate = useNavigate();

    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const userRole = localStorage.getItem("userRole");
        if (userRole !== "admin") {
            navigate("/", { replace: true });
        } else {
            setIsChecking(false);
        }
    }, [navigate]);

    if (isChecking) {
        return <LoadingPage />;
    }

    return (
        <>
            <div className="flex ">
                <Sidebar />
                <div className={`content w-full p-4 ${bgColor} overflow-auto`}>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;
