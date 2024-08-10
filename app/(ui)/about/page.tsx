import Banner from "@/components/Banner/Banner";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | East2West",
  description: "This Is About Us Page Of East2West Tours and Travel",
};

export default function About(){
    return (
      <>
        <Banner url={"/banner/about_banner.jpeg"} pageName={"About Us"} />
        <div className="mx-40">
          <div>
            <h1 className="my-5 text-center font-medium text-3xl text-[#757474aa]">
              Our Experts Are Like No Other
            </h1>
            <p className="text-center mb-10 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatem nisi vel nostrum dolores enim obcaecati est qui quia
              laudantium at nesciunt velit atque, ut, nobis perspiciatis id hic
              exercitationem minima!
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5 mx-60">
            <div className="h-80 rounded-lg mt-30 overflow-hidden relative">
              <Image
                src={"/boat.png"}
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
                src={"/boat.png"}
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
                src={"/boat.png"}
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
    );
}