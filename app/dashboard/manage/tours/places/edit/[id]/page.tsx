"use client";
import InputGroup from "@/components/FormElements/InputGroup";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { api, getData } from "@/utils/axios";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

interface Place {
  placename: string;
  placethumbnail: string;
  description: string;
  placeduration: string;
}

const Update = () => {
  const { id } = useParams();
  const router = useRouter();
  const [place, setPlace] = useState<Place>({
    placename: "",
    placethumbnail: "",
    description: "",
    placeduration: "",
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setThumbnail(file);
  };

   useEffect(() => {
     const fetchPlace = async () => {
       try {
         const transfer = await getData({
           endpoint: `/itineraries/places/${id}`,
         });
         setPlace(transfer);
       } catch (error) {
         console.log(error);
       }
     };

     fetchPlace();
   }, [id]);

   const handleUpdate = async () => {
     if (!thumbnail) {
        update(place);
     }else{
         const formData = new FormData();

         formData.append("file", thumbnail);
         formData.append("upload_preset", "homestays");

         try {
           const response = await api.post(
             `https://api.cloudinary.com/v1_1/djddnvjpi/image/upload`,
             formData,
             {
               headers: {
                 "Content-Type": "multipart/form-data",
               },
             }
           );

           if (response.data.secure_url) {
             const PlaceData = {
               ...place,
               transferthumbnail: response.data.secure_url,
             };

             update(PlaceData);
           }
         } catch (error) {
           console.error("Error uploading image:", error);
         }
     }

    
   };


  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setPlace((prev) => ({
        ...prev!,
        [name]: checked,
      }));
    } else {
      setPlace((prev) => ({
        ...prev!,
        [name]: value,
      }));
    }
  };
   const update = async (payload: any) => {
     await api.put("/itineraries/places", payload).then((res) => {
       router.push("/dashboard/manage/tours/places");
     });
   };

  return (
    <>
      <DefaultLayout>
        <div className="flex flex-col gap-9">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">
                Edit Places
              </h3>
            </div>

            <div className="p-6.5">
              <div className="flex gap-5 items-center">
                <InputGroup
                  label="Place Name"
                  type="text"
                  name="placename"
                  placeholder="Please Enter Place Name!"
                  customClasses="w-full mb-4.5"
                  value={place?.placename}
                  onChange={handleChange}
                />
                <div className="w-full mb-4.5">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Thumbnail
                  </label>
                  <input
                    type="file"
                    className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-stroke file:px-2.5 file:py-1 file:text-body-xs file:font-medium file:text-dark-5 focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white"
                    onChange={handleFileChange}
                  />
                </div>
                <InputGroup
                  label="Duration"
                  type="text"
                  name="placeduration"
                  placeholder="Please Enter Duration!"
                  customClasses="w-full mb-4.5"
                  value={place?.placeduration}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full mb-4.5">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Description
                </label>
                <textarea
                  rows={6}
                  name="description"
                  placeholder="Please Enter Description!"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  onChange={handleChange}
                  defaultValue={place?.description}
                ></textarea>
              </div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Update;
