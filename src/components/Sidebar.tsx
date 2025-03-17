"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/reduxToolKit/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import {
    MdAutoDelete,
    MdCategory,
    MdOutlineAdminPanelSettings,
    MdOutlineBorderColor,
} from "react-icons/md";
import { GrOrderedList } from "react-icons/gr";
import { IoIosCreate } from "react-icons/io";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logoutUser());
        router.push("/auth/login");
    };

    const Menus = [
        { title: "Orders", icon: <MdOutlineBorderColor />, link: "/admin/orders" },
        { title: "Products", icon: <GrOrderedList />, link: "/admin/allProducts" },
        { title: "Upload", icon: <IoIosCreate />, link: "/admin/upload" },
        { title: "Control", icon: <MdOutlineAdminPanelSettings />, link: "/admin/control" },
        { title: "Garbage", icon: <MdAutoDelete />, link: "/admin/garbage" },
        { title: "Category", icon: <MdCategory />, link: "/admin/createCategory" },
        { title: "Overview", icon: <AiOutlineFundProjectionScreen />, link: "/admin/overview" },
        { title: "Logout", icon: <FaSignOutAlt className="text-red-600" />, onClick: handleLogout },
    ];

    return (
        <div className={`${open ? "w-72" : "w-20"} bg-white min-h-screen p-5 pt-8 border-r transition-all duration-300 shadow-lg`}>
            {/* Toggle Button */}
            <div
                className="absolute top-9 -right-3 w-7 cursor-pointer rounded-full border-2 border-gray-500 text-2xl text-gray-500 transform duration-300 hover:rotate-90"
                onClick={() => setOpen(!open)}
            >
                <FaSignOutAlt />
            </div>

            {/* Logo */}
            <div className="flex items-center gap-x-4">
                <Image src="/urbanregion.svg" alt="Urban Region Logo" width={40} height={40} />
                <Link
                    href="/dashboard"
                    className={`origin-left font-medium text-xl duration-200 text-gray-700 ${!open && "hidden"}`}
                >
                    Admin Panel
                </Link>
            </div>

            {/* Menu Items */}
            <ul className="pt-6 space-y-2">
                {Menus.map((menu, index) => (
                    <Link href={menu.link || "#"} key={index} onClick={menu.onClick}>
                        <li
                            className={`group flex items-center gap-x-4 p-3 rounded-md transition-all duration-200 ${
                                open ? "border border-gray-300 hover:bg-gray-100 hover:border-blue-400" : "border-none"
                            }`}
                        >
                            <div className="relative text-2xl text-gray-700">
                                {menu.icon}
                                {!open && (
                                    <span className="absolute left-10 top-1/2 -translate-y-1/2 z-10 hidden whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs text-white opacity-0 group-hover:block group-hover:opacity-100">
                    {menu.title}
                  </span>
                                )}
                            </div>
                            <span className={`origin-left duration-200 ${!open && "hidden"}`}>{menu.title}</span>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
