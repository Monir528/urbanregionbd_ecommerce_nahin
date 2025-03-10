/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { useDeleteGarbageMutation } from "@/components/api/garbageApi";

const GarbageProduct = ({data}) => {

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
            <img src={`${process.env.NEXT_PUBLIC_ROOT_API}/Images/${data?.filename}`} alt="" />
            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 p-4 rounded-md font-semibold text-white hover:text-red-500 hover:bg-white" onClick={handleDelete}>Delete Now</button>
        </div>
    );
};

export default GarbageProduct;