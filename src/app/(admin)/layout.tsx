"use client";
import "../globals.css";
import {useState} from "react";
import Link from "next/link";
import {MdAutoDelete, MdCategory, MdOutlineAdminPanelSettings, MdOutlineBorderColor} from "react-icons/md";
import {GrOrderedList} from "react-icons/gr";
import {IoIosCreate} from "react-icons/io";
import {AiOutlineFundProjectionScreen} from "react-icons/ai";
import {FaArrowLeft} from "react-icons/fa";
import {CgSidebarOpen} from "react-icons/cg";
import {ReduxProvider} from "@/reduxToolKit/provider";


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const [open, setOpen] = useState(false);
    const Menus = [
        { title: "Orders", src: <MdOutlineBorderColor className="text-2xl"/>, gap: true , link:"/admin/orders"},
        { title: "Products ", src: <GrOrderedList className="text-2xl"/>, link:"/admin/allProducts"},
        { title: "Upload", src: <IoIosCreate className="text-2xl"/> , link:"/admin/upload"},
        { title: "Control ", src: <MdOutlineAdminPanelSettings className="text-2xl"/>, link:"/admin/control"},
        { title: "Garbage ", src: <MdAutoDelete className="text-2xl"/>, link:"/admin/garbage"},
        { title: "Category ", src: <MdCategory className="text-2xl"/>, link:"/admin/createCategory"},
        { title: "Overview ", src: <AiOutlineFundProjectionScreen className="text-2xl"/>, link:"/admin/overview"},
    ];

    return (
        <html lang="en">
            {/* Global <head> Section */}
            <head>
                <title>Fenxobd</title>
                <meta name="description" content="Luxury designer bags for every occasion" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="flex flex-col min-h-screen">
                 <ReduxProvider>
                    <div className="flex">
                        <div
                            className={` ${
                                open ? "w-72" : "w-20 "
                            } bg-gray-700 min-h-screen p-5  pt-8 relative duration-300 `}
                        >
                            <div
                                className={`absolute text-2xl text-purple-500 cursor-pointer -right-3 top-9 w-7 border-dark-purple
                   border-2 rounded-full  ${!open && "rotate-180"}`}
                                onClick={() => setOpen(!open)}> <FaArrowLeft/>
                            </div>
                            <div className="flex gap-x-4 items-center">
                                <div
                                    src="./src/assets/logo.png"
                                    className={`cursor-pointer text-2xl duration-500 ${
                                        open && "rotate-[360deg]"
                                    }`}><CgSidebarOpen className="text-white"/>
                                </div>
                                <Link href="/dashboard"
                                      className={`text-gray-200 origin-left font-medium text-xl duration-200 underline ${
                                          !open && "scale-0"
                                      }`}
                                >
                                    Admin Panel
                                </Link>
                            </div>
                            <ul className="pt-6">
                                {Menus.map((Menu, index) => (
                                    <Link
                                        href={`${Menu.link}`}
                                        key={index}
                                        className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-200 text-md font-mont items-center gap-x-4 
                      ${Menu.gap ? "mt-9" : "mt-2"} ${
                                            index === 0 && "bg-light-white"
                                        } `}
                                    >
                                        <div>{Menu.src}</div>
                                        <span className={`${!open && "hidden"} origin-left duration-200`}>
                        {Menu.title}
                      </span>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                        <div className="min-h-screen flex-1 p-7">
                            <h1 className="text-2xl font-semibold ">{children}</h1>
                        </div>
                    </div>
                 </ReduxProvider>
            </body>
        </html>
    );
}