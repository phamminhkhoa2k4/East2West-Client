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
import { RxDashboard } from "react-icons/rx";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsHouses } from "react-icons/bs";
import { MdCardTravel } from "react-icons/md";
import { MdCarRental } from "react-icons/md";
import { MdModeOfTravel } from "react-icons/md";
import useColorMode from "@/hooks/useColorMode";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const [colorMode, setColorMode] = useColorMode();

  useEffect(() => {
    if (typeof setColorMode === "function") {
      setColorMode(colorMode === "dark" ? "normal" : "normal");
    }
  }, []);

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
          className={`flex flex-col shadow-md bg-white w-full fixed z-30 top-0 right-0 left-0 padding-container  transition-all duration-1000 ease-in-out ${
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className=" outline-none flex gap-1 border rounded-full px-4 py-2 items-center justify-between bg-blue-500 ">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-8 text-white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                          />
                        </svg>
                      </div>
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full text-sx font-semibold text-white bg-black flex items-center justify-center">
                          W
                        </div>
                        <span className="flex justify-center items-center absolute left-7.5 top-0 h-4 w-4 rounded-full border-2 border-white bg-red-500 text-[8px] font-semibold text-white">
                          2
                        </span>
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {user.roles[0] === "ROLE_MODERATOR" && (
                        <DropdownMenuItem>
                          <RxDashboard className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </DropdownMenuItem>
                      )}
                      {/* {user.roles[0] === "ROLE_BUSINESS" && ()} */}
                      {/* {user.roles[0] === "ROLE_MODERATOR" && ()} */}

                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <Link href="/">Profile</Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Homestays</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <IoIosNotificationsOutline className="mr-2 h-4 w-4" />
                        <Link href="/">Notification</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MdCardTravel className="mr-2 h-4 w-4" />
                        <Link href="">Trips</Link>
                      </DropdownMenuItem>
                      {user.roles[0] === "ROLE_BUSINESS" ||
                        (user.roles[0] === "ROLE_MODERATOR" && (
                          <DropdownMenuItem>
                            <BsHouses className="mr-2 h-4 w-4" />
                            <Link href="/homestays/multicalendar">
                              Manage Your Homestay
                            </Link>
                          </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Tours Package</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <MdModeOfTravel className="mr-2 h-4 w-4" />
                      <Link href="/">My Tours</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Rental Car</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <MdCarRental className="mr-2 h-4 w-4" />
                      <Link href="/">My Rental</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  title="Sign In"
                  icon="/user.svg"
                  variant="btn_dark_green"
                  url="/signin"
                />
              )}
              {/* <div className="relative">
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
              </div> */}
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
          {(pathname === "/homestays" || pathname === "/homestays/multicalendar" ) && (
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
