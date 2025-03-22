import { useEffect } from "react";
import Image from "next/image";
import { Product } from "@/types/product";

import { useDeleteGarbageMutation } from "@/components/api/garbageApi";

interface GarbageProductProps {
    data: Product
}

const GarbageProduct = ({data}: GarbageProductProps) => {

    // delete image 
    const [deleteGarbage, {isSuccess}]= useDeleteGarbageMutation()
    const handleDelete=()=>{
        deleteGarbage(data._id)
    }
    
    useEffect(()=>{
        if(isSuccess){
            console.log("deleted");
        }
    },[isSuccess])

    return (
        <div className="relative">
            <Image width={235} height={180} unoptimized src={`${process.env.NEXT_PUBLIC_ROOT_API}/Images/${data.images[0]?.filename}`} alt="" />
            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 p-4 rounded-md font-semibold text-white hover:text-red-500 hover:bg-white" onClick={handleDelete}>Delete Now</button>
        </div>
    );
};

export default GarbageProduct;