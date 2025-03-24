import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAddProductMutation } from "@/components/api/productApi";
import { modalOpen } from "@/components/api/cartHandler";
import { useGetCategoryQuery } from "@/components/api/categoryApi";
import { useGetSubCategoryQuery } from "@/components/api/subCategoryApi";
import dynamic from 'next/dynamic';
const TextArea = dynamic(
    () => import('@/components/TextArea'),
    { ssr: false }
);
import {Category} from "@/types/cateogry";
import {SubCategory} from "@/types/SubCateogry";

export default function ProductUploadForm() {
  // Fetch Categories
  const { data: getCatData, isSuccess: getCatSuccess } = useGetCategoryQuery(undefined);

  // Fetch Subcategories
  const { data: getSubCatData, isSuccess: getSubCatSuccess, isLoading: subCatLoading } = useGetSubCategoryQuery(undefined);

  // Add Product Mutation
  const [addProduct, { isLoading, isSuccess: addSuccess }] = useAddProductMutation();

  const dispatch = useDispatch();

  // Form State with Explicit Types
  const [productName, setProductName] = useState<string>("");
  const [review, setReview] = useState<number>(5);
  const [price, setPrice] = useState<string>("");
  const [videoLink, setVideoLink] = useState<string>("");
  const [otherLink, setOtherLink] = useState<string>("");
  const [category, setCategory] = useState<string>(getCatData?.[0]?.category || "");
  const [subcategory, setSubcategory] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [variants] = useState<string>(""); // Note: Unused in the form; consider adding an input or removing
  const [discount, setDiscount] = useState<string>("");
  const [extra, setExtra] = useState<string>("");
  const [extraInfo, setExtraInfo] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [shortDescription, setShortDescription] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(true);
  const [stock, setStock] = useState<boolean>(true);

  // File Handling with Typed Event
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    const selectedFiles = Array.from(e.target.files || []); // Handle null case
    const validFiles = selectedFiles.filter((file) =>
        ["image/gif", "image/jpeg", "image/png"].includes(file.type)
    );
    if (validFiles.length < selectedFiles.length) {
      setMessage("Only GIF, JPEG, and PNG files are accepted.");
    }
    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    setError(false);
  };

  const removeImage = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    // Removed: if (files.length <= 1) setError(true);
    // useEffect below handles error state
  };

  // Form Submission with Typed Event
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) {
      setError(true);
      return;
    }
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("details", JSON.stringify({
      productName,
      brand,
      review,
      price,
      videoLink,
      otherLink,
      category,
      description,
      variants,
      subcategory,
      discount,
      extra,
      extraInfo,
      shortDescription,
      stock,
    }));
    addProduct(formData);
  };

  // Modal Trigger on Success
  useEffect(() => {
    if (addSuccess) {
      dispatch(modalOpen());
      setFiles([]);
      setError(true);
    }
  }, [addSuccess, dispatch]);

  // Error State for File Upload
  useEffect(() => {
    setError(files.length === 0);
  }, [files]);

  // Subcategory Checkbox Handler with Typed Event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSubcategory((prev) => [...prev, value]);
    } else {
      setSubcategory((prev) => prev.filter((item) => item !== value));
    }
  };

  return (
      <form onSubmit={handleUpload} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload a Product</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Name */}
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                type="text"
                id="productName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-900"
                placeholder="Enter product name"
            />
          </div>

          {/* Review */}
          <div>
            <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
              Review (1-5)
            </label>
            <input
                value={review}
                onChange={(e) => setReview(Math.max(1, Math.min(5, Number(e.target.value))))} // Explicitly convert string to number
                type="number"
                id="review"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-900"
                placeholder="Enter review"
            />
          </div>

          {/* Regular Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Regular Price
            </label>
            <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                id="price"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-900"
                placeholder="Enter price"
            />
          </div>

          {/* Discount Price */}
          <div>
            <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
              Discount Price
            </label>
            <input
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                type="text"
                id="discount"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-900"
                placeholder="Enter discount"
            />
          </div>

          {/* Short Description */}
          <div className="md:col-span-2">
            <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Short Description
            </label>
            <TextArea value={shortDescription} onChange={setShortDescription} />
          </div>

          <div className="grid grid-cols-1 md:grid-rows-2 gap-4">
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  id="category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-900"
              >
                {getCatSuccess && getCatData?.length > 0 && (
                    <option value="">Select a category</option>
                )}
                {getCatSuccess &&
                    getCatData?.map((item: Category) => (
                        <option key={item._id} value={item.category}>
                          {item.category}
                        </option>
                    ))}
              </select>
            </div>
            {/* Stock */}
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1 mt-1">
                Stock Available
              </label>
              <select
                  value={stock.toString()} // Convert boolean to string for select
                  onChange={(e) => setStock(e.target.value === "true")}
                  id="stock"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-900"
              >
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            </div>
          </div>

          {/* Subcategory */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
            {subCatLoading && <p className="text-gray-600">Loading...</p>}
            {!subCatLoading && getSubCatSuccess && getSubCatData?.length > 0 && (
                <div className="space-y-1">
                  {getSubCatData.map((item: SubCategory) => (
                      <div key={item._id} className="flex items-center">
                        <input
                            checked={subcategory.includes(item.name)}
                            onChange={handleChange}
                            value={item.name}
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-gray-700">{item.name.toUpperCase()}</span>
                      </div>
                  ))}
                </div>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <TextArea value={description} onChange={setDescription} />
          </div>

          {/* Brand Name */}
          <div className="md:col-span-2">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
              Brand Name
            </label>
            <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                type="text"
                id="brand"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-900"
                placeholder="Enter brand name"
            />
          </div>

          {/* Video Link */}
          <div className="md:col-span-2">
            <label htmlFor="videoLink" className="block text-sm font-medium text-gray-700 mb-1">
              Video Link
            </label>
            <input
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                type="text"
                id="videoLink"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-900"
                placeholder="Enter video URL"
            />
          </div>

          {/* Other Links */}
          <div className="md:col-span-2">
            <label htmlFor="otherLink" className="block text-sm font-medium text-gray-700 mb-1">
              Other Links
            </label>
            <input
                value={otherLink}
                onChange={(e) => setOtherLink(e.target.value)}
                type="text"
                id="otherLink"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-900"
                placeholder="Enter other URLs"
            />
          </div>

          {/* File Upload Section */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
            <div className="flex items-center justify-center w-full">
              <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <svg
                    className="w-8 h-8 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <p className="text-sm text-gray-600">Drag and drop or click to upload</p>
                <input
                    id="file-upload"
                    type="file"
                    onChange={handleFile}
                    className="hidden"
                    multiple
                />
              </label>
            </div>
            {message && <p className="text-sm text-red-600 mt-2">{message}</p>}
            {files.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {files.map((file, index) => (
                      <div key={index} className="relative">
                        <picture>
                          <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index}`}
                              className="w-full h-24 object-cover rounded-md"
                          />
                        </picture>
                        <button
                            onClick={() => removeImage(file.name)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                  ))}
                </div>
            )}
            {error && <p className="text-sm text-red-600 mt-2">Please upload at least one image</p>}
          </div>

          {/* Extra Information */}
          <div className="md:col-span-2">
            <label className="block text-lg font-medium text-gray-700 mb-2">Extra Information</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="extraInfo" className="block text-sm font-medium text-gray-700 mb-1">
                  Color or Size
                </label>
                <input
                    value={extraInfo}
                    onChange={(e) => setExtraInfo(e.target.value)}
                    type="text"
                    id="extraInfo"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-900"
                    placeholder="e.g., Red, Blue"
                />
              </div>
              <div>
                <label htmlFor="extra" className="block text-sm font-medium text-gray-700 mb-1">
                  Size Properties
                </label>
                <input
                    value={extra}
                    onChange={(e) => setExtra(e.target.value)}
                    type="text"
                    id="extra"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-900"
                    placeholder="e.g., S, M, L"
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
                type="submit"
                disabled={isLoading || error}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
              {isLoading ? "Uploading..." : "Save"}
            </button>
          </div>
        </div>
      </form>
  );
}