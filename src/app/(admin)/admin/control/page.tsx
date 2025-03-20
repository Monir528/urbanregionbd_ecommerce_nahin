'use client';
// import { useSelector } from "react-redux";
import ControlTable from "@/components/ControlTable/ControlTable";
import ControlForm from "@/components/ControlForm/ControlForm";

const Overview = () => {
    // const handleSelector = useSelector((state) => state.cartHandler);
    // const { modalCondition } = handleSelector || {};

    return (
        <main className="p-4">
            <div className="mt-16">
                <h1 className="text-3xl font-bold text-purple-600 text-center">Admin Controller</h1>
                <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
                    <ControlForm />
                    <ControlTable />
                </div>
            </div>
        </main>
    );
};

export default Overview;
