import { BsSpeedometer, BsFuelPump, BsCalendar, BsGear } from "react-icons/bs";
import { GiCarSeat, GiCarDoor } from "react-icons/gi";
import { MdLocationOn, MdAcUnit } from "react-icons/md";
import { RiGasStationFill } from "react-icons/ri";

const InfoCar = ({ car }) => {
  return (
    <>
      <div className="p-6 grid grid-cols-4 grid-rows-2 gap-4 border rounded-lg">
        <div className="flex gap-2 p-4 items-center border rounded-md">
          <BsSpeedometer />
          <span>{car.miles} miles</span>
        </div>
        <div className="flex gap-2 p-4 items-center border rounded-md">
          <RiGasStationFill />
          <span>{car.fueltankcapacity}</span>
        </div>
        <div className="flex gap-2 p-4 items-center border rounded-md">
          <BsFuelPump />
          <span>{car.fuel}</span>
        </div>
        <div className="flex gap-2 p-4 items-center border rounded-md">
          <BsCalendar />
          <span>{car.year}</span>
        </div>
        <div className="flex gap-2 p-4 items-center border rounded-md">
          <GiCarSeat />
          <span>{car.seatCapacity} seats</span>
        </div>
        <div className="flex gap-2 p-4 items-center border rounded-md">
          <BsGear />
          <span>{car.cargearbox}</span>
        </div>
        <div className="flex gap-2 p-4 items-center border rounded-md">
          <MdLocationOn />
          <span>{car.location}</span>
        </div>
        <div className="flex gap-2 p-4 items-center border rounded-md">
          <MdAcUnit />
          <span>{car.airConditioned ? "Air Conditioned" : "No Air Conditioned"}</span>
        </div>
      </div>
    </>
  );
};

export default InfoCar;
