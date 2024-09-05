import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
type StructureType = {
  structureid: number;
  structurename: string;
};
type Homestay = {
  homestayid: number | null;
  wardName: string; //
  districtName: string; //
  cityProvinceName: string; //
  longitude: number; //
  latitude: number; //
  geom: string | null;
  structureId: number | null; //
  userId: number | null; //
  type: string; //
  title: string; //
  address: string; //
  photos: string[]; //
  description: string; //
  extraInfo: string; //
  cleaningFee: number; //
  isApproved: boolean;
  maxGuest: number; //
  perkIds: number[]; //
  pricePerNight: number; //
  availability: any;
};

type Role = {
  roleId: number;
  roleName: string;
};

type User = {
  userId: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  roles: Role;
};

type AmenitiesType = {
  amenitiesid: number;
  amenitiesname: string;
};

type Preview = {
  onClose: (value: boolean) => void;
  host: { data: Homestay } | null;
  user: User | undefined;
  amenities: AmenitiesType[];
  structure: StructureType | undefined;
};

const Preview = ({ onClose, host, user, amenities, structure }: Preview) => {
console.log(structure);


  return (
    <>
      <div className="p-[-1rem] overflow-hidden  rounded-2xl border">
        <div className="mx-5 flex items-center justify-between py-5">
          <IoMdClose className="h-5 w-5" onClick={() => onClose(false)} />
          <div className="font-bold text-[#222]">Bản Xem Trước Đầy Đủ</div>
          <div></div>
        </div>
        <div className="border-t pt-10">
          <div className="flex gap-10 p-5">
            <div className="h-[444px] w-1/2 overflow-hidden rounded-2xl">
              <Image
                src={host?.data.photos[0] ?? ""}
                alt=""
                className="h-full w-full object-cover object-center"
                height={400}
                width={400}
              />
            </div>
            <div className="w-1/2 overflow-y-scroll scroll-transparent h-[444px]">
              <div className="text-[32px] font-medium">
                {host?.data.title ?? ""}
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <div className="text-[22px] font-medium text-[#222]">
                    {host?.data.type} trong {structure?.structurename}
                  </div>
                  <div className="text-[22px] font-medium text-[#222]">
                    chu nha {user?.username}
                  </div>
                </div>
                <div className="h-16 w-16 overflow-hidden rounded-full">
                  <Image
                    src={"/boat.png"}
                    alt=""
                    className="h-full w-full object-cover object-center"
                    height={400}
                    width={400}
                  />
                </div>
              </div>
              <div className="mt-5 flex items-center">
                <span className="text-[#666]">{host?.data.maxGuest} Khach</span>
                , <span className="text-[#666]">1 Giuong</span> ,{" "}
                <span className="text-[#666]">1 Phong Tam</span> ,
              </div>
              <hr className="my-10" />
              <div className="font-medium">Mo ta</div>
              <div className="text-[#666] pt-5">{host?.data.description}</div>
              <hr className="my-10" />
              <div className="font-medium">Thong tin bo sung</div>
              <div className="text-[#666] pt-5">{host?.data.extraInfo}</div>
              <hr className="my-10" />
              <div className="font-medium">Tien Nghi</div>
              {amenities.map((amenity) => (
                <div
                  key={amenity.amenitiesid}
                  className="mt-10 flex items-center justify-between"
                >
                  <div>{amenity.amenitiesname}</div>
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
                        d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
                      />
                    </svg>
                  </div>
                </div>
              ))}

              <hr className="my-10" />
              <div className="font-medium">Vi Tri</div>
              <div className="flex items-center gap-2 pt-5">
                <FaLocationDot className="text-[#6a6a6a] h-4 w-4" />
                <div className="text-[#6a6a6a]">
                  {host?.data.address} ,{host?.data.wardName},
                  {host?.data.districtName},{host?.data.cityProvinceName}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
