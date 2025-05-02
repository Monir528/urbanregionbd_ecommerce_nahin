'use client';
import OrderTable from "@/components/OrderTable/OrderTable";

const OrdersPage = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Order Management</h1>
                <div className="text-sm text-gray-500">
                    Manage all customer orders
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <OrderTable />
            </div>
        </div>
    );
};

export default OrdersPage;
