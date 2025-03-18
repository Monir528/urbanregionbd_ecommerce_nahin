"use client";

import { useEffect, useState } from "react";
import { useAddSubCategoryMutation, useGetSubCategoryQuery } from "@/components/api/subCategoryApi";
import SubCategory from "@/components/SubCategoryItem";
import CategoryForm from "@/components/CategoryForm/CategoryForm";
import Modal from "@/components/Modal/Modal";

const CategoriesPage = () => {
    const [newSubCategory, setNewSubCategory] = useState("");
    const [addSubCategory, { isLoading: subLoading, isSuccess: addSuccess }] = useAddSubCategoryMutation();
    const { data: getSubCatData, isSuccess: getSubCatSuccess } = useGetSubCategoryQuery();

    const handleSubCategory = (e: React.FormEvent) => {
        e.preventDefault();
        addSubCategory({ name: newSubCategory.toLowerCase() });
    };

    useEffect(() => {
        if (addSuccess) {
            setNewSubCategory("");
        }
    }, [addSuccess]);

    return (
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
            {/* {addSuccess && <Modal />} */}
            <h1 className="text-3xl font-semibold">Create Category and SubCategory</h1>
            <CategoryForm />
            <form onSubmit={handleSubCategory} className="flex gap-2 mt-4">
                <input
                    onChange={(e) => setNewSubCategory(e.target.value)}
                    value={newSubCategory}
                    type="text"
                    placeholder="Subcategory Name"
                    name="subCategory"
                    id="subCategory"
                    autoComplete="off"
                    className="block min-w-[200px] rounded-md border py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
                <button type="submit" className="bg-red-500 font-semibold text-white rounded-lg px-4 text-base">
                    Add Subcategory
                </button>
            </form>
            <div className="my-4 text-gray-800 flex flex-wrap font-semibold">
                {subLoading && <p>Loading...</p>}
                {!subLoading && getSubCatData?.length === 0 && <p className="text-base">No Subcategory Added.</p>}
                {getSubCatSuccess && getSubCatData?.length > 0 && getSubCatData.map((item) => (
                    <SubCategory key={item._id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default CategoriesPage;