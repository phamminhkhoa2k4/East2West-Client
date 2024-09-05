"use client";
import Image from "next/image";
import { IoStar } from "react-icons/io5";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Preview from "./preview";
import { useEffect, useState } from "react";
import { useHostContext } from "@/store/Hostcontext";
import { useRouter } from "next/navigation";
import { createData, getData } from "@/utils/axios";
import axios from "axios";
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
type StructureType = {
  structureid: number;
  structurename: string;
};
const Receipt = () => {
  const router = useRouter();
  const { state, setState } = useHostContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [amenities, setAmenities] = useState<AmenitiesType[]>([]);
  const [homestays,setHomestays] = useState<Homestay>();
  const [structure, setStructure] = useState<StructureType>();
  console.log(structure);
  
  const handleClick = async () => {
    setState({
      data: {
        ...state?.data!,
        isApproved: false,
        userId: 1,
        geom: null,
        homestayid : null,
        availability : [],
      },
    });
    if (
      state?.data &&
      state?.data.address !== "" &&
      state?.data.title !== "" &&
      state?.data.pricePerNight !== 0 &&
      state?.data.cleaningFee !== 0 &&
      state?.data.cityProvinceName !== "" &&
      state?.data.description !== "" &&
      state?.data.extraInfo !== "" &&
      state?.data.districtName !== "" &&
      state?.data.latitude !== 0 &&
      state?.data.longitude !== 0 &&
      state?.data.maxGuest !== 0 &&
      state?.data.perkIds.length > 0 &&
      state?.data.photos.length > 4 &&
      state?.data.structureId !== 0 &&
      state?.data.type !== "" &&
      state?.data.wardName !== ""  && state?.data.userId !== 0
      
    ) {
        setHomestays(state?.data);
        console.log("home",homestays);
        
        await createData({ endpoint: "/homestays/host", payload: homestays })
          .then((data) => {
            if(data){
              router.push("/");
            }
            
          })
          .catch((err) => {
            console.log(err);
          });
      
    }
  };
  useEffect(() => {
    
    const fetchPreview = async () => {
      try {
        
        const responseStructure = await getData({ endpoint: `/homestays/host/structure/${state?.data.structureId}`});

        const responseAmenities  = await axios.get(
          "http://localhost:8080/api/homestays/host/amenitiess",
          {
            params: { ids: state?.data.perkIds },
            paramsSerializer: (params) => {
              return Object.keys(params)
                .map((key) => `${key}=${params[key].join(",")}`)
                .join("&");
            },
          }
        );
        const responseUser = await getData({
          endpoint: `/auth/${state?.data.userId}`,
        });
        setStructure(responseStructure);
        setUser(responseUser);
        setAmenities(responseAmenities.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPreview();
    
  }, []);

  const handleBack = () => {
    router.back();
  };
  return (
    <>
      <div>
        <div className="bg-white fixed right-0 left-0 top-0  px-15 pt-5 pb-5 z-9 border-b">
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
        </div>
        <div className="flex flex-col items-center justify-center mt-36 mb-30">
          <div className="w-[900px]">
            <div className="text-[48px] font-medium py-5">
              Xem lại mục cho thuê của bạn
            </div>
            <div className="text-lg font-medium text-[#6a6a6a]">
              Dưới đây là những thông tin mà chúng tôi sẽ hiển thị cho khách.
              Hãy đảm bảo mọi thứ đều ổn thỏa.
            </div>
          </div>
          <Dialog open={isOpen} onOpenChange={(e) => setIsOpen(e)}>
            <DialogTrigger asChild>
              <div className="relative flex gap-10 w-[450px] mt-10">
                <div className="absolute left-10 top-8 rounded-md px-4 py-0.5 bg-white text-[#222] font-semibold">
                  display preview
                </div>
                <div className="border shadow-md rounded-xl overflow-hidden p-4">
                  <div className="rounded-xl overflow-hidden w-full h-96">
                    <Image
                      src={"/boat.png"}
                      alt=""
                      height={400}
                      width={400}
                      className="object-center object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-[14px] font-medium">name</div>
                    <div className="flex items-center gap-2">
                      <div>new</div>
                      <IoStar />
                    </div>
                  </div>
                  <div className="pt-2 text-[14px]">
                    $ <span className="font-bold text-[#222]">18</span> Night
                  </div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="min-w-[1200px]">
              <Preview
                onClose={setIsOpen}
                host={state}
                user={user}
                amenities={amenities}
                structure={structure}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className=" bg-white border-t-4 flex fixed left-0 right-0 bottom-0 items-center justify-between">
          <button
            className="px-5 py-3 my-5 ml-5 rounded-xl text-lg font-bold text-white bg-slate-400"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            className="px-5 py-3 my-5 mr-5 rounded-xl text-lg font-bold text-white bg-blue-500"
            onClick={handleClick}
          >
            Finish
          </button>
        </div>
      </div>
    </>
  );
};

export default Receipt;
