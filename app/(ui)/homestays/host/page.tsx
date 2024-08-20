import Image from "next/image";

const Host = () => {
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
              <button className="border px-4 py-2 rounded-full">Exit</button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="flex gap-5  my-5 border-b-2">
              <div className="text-[22px] font-medium pt-4">1</div>
              <div>
                <div className="text-[22px] font-medium w-[440px] p-4 ">
                  Chia sẻ thông tin về chỗ ở của bạn cho chúng tôi
                </div>
                <div className="w-[440px] p-4 pt-0 ">
                  Chia sẻ một số thông tin cơ bản, như vị trí của nhà/phòng cho
                  thuê và số lượng khách có thể ở tại đó
                </div>
              </div>
              <div className=" mt-5 w-30 h-30 rounded-xl overflow-hidden ">
                <Image
                  src={"/boat.png"}
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
                  Làm cho nhà/phòng cho thuê trở nên nổi bật
                </div>
                <div className="w-[440px] p-4 pt-0 ">
                  Thêm từ 5 ảnh trở lên cùng với tiêu đề và nội dung mô tả –
                  chúng tôi sẽ giúp bạn thực hiện.
                </div>
              </div>
              <div className=" mt-5 w-30 h-30 rounded-xl overflow-hidden ">
                <Image
                  src={"/boat.png"}
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
                  Hoàn thiện và đăng mục cho thuê
                </div>
                <div className="w-[440px] p-4 pt-0 ">
                  Chọn giá khởi điểm, xác minh một vài thông tin, sau đó đăng
                  mục cho thuê của bạn.
                </div>
              </div>
              <div className=" mt-5 w-30 h-30 rounded-xl overflow-hidden ">
                <Image
                  src={"/boat.png"}
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
      <div className="border-t-4 flex items-center justify-end">
        <button className="px-5 py-3 my-5 mr-5 rounded-xl text-lg font-bold text-white bg-blue-500">
          Start
        </button>
      </div>
    </div>
  );
};

export default Host;
