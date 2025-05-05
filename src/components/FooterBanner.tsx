// import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'

// export default function FooterBanner() {
//   return (
//     <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
//           <div className="max-w-xl lg:max-w-lg">
//             <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Subscribe to our newsletter.</h2>
//             <p className="mt-4 text-lg leading-8 text-gray-300">
//               To Get Big Discount Subscribe us and Follow our facebook page.
//             </p>
//             <div className="mt-6 flex max-w-md gap-x-4">
//               <label htmlFor="email-address" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
//                 placeholder="Enter your email"
//               />
//               <button
//                 type="submit"
//                 className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
//               >
//                 Subscribe
//               </button>
//             </div>
//           </div>
//           <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
//             <div className="flex flex-col items-start">
//               <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
//                 <CalendarDaysIcon className="h-6 w-6 text-white" aria-hidden="true" />
//               </div>
//               <dt className="mt-4 font-semibold text-white">Our Shop Address</dt>
//               <dd className="mt-2 leading-7 text-gray-400">
//                 Mirpur-10, Block: A, Lane: 8, House no: 18
//                 <p>Mirpur Benarashi Palli</p>
//                 <p>Dhaka - 1216</p>
//               </dd>
//             </div>
//             <div className="flex flex-col items-start">
//               <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
//                 <HandRaisedIcon className="h-6 w-6 text-white" aria-hidden="true" />
//               </div>
//               <dt className="mt-4 font-semibold text-white">Contact Us</dt>
//               <dd className="mt-2 leading-7 text-gray-400">
//                 আমাদের সাথে বিসনেস বা যে কোনো প্রয়োজনে সরাসরি যোগাযোগ করুন <span className='font-bold text-white'>+8801648141727</span> এই নম্বরে
//               </dd>
//             </div>
//           </dl>
//           <p className="mt-4 text-base leading-8 text-white font-semibold">
//               This Web Application Created and Maintained By <span className='text-orange-300 font-bold text-2xl mx-3'>PIPRA SOFT</span>
//             </p>
//         </div>
//       </div>
//       <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
//         <div
//           className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
//           style={{
//             clipPath:
//               'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//           }}
//         />
//       </div>
//     </div>
//   )
// }

import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaSquareInstagram } from "react-icons/fa6";
import Link from "next/link";
import { IoLockClosedSharp } from "react-icons/io5";
import Partners from "@/components/Partners"
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { FaTruck } from "react-icons/fa6";
import Image from "next/image";


const FooterBanner = () => {
  return (
    <div>
      <div className="bg-[#F3F3F3] py-8 text-black">
      <div className="flex flex-col items-center container mx-auto lg:flex-row lg:justify-between lg:items-start gap-4">


        <div className="flex flex-col items-center flex-1">
          <IoLockClosedSharp className="text-3xl"></IoLockClosedSharp>
          <p className="font-semibold text-xl mb-4">All secure payment methods</p>
          <Image width={1191} height={213} src="/sslcommerz.png" alt="" />
        </div>

        <div className="flex flex-col items-center flex-1">
        <HiOutlineEmojiHappy  className="text-3xl"/>
          <p className="text-xl font-semibold  mb-4">Satisfaction guaranteed</p>
          <p>Made with premium quality material</p>
          <p className="text-sm font-bold">Cozy yet lasts the test of time</p>
        </div>

        <div className="flex flex-col items-center flex-1">
          <FaTruck className="text-3xl"></FaTruck>
          <p className="text-xl font-semibold  mb-4">Worldwide delivery</p>
          <Image width={1214} height={80} src="/delivery.png" alt="" />
        </div>


      </div>
      </div>
      

      {/* // middle section  */}
      <Partners></Partners>

      <div className="bg-[#58595B]">
        <div className="container mx-auto py-16 px-8 flex justify-between gap-4 flex-wrap text-gray-200">
          <div className="">
            <p className="text-orange-400 text-xl tracking-wider font-bold mb-6">
              URBAN REGION
            </p>
            <div className="flex flex-col gap-[6px]">
              <p>ABOUT US</p>
              <p>TERMS &amp; CONDITION</p>
              <p>PRIVACY POLICY</p>
              <p>CANCELLATION &amp; RETURN POLICY</p>
              <p>FAQs</p>
            </div>
          </div>
          <div className="">
            <p className="400 mb-6 text-xl tracking-wider font-bold">MAN</p>
            <div className="flex flex-col gap-[6px]">
              <Link
                className="hover:text-orange-300 text-sm duration-100 hover:ml-1"
                href="/category/cargo pants"
              >
                CARGO PANTS
              </Link>
              <Link
                className="hover:text-orange-300 text-sm duration-100 hover:ml-1"
                href="/category/trouser"
              >
                TROUSER
              </Link>
              <Link
                className="hover:text-orange-300 text-sm duration-100 hover:ml-1"
                href="/category/jersey"
              >
                JERSEY
              </Link>
              <Link
                className="hover:text-orange-300 text-sm duration-100 hover:ml-1"
                href="/category/drop shoulder"
              >
                DROP SHOULDER
              </Link>
              <Link
                className="hover:text-orange-300 text-sm duration-100 hover:ml-1"
                href="/category/t-shirt"
              >
                T-SHIRT
              </Link>
              <Link
                className="hover:text-orange-300 text-sm duration-100 hover:ml-1"
                href="/category/hoodie "
              >
                HOODIE
              </Link>
            </div>
          </div>
          <div className="">
            <p className="400 mb-6 text-xl tracking-wider font-bold">WOMEN</p>
            <div className="flex flex-col gap-[6px]">
              <Link
                className="hover:text-orange-300 text-sm duration-100 hover:ml-1"
                href="/category/trouser"
              >
                TROUSER
              </Link>
              <Link
                className="hover:text-orange-300 text-sm duration-100 hover:ml-1"
                href="/category/drop shoulder"
              >
                DROP SHOULDER
              </Link>
              <Link
                className="hover:text-orange-300 text-sm duration-100 hover:ml-1"
                href="/category/hoodie"
              >
                HOODIE
              </Link>
              <Link
                className="hover:text-orange-300 text-sm duration-100 hover:ml-1"
                href="/category/t-shirt"
              >
                T-SHIRT
              </Link>
            </div>
          </div>

          <div className="">
            <p className="400 mb-6 text-xl tracking-wider font-bold">FIND US</p>
            <div className="flex flex-col gap-[6px] text-sm">
              <p className="font-bold">Shop Address</p>
              <p>Mirpur Benarashi Palli</p>
              <p>Block: A, Lane: 8, House no: 18</p>
              {/* // social icon  */}

              <p className="flex gap-4 text-2xl mt-4">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.facebook.com/urbanregionbd/"
                >
                  <FaFacebookSquare></FaFacebookSquare>
                </a>

                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.youtube.com/@urbanregionbd"
                >
                  <IoLogoYoutube></IoLogoYoutube>
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.instagram.com/urbanregionbd/"
                >
                  <FaSquareInstagram></FaSquareInstagram>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8 bg-gray-200 text-black">
        <div className="container text-sm  max-w-[85%] text-center">
          <p>
            URBAN REGION prints a huge variety of custom clothing like T-shirts,
            hoodies and more. Your order is handled daily with a lot of ❤️️ from
            BANGLADESH and delivered worldwide!
          </p>
          <br />
          <p>Copyright © 2020 URBAN REGION BD. All Right Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;
