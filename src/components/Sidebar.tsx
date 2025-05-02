"use client";

import {JSX, useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/reduxToolKit/authSlice";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { AppDispatch } from "@/reduxToolKit/store"; // Adjust the path to your store file

import {
    MdAutoDelete,
    MdCategory,
    MdOutlineAdminPanelSettings,
    MdOutlineBorderColor,
    MdSlideshow,
    MdMenu,
    MdClose,
} from "react-icons/md";
import { GrOrderedList } from "react-icons/gr";
import { IoIosCreate } from "react-icons/io";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";

// Define the type for menu items
interface MenuItem {
    title: string;
    icon: JSX.Element;
    link?: string;
    onClick?: () => void;
}

const Sidebar = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch
    const router = useRouter();
    const pathname = usePathname();

    // Check if on mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const handleLogout = () => {
        dispatch(logoutUser());
        router.push("../auth/login");
    };

    const Menus: MenuItem[] = [
        { title: "Orders", icon: <MdOutlineBorderColor />, link: "/admin/orders" },
        { title: "Products", icon: <GrOrderedList />, link: "/admin/allProducts" },
        { title: "Upload", icon: <IoIosCreate />, link: "/admin/upload" },
        { title: "Carousel", icon: <MdSlideshow />, link: "/admin/carousel-images" },
        { title: "Control", icon: <MdOutlineAdminPanelSettings />, link: "/admin/control" },
        { title: "Garbage", icon: <MdAutoDelete />, link: "/admin/garbage" },
        { title: "Category", icon: <MdCategory />, link: "/admin/categories" },
        { title: "Customers", icon: <FaPeopleGroup />, link: "/admin/customers" },
        { title: "Overview", icon: <AiOutlineFundProjectionScreen />, link: "/admin/overview" },
        {
            title: "Logout",
            icon: <FaSignOutAlt className="text-red-600" />,
            onClick: handleLogout,
        },
    ];

    const isActive = (path: string | undefined) => {
        if (!path) return false;
        return pathname === path;
    };

    // Mobile bottom navigation - only show first 5 items and a "more" option
    const mobileMenuItems = isMobile ? Menus.slice(0, 4) : Menus;
    
    if (isMobile) {
        return (
            <>
                {/* Bottom Navigation for Mobile */}
                <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg z-50">
                    <div className="flex justify-around items-center h-16">
                        {mobileMenuItems.map((menu, index) => {
                            const active = isActive(menu.link);
                            return (
                                <Link
                                    href={menu.link || "#"}
                                    key={index}
                                    onClick={menu.onClick}
                                    className={`flex flex-col items-center justify-center w-1/5 py-1 ${active ? "text-purple-600" : "text-gray-600"}`}
                                >
                                    <div className={`text-xl ${active ? "text-purple-600" : "text-gray-600"}`}>{menu.icon}</div>
                                    <span className={`text-xs mt-1 font-medium ${active ? "text-purple-600" : "text-gray-500"}`}>{menu.title}</span>
                                    {active && <div className="h-1 w-5 bg-purple-600 rounded-full mt-1"></div>}
                                </Link>
                            );
                        })}
                        <button 
                            onClick={() => setOpen(!open)}
                            className={`flex flex-col items-center justify-center w-1/5 py-1 ${open ? "text-purple-600" : "text-gray-600"}`}
                        >
                            <div className={`text-xl ${open ? "text-purple-600" : "text-gray-600"}`}>{open ? <MdClose /> : <MdMenu />}</div>
                            <span className={`text-xs mt-1 font-medium ${open ? "text-purple-600" : "text-gray-500"}`}>More</span>
                            {open && <div className="h-1 w-5 bg-purple-600 rounded-full mt-1"></div>}
                        </button>
                    </div>
                </div>

                {/* More Menu Popup */}
                {open && (
                    <div className="fixed bottom-16 inset-x-0 bg-white shadow-lg rounded-t-xl z-40 border border-gray-200 max-h-[60vh] overflow-y-auto">
                        <div className="py-2">
                            <div className="px-4 py-3 border-b border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-800">More Options</h3>
                                <p className="text-sm text-gray-500">Additional management tools</p>
                            </div>
                            {Menus.slice(4).map((menu, index) => {
                                const active = isActive(menu.link);
                                return (
                                    <Link
                                        href={menu.link || "#"}
                                        key={index}
                                        onClick={(e) => {
                                            if (menu.onClick) {
                                                e.preventDefault();
                                                menu.onClick();
                                            }
                                            setOpen(false);
                                        }}
                                        className={`flex items-center px-6 py-3 hover:bg-gray-100 ${active ? "text-purple-600" : "text-gray-700"}`}
                                    >
                                        <div className={`text-xl mr-4 ${active ? "text-purple-600" : "text-gray-700"}`}>{menu.icon}</div>
                                        <span className={active ? "font-medium" : ""}>{menu.title}</span>
                                        {active && <div className="h-5 w-1 bg-purple-600 rounded-full ml-auto"></div>}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
                
                {/* Overlay to close more menu when clicked outside */}
                {open && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-30" 
                        onClick={() => setOpen(false)}
                    />
                )}
                
                {/* Space at bottom of content to prevent overlap with the navbar */}
                <div className="h-16"></div>
            </>
        );
    }

    // Desktop sidebar
    return (
        <div
            className={`${open ? "w-72" : "w-20"} bg-white min-h-screen p-5 pt-8 border-r transition-all duration-300 shadow-lg sticky top-0`}
        >
            {/* Toggle Button */}
            <div
                className="absolute top-9 -right-3 w-7 h-7 flex items-center justify-center cursor-pointer rounded-full border-2 border-gray-500 text-gray-500 bg-white transform hover:rotate-180 transition-transform duration-300"
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close sidebar" : "Open sidebar"}
            >
                {open ? <MdClose size={16} /> : <MdMenu size={16} />}
            </div>

            {/* Logo */}
            <div className="flex items-center gap-x-4 mb-6">
                <Image src="/urbanregion.svg" alt="Urban Region Logo" width={40} height={40} />
                <Link
                    href="/admin/orders"
                    className={`origin-left font-medium text-xl duration-200 text-gray-700 ${!open && "hidden"}`}
                >
                    Admin Panel
                </Link>
            </div>

            {/* Menu Items */}
            <ul className="pt-2 space-y-2">
                {Menus.map((menu, index) => {
                    const isMenuActive = isActive(menu.link);
                    return (
                        <Link
                            href={menu.link || "#"}
                            key={index}
                            onClick={menu.onClick}
                            className="block"
                        >
                            <li
                                className={`group flex items-center gap-x-4 p-3 rounded-md transition-all duration-200 ${isMenuActive ? "bg-blue-50 text-blue-600 border-blue-400" : ""} ${open ? "border border-gray-200 hover:bg-gray-50 hover:border-blue-300" : "border-none"}`}
                            >
                                <div className={`relative text-2xl ${isMenuActive ? "text-blue-600" : "text-gray-700"}`}>
                                    {menu.icon}
                                    {!open && (
                                        <span className="absolute left-10 top-1/2 -translate-y-1/2 z-10 hidden whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:block group-hover:opacity-100 transition-opacity duration-300">
                                            {menu.title}
                                        </span>
                                    )}
                                </div>
                                <span
                                    className={`origin-left duration-200 ${isMenuActive ? "font-medium" : "text-gray-700"} ${!open && "hidden"}`}
                                >
                                    {menu.title}
                                </span>
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
};

export default Sidebar;