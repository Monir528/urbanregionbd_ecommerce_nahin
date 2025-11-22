// pages/CategoriesPage.tsx
"use client";

import CategoryForm from "@/components/CategoryForm/CategoryForm";
import SubCategoryForm from "@/components/CategoryForm/SubCategoryForm";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const CategoriesPage = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const tabs = [
        { id: 0, title: "Categories" },
        { id: 1, title: "Subcategories" }
    ];

    return (
        <div className="h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search categories..."
                                    className="pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Tab Navigation */}
                    <Tab.Group
                        selectedIndex={selectedTab}
                        onChange={setSelectedTab}
                        defaultIndex={0}
                    >
                        <Tab.List className="flex space-x-2 mb-6">
                            {tabs.map((tab) => (
                                <Tab
                                    key={tab.id}
                                    className={({ selected }) =>
                                        `px-4 py-2 rounded-lg text-sm font-medium ${
                                            selected
                                                ? "bg-blue-500 text-white"
                                                : "text-gray-500 hover:text-gray-700"
                                        }`
                                    }
                                >
                                    {tab.title}
                                </Tab>
                            ))}
                        </Tab.List>

                        <Tab.Panels>
                            <Tab.Panel>
                                <CategoryForm searchTerm={searchTerm} />
                            </Tab.Panel>
                            <Tab.Panel>
                                <SubCategoryForm searchTerm={searchTerm} />
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </main>
        </div>
    );
};

export default CategoriesPage;
