// import brand1 from "../../assets/brand/br-1.png";
// import brand2 from "../../assets/brand/br-2.png";
// import brand3 from "../../assets/brand/br-3.png";
// import brand4 from "../../assets/brand/br-4.png";
// import brand5 from "../../assets/brand/br-5.png";

// const Partners = () => {
//   return (
//     <div
//       data-aos="zoom-out"
//       className="py-8 mt-24 hidden md:block bg-gray-200 dark:bg-white/10"
//     >
//       <div className="container">
//         <div className="grid grid-cols-5 gap-3 place-items-center opacity-50">
//           <img src={brand1} alt="brand" className="w-[80px] dark:invert" />
//           <img src={brand2} alt="brand" className="w-[80px] dark:invert" />
//           <img src={brand3} alt="brand" className="w-[80px] dark:invert" />
//           <img src={brand4} alt="brand" className="w-[80px] dark:invert" />
//           <img src={brand5} alt="brand" className="w-[80px] dark:invert" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Partners;

import { MdForwardToInbox } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const Partners = () => {
  return (
    <div className=" text-gray-200 bg-[#37383F]">
      <div className="flex flex-col items-center lg:flex-row container py-16 lg:py-20 w-full lg:justify-between lg:gap-24 gap-12">
        <div className="lg:flex-1 w-full">
          <p className="flex flex-row items-center text-gray-200 font-bold tracking-wider text-xl">
            <MdForwardToInbox className="m-2 text-orange-400 text-3xl"></MdForwardToInbox>
            <span>GET SPECIAL DISCOUNTS IN YOUR INBOX</span>
          </p>
          <div className="flex w-full">

            <span className="w-full border-white mx-2 border-b-2 m-0 p-0">
              <input
                className="appearance-none text-lg  bg-transparent border-none w-full mt-3 text-white  p-0 leading-tight focus:outline-none"
                type="text"
                placeholder="Enter email to get offers, discount and more."
                aria-label="Full name"
              />
            </span>

            <button className="bg-orange-400 px-4 py-2 hover:bg-orange-300 text-md font-semibold text-white tracking-wide">
              Subscribe
            </button>
          </div>
        </div>

        <div className="lg:flex-1 w-full">
          <p className="flex flex-row items-center">
            {" "}
            <FaPhoneAlt className="m-2 text-xl text-orange-500"></FaPhoneAlt>{" "}
            <span className="text-gray-200 font-bold tracking-wider text-xl">
              FOR ANY HELP YOU MAY CALL US AT
            </span>
          </p>
          <p className="text-gray-400 ml-12 text-md mt-2">+8801648141727</p>
          <p className="text-gray-400 ml-12 text-md">Open 24 Hours a Day, 7 Days a week</p>
        </div>
      </div>
    </div>
  );
};

export default Partners;
