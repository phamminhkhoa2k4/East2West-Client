import { HiStar } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import IconLabel from "./IconLabel";
import Image from "next/image";

const ListingDetails = () => {
  return (
    <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 my-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-bold">All about Lazar&apos;s place</h2>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Hosted by</span>
            <Image
              src="/homestay/lazar.jpg"
              alt="Lazar"
              className="w-6 h-6 rounded-full"
              height={100}
              width={100}
            />
            <span className="text-brand-500">Lazar Nikolov</span>
          </div>
        </div>
        <hr />
        <div className="flex flex-col space-y-4">
          <p>
            Beach House Belgrade villa on the water is a modern designed, open
            space residence, tucked in the flourishing green oasis of Ada
            Ciganlija&apos;s park.
          </p>
          <p>
            Our property prevails in simplicity. It possess a large living area
            with big movable windows, in front and on the sides, which provides
            the magical view on Sava river even when you are relaxing inside.
          </p>
          <p>
            Our location - behind the Golf club Belgrade in Ada, 15 min drive
            from the city center, will not leave you out from the city&apos;s
            vibrant life.
          </p>
          <p>
            <strong>The space</strong>
            <br />
            We didn’t let any walls or corridors stand in the way between you
            and the nature, so as soon as you open the front door, you will feel
            the positive energy of the water, flow through your body.
          </p>
          <p>
            <strong>Guest access</strong>
            <br />
            During the day, around 8 people are allowed to be in the house. It’s
            perfect for small events such as birthdays, bachelorette parties,
            team buildings. 4 guests can sleep over.
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-md lg:max-w-xs p-6 space-y-6 bg-white border border-gray-300 rounded-2xl">
        <div className="flex justify-between">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-lg line-through text-gray-500">$115</span>
              <span className="text-lg">$98</span>
              <span className="text-gray-500">/ night</span>
            </div>
            <IconLabel
              icon={<HiStar className="text-yellow-400 text-xl" />}
              separator={<span className="text-gray-500 font-bold">·</span>}
            >
              <span className="text-md">4.96</span>
              <span className="text-md">26 reviews</span>
            </IconLabel>
          </div>
          <div className="relative">
            <Image
              src="/homestay/lazar.jpg"
              alt="Lazar"
              className="w-12 h-12 rounded-full"
              height={100}
              width={100}
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 p-3 border border-gray-300 rounded-lg">
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-bold uppercase" htmlFor="check-in">
              Check-in
            </label>
            <button
              id="check-in"
              className="w-full p-2 text-left bg-white border border-gray-300 rounded-lg text-sm flex"
            >
              09/03/2021 <IoIosArrowDown className="inline-block ml-2" />
            </button>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-bold uppercase" htmlFor="check-out">
              Check-out
            </label>
            <button
              id="check-out"
              className="w-full p-2 text-left bg-white border border-gray-300 rounded-lg text-sm flex"
            >
              09/10/2021 <IoIosArrowDown className="inline-block ml-2" />
            </button>
          </div>
          <div className="col-span-2">
            <label className="text-xs font-bold uppercase" htmlFor="guests">
              Guests
            </label>
            <button
              id="guests"
              className="w-full p-2 text-left bg-white border border-gray-300 rounded-lg text-sm"
            >
              1 Adult <IoIosArrowDown className="inline-block ml-2" />
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <button className="w-full p-4 text-white bg-brand-500 rounded-lg text-lg">
            Reserve
          </button>
          <span className="text-gray-500 text-center">
            You won’t be charged yet
          </span>
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between">
            <span>$98 x 7 nights</span>
            <span>$686</span>
          </div>
          <div className="flex justify-between">
            <span>8% weekly price discount</span>
            <span className="text-green-500">-$54</span>
          </div>
          <div className="flex justify-between">
            <span>Service fee</span>
            <span>$97</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>$729</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
