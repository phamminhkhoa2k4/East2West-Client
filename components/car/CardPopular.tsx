import Image from "next/image";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaGasPump } from "react-icons/fa6";
import { GiSteeringWheel } from "react-icons/gi";
import { MdCarRental } from "react-icons/md";


interface CardPopularProps {
  img: string;
  title: string;
  desc: string;
  category: string;
  price: string;
  offPrice?: string;
}

const CardPopular = ({}: CardPopularProps) => {
  return (
    <>
      <div className="w-auto border p-5 px-7 rounded-2xl bg-[#deeafd]">
        <div className="text-lg font-semibold">Rolls-Royce</div>
        <div className="text-xs font-bold text-[#b6b4b4]">Sedan</div>
        <div className="w-full h-50  my-3">
          <Image
            src={"/boat.png"}
            alt=""
            height={300}
            width={500}
            className="object-center object-cover w-full h-full"
          />
        </div>
        <div className="flex items-center justify-between my-4 mx-5">
          <div className="flex gap-2 items-center">
            <div className="text-[#94a2bc]">
              <FaGasPump />
            </div>
            <span className="text-sm text-[#94a2bc]">90L</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-[#94a2bc]">
              <GiSteeringWheel />
            </div>
            <span className="text-sm text-[#94a2bc]">Manual</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-[#94a2bc]">
              <BsFillPeopleFill />
            </div>
            <span className="text-sm text-[#94a2bc]">2 People</span>
          </div>
        </div>
        <div className="flex items-center justify-between my-5 mx-5">
          <div className="flex items-center">
            <span className="text-lg font-bold">$99</span>
            <span>/day</span>
          </div>
          <button className="flex gap-2 items-center bg-blue-500 px-5 py-2 rounded-full">
            <MdCarRental className="text-white" />
            <span className="text-white">Rent Now</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default  CardPopular;