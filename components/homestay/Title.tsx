import {
  HiOutlineLocationMarker,
  HiLocationMarker,
  HiStar,
} from "react-icons/hi";
import { CgHeart } from "react-icons/cg";
import { FiShare2, FiMoreHorizontal } from "react-icons/fi";
import { BsHouseDoorFill } from "react-icons/bs";
import IconLabel from "./IconLabel";

type TitleProps = {
  title: string | undefined;
  location: string | undefined;
  guest: number | undefined;
  bed: number | undefined;
  bath: number | undefined;
};

const TitleDetails = ({title , location , guest , bed , bath, }: TitleProps) => {
  return (
    <div className="flex flex-col space-y-4 my-8">
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className="text-4xl lg:text-5xl font-bold">{title}</h1>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <button
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
            aria-label="Get location"
          >
            <HiOutlineLocationMarker className="text-xl" />
          </button>
          <button
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
            aria-label="Share"
          >
            <FiShare2 className="text-xl" />
          </button>
          <button
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
            aria-label="Add to favorites"
          >
            <CgHeart className="text-xl" />
          </button>
          <button
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
            aria-label="More options"
          >
            <FiMoreHorizontal className="text-xl" />
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-6 w-full md:w-fit">
        <IconLabel
          icon={<HiLocationMarker className="text-gray-500 text-xl" />}
        >
          <span className="text-md">{location} Belgrade, Serbia</span>
        </IconLabel>
        <IconLabel
          icon={<BsHouseDoorFill className="text-gray-500 text-xl" />}
          separator={<span className="text-gray-500 font-bold">·</span>}
        >
          <span className="text-md">{guest} guests</span>
          <span className="text-md">{bed} bedroom</span>
          <span className="text-md">{bed} beds</span>
          <span className="text-md">{bath} bath</span>
        </IconLabel>
      </div>
    </div>
  );
};

export default TitleDetails;
