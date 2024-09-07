import Image from "next/image";

type Coordinates = {
  lat: number;
  lng: number;
};




type Address = {
  label?: string | null;
  countryCode?: string | null;
  countryName?: string | null;
  county?: string | null;
  city?: string | null;
  district?: string | null;
  street?: string | null;
  postalCode?: string | null;
  houseNumber?: string | null;
};



type Item = {
  title: string;
  address: Address;
  position: Coordinates;
};

type Response = {
  items: Item[];
};

type AreaProps = {
  setPlace: (value: string) => void;
  setPosition: (value : Coordinates| null) => void;
};

type typeArea = {
  place: string;
  lng : number
  lat : number
};

export default function Area({ setPlace, setPosition } : AreaProps) {
  const data  = [
      {
        title: "Cần Thơ, Việt Nam",
        address: {
          label: "Cần Thơ, Việt Nam",
          countryCode: "VNM",
          countryName: "Việt Nam",
          county: "Cần Thơ",
          city: "Cần Thơ",
        },
        position: {
          lat: 10.14633,
          lng: 105.64844,
        },
        
      },
      {
        title: "Hồ Chí Minh, Việt Nam",
        address: {
          label: "Hồ Chí Minh, Việt Nam",
          countryCode: "VNM",
          countryName: "Việt Nam",
          county: "Hồ Chí Minh",
          city: "Hồ Chí Minh",
        },
        position: {
          lat: 10.80437,
          lng: 106.71927,
        },
       
      
      },
      {
        title: "Hạ Long, Việt Nam",
        address: {
          label: "Hạ Long, Việt Nam",
          countryCode: "VNM",
          countryName: "Việt Nam",
          county: "Quảng Ninh",
          city: "Hạ Long",
          postalCode: "01108",
        },
        position: {
          lat: 20.95152,
          lng: 107.08311,
        },

       
      },
      {
        title: "Nha Trang, Việt Nam",
        address: {
          label: "Nha Trang, Việt Nam",
          countryCode: "VNM",
          countryName: "Việt Nam",
          county: "Khánh Hòa",
          city: "Nha Trang",
          postalCode: "57125",
        },
        position: {
          lat: 12.24684,
          lng: 109.18876,
        },
   
      },
      {
        title: "Đà Nẵng, Việt Nam",
        address: {
          label: "Đà Nẵng, Việt Nam",
          countryCode: "VNM",
          countryName: "Việt Nam",
          county: "Đà Nẵng",
          city: "Đà Nẵng",
        },
        position: {
          lat: 16.07934,
          lng: 108.21241,
        },
      },
      {
        title: "Hà Nội, Việt Nam",
        address: {
          label: "Hà Nội, Việt Nam",
          countryCode: "VNM",
          countryName: "Việt Nam",
          county: "Hà Nội",
          city: "Hà Nội",
        },
        position: {
          lat: 21.02139,
          lng: 105.8523,
        },
      },
    ];
  

  

  const handleArea = ({ place , lat , lng}: typeArea) => {
    setPlace(place);
    setPosition({lat,lng});
  };
  return (
    <>
      <div className=" border rounded-lg p-6 bg-white">
        <h3 className="font-semibold text-xl p-4 pt-0">Find To Area</h3>
        <div className=" grid gap-x-6 gap-y-10 grid-cols-3 grid-rows-2">
          <div
            onClick={() =>
              handleArea({
                place: data[0].title,
                lat: data[0].position.lat,
                lng: data[0].position.lng,
              })
            }
          >
            <div className=" w-[109px] h-[109px] rounded-lg overflow-hidden bg-black">
              <Image
                src={"/map/cantho.png"}
                alt=""
                width={109}
                height={109}
                className="object-cover w-full h-full "
              />
            </div>
            <h3 className="mt-2 font-medium text-gray-7">Cần Thơ</h3>
          </div>
          <div onClick={() => handleArea({place : data[5].title , lat : data[5].position.lat , lng: data[5].position.lng })}>
            <div className=" w-[109px] h-[109px] rounded-lg overflow-hidden bg-black">
              <Image
                src={"/map/hanoi.png"}
                alt=""
                width={109}
                height={109}
                className="object-cover w-full h-full "
              />
            </div>
            <h3 className="mt-2 font-medium text-gray-7">Hà Nội</h3>
          </div>
          <div
            onClick={() =>
              handleArea({
                place: data[1].title,
                lat: data[1].position.lat,
                lng: data[1].position.lng,
              })
            }
          >
            <div className=" w-[109px] h-[109px] rounded-lg overflow-hidden bg-black">
              <Image
                src={"/map/hcm.png"}
                alt=""
                width={109}
                height={109}
                className="object-cover w-full h-full "
              />
            </div>
            <h3 className="mt-2 font-medium text-gray-7">HCM</h3>
          </div>
          <div
            onClick={() =>
              handleArea({
                place: data[4].title,
                lat: data[4].position.lat,
                lng: data[4].position.lng,
              })
            }
          >
            <div className=" w-[109px] h-[109px] rounded-lg overflow-hidden bg-black">
              <Image
                src={"/map/nhatrang.png"}
                alt=""
                width={109}
                height={109}
                className="object-cover w-full h-full "
              />
            </div>
            <h3 className="mt-2 font-medium text-gray-7">Nha Trang</h3>
          </div>
          <div
            onClick={() =>
              handleArea({
                place: data[2].title,
                lat: data[2].position.lat,
                lng: data[2].position.lng,
              })
            }
          >
            <div className=" w-[109px] h-[109px] rounded-lg overflow-hidden bg-black">
              <Image
                src={"/map/danang.png"}
                alt=""
                width={109}
                height={109}
                className="object-cover w-full h-full "
              />
            </div>
            <h3 className="mt-2 font-medium text-gray-7">Đà Nẵng</h3>
          </div>
          <div
            onClick={() =>
              handleArea({
                place: data[3].title,
                lat: data[3].position.lat,
                lng: data[3].position.lng,
              })
            }
          >
            <div className=" w-[109px] h-[109px] rounded-lg overflow-hidden bg-black">
              <Image
                src={"/map/halong.png"}
                alt=""
                width={109}
                height={109}
                className="object-cover w-full h-full "
              />
            </div>
            <h3 className="mt-2 font-medium text-gray-7">Hạ Long</h3>
          </div>
        </div>
      </div>
    </>
  );
}