import { useGetProductsQuery } from "@/components/api/productApi";
import ProductListSkeleton from "../ProductListSkeleton/ProductListSkeleton";
import CategoryItem from "./CategoryItem";

const NewCategory = () => {
  const { data, isSuccess, isError, isLoading } = useGetProductsQuery();

  return (
    <div className="py-8">
      <div className="container">
      {isLoading && <ProductListSkeleton/>}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 justify-between">

        {/*   {*/}
        {/*  isSuccess && data?.length>0 && data?.map(item=> <CategoryItem key={item._id} item={item}/>)*/}
        {/*} */}
          {isSuccess &&
            data?.length > 0 &&
            data.filter(item=>item?.description?.subcategory?.includes("new arrival"))
            .map((item) => <CategoryItem key={item._id} item={item} />)}

          {isError && "Failed to load"}
        </div>
      </div>
    </div>
  );
};

export default NewCategory;
