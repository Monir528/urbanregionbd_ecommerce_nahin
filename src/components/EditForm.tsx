import { useEffect, useState } from "react";
import { useGetCategoryQuery } from "@/components/api/categoryApi";
import { useGetSubCategoryQuery } from "@/components/api/subCategoryApi";
import { useRouter, useParams } from "next/navigation";
import { useEditProductMutation } from "@/components/api/productApi";
import TextArea from "@/components/TextArea";
import { Product } from "@/types/product";
import { SubCategory } from "@/types/SubCateogry";
import { Category } from "@/types/cateogry";

interface EditFormProps {
  data: Product;
}

export default function EditForm({ data }: EditFormProps) {
  // Get Category
  const { data: getCatData, isSuccess: getCatSuccess } = useGetCategoryQuery(undefined);
  // Get Subcategory
  const { data: getSubCatData, isSuccess: getSubCatSuccess, isLoading: subCatLoading } = useGetSubCategoryQuery(undefined);

  // Initialize state with fallback to empty strings
  const {
    brand: eBrand,
    category: eCategory,
    description: eDescription,
    discount: eDiscount,
    extra: eExtra,
    extraInfo: eExtraInfo,
    subcategory: eSubcategory,
    otherLink: eOtherLink,
    price: ePrice,
    productName: eProductName,
    review: eReview,
    variants: eVariants,
    videoLink: eVideoLink,
    shortDescription: eShortDescription,
    stock: eStock,
  } = data?.description || {};

  const [productName, setProductName] = useState(eProductName || "");
  const [review, setReview] = useState(eReview || "");
  const [price, setPrice] = useState(ePrice || "");
  const [videoLink, setVideoLink] = useState(eVideoLink || "");
  const [otherLink, setOtherLink] = useState(eOtherLink || "");
  const [category, setCategory] = useState(eCategory || "");
  const [subcategory, setSubcategory] = useState(eSubcategory || []);
  const [shortDescription, setShortDescription] = useState(eShortDescription || "");
  const [description, setDescription] = useState(eDescription || "");
  const [variants] = useState(eVariants || "");
  const [discount, setDiscount] = useState(eDiscount || "");
  const [extra, setExtra] = useState(eExtra || "");
  const [extraInfo, setExtraInfo] = useState(eExtraInfo || "");
  const [brand, setBrand] = useState(eBrand || "");
  const [stock, setStock] = useState(Boolean(eStock));

  const { id } = useParams();
  const navigate = useRouter();

  const details = {
    productName,
    brand,
    review,
    price,
    videoLink,
    otherLink,
    category,
    description,
    variants,
    shortDescription,
    subcategory,
    discount,
    extra,
    extraInfo,
    stock,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSubcategory((prev) => [...prev, value]);
    } else {
      setSubcategory((prev) => prev.filter((item) => item !== value));
    }
  };

  const [editProduct, { isSuccess, isLoading }] = useEditProductMutation();

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editProduct({ productId: id, productObj: { description: details, images: data?.images } });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate.push('/admin/allProducts');
      alert("Edited Successfully");
    }
  }, [isSuccess, navigate]);

  return (
    <form onSubmit={handleUpload} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h2>

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
            onChange={(e) => setReview(String(Math.max(1, Math.min(5, Number(e.target.value)))))}
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

        {/* Category Wrapper */}
        <div className="md:col-span-2">
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
          <div className="flex gap-2 text-sm mt-2">
            <p className="font-medium text-gray-700">Selected Category:</p>
            <p className="text-red-500">{category}</p>
          </div>
        </div>

        {/* Subcategory Wrapper */}
        <div className="md:col-span-2">
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
          <div className="mt-2">
            <p className="font-medium text-sm text-gray-700">Selected Subcategory:</p>
            <p className="text-sm text-red-500">
              [{" "}
              {subcategory?.map((item, index) => (
                <span key={index}>
                  {`${item}${index < subcategory.length - 1 ? ", " : ""}`}
                </span>
              ))}
              ]
            </p>
          </div>
        </div>

        {/* Stock */}
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
            Stock Available
          </label>
          <select
            value={stock.toString()}
            onChange={(e) => setStock(e.target.value === "true")}
            id="stock"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-900"
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
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
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
}