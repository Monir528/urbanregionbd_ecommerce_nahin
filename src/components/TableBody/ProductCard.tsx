import { MdDeleteForever } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { Product } from "@/types/product";

interface ProductCardProps {
    data: Product;
}

const ProductCard = ({ data }: ProductCardProps) => {
    const { description, images, _id } = data || {};
    const { productName, category, brand, stock, price, discount, subcategory, extra } = description;

    const router = useRouter();

    const displayName = productName?.length > 25 ? productName.substring(0, 21) + "..." : productName;

    const editGarbage = async (id: string) => {
        console.log(id);
        fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/garbageTrash`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, images }),
        });
    };

    const deleteGarbage = async (id: string) => {
        fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/garbage/${id}`, {
            method: "DELETE",
        });
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        await Promise.all([editGarbage(id), deleteGarbage(id)]);
        alert("Product Deleted Successfully.");
        window.location.reload();
    };

    const handleEdit = (id: string) => {
        router.push(`/admin/product-edit/${id}`);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-800">{displayName}</h3>
                        <p className="text-sm text-gray-500">{brand}</p>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-medium text-indigo-600">
                            {price} {discount && <span className="text-xs line-through text-gray-400">{parseInt(price) + parseInt(discount || '0')}</span>}
                        </span>
                        <span className={`text-xs px-2 py-1 mt-1 rounded-full ${stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {stock ? "Available" : "Out of Stock"}
                        </span>
                    </div>
                </div>
                
                <div className="mt-3 flex items-center">
                    <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-xs text-gray-600">{Array.isArray(subcategory) ? subcategory[0] : subcategory}</span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-xs text-gray-600">{category}</span>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                        {images && images.length > 0 && (
                            <Image
                                src={`${process.env.NEXT_PUBLIC_ROOT_API}/Images/${images[0]?.filename}`}
                                alt={productName}
                                width={64}
                                height={64}
                                objectFit="cover"
                            />
                        )}
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Size: {extra}</p>
                        <div className="flex mt-2 space-x-3">
                            <button 
                                onClick={() => handleDelete(_id)}
                                className="flex items-center text-red-500"
                            >
                                <MdDeleteForever className="text-lg" />
                                <span className="text-xs ml-1">Delete</span>
                            </button>
                            <button 
                                onClick={() => handleEdit(_id)}
                                className="flex items-center text-indigo-500"
                            >
                                <RiFileEditFill className="text-base" />
                                <span className="text-xs ml-1">Edit</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
