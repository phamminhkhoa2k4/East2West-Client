"use client";
import CheckboxTwo from "@/components/FormElements/Checkboxes/CheckboxTwo";
import InputGroup from "@/components/FormElements/InputGroup";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { api, createData } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

interface Accommodation {
  accommodationname: string; //
  accommodationthumbnail: string; //
  accommodationtype: string; //
  roomtype: string; //
  durationaccommodation: string;
  isbreadkfast: boolean;
}

const Create = () => {
  const router = useRouter();
  const [accommodation, setAccommodation] = useState<Accommodation>({
    accommodationname: "",
    accommodationthumbnail: "",
    accommodationtype: "",
    roomtype: "",
    durationaccommodation: "",
    isbreadkfast: false,
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setThumbnail(file);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setAccommodation((prev) => ({
        ...prev!,
        [name]: checked,
      }));
    } else {
      setAccommodation((prev) => ({
        ...prev!,
        [name]: value,
      }));
      console.log("Changed field:", name, "New value:", value);

    }
  };

  const handleCreate = async () => {
    if (!thumbnail) return;

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
        const AccommodationData = {
          ...accommodation,
          accommodationthumbnail: response.data.secure_url,
        };
        console.log(AccommodationData);
       

        await createData({
          endpoint: "/itineraries/accommodations",
          payload: AccommodationData,
        }).then((res) => {
          console.log(res);
          router.push("/dashboard/manage/tours/accommodation");
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
      console.log("la", accommodation.accommodationtype);
      
  },[accommodation.accommodationtype])

  return (
    <>
      <DefaultLayout>
        <div className="flex flex-col gap-9">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">
                Add New Accommodation
              </h3>
            </div>

            <div className="p-6.5">
              <div className="flex gap-5 items-center">
                <InputGroup
                  label="Accommodation Name"
                  type="text"
                  name="accommodationname"
                  placeholder="Please Enter Accommodation Name!"
                  customClasses="w-full mb-4.5"
                  value={accommodation?.accommodationname}
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
              </div>
              <div className="flex gap-5 items-center">
                <SelectGroupOne
                  name="accommodationtype"
                  label="Accommodation Type"
                  placeholder="Please Choose Accommodation Type"
                  onChange={handleChange}
                  options={["hotel", "resort"]}
                  value={accommodation?.accommodationtype}
                />
                <InputGroup
                  label="Room Type"
                  type="text"
                  name="roomtype"
                  placeholder="Please Enter Category Name!"
                  customClasses="w-full mb-4.5"
                  value={accommodation?.roomtype}
                  onChange={handleChange}
                />
                <InputGroup
                  label="Duration"
                  type="text"
                  name="durationaccommodation"
                  placeholder="Please Enter Category Name!"
                  customClasses="w-full mb-4.5"
                  value={accommodation?.durationaccommodation}
                  onChange={handleChange}
                />
              </div>
              <div className="my-5">
                <CheckboxTwo
                  checked={accommodation?.isbreadkfast}
                  name="isbreadkfast"
                  label="Breakfast is included"
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Create;
