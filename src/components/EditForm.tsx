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
  const [otherLinkFile, setOtherLinkFile] = useState<File | null>(null);
  const [otherLinkMessage, setOtherLinkMessage] = useState<string>(""); // Added state for otherLinkMessage
  const [otherLinkPreview, setOtherLinkPreview] = useState<string>(eOtherLink || ""); // Added state for otherLinkPreview
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

  // Other Link File Handling
  const handleOtherLinkFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherLinkMessage("");
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (["image/gif", "image/jpeg", "image/png"].includes(file.type)) {
        setOtherLinkFile(file);
        setOtherLinkPreview(URL.createObjectURL(file));
      } else {
        setOtherLinkMessage("Only GIF, JPEG, and PNG files are accepted.");
      }
    }
  };

  // Remove Other Link Image
  const removeOtherLinkImage = () => {
    setOtherLinkFile(null);
    // If we had a previous otherLink value, keep it as preview
    if (eOtherLink) {
      setOtherLinkPreview(eOtherLink);
    } else {
      setOtherLinkPreview("");
    }
  };

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
    
    // If there's a new file upload for the size guide
    if (otherLinkFile) {
      const formData = new FormData();
      formData.append("otherLinkFile", otherLinkFile);
      formData.append("productId", id as string);

      try {
        // Upload the file first
        const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/updateSizeGuide`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          // Update the otherLink with the new URL from the response
          if (result.fileUrl) {
            details.otherLink = result.fileUrl;
          }
        }
      } catch (error) {
        console.error("Error uploading size guide image:", error);
      }
    }

    // Now proceed with the product update
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

        {/* Other Links - Converted to Image Upload */}
        <div className="md:col-span-2">
          <label htmlFor="otherLink" className="block text-sm font-medium text-gray-700 mb-1">
            Size Guide Image
          </label>
          <div className="flex flex-col items-center justify-center w-full">
            <label
              htmlFor="other-link-upload"
              className={`flex flex-col items-center justify-center w-full h-32 border-2 ${(otherLinkFile || otherLinkPreview) ? 'border-solid border-green-500' : 'border-dashed border-gray-300'} bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors`}
            >
              {!otherLinkFile && !otherLinkPreview ? (
                <>
                  <svg
                    className="w-8 h-8 text-gray-500 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm text-gray-600">Click to upload size guide image</p>
                </>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  <picture>
                    <img
                      src={otherLinkFile ? URL.createObjectURL(otherLinkFile) : `${process.env.NEXT_PUBLIC_ROOT_API}${otherLinkPreview}`}
                      alt="Size guide preview"
                      className="max-h-28 max-w-full object-contain"
                    />
                  </picture>
                  <button
                    onClick={(e) => { e.preventDefault(); removeOtherLinkImage(); }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              )}
              <input
                id="other-link-upload"
                type="file"
                accept="image/*"
                onChange={handleOtherLinkFile}
                className="hidden"
              />
            </label>
          </div>
          {otherLinkMessage && <p className="text-sm text-red-600 mt-2">{otherLinkMessage}</p>}
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
            className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => navigate.push('/admin/allProducts')}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
          >
            {isLoading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </div>
    </form>
  );
}