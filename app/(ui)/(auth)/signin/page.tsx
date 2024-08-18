import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import Login from "@/components/Auth/Login/SignIn";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";

export const metadata: Metadata = {
  title: "Sign In  | East2West",
  description: "This Is Sign In Page Of East2West Tours and Travel",
};

const SignIn: React.FC = () => {
  return (
    <>
      <div className="mx-20">
        <Breadcrumb />
      </div>

      <div className="border shadow-md mx-24 my-10 rounded-[10px] bg-white">
        <div className="flex flex-wrap items-center">
          <div className="w-full xl:w-1/2">
            <div className="w-full p-4 sm:p-12.5 xl:p-15 xl:-mt-8">
              <h1 className="text-3xl text-center font-bold my-10">Sign In</h1>
              <Login />
            </div>
          </div>

          <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
            <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 bg-[#aaa]">
              <Link className="mb-5 flex justify-center " href="/">
                <Image
                  className=""
                  src={"/Logo.png"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
              </Link>
              <p className="mb-3 text-xl text-center font-medium text-dark dark:text-white">
                Sign in to your account
              </p>

              <h1 className="mb-4 text-center text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                Welcome Back!
              </h1>

              <p className="w-full text-center  font-medium text-dark-4 dark:text-dark-6">
                Please sign in to your account by completing the necessary
                fields below
              </p>

              <div className="mt-5">
                <Image
                  src={"/images/grids/grid-02.svg"}
                  alt="Logo"
                  width={405}
                  height={325}
                  className="mx-auto dark:opacity-30"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
