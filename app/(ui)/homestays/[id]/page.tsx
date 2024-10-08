"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import Gallery from "@/components/homestay/Gallerry"
import ListingDetails from "@/components/homestay/ListingDetails";
import ThingsToKnow from "@/components/homestay/ThingsToKnow";
import TitleDetails from "@/components/homestay/Title";
import WhatsIncluded from "@/components/homestay/WhatsIncluded";
import { getData } from "@/utils/axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
type Role = {
  roleId: number;
  roleName: string;
};

type AmenitiesType = {
  amenitiesid: number;
  amenitiesname: string;
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
 const Detail  = ({ params }: { params: { id: string } }) => {
const [homestay, setHomestay] = useState<Homestay>();
const [owner, setOwner] = useState <User>();
const [loading, setLoading] = useState(true);
const [amenities, setAmenities] = useState<AmenitiesType[] | null>();
const [checkAmenities, setCheckAmenities] = useState<number[]>(
  homestay?.perkIds!,
);




  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const amenities = await getData({
          endpoint: "/homestays/host/amenities",
        });
        setAmenities(amenities);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAmenities();
  }, []);

            
            
   useEffect(() => {
     const getById = async () => {
       try {
         await getData({ endpoint: `/homestays/${Number(params.id)}` }).then(
           async (data: Homestay) => {
             await getData({
               endpoint: `/auth/${data.userId}`,
             }).then((owner: User) => {
               setHomestay(data);
               setOwner(owner);
               setCheckAmenities(data?.perkIds!);
             });
           }
         );
       } catch (err) {
         console.log(err);
       } finally {
         setLoading(false);
       }
     };

     getById();
   }, [params.id]);
   const currentDate = format(new Date(), "yyyy-MM-dd");
   const todayAvailability = homestay?.availability.find((avail) => {
     return avail.date.startsWith(currentDate);
   });
  
   
   return (
     <>
       <div className="mx-20 mt-36">
         {/* <Breadcrumb /> */}
         <TitleDetails
           title={homestay?.title}
           location={homestay?.address}
           ward={homestay?.wardName}
           district={homestay?.districtName}
           province={homestay?.cityProvinceName}
           guest={homestay?.maxGuest}
           bathroom={homestay?.bathroom}
           bed={homestay?.beds}
           room={homestay?.room}
         />
         <Gallery photos={homestay?.photos ?? []} />
         <ListingDetails
           homestay={homestay!}
           description={homestay?.description}
           extraInfo={homestay?.extraInfo}
           pricePerNight={todayAvailability?.pricepernight}
           cleaningFee={homestay?.cleaningFee}
           owner={owner}
           maxGuest={homestay?.maxGuest}
           homestayId={homestay?.homestayid}
         />
         <WhatsIncluded
           amenities={amenities!}
           checkAmenities={checkAmenities}
         />
         <hr className="my-4 border-t border-gray-300" />
         {/* <ThingsToKnow /> */}
       </div>
     </>
   );
 };


export default Detail