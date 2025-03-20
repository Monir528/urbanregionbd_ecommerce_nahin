'use client';
// import {useGetProductsQuery} from "@/components/api/productApi";
// import TableBody from "@/components/TableBody/TableBody";
import OrderTable from "@/components/OrderTable/OrderTable";

const Overview = () => {

    // const {data, isSuccess, isError, isLoading}=useGetProductsQuery()
    // console.log(data);

    return (
        <main>
            <div className='mainContent'>
                <h2>Order Page:</h2>
                <OrderTable></OrderTable>
                <p className="h-10"></p>
            </div>
        </main>

    );
};

export default Overview;
