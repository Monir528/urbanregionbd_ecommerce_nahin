import "./DetailsSkeleton.scss";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const DetailsSkeleton = () => {
  return (
    <div className="DetailsSkeleton">
      <div className="container">
        <div className="imageSection">
          <div className="sideImage">
            <Skeleton width="80%" height={100}></Skeleton>
            <Skeleton width="80%" height={100}></Skeleton>
          </div>
          <div className="mainImage">
          <Skeleton width="100%" height="100%"></Skeleton>
          </div>
        </div>
        <div className="textSection">
            <Skeleton height={50}></Skeleton>
            <Skeleton height={30}></Skeleton>
            <Skeleton height={40}></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
        </div>
      </div>
    </div>
  );
};

export default DetailsSkeleton;
