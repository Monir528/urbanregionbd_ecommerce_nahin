/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { AiFillTablet } from "react-icons/ai";
import ProductLayout2 from "@/components/ProductLayout/ProductLayout2";
const SubCategoryPage = ({ subcategory, data }) => {

const filtered_product = data.filter((person) => person?.description?.subcategory?.includes(subcategory?.[0] || subcategory?.[1]  ) )


  return (
    <div className="container mt-16">
      <h2 className="text-xl font-abc font-semibold">You may also like</h2>
      <div className="h-[1px] w-full bg-black mt-2 mb-4"></div>
      {/* // subcategory section  */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md-grid-cols-4 lg:grid-cols-6">
        {/* {
          data.filter(item=>item.description.subcategory == subcategory[0])
          .map((item, index)=><ProductLayout2 key={index}></ProductLayout2>)
        } */}
        {
          filtered_product?.map(item=> <ProductLayout2 data={item} key={item._id}></ProductLayout2>)
        }
      </div>
    </div>
  );
};

export default SubCategoryPage;
