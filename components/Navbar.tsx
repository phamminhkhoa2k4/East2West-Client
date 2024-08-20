"use client"
import { NAV_LINKS } from '@/constants/constant.index';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Search from './homestay/Search';
import SearchTour from "./tour/Search";
import SearchCar from './car/SearchCar';



const Navbar = () => {
  const [selectedValue, setSelectedValue] = useState("Vietnamese");
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
    const pathname = usePathname();
      
    
  return (
    <>
      {!pathname.startsWith("/homestays/host") && (
        <nav
          className={`flex flex-col  shadow-md bg-white w-full fixed top-0 right-0 left-0  padding-container z-30 transition-all duration-1000 ease-in-out    ${
            isScroll ? "" : "py-5 gap-y-5"
          } `}
        >
          <div className="flexEvenly">
            <Link href="/">
              <Image
                src="/Logo.png"
                alt="logo"
                width={140}
                height={59}
                className={`transition-all duration-1000 ease-in-out   
            ${isScroll ? "scale-[0.7]" : ""} `}
              />
            </Link>
            <ul className="hidden h-full gap-12 lg:flex lg:items-end">
              {NAV_LINKS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                return (
                  <li
                    key={item.label}
                    className="regular-16 text-gray-50 flexCenter "
                  >
                    {" "}
                    {isActive ? (
                      <Link href={item.href}>
                        <div className="flex flex-col gap-4">
                          <Image
                            className="h-[50px]"
                            src={item.icon_active}
                            width={60}
                            height={60}
                            alt={item.key}
                          />
                          <span
                            className={` ${
                              isScroll ? "hidden" : ""
                            } transition-all duration-1000 ease-in-out text-center`}
                          >
                            {item.label}
                          </span>
                        </div>
                      </Link>
                    ) : (
                      <Link href={item.href}>
                        <div className="flex flex-col gap-4">
                          <Image
                            className="h-[50px]"
                            src={item.icon}
                            width={60}
                            height={60}
                            alt={item.key}
                          />
                          <span
                            className={`${
                              isScroll ? "hidden" : ""
                            } transition-all duration-500 ease-in-out text-center`}
                          >
                            {item.label}
                          </span>
                        </div>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="hidden lg:flexCenter lg:flex lg:flex-row-reverse gap-2 relative">
              <Button
                title="Sign In"
                icon="/user.svg"
                variant="btn_dark_green"
              />
              <div className="absolute -right-20">
                <Select value={selectedValue} onValueChange={setSelectedValue}>
                  <SelectTrigger className="w-[50px] p-3 ">
                    <SelectValue>
                      <div className="flex gap-2 items-center">
                        {selectedValue === "Vietnamese" && (
                          <Image
                            src="/flag/vietnam.png"
                            alt="vietnamese"
                            height={100}
                            width={100}
                          />
                        )}
                        {selectedValue === "English" && (
                          <Image
                            src="/flag/united-kingdom.png"
                            alt="english"
                            height={100}
                            width={100}
                          />
                        )}
                        <span>{selectedValue}</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Languages</SelectLabel>
                      <SelectItem value="Vietnamese">
                        <div className="flex gap-2 items-center">
                          <Image
                            src="/flag/vietnam.png"
                            alt="vietnamese"
                            height={24}
                            width={24}
                          />
                          <span>Vietnamese</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="English">
                        <div className="flex gap-2 items-center">
                          <Image
                            src="/flag/united-kingdom.png"
                            alt="english"
                            height={24}
                            width={24}
                          />
                          <span>English</span>
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Image
              src="/menu.svg"
              width={32}
              height={32}
              alt="menu"
              className="inline-block cursor-pointer lg:hidden "
              suppressHydrationWarning={true}
            />
          </div>
          {pathname === "/homestays" && (
            <div className="flex justify-center">
              <Search isScroll={isScroll} />
            </div>
          )}
          {pathname === "/tours" && (
            <div className="flex justify-center">
              <SearchTour isScroll={isScroll} />
            </div>
          )}
          {pathname === "/cars" && (
            <div className="flex justify-center">
              <SearchCar isScroll={isScroll} />
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Navbar;
