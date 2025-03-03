'use client';
import {useSelector} from "react-redux";
import ControlTable from "@/components/ControlTable/ControlTable";
import ControlForm from "@/components/ControlForm/ControlForm";

const Overview = () => {

    const handleSelector = useSelector((state) => state.cartHandler);
    const { modalCondition } = handleSelector || {};
    return (
        <main>
            <div className="Control">
                <h1>Admin Controller</h1>
                <div className="container">
                    <ControlForm></ControlForm>
                    <ControlTable></ControlTable>
                </div>
            </div>
        </main>

    );
};

export default Overview;
