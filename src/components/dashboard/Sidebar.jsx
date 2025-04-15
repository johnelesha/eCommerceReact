import React from 'react'
import { IoHomeSharp } from "react-icons/io5";
import { FaStore, FaShoppingCart, FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom';
import useTheme from "../../hooks/useTheme";

const Sidebar = () => {

    const theme = useTheme();
    const bgColorsidebar = theme === "night" ? "bg-base-200" : "bg-sky-950";

    return (
        <>
            <div className="drawer  drawer-open  bg-red-500   w-fit  shadow-xl">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />

                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className={`menu ${bgColorsidebar} text-base-content min-h-full p-4 text-white`}>
                        <li><Link to=''> <IoHomeSharp /> <span className="hidden sm:hidden md:inline lg:inline xl:inline" >Dashboard</span> </Link></li>
                        <li><Link to='products'> <FaStore /> <span className="hidden sm:hidden md:inline lg:inline xl:inline" > Products </span> </Link></li>
                        <li><Link to='orders'> <FaShoppingCart /> <span className="hidden sm:hidden md:inline lg:inline xl:inline" > Orders </span> </Link></li>
                        <li><Link to='users'> <FaUsers /> <span className="hidden sm:hidden md:inline lg:inline xl:inline" > Users </span> </Link></li>
                    </ul>
                </div>

            </div>
        </>
    )
}

export default Sidebar