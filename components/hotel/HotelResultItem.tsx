import Image from "next/image";


export default function HotelResultItem(){
    return (
      <>
        <div className="border-2 rounded-lg h-50 overflow-hidden">
          <div className="flex relative">
            <div className="w-1/3 h-50">
              <Image
                src={"/boat.png"}
                alt=""
                height={200}
                width={300}
                className="w-full h-full object-cover "
              />
            </div>
            <div className="p-4 w-2/3">
              <div>
                <div className="flex justify-between">
                  <span className="font-medium text-lg">FIT Hotel Can Tho</span>
                  <span>381.000 USD</span>
                </div>
                <div className=" mt-3 w-[420px] grid grid-cols-3 gap-3">
                  <div className="flex gap-2 items-start">
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
                          d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                        />
                      </svg>
                    </span>
                    <span className="text-sm">Wifi Free</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="absolute p-4 rounded-full bg-black text-white bottom-5 right-5">
              See Price
            </button>
          </div>
        </div>
      </>
    );
}