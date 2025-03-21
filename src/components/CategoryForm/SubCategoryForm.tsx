// components/SubCategoryForm.tsx
import { useState } from "react";
import {
    useGetSubCategoryQuery,
    useAddSubCategoryMutation,
    useDeleteSubCategoryMutation,
    useUpdateSubCategoryMutation,
} from "@/components/api/subCategoryApi";
import Modal from "@/components/CategoryForm/update_modal";
import {SubCategory} from "@/types/SubCateogry";

const SubCategoryForm = () => {
    const [subCategoryName, setSubCategoryName] = useState("");
    const [editingSubCategory, setEditingSubCategory] = useState<SubCategory>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: subCategories, isLoading } = useGetSubCategoryQuery(undefined);
    const [addSubCategory] = useAddSubCategoryMutation();
    const [deleteSubCategory] = useDeleteSubCategoryMutation();
    const [updateSubCategory] = useUpdateSubCategoryMutation();

    const handleAddOrUpdate = async () => {
        const data = { name: subCategoryName.toLowerCase() };
        try {
            if (editingSubCategory) {
                await updateSubCategory({ id: editingSubCategory._id, data }).unwrap();
            } else {
                await addSubCategory(data).unwrap();
            }
            resetForm();
        } catch (error) {
            console.error("Error saving subcategory:", error);
        }
    };

    const handleEdit = (subCat: SubCategory) => {
        setEditingSubCategory(subCat);
        setSubCategoryName(subCat.name);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this subcategory?")) {
            try {
                await deleteSubCategory(id).unwrap();
            } catch (error) {
                console.error("Error deleting subcategory:", error);
            }
        }
    };

    const resetForm = () => {
        setSubCategoryName("");
        setEditingSubCategory(undefined);
        setIsModalOpen(false);
    };

    return (
        <div>
            {/* Add/Edit Form */}
            <div className="mb-6">
                <input
                    type="text"
                    value={subCategoryName}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                    placeholder="Subcategory Name"
                    className="border p-2 mr-2"
                />
                <button
                    onClick={handleAddOrUpdate}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    {editingSubCategory ? "Update" : "Save"}
                </button>
            </div>

            {/* Table View */}
            {isLoading ? (
                <p>Loading subcategories...</p>
            ) : (
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {subCategories?.map((subCat: SubCategory) => (
                        <tr key={subCat._id} className="border">
                            <td className="p-2">{subCat.name}</td>
                            <td className="p-2 flex space-x-2">
                                <button
                                    onClick={() => handleEdit(subCat)}
                                    className="bg-yellow-500 text-white p-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(subCat._id)}
                                    className="bg-red-500 text-white p-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {/* Edit Modal */}
            <Modal isOpen={isModalOpen} onClose={resetForm}>
                <h2 className="text-xl mb-4">Edit Subcategory</h2>
                <input
                    type="text"
                    value={subCategoryName}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                    placeholder="Subcategory Name"
                    className="border p-2 mb-2 w-full"
                />
                <button
                    onClick={handleAddOrUpdate}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Update
                </button>
            </Modal>
        </div>
    );
};

export default SubCategoryForm;