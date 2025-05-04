"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { Bars3Icon, ChevronDownIcon, ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { PiPhoneCallLight } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getTotals } from "@/components/api/cartSlice";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { useNavBarContext } from "@/context/NavBarContext";
import { RootState } from "@/reduxToolKit/store";
import { CartBadge } from "@/components/CartBadge";

// Navigation configuration (unchanged)
const navigation = {
  categories: [
    {
      id: "men",
      name: "Shop",
      featured: [
        {
          name: "Top Rated",
          href: "/",
          imageSrc: "https://i.ibb.co/ZxdDH0w/IMG-2557.png",
          imageAlt: "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "/",
          imageSrc: "https://i.ibb.co/Br31f9K/Whats-App-Image-2024-05-15-at-5-25-28-PM-1.jpg",
          imageAlt:
              "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "unisex",
          name: "Unisex",
          items: [
            { name: "Drop Shoulder", href: "/category/drop shoulder" },
            { name: "Hoodie", href: "/category/hoodie" },
            { name: "T-Shirt", href: "/category/t-shirt" },
            { name: "Trouser", href: "/category/trouser" },
          ],
        },
        {
          id: "male",
          name: "Male",
          items: [
            { name: "Drop Shoulder", href: "/category/drop shoulder" },
            { name: "Cargo Pants", href: "/category/Cargo Pants" },
            { name: "Jersey", href: "/category/jersey" },
            { name: "T-Shirt", href: "/category/t-shirt" },
            { name: "Hoodie", href: "/category/hoodie" },
          ],
        },
        {
          id: "female",
          name: "Female",
          items: [
            { name: "Drop Shoulder", href: "/category/drop shoulder" },
            { name: "Hoodie", href: "/category/hoodie" },
            { name: "T-Shirt", href: "/category/t-shirt" },
          ],
        },
      ],
    },
  ],
  pages: [],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sticky Navbar state (removed SCSS dependency)
  const [stickyClass, setStickyClass] = useState("relative");
  const { productCategory } = useNavBarContext();

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (typeof window !== "undefined") {
      const windowHeight = window.scrollY;
      if (windowHeight > 200) {
        setStickyClass("fixed top-0 left-0 w-full shadow-md z-20");
      } else {
        setStickyClass("relative");
      }
    }
  };

  return (
      <div className="relative">
        <div className="bg-white">
          {/* Mobile menu */}
          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
              <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                    <div className="flex px-4 pb-2 pt-5">
                      <button
                          type="button"
                          className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                          onClick={() => setOpen(false)}
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Mobile Links */}
                    <Tab.Group as="div" className="mt-2">
                      <div className="border-b border-gray-200 opacity-0">
                        <Tab.List className="-mb-px flex space-x-8 px-4">
                          {navigation.categories.map((category) => (
                              <Tab
                                  key={category.name}
                                  className={({ selected }) =>
                                      classNames(
                                          selected
                                              ? "border-indigo-600 text-indigo-600"
                                              : "border-transparent text-gray-900",
                                          "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                                      )
                                  }
                              >
                                {category.name} {productCategory.get}
                              </Tab>
                          ))}
                        </Tab.List>
                      </div>
                      <Tab.Panels as={Fragment}>
                        {navigation.categories.map((category) => (
                            <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                              <div className="grid grid-cols-2 gap-x-4">
                                {category.featured.map((item) => (
                                    <div key={item.name} className="group relative text-sm">
                                      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                        <Image
                                            width={280}
                                            height={280}
                                            unoptimized={true}
                                            src={item.imageSrc}
                                            alt={item.imageAlt}
                                            className="object-cover object-center"
                                        />
                                      </div>
                                      <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                        <span className="absolute inset-0 z-10" aria-hidden="true" />
                                        {item.name}
                                      </a>
                                      <p aria-hidden="true" className="mt-1">
                                        Shop now
                                      </p>
                                    </div>
                                ))}
                              </div>
                              {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                      {section.name}
                                    </p>
                                    <ul
                                        role="list"
                                        aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                        className="mt-6 flex flex-col space-y-6"
                                    >
                                      {section.items.map((item) => (
                                          <li key={item.name} className="flow-root">
                                            <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                              {item.name}
                                            </a>
                                          </li>
                                      ))}
                                    </ul>
                                  </div>
                              ))}
                            </Tab.Panel>
                        ))}
                      </Tab.Panels>
                    </Tab.Group>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <header className="relative bg-white">
            <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
              Get free delivery on orders over 5,000 Taka
            </p>
            {/* Static Navbar with sticky classes applied inline */}
            <div className={stickyClass}>
              <nav aria-label="Top" className="bg-white mx-auto px-4 sm:px-6 lg:px-8 bg-opacity-95">
                <div className="border-b border-gray-200">
                  <div className="flex h-16 items-center">
                    <button
                        type="button"
                        className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                        onClick={() => setOpen(true)}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Logo */}
                    <div className="ml-4 flex lg:ml-0">
                      <Link href="/">
                        <span className="sr-only">Your Company</span>
                        <Image
                            className="h-8 md:h-16 w-auto"
                            width={300}
                            height={80}
                            src="/urbanregionbd.png"
                            priority={true}
                            alt="Urban Region BD Logo"
                        />
                      </Link>
                    </div>

                    {/* Desktop Flyout Menus */}
                    <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                      <div className="flex h-full space-x-8">
                        {navigation.categories.map((category) => (
                            <Popover key={category.name} className="flex">
                              {({ open }) => (
                                  <>
                                    <div className="relative flex">
                                      <Popover.Button
                                          className={classNames(
                                              open
                                                  ? "border-indigo-600 text-indigo-600"
                                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                              "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                                          )}
                                      >
                                          {category.name} <ChevronDownIcon className="size-5 mx-2 group-data-[open]:rotate-180" />
                                      </Popover.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                      <Popover.Panel className="absolute z-50 inset-x-0 top-full text-sm text-gray-500">
                                        <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                                        <div className="relative bg-white">
                                          <div className="mx-auto max-w-7xl px-8">
                                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                              <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                {category.featured.map((item) => (
                                                    <div key={item.name} className="group relative text-base sm:text-sm">
                                                      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                        <Image
                                                            width={280}
                                                            height={280}
                                                            unoptimized={true}
                                                            src={item.imageSrc}
                                                            alt={item.imageAlt}
                                                            className="object-cover object-center"
                                                        />
                                                      </div>
                                                      <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                                        <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                        {item.name}
                                                      </a>
                                                      <p aria-hidden="true" className="mt-1">
                                                        Shop now
                                                      </p>
                                                    </div>
                                                ))}
                                              </div>
                                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                {category.sections.map((section) => (
                                                    <div key={section.name}>
                                                      <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                        {section.name}
                                                      </p>
                                                      <ul
                                                          role="list"
                                                          aria-labelledby={`${section.name}-heading`}
                                                          className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                      >
                                                        {section.items.map((item) => (
                                                            <li key={item.name} className="flex">
                                                              <a href={item.href} className="hover:text-gray-800">
                                                                {item.name}
                                                              </a>
                                                            </li>
                                                        ))}
                                                      </ul>
                                                    </div>
                                                ))}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </Popover.Panel>
                                    </Transition>
                                  </>
                              )}
                            </Popover>
                        ))}
                      </div>
                    </Popover.Group>

                    <div className="ml-auto flex items-center">
                      {/* Contact */}
                      <div className="flex lg:ml-6 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
                        <a target="_blank" rel="noreferrer" href="https://www.instagram.com/urbanregionbd/">
                          <FaInstagramSquare className="text-pink-500 mr-3 text-3xl" />
                        </a>
                        <a target="_blank" rel="noreferrer" href="https://www.facebook.com/urbanregionbd">
                          <FaFacebookSquare className="text-blue-500 text-3xl" />
                        </a>
                        <a href="tel:+8801648141727" className="flex items-center gap-2">
                          <PiPhoneCallLight className="mb-1 text-gray-400 text-3xl ml-3" />
                          <span className="text-gray-400 font-abc hidden md:block">+88 01648141727</span>
                        </a>
                      </div>

                      {/* Cart */}
                      <div className="ml-4 flow-root lg:ml-6" onClick={() => router.push("/shoppingCart")}>
                        <a href="#" className="group -m-2 flex items-center p-2">
                          <ShoppingBagIcon
                              className="h-8 w-8 text-indigo-500 flex-shrink-0 group-hover:text-red-500"
                              aria-hidden="true"
                          />
                          <CartBadge />
                          <span className="text-gray-400 font-semibold">{mounted ? cart?.cartTotalQuantity : 0}</span>
                          <span className="sr-only">items in cart, view bag</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </header>
        </div>
      </div>
  );
};

export default Navbar;
