/* eslint-disable react/prop-types */

const InvoiceHeader = ({ details }) => {
  return (
    <div className="invoiceHeader font-abc leading-5 pt-4">
      <div className="invoice-top">
        <div>
          <h1 className="invoice-logo">Urban Region BD</h1>
          <p>Invoice Id: {details?._id}</p>
          <p>Date: {details?.date}</p>
        </div>
        <div className="invoice-text">
          <h1>Invoice</h1>
        </div>
      </div>
      <hr />
      <div className="invoice-billing">
        <div className="flex flex-row w-full justify-between items-center">
          <div>
            <p>
              BILL FROM: <strong>Urban Region BD</strong>
            </p>

            <p>Phone: 01858-124027</p>

            <p>Address: Mirpur-11, Dhaka-1216</p>
          </div>
          <img
          className="h-16"
            src="https://i.ibb.co/7GVcKqq/347120619-205072055716972-7844522544708747971-n.jpg"
            alt=""
          />
        </div>
        <hr />
        <div>
          <p>
            BILL TO:{" "}
            <strong>
              {details.firstName} {details.lastName}
            </strong>
          </p>
          <p>Phone: {details.phone}</p>
          <p>Address: {details.address}</p>
          <p>Zip Code: {details.zip}</p>
          <p>Email: {details.email}</p>
        </div>
      </div>
      {/* <hr /> */}
    </div>
  );
};

export default InvoiceHeader;
