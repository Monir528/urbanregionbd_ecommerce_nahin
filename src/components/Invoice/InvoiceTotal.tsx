/* eslint-disable react/prop-types */

const InvoiceTotal = ({ details }) => {
    return (
        <div className="font-rajdhani text-[16px] font-normal">
            {/* Invoice Content Section */}
            <div className="flex items-center justify-between m-2.5 mb-4">
                <div>
                    <p>Terms & Conditions:</p>
                </div>
                <div className="flex gap-10">
                    <div>
                        <p>Subtotal:</p>
                        <p>Paid:</p>
                        <p>Total:</p>
                    </div>
                    <div>
                        <p>{details.total} Taka</p>
                        <p>00 Taka</p>
                        <p>{details?.total} Taka</p>
                    </div>
                </div>
            </div>

            <hr className="border-gray-300 mb-4" />

            {/* Invoice Payable Section */}
            <div className="flex justify-end">
                <h2 className="bg-black/80 text-white inline-block mr-2.5 px-2 py-1">
                    Total: {details?.total}
                </h2>
            </div>
        </div>
    );
};

export default InvoiceTotal;
