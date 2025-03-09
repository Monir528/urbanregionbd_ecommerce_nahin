import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductListSkeleton = () => {
    const count = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div className="w-full">
            <div className="p-8 max-w-[1330px] mx-auto sm:py-[10px] sm:px-[10px] md:py-[10px] md:px-[20px] md:flex md:flex-col md:w-full">
                <div className="flex gap-4 flex-row flex-wrap">
                    {count.map((item, index) => (
                        <div
                            key={index}
                            className="basis-[180px] grow max-w-[200px] sm:basis-[140px]"
                        >
                            <Skeleton height={150} />
                            <Skeleton height={10} />
                            <Skeleton />
                            <Skeleton height={10} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductListSkeleton;
