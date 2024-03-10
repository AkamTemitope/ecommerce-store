"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { AlignRight, X } from "lucide-react";
import { Menu, Transition } from "@headlessui/react";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`
  }));

  return (
    <nav>
      <div className="items-center hidden mx-6 space-x-4 lg:space-x-6 md:flex">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm lg:text-lg font-medium border-b-2 border-transparent transition-all hover:text-black",
              route.active
                ? "text-black font-semibold border-black"
                : "text-neutral-500"
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>

      <div className="absolute z-50 top-3 right-4 md:hidden">
        <Menu as="div" className="relative inline-block text-center">
          <div>
            <Menu.Button className="inline-flex justify-center w-full p-2 text-sm font-medium rounded-md ">
              {({ open }) =>
                open ? <X size={30} /> : <AlignRight size={30} />
              }
            </Menu.Button>
          </div>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 p-3 mt-2 space-y-1 origin-top-right bg-white border border-gray-100 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
              {routes.map((route) => (
                <Menu.Item key={route.href} as="div" className="flex">
                  {({ active }) => (
                    <Link
                      href={route.href}
                      className={`py-2 w-full rounded-md text-neutral-500 hover:font-bold  hover:bg-neutral-100 ${
                        route.active &&
                        "text-black text-lg font-bold bg-neutral-200 hover:bg-neutral-200"
                      } transition-all duration-500`}
                    >
                      {route.label}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
};

export default MainNav;
