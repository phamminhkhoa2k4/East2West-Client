import Image from "next/image";
import { IoHomeOutline } from "react-icons/io5";
import { LuDoorOpen } from "react-icons/lu";
import { MdOutlineBedroomParent } from "react-icons/md";

const Type = () => {
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
            <button className="border px-4 py-2 rounded-full">Exit</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-36 mb-30">
        <div className="text-4xl font-semibold w-[630px]">
          Điều nào sau đây mô tả chính xác nhất về chỗ ở của bạn?
        </div>
        <div className="w-[630px] flex flex-col gap-5 my-5">
          <div className="flex items-center justify-between border rounded-lg p-6">
            <div className="flex flex-col gap-2">
              <div className="text-lg font-medium">Toàn Bộ Nhà</div>
              <div className="text-sm text-[#6a6a6a]">
                Khách Được sử dụng riêng toàn bộ ở chổ này
              </div>
            </div>
            <IoHomeOutline className="w-11 h-11" />
          </div>
          <div className="flex items-center justify-between border rounded-lg p-6">
            <div className="flex flex-col gap-2">
              <div className="text-lg font-medium">Một căn phòng</div>
              <div className="text-sm text-[#6a6a6a]">
                Khách sẽ có phòng riêng trong một ngôi nhà và được sử dụng những
                khu vực chung.
              </div>
            </div>
            <LuDoorOpen className="w-11 h-11" />
          </div>
          <div className="flex items-center justify-between border rounded-lg p-6">
            <div className="flex flex-col gap-2">
              <div className="text-lg font-medium">Phòng chung</div>
              <div className="text-sm text-[#6a6a6a]">
                Khách ngủ trong một phòng hoặc khu vực chung – nơi bạn hoặc
                người khác có thể cùng sử dụng.
              </div>
            </div>
            <MdOutlineBedroomParent className="w-11 h-11" />
          </div>
        </div>
      </div>
      <div className=" bg-white border-t-4 flex fixed left-0 right-0 bottom-0 items-center justify-between">
        <button className="px-5 py-3 my-5 ml-5 rounded-xl text-lg font-bold text-white bg-slate-400">
          Back
        </button>
        <button className="px-5 py-3 my-5 mr-5 rounded-xl text-lg font-bold text-white bg-blue-500">
          Continue
        </button>
      </div>
    </div>
  );
};

export default  Type;
