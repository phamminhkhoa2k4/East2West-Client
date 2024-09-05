"use client";
import { useHostContext } from "@/store/Hostcontext";
import { getData } from "@/utils/axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { IoHomeOutline } from "react-icons/io5";

type StructureType = {
  structureid: number;
  structurename: string;
};

const Structure = () => {
  const { state, setState } = useHostContext();
  const [structures, setStructures] = useState<StructureType[]>();
  const [structure, setStructure] = useState<number | null>(
    state?.data.structureId ?? null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const getAllStructure = async () => {
      try {
        const data = await getData({ endpoint: "/homestays/host/structure" });
        setStructures(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(true);
      }
    };

    getAllStructure();
  }, []);

  const handleClick = () => {
    setState({
      data: {
        ...state?.data!,
        structureId: structure as number,
      },
    });
    router.push("/homestays/host/type");
  };

  const handleBack = () => {
    router.back();
  };
  return (
    <div>
      <div className="bg-white fixed right-0 left-0 top-0  px-15 pt-5 pb-5 z-999 border-b">
        <div className="flex items-center justify-between">
          <div className="w-20 h-20">
            <Image
              src={"/Logo.png"}
              alt=""
              height={300}
              width={300}
              className="object-center object-cover w-full h-full"
            />
          </div>
          <div>
            <Link href={"/"} className="border px-4 py-2 rounded-full">
              Exit
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-36 mb-30">
        <div className="text-4xl font-semibold w-[630px]">
          Điều nào sau đây mô tả chính xác nhất về chỗ ở của bạn?
        </div>
        <div className={`w-[630px] grid grid-cols-3 gap-5 my-5`}>
          {structures?.map((struct) => (
            <div
              onClick={() => setStructure(struct.structureid)}
              key={struct.structureid}
              className={`flex flex-col p-5  ${
                structure === struct.structureid
                  ? "border-4 border-[#666]"
                  : "border-2"
              } rounded-lg`}
            >
              <IoHomeOutline className="w-8 h-8" />
              <span className="font-semibold">{struct.structurename}</span>
            </div>
          ))}
        </div>
      </div>
      <div className=" bg-white border-t-4 flex fixed left-0 right-0 bottom-0 items-center justify-between">
        <button
          onClick={handleBack}
          className="px-5 py-3 my-5 ml-5 rounded-xl text-lg font-bold text-white bg-slate-300"
        >
          Back
        </button>
        <button
          onClick={handleClick}
          className="px-5 py-3 my-5 mr-5 rounded-xl text-lg font-bold text-white bg-blue-500"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Structure;
