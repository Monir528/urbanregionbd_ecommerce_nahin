'use client';
import ProductUploadForm from "@/components/ProductUploadForm";
import {useSelector} from "react-redux";
import Modal from "@/components/Modal/Modal";

const Overview = () => {

    const handleSelector = useSelector((state) => state.cartHandler);
    const { modalCondition } = handleSelector || {};
    return (
        <main>
            <div className="product container">
                {modalCondition && <Modal></Modal>}
                <div>
                    {/*<h1 className="text-2xl font-semibold underline">Upload a Product</h1>*/}
                    <ProductUploadForm></ProductUploadForm>
                </div>
            </div>
        </main>

    );
};

export default Overview;
