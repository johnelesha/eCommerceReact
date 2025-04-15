import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import useTheme from "../hooks/useTheme.js";

const DashboardLayout = () => {
    const theme = useTheme();
    const bgColor = theme === "winter" ? "bg-base-100" : "bg-neutral";
    return (
        <>
            <div className="flex ">
                <Sidebar className="" />
                <div className={`content w-full  p-4 ${bgColor} overflow-auto`}>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;
