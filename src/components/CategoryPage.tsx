/* eslint-disable react/prop-types */
import ProductCarousel from "@/components/ProductCarousel/ProductCarousel";
const CategoryPage = ({category, data}) => {

    console.log('category', category);
    console.log('category data', data);
    return (
        <div className="container mx-auto">
            <ProductCarousel category={category} data={data}></ProductCarousel>
        </div>
    );
};

export default CategoryPage;