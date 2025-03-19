"use client";

import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Customer {
    _id: string;
    name: string;
    phone: string;
    address: string;
    division?: string;
    date?: string;
    orderedItem?: Array<{
        id: string;
        name: string;
        image: string;
        price: string;
        cartQuantity: number;
    }>;
    status?: string;
    total?: number;
}

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(50); // Changed from 5 to 50

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/getClients`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch customers");
                }

                const data: Customer[] = await response.json();
                setCustomers(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    // Filter customers based on search term
    const filteredCustomers = customers.filter((customer) =>
        [customer.name, customer.address].some((field) =>
            field.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Pagination calculations
    const totalItems = filteredCustomers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

    // Pagination handlers
    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    // Generate pagination buttons (max 8)
    const getPaginationButtons = () => {
        const maxButtons = 8;
        const buttons: (number | string)[] = [];

        if (totalPages <= maxButtons) {
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(i);
            }
        } else {
            buttons.push(1);

            const sideButtons = Math.floor((maxButtons - 3) / 2);
            let start = Math.max(2, currentPage - sideButtons);
            let end = Math.min(totalPages - 1, currentPage + sideButtons);

            if (end - start + 3 > maxButtons) {
                if (currentPage <= sideButtons + 2) {
                    end = maxButtons - 2;
                } else if (currentPage > totalPages - sideButtons - 1) {
                    start = totalPages - (maxButtons - 3);
                } else {
                    start = currentPage - sideButtons;
                    end = currentPage + sideButtons;
                }
            }

            if (start > 2) {
                buttons.push("...");
            }

            for (let i = start; i <= end; i++) {
                buttons.push(i);
            }

            if (end < totalPages - 1) {
                buttons.push("...");
            }

            buttons.push(totalPages);
        }

        return buttons;
    };

    // Placeholder functions for edit and delete
    const handleEdit = (id: string) => {
        console.log(`Edit customer with ID: ${id}`);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this customer?")) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/deleteClient/${id}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    throw new Error("Failed to delete customer");
                }

                setCustomers(customers.filter((customer) => customer._id !== id));
            } catch (err) {
                console.error("Delete error:", err);
                alert("Failed to delete customer");
            }
        }
    };

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Customers</h1>

            {/* Search Input */}
            <div className="mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name or address..."
                    className="w-full max-w-md px-4 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Name</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Phone</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Address</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedCustomers.length > 0 ? (
                        paginatedCustomers.map((customer) => (
                            <tr key={customer._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm text-gray-900 border-b">{customer.name}</td>
                                <td className="px-4 py-2 text-sm text-gray-900 border-b">{customer.phone}</td>
                                <td className="px-4 py-2 text-sm text-gray-900 border-b">{customer.address}</td>
                                <td className="px-4 py-2 text-sm text-gray-900 border-b flex gap-2">
                                    <button
                                        onClick={() => handleEdit(customer._id)}
                                        className="text-blue-500 hover:text-blue-700"
                                        title="Edit"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(customer._id)}
                                        className="text-red-500 hover:text-red-700"
                                        title="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                                No customers found matching your search.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-6 flex justify-between items-center">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 bg-indigo-600 text-white rounded-md ${
                            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
                        }`}
                    >
                        Previous
                    </button>

                    <div className="flex gap-2">
                        {getPaginationButtons().map((page, index) => (
                            <button
                                key={index}
                                onClick={() => typeof page === "number" && handlePageClick(page)}
                                disabled={typeof page !== "number"}
                                className={`px-3 py-1 rounded-md ${
                                    currentPage === page
                                        ? "bg-indigo-600 text-white"
                                        : typeof page === "number"
                                            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            : "bg-gray-100 text-gray-500 cursor-default"
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 bg-indigo-600 text-white rounded-md ${
                            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}