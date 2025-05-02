'use client';
import {useGetProductsQuery} from "@/components/api/productApi";
import TableBody from "@/components/TableBody/TableBody";
import {Product} from "@/types/product";
import ProductCard from "@/components/TableBody/ProductCard";
import { useState } from 'react';

const Overview = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const {data, isSuccess, isLoading} = useGetProductsQuery(undefined);
    
    // Filter products based on search term
    const filteredProducts = data?.filter((product: Product) => {
        return product.description.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
               product.description.category.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <main className="bg-gray-50 min-h-screen">
            <div className="container mx-auto p-5">
                {/* Header Section */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-lg font-semibold text-gray-800">Products</h1>
                            <p className="text-indigo-600 font-abc text-sm mt-1">Total Product : {data?.length}</p>
                        </div>
                        
                        <div className="relative w-full sm:w-auto">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full sm:w-80 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Search products by name or category"
                            />
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-10">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                        <p className="mt-2 text-gray-600">Loading products...</p>
                    </div>
                )}

                {/* Desktop Table View */}
                {!isLoading && isSuccess && (
                    <div className="hidden md:block relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Product</th>
                                    <th scope="col" className="px-6 py-3">Category</th>
                                    <th scope="col" className="px-6 py-3">Subcategory</th>
                                    <th scope="col" className="px-6 py-3">Price</th>
                                    <th scope="col" className="px-6 py-3">Discount</th>
                                    <th scope="col" className="px-6 py-3">Image</th>
                                    <th scope="col" className="px-6 py-3">Available</th>
                                    <th scope="col" className="px-6 py-3">Size</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts?.map((row: Product) => (
                                    <TableBody data={row} key={row._id} />
                                ))}
                                {filteredProducts?.length === 0 && (
                                    <tr>
                                        <td colSpan={9} className="px-6 py-4 text-center text-gray-500">No products found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Mobile Card View */}
                {!isLoading && isSuccess && (
                    <div className="md:hidden grid grid-cols-1 gap-4">
                        {filteredProducts?.map((product: Product) => (
                            <ProductCard key={product._id} data={product} />
                        ))}
                        {filteredProducts?.length === 0 && (
                            <div className="bg-white rounded-lg shadow p-4 text-center text-gray-500">
                                No products found
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Overview;
