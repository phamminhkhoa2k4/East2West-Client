import Banner from "@/components/Banner/Banner";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import Loading from "@/components/Loading";
import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "About Us | East2West",
  description: "This Is About Us Page Of East2West Tours and Travel",
};

export default function About() {
  return (
    <Suspense fallback={<Loading />}>
      <>
        <Banner url={"/banner/about_banner.jpeg"} />
        {/* <div className="mx-20">
          <Breadcrumb />
        </div> */}
        <div className="mx-40">
          <div>
            <h1 className="my-5 text-center font-medium text-3xl text-[#757474aa]">
              Our Experts Are Like No Other
            </h1>
            <p className="text-center mb-10 text-lg">
              We built a website with 3 services including booking tours and
              renting cars by the day, and a brokerage platform for posting
              homestays, and a flight and hotel search function.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5 mx-60">
            <div className="h-80 rounded-lg mt-30 overflow-hidden relative">
              <Image
                src={"/person/minh.jpg"}
                alt=""
                height={200}
                width={150}
                className="object-cover h-full w-full"
              />
              <div className="absolute top-54 w-full">
                <p className="text-center text-lg font-medium text-white">
                  Pham Van Minh
                </p>
                <p className="text-center text-lg font-medium text-white">
                  Developer
                </p>
                <p className="text-center text-lg font-medium text-white">
                  Tester
                </p>
              </div>
            </div>
            <div className="h-80 rounded-lg overflow-hidden relative">
              <Image
                src={"/person/khoa.jpg"}
                alt=""
                height={200}
                width={150}
                className="object-cover h-full w-full"
              />
              <div className="absolute top-54 w-full">
                <p className="text-center text-lg font-medium text-white">
                  Pham Minh Khoa
                </p>
                <p className="text-center text-lg font-medium text-white">
                  Developer
                </p>
                <p className="text-center text-lg font-medium text-white">
                  Designer
                </p>
              </div>
            </div>
            <div className="h-80 rounded-lg mt-30 overflow-hidden relative">
              <Image
                src={"/person/tan.jpg"}
                alt=""
                height={200}
                width={150}
                className="object-cover h-full w-full"
              />
              <div className="absolute top-54 w-full">
                <p className="text-center text-lg font-medium text-white">
                  Duong Gia Tan
                </p>
                <p className="text-center text-lg font-medium text-white">
                  Developer
                </p>
                <p className="text-center text-lg font-medium text-white">
                  Tester
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    </Suspense>
  );
}
