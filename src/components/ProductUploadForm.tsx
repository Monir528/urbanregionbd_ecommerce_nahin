/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddProductMutation } from "@/components/api/productApi";
import { modalOpen } from "@/components/api/cartHandler";
import { useGetCategoryQuery } from "@/components/api/categoryApi";
import {useGetSubCategoryQuery} from "@/components/api/subCategoryApi"
import axios from "axios";
import TextArea from "@/components/TextArea";

export default function ProductUploadForm() {
  // get Category 
  const { data: getCatData, isSuccess: getCatSuccess } = useGetCategoryQuery();

  // get Subcategory 
  const {data: getSubCatData, isSuccess:getSubCatSuccess, isLoading: subCatLoading}= useGetSubCategoryQuery()

  // Add Product
  const [addProduct, { data, isError, isLoading, isSuccess:addSuccess }] =
    useAddProductMutation();

  const selector = useSelector((state) => state.cartHandler);
  
 
  const [productName, setProductName] = useState("");
  const [review, setReview] = useState(5);
  const [price, setPrice] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [otherLink, setOtherLink] = useState("");
  const [category, setCategory] = useState( getCatData?.[0]?.category || "Add Category");
  const [subcategory, setSubcategory] = useState([]);
  const [description, setDescription] = useState("");
  const [variants, setVariants] = useState("");
  const [discount, setDiscount] = useState("");
  const [extra, setExtra] = useState(null);
  const [extraInfo, setExtraInfo] = useState("");
  const [brand, setBrand] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [files, setFile] = useState([]);
  const [message, setMessage] = useState();
  const [error, setError]= useState(true)
  const [stock, setStock]= useState(true)

  const dispatch = useDispatch();

  const handleFile = (e) => {
    setMessage("");
    let file = e.target.files;
    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setFile([...files, file[i]]);
      } else {
        setMessage("only images accepted");
      }
    }
  };

  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let index = 0; index < files?.length; index++) {
      const file = files[index];
      formData.append("files", file);
    }
    formData.append("message", JSON.stringify(details));

    addProduct(formData)
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
    subcategory,
    discount,
    extra,
    extraInfo,
    shortDescription,
    stock
  };

  useEffect(() => {
    if (addSuccess) {
      dispatch(modalOpen());
    }
  }, [addSuccess, dispatch]);

  useEffect(()=>{
    if(files?.length > 0){
      setError(false)
    }
  },[files])

  
  const  handleChange=(e)=> {
    if (e.target.checked) {
       setSubcategory([...subcategory, e.target.value]);
    } else {
       setSubcategory(subcategory.filter((item) => item !== e.target.value));
    }
 }

  return (
    <form onSubmit={handleUpload}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="productName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product Name
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setProductName(e.target.value)}
                  type="text"
                  name="product-name"
                  id="product-name"
                  autoComplete="given-name"
                  className="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="review"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Review
              </label>
              <div className="mt-2">
                <input
                  min="1"
                  max="5"
                  onChange={(e) => setReview(e.target.value)}
                  type="number"
                  name="review"
                  id="review"
                  autoComplete="family-name"
                  className="block  px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="Regular Price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Regular Price
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  type="text"
                  name="price"
                  id="price"
                  autoComplete="family-name"
                  className="block  px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="Regular Price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Discount Price
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setDiscount(e.target.value)}
                  type="text"
                  name="discount"
                  id="discount"
                  autoComplete="family-name"
                  className="block w-full  px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Short Description
              </label>
              {/* // text area  */}

              <TextArea
                description={shortDescription}
                setDescription={setShortDescription}
              ></TextArea>
            </div>
             {/* category section  */}
            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  required
                  id="category"
                  name="category"
                  autoComplete="category"
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {getCatSuccess &&
                    getCatData?.length > 0 &&
                    getCatData.map((item) => (
                      <option key={item._id} value={item.category}>
                        {item.category}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* sub category  */}
            <div className="sm:col-span-3 text-base">
              <label
                htmlFor="subcategory"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Subcategory
              </label>
              {/* // subcategory data  */}
              {
                subCatLoading && "Sorry For Loading"
              }
              {
                !subCatLoading && getSubCatSuccess && getSubCatData?.length >  0 && (
                  <div>
                    {
                      getSubCatData.map(item=><div key={item._id} >
                        <input className="font-thin rounded-full" onChange = {handleChange} value={item.name} type="checkbox"/> <span>{item.name?.toUpperCase()}</span>
                      </div> )
                    }
                  </div>
                )
              }
            </div>

            {/* // for stock */}
            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Stock Available
              </label>
              <div className="mt-2">
                <select
                  required
                  id="stock"
                  name="stock"
                  autoComplete="stock"
                  onChange={(e) => setStock(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value={true}>Available</option>
                  <option value={false}>Not Available</option>
                </select>
              </div>
            </div>
            {/* // stock end  */}

            <div className="col-span-full mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              {/* // text area  */}

              <TextArea
                description={description}
                setDescription={setDescription}
              ></TextArea>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Brand Name
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setBrand(e.target.value)}
                  type="text"
                  name="brand"
                  id="brand"
                  className="block w-full  px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Video Link
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setVideoLink(e.target.value)}
                  type="text"
                  name="video"
                  id="video"
                  className="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="Other Link"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Other links
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setOtherLink(e.target.value)}
                  type="text"
                  name="otherLink"
                  id="otherLink"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        {/* // photo  */}

        <div className="flex justify-center items-center px-3">
          <div className="rounded-lg shadow-xl bg-gray-50 md:w-1/2 w-[360px]">
            <div className="m-4">
              <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">
                {message}
              </span>
              <div className="flex items-center justify-center w-full">
                <label className="flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      Select a photo
                    </p>
                  </div>
                  <input
                    type="file"
                    onChange={handleFile}
                    className="opacity-0"
                    multiple="multiple"
                    name="files[]"
                  />
                </label>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {files.map((file, key) => {
                  return (
                    <div key={key} className="overflow-hidden relative">
                      <i
                        onClick={() => {
                          removeImage(file.name);
                        }}
                        className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer"
                      ></i>
                      <img
                        className="h-20 w-20 rounded-md"
                        src={URL.createObjectURL(file)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {
          error && <p className="text-red-500 font-bold text-2xl">Upload image</p>
        }

        {/* image upload end   */}

        <p>Extra Information</p>
        <div>
          <label htmlFor="Available Size or Color">Color or Size</label>
          <input
            onChange={(e) => setExtraInfo(e.target.value)}
            placeholder="Extra information like Color or Size"
            type="text"
            name="otherLink"
            id="otherLink"
            className="block px-4 mb-4 w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <label htmlFor="Color or Size Properties">Color or Size Properties</label>
          <input
            onChange={(e) => setExtra(e.target.value)}
            placeholder="S, M, L, XL, XXL"
            type="text"
            name="otherLink"
            id="otherLink"
            className="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      {/* <ImageUpload></ImageUpload>  */}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
        disabled={files?.length == 0}
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
