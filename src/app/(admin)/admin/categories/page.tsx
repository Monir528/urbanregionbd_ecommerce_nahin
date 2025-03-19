// pages/CategoriesPage.tsx
"use client";

import CategoryForm from "@/components/CategoryForm/CategoryForm";
import SubCategoryForm from "@/components/CategoryForm/SubCategoryForm";

const CategoriesPage = () => {
    return (
        <div className="flex h-screen">
            {/* Left Section: Category Management */}
            <div className="w-1/2 p-6 overflow-auto">
                <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
                <CategoryForm />
            </div>

            {/* Right Section: Subcategory Management */}
            <div className="w-1/2 p-6 overflow-auto">
                <h2 className="text-2xl font-bold mb-4">Manage Subcategories</h2>
                <SubCategoryForm />
            </div>
        </div>
    );
};

export default CategoriesPage;