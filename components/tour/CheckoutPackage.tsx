import { IoIosArrowDown } from "react-icons/io";
import IconLabel from "../homestay/IconLabel";
import { HiStar } from "react-icons/hi";
import Image from "next/image";

const CheckoutPackage = () => {
    return (
      <>
        <div className="flex flex-col w-full max-w-md lg:max-w-xs p-6 space-y-6 bg-white mt-2 shadow-md border border-gray-300 rounded-xl">
          <div className="flex justify-between">
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="text-lg line-through text-gray-500">$115</span>
                <span className="text-2xl font-bold">$98</span>
                <span className="text-gray-500">/ Adult</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col ">
            <button className="w-full p-4 text-white bg-blue-400 rounded-lg text-lg">
              Proceed To Payment
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
      </>
    );
}

export default CheckoutPackage;