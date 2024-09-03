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
      // Gửi yêu cầu POST đến API /signout
      const response = await fetch('http://localhost:8080/api/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Xóa dữ liệu người dùng khỏi localStorage
        localStorage.removeItem('userInfo');
        setUserInfo(null); // Cập nhật state để cập nhật giao diện
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
          className={`flex flex-col shadow-md bg-white w-full fixed top-0 right-0 left-0 padding-container z-30 transition-all duration-1000 ease-in-out ${isScroll ? "" : "py-5 gap-y-5"}`}
        >
          <div className="flexEvenly">
            <Link href="/" passHref>
              <Image
                src="/Logo.png"
                alt="logo"
                width={140}
                height={59}
                className={`transition-all duration-1000 ease-in-out ${isScroll ? "scale-[0.7]" : ""}`}
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
                          <span className={`${isScroll ? "hidden" : ""} transition-all duration-1000 ease-in-out text-center`}>
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
                          <span className={`${isScroll ? "hidden" : ""} transition-all duration-500 ease-in-out text-center`}>
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
              {userInfo ? (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-lg">{userInfo.username}</span>
                  <Link href="/mybooking" passHref>
                    <button className="text-blue-500 hover:underline">
                      My Booking
                    </button>
                  </Link>
                  <button onClick={handleLogout} className="text-blue-500 hover:underline">
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/auth/signin" passHref>
                  <Button
                    title="Sign In"
                    icon="/user.svg"
                    variant="btn_dark_green"
                  />
                </Link>
              )}

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
              className="inline-block cursor-pointer lg:hidden"
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
