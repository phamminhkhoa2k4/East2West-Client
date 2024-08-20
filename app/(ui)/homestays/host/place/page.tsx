import Image from "next/image";

const Place = () => {
  return (
    <div>
      <div className="mx-15 mt-5">
        <div>
          <div className="flex items-center justify-between">
            <div className="w-20 h-20">
              <Image
                src={"/Logo.png"}
                alt=""
                height={300}
                width={300}
                className="object-center object-cover w-full h-full"
              />
            </div>
            <div>
              <button className="border px-4 py-2 rounded-full">Exit</button>
            </div>
          </div>

          <div className="flex gap-5 items-center justify-center pb-11">
            <div className="flex flex-col w-[585px] gap-1">
              <div className="text-lg font-medium">Bước 1</div>
              <div className="text-5xl font-medium">Chia sẻ thông tin về chỗ ở của bạn cho chúng tôi</div>
              <div className="text-lg font-normal text-[#222]">
                Trong bước này, chúng tôi sẽ hỏi xem bạn cho thuê loại chỗ ở nào
                và bạn muốn cho khách đặt toàn bộ nhà hay chỉ một phòng cụ thể.
                Sau đó, hãy cho chúng tôi biết vị trí và số lượng khách có thể ở
                tại đó.
              </div>
            </div>
            <div className="w-[568px] h-[498px]">
              <Image
                src={"/boat.png"}
                alt=""
                height={500}
                width={500}
                className="object-center object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-4 flex items-center justify-between">
        <button className="px-5 py-3 my-5 ml-5 rounded-xl text-lg font-bold text-white bg-slate-300">
          Back
        </button>
        <button className="px-5 py-3 my-5 mr-5 rounded-xl text-lg font-bold text-white bg-blue-500">
          Start
        </button>
      </div>
    </div>
  );
};

export default Place;
