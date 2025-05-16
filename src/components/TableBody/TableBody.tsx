import { MdDeleteForever } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import {Product} from "@/types/product";
import Link from "next/link";
// import {useDeleteProductMutation} from "@/components/api/productApi";

interface TableBodyProps {
    data: Product
}

const TableBody = ({ data }: TableBodyProps) => {
  const { description: productDetails, images,
      _id
  } = data || {};
  let { productName } = productDetails;
  const { category, brand, stock, price, discount, subcategory, extra } = productDetails;


  const router = useRouter();
  // const {editProduct}=useDeleteProductMutation()

  if (productName?.length > 25) {
    productName = productName.substring(0, 21) + "...";
  }

  const editGarbage=async(id: string)=>{
    console.log(id)
    fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/garbageTrash`,{
      method: "PUT",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id, images}),
    })
  }

  const deleteGarbage=async(id:string)=>{
    fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/garbage/${id}`,{
      method: "DELETE",
    })
  }

  const handleDelete = async(
      id: string
  ) => {
    await Promise.all([editGarbage(id), deleteGarbage(id)])

    alert("Product Deleted Successfully.")
    window.location.reload();
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/product-edit/${id}`);
  };

  return (
    <tr className="bg-white text-black hover:bg-white">
      <th
        scope="row"
        className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="ps-3">
          <Link href={`/productDetails/${_id}`} className="text-sm font-semibold text-black">{productName}</Link>
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
        <picture>
            <img
                className="max-w-20"
                src={`${process.env.NEXT_PUBLIC_ROOT_API}/Images/${images[0]?.filename}`}
                alt=""
            />
        </picture>
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
