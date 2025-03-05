/* eslint-disable react/prop-types */

const InvoiceTotal = ({details}) => {
  
  return (
    <div className="invoiceTotal">
      <div className="invoice-content">
        <div>
          <p>Terms & Conditions:</p>
        </div>
        <div className="total-cost">
          <div className="left">
            <p>Subtotal:</p>
            <p>Paid:</p>
            <p>Total:</p>
          </div>
          <div className="right">
            <p>{details.total} Taka</p>
            <p>00 Taka</p>
            <p>{details?.total} Taka</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="invoice-payable">
        <h2>Total: {details?.total}</h2>
      </div>
    </div>
  );
}; 

export default InvoiceTotal;
