/* eslint-disable react/prop-types */
import ProductCarousel from "@/components/ProductCarousel/ProductCarousel";
const CategoryPage = ({category, data}) => {
    return (
        <div className="container">
            <ProductCarousel category={category} data={data}></ProductCarousel>
        </div>
    );
};

export default CategoryPage;