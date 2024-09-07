"use client";
import { NAV_LINKS } from "@/constants/constant.index";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
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
import Search from "./homestay/Search";
import SearchTour from "./tour/Search";
import SearchCar from "./car/SearchCar";
import { useUser } from "@/store/UserContext";
interface User {
  userId: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  address?: string;
  phone?: string;
  roles: string[];
}
const Navbar = () => {
  const [selectedValue, setSelectedValue] = useState("Vietnamese");
  const [isScroll, setIsScroll] = useState(false);
  const { user, setUser } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUser(JSON.parse(storedUserInfo));
      }
    }
  }, []);

  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/signout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        localStorage.removeItem("userInfo");
        setUser(null);
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  };

  return (
    <>
      {!pathname.startsWith("/homestays/host") && (
        <nav
          className={`flex flex-col shadow-md bg-white w-full fixed top-0 right-0 left-0 padding-container z-30 transition-all duration-1000 ease-in-out ${
            isScroll ? "" : "py-5 gap-y-5"
          }`}
        >
          <div className="flexEvenly">
            <Link href="/">
              <Image
                src="/Logo.png"
                alt="logo"
                width={140}
                height={59}
                className={`transition-all duration-1000 ease-in-out ${
                  isScroll ? "scale-[0.7]" : ""
                }`}
              />
            </Link>
            <ul className="hidden lg:flex lg:items-center gap-8">
              {NAV_LINKS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                return (
                  <li
                    key={item.label}
                    className="regular-16 text-gray-50 flexCenter"
                  >
                    {isActive ? (
                      <Link href={item.href} passHref>
                        <div className="flex flex-col gap-4">
                          <Image
                            className="h-[50px]"
                            src={item.icon_active}
                            width={60}
                            height={60}
                            alt={item.key}
                          />
                          <span
                            className={`${
                              isScroll ? "hidden" : ""
                            } transition-all duration-1000 ease-in-out text-center`}
                          >
                            {item.label}
                          </span>
                        </div>
                      </Link>
                    ) : (
                      <Link href={item.href} passHref>
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

            <div className="flex items-center gap-4 lg:gap-8">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-lg font-medium">{user.username}</span>
                  <div className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300">
                    <Link href="/mybooking">My Booking</Link>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-800 font-medium transition-colors duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
   
                <Button
                  title="Sign In"
                  icon="/user.svg"
                  variant="btn_dark_green"
                  url="/auth/signin"
                />
     
              )}
              <div className="relative">
                <Select value={selectedValue} onValueChange={setSelectedValue}>
                  <SelectTrigger className="p-3 w-[50px] outline-none">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        <Image
                          src={
                            selectedValue === "Vietnamese"
                              ? "/flag/vietnam.png"
                              : "/flag/united-kingdom.png"
                          }
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
                suppressHydrationWarning={true}
              />
            </div>
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
