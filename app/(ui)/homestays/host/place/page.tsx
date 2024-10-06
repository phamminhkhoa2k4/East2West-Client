"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Place = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/homestays/host/structure");
  };

  const handleBack = () => {
    router.back();
  }
  
  return (
    <>
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
              <Link href={"/"} className="border px-4 py-2 rounded-full">
                Exit
              </Link>
            </div>
          </div>

          <div className="flex gap-5 items-center justify-center pb-11">
            <div className="flex flex-col w-[585px] gap-1">
              <div className="text-lg font-medium">Step 1</div>
              <div className="text-5xl font-medium">
                {/* Chia sẻ thông tin về chỗ ở của bạn cho chúng tôi */}
                Share your accommodation information with us
              </div>
              <div className="text-lg font-normal text-[#222]">
                {/* Trong bước này, chúng tôi sẽ hỏi xem bạn cho thuê loại chỗ ở nào
                và bạn muốn cho khách đặt toàn bộ nhà hay chỉ một phòng cụ thể.
                Sau đó, hãy cho chúng tôi biết vị trí và số lượng khách có thể ở
                tại đó. */}
                In this step, we will ask what type of accommodation you are
                renting out and whether you want guests to book the entire house
                or just a specific room. Then, tell us the location and how many
                guests can stay there.
              </div>
            </div>
            <div className="w-[568px] h-[498px] overflow-hidden relative">
              {/* <Image
                src={"/boat.png"}
                alt=""
                height={500}
                width={500}
                className="object-center object-cover w-full h-full"
              /> */}
              <video className="w-full h-full absolute" autoPlay muted>
                <source src="https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed left-0 right-0 bottom-0 border-t-4 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="px-5 py-3 my-5 ml-5 rounded-xl text-lg font-bold text-white bg-slate-300"
        >
          Back
        </button>
        <button
          onClick={handleClick}
          className="px-5 py-3 my-5 mr-5 rounded-xl text-lg font-bold text-white bg-blue-500"
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default Place;
