"use client"
import InputGroup from "@/components/FormElements/InputGroup";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { createData, getData } from "@/utils/axios";
import { useEffect, useState } from "react";

type AmenitiesType = {
  amenitiesid: number;
  amenitiesname: string;
};


const Update = ({params}:{params : {id:string}}) => {
  const [amenities, setAmenities] = useState<AmenitiesType>();
  const [amenity, setAmenity] = useState<AmenitiesType>();
  useEffect(() => {
      const fetchAmenities = async () => {
        try {
          const amenities = await getData({endpoint: `/homestays/host/amenities/${params.id}`});
          setAmenity(amenities);
        } catch (error) {
          console.log(error);
        }

        
      }
      fetchAmenities();
  },[])


  useEffect(() => {
    setAmenities(amenity);
  }, [amenity]);
  

  const handleSave = async () => {
    try{
        const response = await createData({
          endpoint: "/homestays/host/amenities",
          payload: amenities,
        });
        

    }catch(error){
      console.log(error);
      
    }
  }
  return (
    <>
      <DefaultLayout>
        <div>
          <div className="flex flex-col gap-9">
            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                <h3 className="font-semibold text-dark dark:text-white">
                  Edit Amenities
                </h3>
              </div>
              
                <div className="p-6.5">
                  <InputGroup
                    label="Amenities Name"
                    type="text"
                    placeholder="Please Enter Amenities Name !"
                    customClasses="w-full mb-4.5"
                    value={amenities?.amenitiesname}
                    onChange={(e) => setAmenities({amenitiesid : Number(params.id),amenitiesname:e.target.value })}
                  />

                  <div className="mb-6"></div>

                  <button
                    onClick={handleSave}
                    className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
                  >
                    Save
                  </button>
                </div>
         
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Update;
