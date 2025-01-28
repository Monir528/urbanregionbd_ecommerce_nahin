import { FaArrowAltCircleRight } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";

const Notice = () => {
    return (
        <div className="container">
        <div className="mt-8 mb-2 text-sm lg:text-base py-2 px-4 bg-[#E0F7FA]">
          {" "}
          <span className="font-bold">
            Event T-shirt <IoMdArrowDropright className="inline" />{" "}
          </span>{" "}
          T-shirt/Clothing with your brand logo or design? We are delivering
          worldwide at unbeatable prices.{" "}
          <span className="font-bold">
            Click here <FaArrowAltCircleRight className="inline" />
          </span>{" "}
        </div>
      </div>
    );
};

export default Notice;