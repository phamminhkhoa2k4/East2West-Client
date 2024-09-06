"use client";
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
  const [userInfo, setUserInfo] = useState<any>(null);

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

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        localStorage.removeItem('userInfo');
        setUserInfo(null);
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred during logout', error);
    }
  };

  return (
    <>
      {!pathname.startsWith("/homestays/host") && (
        <nav
          className={`flex flex-col shadow-md bg-white w-full fixed top-0 right-0 left-0 z-30 transition-all duration-500 ease-in-out ${isScroll ? "py-3 gap-y-2" : "py-5 gap-y-5"}`}
        >
          <div className="container mx-auto flex justify-between items-center px-4">
            <Link href="/">
              <Image
                src="/Logo.png"
                alt="logo"
                width={140}
                height={59}
                className={`transition-transform duration-500 ${isScroll ? "scale-75" : ""}`}
              />
            </Link>
            <ul className="hidden lg:flex lg:items-center gap-8">
              {NAV_LINKS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                return (
                  <li key={item.label} className="flex flex-col items-center">
                    <Link href={item.href}>
                      <div className={`flex flex-col items-center ${isActive ? "text-blue-600" : "text-gray-600"} transition-colors duration-300`}>
                        <Image
                          className="h-12"
                          src={isActive ? item.icon_active : item.icon}
                          width={60}
                          height={60}
                          alt={item.key}
                        />
                        <span className={`${isScroll ? "hidden" : "block"} text-sm mt-2`}>
                          {item.label}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-4 lg:gap-8">
              {userInfo ? (
                <div className="flex items-center gap-4">
                  <span className="text-lg font-medium">{userInfo.username}</span>
                  <Link href="/mybooking">
                    <div className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300">
                      My Booking
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-800 font-medium transition-colors duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/auth/signin">
                  <Button
                    title="Sign In"
                    icon="/user.svg"
                    variant="btn_dark_green"
                  />
                </Link>
              )}
              <div className="relative">
                <Select value={selectedValue} onValueChange={setSelectedValue}>
                  <SelectTrigger className="w-24 p-2 bg-gray-200 rounded-md border border-gray-300">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        <Image
                          src={selectedValue === "Vietnamese" ? "/flag/vietnam.png" : "/flag/united-kingdom.png"}
                          alt={selectedValue}
                          height={24}
                          width={24}
                        />
                        <span>{selectedValue}</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Languages</SelectLabel>
                      <SelectItem value="Vietnamese">
                        <div className="flex items-center gap-2">
                          <Image
                            src="/flag/vietnam.png"
                            alt="Vietnamese"
                            height={24}
                            width={24}
                          />
                          <span>Vietnamese</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="English">
                        <div className="flex items-center gap-2">
                          <Image
                            src="/flag/united-kingdom.png"
                            alt="English"
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
              <Image
                src="/menu.svg"
                width={32}
                height={32}
                alt="menu"
                className="lg:hidden cursor-pointer"
              />
            </div>
          </div>
          {pathname === "/homestays" && (
            <div className="bg-white py-4">
              <Search isScroll={isScroll} />
            </div>
          )}
          {pathname === "/tours" && (
            <div className="bg-white py-4">
              <SearchTour isScroll={isScroll} />
            </div>
          )}
          {pathname === "/cars" && (
            <div className="bg-white py-4">
              <SearchCar isScroll={isScroll} />
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Navbar;
