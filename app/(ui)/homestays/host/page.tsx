"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Host = () => {

   const router = useRouter();
   const handleClick = () => {
     router.push("/homestays/host/place");
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
            <div className="text-5xl font-medium text-center my-5 capitalize">
              Begin in our platform so easy
            </div>
            <div>
              <Link href={"/"} className="border px-4 py-2 rounded-full">
                Exit
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="flex gap-5  my-5 border-b-2">
              <div className="text-[22px] font-medium pt-4">1</div>
              <div>
                <div className="text-[22px] font-medium w-[440px] p-4 ">
                  {/* Chia sẻ thông tin về chỗ ở của bạn cho chúng tôi */}
                  Share your accommodation information with us
                </div>
                <div className="w-[440px] p-4 pt-0 ">
                  {/* Chia sẻ một số thông tin cơ bản, như vị trí của nhà/phòng cho
                  thuê và số lượng khách có thể ở tại đó */}
                  Share some basic information, like the location of the listing
                  and how many guests can stay there.
                </div>
              </div>
              <div className=" mt-5 w-30 h-30 rounded-xl overflow-hidden ">
                <Image
                  src={"/host/1.png"}
                  alt=""
                  height={300}
                  width={300}
                  className="object-cover  object-center w-full h-full"
                />
              </div>
            </div>
            <div className="flex gap-5   border-b-2 ">
              <div className="text-[22px] font-medium pt-4">2</div>
              <div>
                <div className="text-[22px] font-medium w-[440px] p-4 ">
                  {/* Làm cho nhà/phòng cho thuê trở nên nổi bật */}
                  Make your listing stand out
                </div>
                <div className="w-[440px] p-4 pt-0 ">
                  {/* Thêm từ 5 ảnh trở lên cùng với tiêu đề và nội dung mô tả –
                  chúng tôi sẽ giúp bạn thực hiện. */}
                  Add 5 or more photos with titles and descriptions – we&apos;ll
                  help you do it.
                </div>
              </div>
              <div className=" mt-5 w-30 h-30 rounded-xl overflow-hidden ">
                <Image
                  src={"/host/2.png"}
                  alt=""
                  height={300}
                  width={300}
                  className="object-cover  object-center w-full h-full"
                />
              </div>
            </div>
            <div className="flex gap-5 py-4">
              <div className="text-[22px] font-medium pt-4">3</div>
              <div>
                <div className="text-[22px] font-medium w-[440px] p-4 ">
                  {/* Hoàn thiện và đăng mục cho thuê */}
                  Complete and post your rental listing
                </div>
                <div className="w-[440px] p-4 pt-0 ">
                  {/* Chọn giá khởi điểm, xác minh một vài thông tin, sau đó đăng
                  mục cho thuê của bạn. */}
                  Choose a starting price, verify a few details, then post your
                  listing.
                </div>
              </div>
              <div className=" mt-5 w-30 h-30 rounded-xl overflow-hidden ">
                <Image
                  src={"/host/3.png"}
                  alt=""
                  height={300}
                  width={300}
                  className="object-cover  object-center w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" fixed left-0 right-0 bottom-0 border-t-4 flex items-center justify-end">
        <button
          onClick={handleClick}
          className="px-5 py-3 my-5 mr-5 rounded-xl text-lg font-bold text-white bg-blue-500"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Host;
