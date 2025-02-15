import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import Image from "next/image";
const EmptyCart = () => {
    const navigate= useRouter()

    const redirect=()=>{
        navigate.push('/')
    }
    
    return (
        <div className="container mt-8">
            <div className="flex flex-col items-center justify-center">
                
                <p onClick={redirect} className="text-violet-500 underline cursor-pointer">কেনাকাটা করুন।</p>

                <h1 className="text-2xl md:text-4xl mt-4 font-semibold">Your Cart is Empty!</h1>

                <Image width={640} height={480} src={"/assets/empty.gif"} alt="" className="m-12 w-[60%] max-w-[400px]" />
                
                <div onClick={redirect} className="flex cursor-pointer gap-2 mt-4 font-thin text-gray-700 items-center"><FaArrowLeftLong className="font-thin"></FaArrowLeftLong> <span>Back to Home</span></div>
            </div>
        </div>
    );
};

export default EmptyCart;