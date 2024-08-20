import Image from "next/image";
import { BsFuelPump, BsSpeedometer } from "react-icons/bs";
<<<<<<< HEAD
import { PiGasCan } from "react-icons/pi";
=======
import { PiGasCan } from "react-icons/pi"
>>>>>>> aa0544e38407cf1589e599ba818920f672357525
import { GiGearStickPattern } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import { SiFueler } from "react-icons/si";
import { GoPeople } from "react-icons/go";
<<<<<<< HEAD
import { useRouter } from "next/navigation";
interface Car {
  carId: number;
  carName: string;
  model: {
    modelId: number;
    modelName: string;
  };
  make: {
    makeId: number;
    makeName: string;
  };
  type: {
    typeId: number;
    typeName: string;
  };
  year: number;
  seatCapacity: number;
  airConditioned: boolean;
  pricePerDay: number;
  status: string;
  cargearbox?: string | null;
  miles?: string | null;
  fueltankcapacity?: string | null;
  fuel?: string | null;
  location?: string | null;
  imageUrl?: string;
}

interface CardSearchProps {
  car: Car;
}

const CardSearch = ({ car }: CardSearchProps) => {
  if (!car) {
    return <div>Error: Car data is missing</div>;
  }
  const router = useRouter();

  const handleRentNowClick = () => {
    if (car.carId) {
      router.push(`/cars/${car.carId}`);
    } else {
      console.error("carId is undefined");
    }
  };
  return (
    <div className="flex border rounded-xl bg-white shadow-md">
      <div className="flex items-center gap-5 p-6">
        <div className="w-2/4 h-[80%] rounded-lg overflow-hidden">
          <Image
            src={car.imageUrl || "/placeholder.png"}
            alt={car.carName || "Car Image"}
            height={300}
            width={400}
            className="object-center object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col w-2/4">
          <div className="text-3xl font-bold my-1 mx-3">
            {car.model?.modelName || "Unknown Model"}
          </div>
          <div className="mx-4 text-lg font-semibold text-blue-500">
            {car.make?.makeName || "Unknown Make"}
          </div>
          <div className="flex">
            <div className="grid grid-cols-2 gap-y-2 px-6 py-2">
              <div className="flex gap-3 items-center">
                <GoPeople className="h-4 w-4" />
                <span className="text-base font-normal">{car.seatCapacity} seats</span>
              </div>
              <div className="flex gap-3 items-center">
                <GiGearStickPattern className="h-4 w-4" />
                <span className="text-base font-normal">{car.cargearbox || "Unknown Gearbox"}</span>
              </div>
              <div className="flex gap-3 items-center">
                <PiGasCan className="h-4 w-4" />
                <span className="text-base font-normal">{car.fueltankcapacity || "Unknown Capacity"}L</span>
              </div>
              <div className="flex gap-3 items-center">
                <SiFueler className="h-4 w-4" />
                <span className="text-base font-normal">{car.fuel || "Unknown Fuel"}</span>
              </div>
              <div className="flex gap-3 items-center">
                <BsFuelPump className="h-4 w-4" />
                <span className="text-base font-normal">{car.cargearbox || "Unknown Gearbox"}</span>
              </div>
              <div className="flex gap-3 items-center">
                <TbAirConditioning className="h-5 w-5" />
                <span className="text-base font-normal">
                  {car.airConditioned ? "Air Conditioning" : "No Air Conditioning"}
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <BsSpeedometer className="h-4 w-4" />
                <span className="text-base font-normal">
                  {car.miles || "Unknown Mileage"} km
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 px-6 items-center mt-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <span className="text-base font-medium text-blue-500">{car.location || "Unknown Location"}</span>
          </div>
          <div className="flex px-6 items-center justify-between mt-3">
            <div className="flex flex-col">
              <div className="text-base font-medium">Price For 1 Day:</div>
              <div className="text-2xl font-bold">${car.pricePerDay}</div>
            </div>
            <button className="font-bold text-lg px-8 py-3 border shadow-sm rounded-lg text-white bg-blue-500" onClick={handleRentNowClick}>
              View Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSearch;
=======

const CardSearch = () => {
    return (
      <>
        <div className="flex border rounded-xl">
          <div className="flex items-center gap-5 p-6">
            <div className="w-2/4 h-[80%]  rounded-lg overflow-hidden">
              <Image
                src={"/boat.png"}
                alt=""
                height={300}
                width={400}
                className="object-center object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col w-2/4 ">
              <div className="text-3xl font-bold my-1 mx-3">
                Chevrolet Aveo Sedan
              </div>
              <div className="mx-4 text-lg font-semibold text-blue-500">
                Honda
              </div>
              <div className="flex">
                <div className="grid grid-cols-2  gap-y-2 px-6 py-2">
                  <div className="flex gap-3 items-center">
                    <GoPeople className="h-4 w-4" />
                    <span className="text-base font-normal">5 seats</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <GiGearStickPattern className="h-4 w-4" />
                    <span className="text-base font-normal">Manual</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <PiGasCan className="h-4 w-4" />
                    <span className="text-base font-normal">90L</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <SiFueler className="h-4 w-4" />
                    <span className="text-base font-normal">Electronic</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <BsFuelPump className="h-4 w-4" />
                    <span className="text-base font-normal">Diesel</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <TbAirConditioning className="h-5 w-5" />
                    <span className="text-base font-normal">AirCondition</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <BsSpeedometer className="h-4 w-4" />
                    <span className="text-base font-normal">
                      Unlimited Mileage
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 px-6 items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                </span>
                <span className="text-base font-medium text-blue-500">Vinh Long,Can Tho</span>
              </div>
              <div className="flex px-6 items-center justify-between mt-3">
                  <div className="flex flex-col">
                      <div className="text-base font-medium">Price For 1 Day : </div>
                      <div className="text-2xl font-bold">$ 100.00</div>
                  </div>
                  <div className="font-bold text-lg px-8 py-3 border shadow-sm rounded-lg text-white bg-blue-500 ">
                    View Detail
                  </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default CardSearch;  
>>>>>>> aa0544e38407cf1589e599ba818920f672357525
