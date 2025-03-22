import { useDeleteSubCategoryMutation } from "@/components/api/subCategoryApi";

interface SubCategoryProps {
    item: SubCategory
}

interface SubCategory {
    _id: string;
    name: string;
}

const SubCategory = ({item}: SubCategoryProps) => {
    const [deleteSubCategory
        // , {
        // isLoading, isSuccess}
    ]=useDeleteSubCategoryMutation()

    const handleDelete=()=>{
        console.log(item?._id);
        deleteSubCategory(item?._id)
    }

    return (
        <p className="m-2 border-indigo-500 bg-indigo-200 border rounded-md px-4 py-2">{item?.name} <span className="cursor-pointer text-red-600 font-bold ml-2" onClick={handleDelete}>x</span></p>
    );
};

export default SubCategory;