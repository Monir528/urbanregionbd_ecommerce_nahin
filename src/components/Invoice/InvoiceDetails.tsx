/* eslint-disable react/prop-types */
import InvoiceItem from "./InvoiceItem";

const InvoiceDetails = ({details}) => {
  return (
    <div className="InvoiceDetails">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Tax</th>
          </tr>
        </thead>
        <tbody>
          {
            details?.orderedItem?.map((item)=><InvoiceItem key={item.id} item={item}></InvoiceItem>)
          }
        </tbody>
      </table>
      {/* <hr /> */}
    </div>
  );
};

export default InvoiceDetails;
