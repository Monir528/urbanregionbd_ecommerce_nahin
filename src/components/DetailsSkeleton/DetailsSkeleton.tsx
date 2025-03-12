import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DetailsSkeleton = () => {
    return (
        <div className="max-w-[1330px] mx-auto">
            <div className="flex flex-wrap gap-4 px-10 py-4 md:px-5 sm:px-2 md:flex-col">
                {/* Image Section */}
                <div className="flex flex-wrap gap-4 w-full flex-1 sm:gap-0">
                    <div className="flex flex-col gap-4 w-full flex-[2]">
                        <Skeleton width="80%" height={100} />
                        <Skeleton width="80%" height={100} />
                    </div>
                    <div className="flex-[8] w-full h-[500px] sm:h-[300px]">
                        <Skeleton width="100%" height="100%" />
                    </div>
                </div>

                {/* Text Section */}
                <div className="w-full mt-12 flex-1 flex flex-col gap-4">
                    <Skeleton height={50} />
                    <Skeleton height={30} />
                    <Skeleton height={40} />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            </div>
        </div>
    );
};

export default DetailsSkeleton;
