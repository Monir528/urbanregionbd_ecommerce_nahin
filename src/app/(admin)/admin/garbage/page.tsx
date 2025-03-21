'use client';
import {useGetProductsQuery} from "@/components/api/productApi";
import GarbageProduct from "@/components/GarbageProduct";
import { Product } from "@/types/product";

const Overview = () => {

    const {data, isSuccess, isError, isLoading}=useGetProductsQuery(undefined)
    console.log(data);

    return (
        <main>
            <div className="container">
                {
                    !isLoading && data?.length == 0 && <h3>Garbage is Clear. Thank you.</h3>
                }
                {!isLoading && isSuccess && data?.length > 0 && (
                    <div className="grid lg:grid-cols-3 gap-2 grid-cols-1 md:grid-flow-col-2">
                        {data?.map((item: Product) => (
                            <GarbageProduct data={item} key={item._id} />
                        ))}
                    </div>
                )}
                {isLoading && "Sorry for loading.."}
                {!isLoading && isError && "Error occurred"}
            </div>
        </main>

    );
};

export default Overview;
