'use client';

import { useGetAllOrderedQuery } from "@/components/api/confirmOrder/confirmOrder";
import { useMemo } from "react";
import { dateBetweenFilterFn, DateRangeColumnFilter } from "@/components/filters";
import TableContainer from "@/components/TableContainer";
import { Column } from "react-table";
import { Order } from "@/types/order";

const Overview = () => {
    const { data, isLoading } = useGetAllOrderedQuery(undefined);

    const columns = useMemo<Column<Order>[]>(
        () => [
            {
                Header: "Date",
                accessor: "date",
                Filter: DateRangeColumnFilter,
                filter: dateBetweenFilterFn,
            },
            // Add more columns as needed
        ],
        []
    );

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Orders Overview</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Manage and track all orders in one place
                </p>
            </div>
            
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                </div>
            ) : !data ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">No orders found</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow">
                    <TableContainer columns={columns} data={data} />
                </div>
            )}
        </main>
    );
};

export default Overview;
