import ProductCarousel from "@/components/ProductCarousel/ProductCarousel";
import { CategoryPageTypeDef } from "@/types/type";

const CategoryPage = ({category, data} : CategoryPageTypeDef) => {

    console.log('category', category);
    console.log('category data', data);
    return (
        <div className="container mx-auto">
            <ProductCarousel category={category} data={data}></ProductCarousel>
        </div>
    );
};

export default CategoryPage;