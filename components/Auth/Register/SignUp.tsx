"use client";
import Link from "next/link";
import React from "react";
import GoogleSigninButton from "../GoogleSigninButton";
import SignUpForm from "../SignUpForm";

export default function SignUp() {
  return (
    <>
      {/* <GoogleSigninButton text="Sign in" /> */}

      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke "></span>
        <div className="block w-full min-w-fit bg-white px-3 text-center font-medium ">
           sign up with email
        </div>
        <span className="block h-px w-full bg-stroke"></span>
      </div>

      <div>
        <SignUpForm />
      </div>

      <div className="mt-6 text-center">
        <p>
          Already have an account{" "}
          <Link href="/signin" className="text-primary">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
