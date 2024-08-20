import Image from "next/image";


export default function Area(){
    return (
      <>
        <div className=" border rounded-lg p-6 bg-white">
          <h3 className="font-semibold text-xl p-4 pt-0">Find To Area</h3>
          <div className=" grid gap-x-6 gap-y-10 grid-cols-3 grid-rows-2">
            <div>
              <div className=" w-[109px] h-[109px] rounded-lg overflow-hidden bg-black">
                <Image
                  src={"/boat.png"}
                  alt=""
                  width={109}
                  height={109}
                  className="object-cover w-full h-full "
                />
              </div>
              <h3 className="mt-2 font-medium text-gray-7">Vietnam</h3>
            </div>
            <div>
              <div className=" w-[109px] h-[109px] rounded-lg overflow-hidden bg-black">
                <Image
                  src={"/boat.png"}
                  alt=""
                  width={109}
                  height={109}
                  className="object-cover w-full h-full "
                />
              </div>
              <h3 className="mt-2 font-medium text-gray-7">Vietnam</h3>
            </div>
            <div>
              <div className=" w-[109px] h-[109px] rounded-lg overflow-hidden bg-black">
                <Image
                  src={"/boat.png"}
                  alt=""
                  width={109}
                  height={109}
                  className="object-cover w-full h-full "
                />
              </div>
              <h3 className="mt-2 font-medium text-gray-7">Vietnam</h3>
            </div>
            <div>
              <div className=" w-[109px] h-[109px] rounded-lg overflow-hidden bg-black">
                <Image
                  src={"/boat.png"}
                  alt=""
                  width={109}
                  height={109}
                  className="object-cover w-full h-full "
                />
              </div>
              <h3 className="mt-2 font-medium text-gray-7">Vietnam</h3>
            </div>
            <div>
              <div className=" w-[109px] h-[109px] rounded-lg overflow-hidden bg-black">
                <Image
                  src={"/boat.png"}
                  alt=""
                  width={109}
                  height={109}
                  className="object-cover w-full h-full "
                />
              </div>
              <h3 className="mt-2 font-medium text-gray-7">Vietnam</h3>
            </div>
            <div>
              <div className=" w-[109px] h-[109px] rounded-lg overflow-hidden bg-black">
                <Image
                  src={"/boat.png"}
                  alt=""
                  width={109}
                  height={109}
                  className="object-cover w-full h-full "
                />
              </div>
              <h3 className="mt-2 font-medium text-gray-7">Vietnam</h3>
            </div>
          </div>
        </div>
      </>
    );
}