// components/CategoryForm.tsx
import { useState, useRef, useCallback } from "react";
import {
    useGetCategoryQuery,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} from "@/components/api/categoryApi";
import Modal from "@/components/CategoryForm/update_modal";
import {Category} from "@/types/cateogry";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion } from "framer-motion";
import Image from "next/image";

interface CategoryItemProps {
    category: Category;
    index: number;
    moveCategory: (dragIndex: number, hoverIndex: number) => void;
    onEdit: (category: Category) => void;
    onDelete: (id: string) => void;
}

const CategoryItem = ({ category, index, moveCategory, onEdit, onDelete }: CategoryItemProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [{ isDragging }, drag] = useDrag({
        type: "category",
        item: { id: category._id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    interface DragItem {
        index: number;
        id: string;
    }

    const [, drop] = useDrop({
        accept: "category",
        hover(item: DragItem) {
            if (item.index !== index) {
                moveCategory(item.index, index);
                item.index = index;
            }
        },
    });

    drag(drop(ref));

    return (
        <motion.div
            ref={ref}
            className={`border p-4 rounded-lg transition-all duration-200 ${
                isDragging ? "opacity-50" : ""
            }`}
            layout
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 relative">
                        <Image
                            src={category.image ? `${process.env.NEXT_PUBLIC_ROOT_API}/Images/${category.image}` : '/placeholder.png'}
                            alt={category.category}
                            width={48}
                            height={48}
                            className="object-cover rounded-lg h-full w-full"
                            onError={(e) => {
                                const img = e.target as HTMLImageElement;
                                img.src = '/placeholder.png';
                            }}
                        />
                    </div>
                    <h3 className="text-lg font-medium">{category.category}</h3>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onEdit(category)}
                        className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600"
                        title="Edit"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete(category._id)}
                        className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                        title="Delete"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

interface CategoryFormProps {
    searchTerm: string;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ searchTerm }) => {
    const [file, setFile] = useState<File | null>(null);
    const [categoryName, setCategoryName] = useState("");
    const [editingCategory, setEditingCategory] = useState<Category>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isFormLoading, setIsFormLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const validateForm = () => {
        if (!file) {
            setError("Please select an image");
            return false;
        }
        if (!categoryName.trim()) {
            setError("Category name is required");
            return false;
        }
        if (categoryName.length < 3) {
            setError("Category name must be at least 3 characters");
            return false;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setError("Image size must be less than 5MB");
            return false;
        }
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            setError("Please upload a JPEG, PNG, or WebP image");
            return false;
        }
        setError(null);
        return true;
    };

    const { data: originalCategories, isLoading } = useGetCategoryQuery(undefined);
    const [addCategory] = useAddCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();

    const handleAddOrUpdate = async () => {
        if (!validateForm()) return;

        setIsFormLoading(true);
        setError(null);
        setSuccess(null);

        const formData = new FormData();
        if (file) formData.append("file", file);
        formData.append("category", categoryName.toLowerCase());

        try {
            if (editingCategory) {
                await updateCategory({ id: editingCategory._id, data: formData }).unwrap();
                setSuccess("Category updated successfully");
            } else {
                await addCategory(formData).unwrap();
                setSuccess("Category added successfully");
            }
            resetForm();
        } catch (error) {
            console.error("Error saving category:", error);
            setError("Failed to save category. Please try again.");
        } finally {
            setIsFormLoading(false);
        }
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setCategoryName(category.category);
        setFile(null);
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

    const moveCategory = useCallback((dragIndex: number, hoverIndex: number) => {
        const draggedCategory = categories[dragIndex];
        const newCategories = [...categories];
        newCategories.splice(dragIndex, 1);
        newCategories.splice(hoverIndex, 0, draggedCategory);
        setCategories(newCategories);
    }, [categories]);

    const resetForm = () => {
        setFile(null);
        setCategoryName("");
        setEditingCategory(undefined);
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            {/* Add/Edit Form */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category Image
                        </label>
                        <div className="space-y-2">
                            <div className="text-sm text-gray-500">
                                Supported formats: JPEG, PNG, WebP (Max 5MB)
                            </div>
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {file && (
                                <div className="mt-2">
                                    <Image
                                        src={URL.createObjectURL(file)}
                                        alt="Preview"
                                        width={128}
                                        height={128}
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category Name
                        </label>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Enter category name"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                    </div>
                </div>
                {error && (
                    <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
                        {success}
                    </div>
                )}
                <div className="mt-4">
                    <button
                        onClick={handleAddOrUpdate}
                        disabled={isFormLoading}
                        className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ${
                            isFormLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        }`}
                    >
                        {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <span>{editingCategory ? "Update Category" : "Add Category"}</span>
                        )}
                    </button>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Categories</h2>
                {isLoading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <DndProvider backend={HTML5Backend}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {originalCategories?.filter((category: Category) => 
                                category.category.toLowerCase().includes(searchTerm.toLowerCase())
                            ).map((category: Category, index: number) => (
                                <CategoryItem
                                    key={category._id}
                                    category={category}
                                    index={index}
                                    moveCategory={moveCategory}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    </DndProvider>
                )}
            </div>

            {/* Edit Modal */}
            <Modal isOpen={isModalOpen} onClose={resetForm}>
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category Image
                            </label>
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category Name
                            </label>
                            <input
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                placeholder="Enter category name"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                        <button
                            onClick={handleAddOrUpdate}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Update Category
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CategoryForm;
