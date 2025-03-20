// components/CategoryForm.tsx
import { useState } from "react";
import {
    useGetCategoryQuery,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} from "@/components/api/categoryApi";
import Modal from "@/components/CategoryForm/update_modal";
import Image from "next/image";

const CategoryForm = () => {
    const [file, setFile] = useState<File | null>(null);
    const [categoryName, setCategoryName] = useState("");
    const [editingCategory, setEditingCategory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: categories, isLoading } = useGetCategoryQuery();
    const [addCategory] = useAddCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();

    const handleAddOrUpdate = async () => {
        const formData = new FormData();
        if (file) formData.append("file", file);
        formData.append("category", categoryName.toLowerCase());

        try {
            if (editingCategory) {
                await updateCategory({ id: editingCategory._id, data: formData }).unwrap();
            } else {
                await addCategory(formData).unwrap();
            }
            resetForm();
        } catch (error) {
            console.error("Error saving category:", error);
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setCategoryName(category.category);
        setFile(null); // Reset file; user can upload a new one
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this category?")) {
            try {
                await deleteCategory(id).unwrap();
            } catch (error) {
                console.error("Error deleting category:", error);
            }
        }
    };

    const resetForm = () => {
        setFile(null);
        setCategoryName("");
        setEditingCategory(null);
        setIsModalOpen(false);
    };

    return (
        <div>
            {/* Add/Edit Form */}
            <div className="mb-6">
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="mb-2"
                />
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Category Name"
                    className="border p-2 mr-2"
                />
                <button
                    onClick={handleAddOrUpdate}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    {editingCategory ? "Update" : "Save"}
                </button>
            </div>

            {/* Grid View */}
            {isLoading ? (
                <p>Loading categories...</p>
            ) : (
                <div className="grid grid-cols-3 gap-4">
                    {categories?.map((cat) => (
                        <div
                            key={cat._id}
                            className="border p-4 relative group"
                        >
                            <Image
                                height={32}
                                width={28}
                                unoptimized
                                src={`${process.env.NEXT_PUBLIC_ROOT_API}/Images/${cat.image}`}
                                alt={cat.category}
                                className="w-full h-32 object-cover"
                            />
                            <p className="text-center mt-2">{cat.category}</p>
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex space-x-2">
                                <button
                                    onClick={() => handleEdit(cat)}
                                    className="bg-yellow-500 text-white p-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(cat._id)}
                                    className="bg-red-500 text-white p-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            <Modal isOpen={isModalOpen} onClose={resetForm}>
                <h2 className="text-xl mb-4">Edit Category</h2>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="mb-2"
                />
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Category Name"
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

export default CategoryForm;