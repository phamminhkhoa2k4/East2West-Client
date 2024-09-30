"use client"

import { getData, updateData } from "@/utils/axios";
import { useEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
type StructureType = {
  structureid: number;
  structurename: string;
};

type StructureParams = {
  homestay: Homestay;
  setReload: (value: boolean) => void;
};
const Structure = ({ homestay, setReload }: StructureParams) => {
  const [structures, setStructures] = useState<StructureType[]>([]);
  const [structure, setStructure] = useState<number | null>(
    homestay?.structureId
  );

  useEffect(() => {
    const fetchStructure = async () => {
      try {
        const response = await getData({
          endpoint: "/homestays/host/structure",
        });
        setStructures(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStructure();
  }, []);

  useEffect(() => {
    const updateStructure = async () => {
      try {
        const res = await updateData({
          id: homestay.homestayid!,
          endpoint: "homestays/host",
          payload: { ...homestay, structureId: structure },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setReload(true);
      }
    };
    updateStructure();
  }, [structure]);

  return (
    <>
      <div>
        <div className="flex items-center flex-col gap-5 mt-15">
          <div className="text-3xl font-bold">Amenities</div>
          <div>
            Here are the amenities you&apos;ve added to your listing so far.
          </div>
        </div>
        <div>
          <div className={`w-[630px] grid grid-cols-3 gap-5 my-5`}>
            {structures?.map((struct) => (
              <div
                onClick={() => setStructure(struct.structureid)}
                key={struct.structureid}
                className={`flex flex-col p-5  ${
                  structure === struct.structureid
                    ? "border-2 border-blue-500"
                    : "border-2"
                } rounded-lg`}
              >
                <IoHomeOutline className="w-8 h-8" />
                <span className="font-semibold">{struct.structurename}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Structure;
