"use client"
import { NAV_LINKS } from '@/constants/constant.index';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



const Navbar = () => {
  const [selectedValue, setSelectedValue] = useState("Vietnamese");
    const pathname = usePathname();
    
  return (
    <nav className="flexEvenly bg-white w-full fixed top-0 right-0 left-0  padding-container  z-30 py-5">
      <Link href="/">
        <Image src="/Logo.png" alt="logo" width={140} height={59} />
      </Link>
      <ul className="hidden h-full gap-12 lg:flex lg:items-end">
        {NAV_LINKS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");      
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
                      <span className="text-center">{item.label}</span>
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
                      <span className="text-center">{item.label}</span>
                    </div>
                  </Link>
                )}
              </li>
            );
        })}
      </ul>
      <div className="hidden lg:flexCenter flex gap-2 relative">
        <Button
          type="button"
          title="Login"
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
    </nav>
  );
};

export default Navbar;
