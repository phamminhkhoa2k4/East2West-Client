import {
  HiOutlineLocationMarker,
  HiLocationMarker,
  HiStar,
} from "react-icons/hi";
import { CgHeart } from "react-icons/cg";
import { FiShare2, FiMoreHorizontal } from "react-icons/fi";
import { BsHouseDoorFill } from "react-icons/bs";
import IconLabel from "./IconLabel";
import { IoBed } from "react-icons/io5";
import { MdBathroom } from "react-icons/md";
import { MdBedroomParent } from "react-icons/md";
import { MdPerson } from "react-icons/md";

type TitleProps = {
  title: string | undefined;
  location: string | undefined;
  guest: number | undefined;
  bed: number | undefined;
  bathroom: number | undefined;
  room: number | null | undefined;
  ward: string | undefined;
  district: string | undefined;
  province: string | undefined;
};

const TitleDetails = ({
  title,
  location,
  guest,
  bed,
  bathroom,
  room,
  ward,
  district,
  province 

}: TitleProps) => {
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
          <span className="text-md">{location}, {ward}, {district}, {province}</span>
        </IconLabel>
        <IconLabel
          icon={<BsHouseDoorFill className="text-gray-500 text-xl" />}
          separator={<span className="text-gray-500 font-bold">·</span>}
        > 
          <MdPerson className="bg-gray-500 h-5 w-5" />
          <span className="text-md">{guest} guests</span>
          <MdBedroomParent className="bg-gray-500 h-5 w-5" />
          <span className="text-md">{room} bedroom</span>
          <IoBed className="text-gray-500 h-5 w-5" />
          <span className="text-md">{bed} beds</span>
          <MdBathroom className="text-gray-500h-5 w-5" />
          <span className="text-md">{bathroom} bathroom</span>
        </IconLabel>
      </div>
    </div>
  );
};

export default TitleDetails;
