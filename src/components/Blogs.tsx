import Heading from "@/components/Shared/Heading";
import Image from "next/image";

const BlogData = [
  {
    title: "Our Proud Customer.",
    subtitle: "",
    published: "Jan 20, 2024 by Dilshad",
    image: "/assets/blogs/blog1.jpg",
    aosDelay: "0",
  },
  {
    title: "Thanks for supporting us",
    subtitle: "",
    published: "Jan 20, 2024 by Satya",
    image: "/assets/blogs/blog2.jpg",
    aosDelay: "200",
  },
  {
    title: "Try to be alwys good.",
    subtitle: "",
    published: "Jan 20, 2024 by Sabir",
    image: "/assets/blogs/blog3.jpg",
    aosDelay: "400",
  },
];

const Blogs = () => {
  return (
    <div className="my-32">
      <div className="container mx-auto text-black">
        {/* Header section */}
        <Heading title="Facebook Reviews" subtitle={"Visit out facebook page"} />

        {/* Blog section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-8 sm:gap-4 md:gap-7">
          {/* Blog card */}
          {BlogData.map((data) => (
            <div
              data-aos="fade-up"
              data-aos-delay={data.aosDelay}
              key={data.title}
            >
              {/* image section */}
              <div className="overflow-hidden rounded-2xl mb-2">
                <Image
                  src={data.image}
                  alt=""
                  width={380}
                  height={214}
                  className="w-full h-[220px] object-cover rounded-2xl  hover:scale-105 duration-500"
                />
              </div>
              {/* content section */}
              <div className="space-y-2">
                <p className="text-xs text-gray-500">{data.published}</p>
                <p className="font-bold line-clamp-1">{data.title}</p>
                <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                  {data.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
