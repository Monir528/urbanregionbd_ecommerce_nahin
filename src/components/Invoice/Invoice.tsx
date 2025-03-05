import InvoiceHeader from "./InvoiceHeader";
import InvoiceDetails from "./InvoiceDetails";
import InvoiceTotal from "./InvoiceTotal";
import "./Invoice.scss"
import { useLocation } from "react-router-dom";

const Invoice = () => {
  let {state}=useLocation()
  return (
    <div className="Invoice">
      <div className="container">
       <InvoiceHeader details={state}/>
        <InvoiceDetails details={state}/>
        <InvoiceTotal details={state} /> 
      </div>
    </div>
  );
};

export default Invoice;


