import ProductCard from "./ProductCard";
import {Product} from "@/types/product";

interface ProductProps {
    data?: Product[];
}

const Products = ({ data }:ProductProps) => {
  return (
    <div>
      <div className="container mt-8 mx-auto">
        <div className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-5 place-items-center">
            {(data?.length ?? 0) > 0 &&
              data
                ?.filter((item) =>
                  item?.description?.subcategory?.includes("flash deals")
                )
                .map((item, index) => (
                  <ProductCard key={item._id} data={item} index={index} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
