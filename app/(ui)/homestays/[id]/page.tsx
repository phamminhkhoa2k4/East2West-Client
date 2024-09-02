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

 const Detail  = ({ params }: { params: { id: string } }) => {
const [homestay, setHomestay] = useState<Homestay>();
const [owner, setOwner] = useState();
const [loading, setLoading] = useState(true);
const [checkIn, setCheckIn] = useState();
const [checkOut, setCheckOut] = useState();



            
            
   useEffect(() => {
       const getById = async () => {
         try {
           const data = await getData({ endpoint: `/homestays/${Number(params.id)}` });
           const owner = await getData({
             endpoint: `/homestays/owner/${Number(homestay?.userid)}`,
           });
           setHomestay(data);
           setOwner(owner);
         } catch (err) {
           console.log(err);
         } finally {
           setLoading(false);
         }
       };

       getById();
       
   },[])
   const currentDate = format(new Date(), "yyyy-MM-dd");
   const todayAvailability = homestay?.availability.find((avail) => {
     return avail.date.startsWith(currentDate);
   });
  
   
   return (
     <>
       <div className="mx-20 mt-36">
         <Breadcrumb />
         <TitleDetails
           title={homestay?.title}
           location={homestay?.address}
           guest={homestay?.maxguest}
           bath={1}
           bed={2}
         />
         <Gallery />
         <ListingDetails
           description={homestay?.description}
           extraInfo={homestay?.exactinfo}
           pricePerNight={todayAvailability?.pricepernight}
           cleaningFee={homestay?.cleaningfee}
           owner={owner}
           maxGuest={homestay?.maxguest}
           homestayId={homestay?.homestayid}
         />
         <WhatsIncluded />
         <hr className="my-4 border-t border-gray-300" />
         <ThingsToKnow />
       </div>
     </>
   );
 };


export default Detail