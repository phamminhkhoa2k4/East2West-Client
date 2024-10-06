"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Standout = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/homestays/host/amenities");
  };

  const handleBack = () => {
    router.back();
  };
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
              <Link href={"/"} className="border px-4 py-2 rounded-full">
                Exit
              </Link>
            </div>
          </div>

          <div className="flex gap-5 items-center justify-center pb-11">
            <div className="flex flex-col w-[585px] gap-1">
              <div className="text-lg font-medium">Step 2</div>
              <div className="text-5xl font-medium">
                {/* Làm cho chỗ ở của bạn trở nên nổi bật */}
                Make your property stand out
              </div>
              <div className="text-lg font-normal text-[#222]">
                {/* Ở bước này, bạn sẽ thêm một số tiện nghi được cung cấp tại chỗ ở
                của bạn, cùng với 5 bức ảnh trở lên. Sau đó, bạn sẽ soạn tiêu đề
                và nội dung mô tả. */}
                In this step, you will add some of the amenities offered at your
                property, along with 5 or more photos. Then, you will write a
                title and description.
              </div>
            </div>
            <div className="w-[568px] h-[498px] relative">
              {/* <Image
                src={"/boat.png"}
                alt=""
                height={500}
                width={500}
                className="object-center object-cover w-full h-full"
              /> */}
              <video className="w-full h-full absolute" autoPlay muted>
                <source
                  src="https://stream.media.muscache.com/H0101WTUG2qWbyFhy02jlOggSkpsM9H02VOWN52g02oxhDVM.mp4?v_q=high"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-4 flex items-center justify-between">
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
    </div>
  );
};

export default Standout;
