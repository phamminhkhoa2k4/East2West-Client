import Image from "next/image";

const CardRecently = () => {
    return (
      <>
        <div className="border rounded-lg">
          <div className="p-4 pb-0">
            <div className="flex gap-10 justify-between border-b-2 border-dashed pb-2">
              <div className="flex flex-col gap-1">
                <p className="text-base font-normal">
                  North to South Vietnam - 6N
                </p>
                <p className="text-lg font-semibold">2N Ha Noi + 2N Da Nang</p>
                <p className="text-sm">10 Nov 24 * 2 Travelers</p>
              </div>
              <div>
                <div className="relative w-20 h-15 ">
                  <div className="rounded-lg overflow-hidden w-full h-full">
                    <Image
                      src={"/boat.png"}
                      alt=""
                      height={100}
                      width={100}
                      className="object-cover object-center w-full h-full"
                    />
                  </div>

                  <div className="absolute top-12 left-3 border rounded-md bg-white border-blue-600 p-[2px] px-2 text-xs">
                    6N/7D
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-1 items-center my-4">
              <span className="font-bold text-base">$ 89,667</span>
              <span className="text-sm">/person</span>
            </div>
          </div>
          <div className="flex justify-between px-4 py-2 bg-blue-200 rounded-b-lg">
            <div className="flex gap-2">
              <div>
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
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </div>
              <div className="text-base">Viewed by You</div>
            </div>
            <div className="text-lg font-bold text-blue-500">View</div>
          </div>
        </div>
      </>
    );
}

export default CardRecently;