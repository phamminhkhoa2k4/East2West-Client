import { IoLocationOutline } from "react-icons/io5";

const LocationSearch = () => {
    return (
      <>
        <div className="text-[32px] font-medium w-[640px]">
          Chỗ ở của bạn nằm ở đâu?
        </div>
        <div className="text-lg text-[#6a6a6a] tracking-tight  w-[640px]">
          Địa chỉ của bạn chỉ được chia sẻ với khách sau khi họ đặt phòng thành
          công.
        </div>
        <div className="w-[640px] relative h-[500px] mt-5">
          <div className="rounded-3xl bg-[url('/boat.png')] w-full h-full"></div>
          <div className="absolute left-10 top-5 w-[566px]  ">
            <div className="w-full h-full relative ">
              <IoLocationOutline className="absolute top-[14px] left-5 w-6 h-6  " />
              <input
                type="search"
                placeholder="Enter Your Address "
                className="w-full h-full border-none outline-none p-4 pl-15 rounded-full"
              />
            </div>
          </div>
        </div>
      </>
    );
}

export default LocationSearch;