
import Image from "next/image";
import Link from "next/link";
import { TbCircleDotFilled } from "react-icons/tb";


type Grid = {
  homestays: Homestay[];
};
const Grid = ({homestays} : Grid) => {
    return (
      <>
        <div className="grid gap-5 grid-cols-3">
          {homestays?.map((homestay) => (
            <Link href={`/homestays/host/editor/${homestay.homestayid}`} key={homestay.homestayid}>
              <div className="w-full h-[400px] overflow-hidden rounded-lg relative">
                <Image
                  src={homestay.photos[0]}
                  alt=""
                  height={400}
                  width={400}
                  className="object-cover object-center w-full h-full"
                />
                <div className="text-black font-medium bg-white absolute top-5 left-5 flex gap-2 items-center px-4 py-1 rounded-lg">
                  <TbCircleDotFilled className="text-red-400" />
                  <span className="text-[#666] font-medium">
                    {homestay.isApproved ? "Approved" : "Pending approval"}
                  </span>
                </div>
              </div>
              <div className="text-lg font-semibold">{homestay.title}</div>
              <div className="text-[#666] font-medium">
                {homestay.districtName + ", " + homestay.cityProvinceName}
              </div>
            </Link>
          ))}
        </div>
      </>
    );
}

export default Grid;