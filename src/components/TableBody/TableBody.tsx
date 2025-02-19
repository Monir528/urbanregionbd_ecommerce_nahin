/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { MdDeleteForever } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import {useDeleteProductMutation} from "@/components/api/productApi";

const TableBody = ({ data }) => {
  const { description: productDetails, images, _id } = data || {};
  let { category, brand, stock, price, discount, productName, subcategory, extra } = productDetails;


  const router = useRouter();
  const {editProduct}=useDeleteProductMutation()

  if (productName?.length > 25) {
    productName = productName.substring(0, 21) + "...";
  }

  const editGarbage=async(id)=>{
    console.log(id)
    fetch(`${process.env.VITE_ROOT_API}/garbageTrash`,{
      method: "PUT",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id, images}),
    })
  }

  const deleteGarbage=async(id)=>{
    fetch(`${process.env.VITE_ROOT_API}/garbage/${id}`,{
      method: "DELETE",
    })
  }

  const handleDelete = async(id) => {
    let res= await Promise.all([editGarbage(id), deleteGarbage(id)])

    alert("Product Deleted Successfully.")
    window.location.reload();
  };

  const handleEdit = (id) => {
    router.push(`/dashboard/edit/${id}`);
  };

  return (
    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="ps-3">
          <div className="text-sm font-semibold">{productName}</div>
          <div className="font-normal text-gray-500">{brand}</div>
        </div>
      </th>
      <td className="px-6 py-4">{category}</td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>{" "}
          {subcategory}
        </div>
      </td>
      <td className="px-6 py-4">{price}</td>
      <td className="px-6 py-4">{discount}</td>
      <td className="px-6 py-4">
        <img
          className="max-w-20"
          src={`${process.env.VITE_ROOT_API}/Images/${images[0]?.filename}`}
          alt=""
        />
      </td>
      
      <td className="px-6 py-4">{stock ? "Available" :"stock out" }</td>
      <td className="px-6 py-4">{extra}</td>
      <td className=" px-6 py-4 ">
        <div className="flex gap-1 items-center">
          <MdDeleteForever
            className="text-[20px] text-red-500 cursor-pointer"
            onClick={() => handleDelete(data._id)}
          />
          <RiFileEditFill
            onClick={() => handleEdit(data._id)}
            className="text-[16px] text-indigo-500 cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default TableBody;
