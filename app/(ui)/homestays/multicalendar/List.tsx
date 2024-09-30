import Image from "next/image";
import { TbCircleDotFilled } from "react-icons/tb";

type ListType = {
  homestays: Homestay[];
};
const List = ({homestays} : ListType) => {
    return (
      <>
        <div className="grid grid-cols-3 gap-5">
          <div className="text-black font-bold">Item</div>
          <div className="text-black font-bold">Location</div>
          <div className="text-black font-bold">status</div>
          {homestays?.map((homestay) => (
            <>
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 overflow-hidden rounded-lg">
                  <Image
                    src={homestay.photos[0]}
                    alt=""
                    height={400}
                    width={400}
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <div className="text-lg font-semibold">{homestay.title}</div>
              </div>
              <div className="text-[#666] font-medium flex items-center">
                {homestay.districtName + ", " + homestay.cityProvinceName}
              </div>
              <div className="flex gap-3 items-center">
                <TbCircleDotFilled className="text-red-400" />
                <span className="text-[#666] font-medium">
                  {homestay.isApproved ? "Approved" : "Pending Approval"}
                </span>
              </div>
            </>
          ))}
        </div>
      </>
    );
}

export default List;