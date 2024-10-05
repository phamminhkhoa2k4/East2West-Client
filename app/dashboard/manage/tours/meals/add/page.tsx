"use client";
import InputGroup from "@/components/FormElements/InputGroup";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { api, createData } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface Meal {
  mealname: string;
  mealthumbnail: string;
  mealduration: string;
  mealactivity: string;
}

const Create = () => {
  const router = useRouter();
  const [meal, setMeal] = useState<Meal>({
    mealname: "",
    mealthumbnail: "",
    mealduration: "",
    mealactivity: "",
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setThumbnail(file);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setMeal((prev) => ({
        ...prev!,
        [name]: checked,
      }));
    } else {
      setMeal((prev) => ({
        ...prev!,
        [name]: value,
      }));
    }
  };

  const handleCreate = async () => {
    if (!thumbnail) {
       await createData({
         endpoint: "/itineraries/meals",
         payload: meal,
       }).then((res) => {
         console.log(res);
         router.push("/dashboard/manage/tours/meals");
       });
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
            const MealData = {
              ...meal,
              mealthumbnail: response.data.secure_url,
            };

            await createData({
              endpoint: "/itineraries/meals",
              payload: MealData,
            }).then((res) => {
              console.log(res);
              router.push("/dashboard/manage/tours/meals");
            });
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
    }

    
  };

  return (
    <>
      <DefaultLayout>
        <div className="flex flex-col gap-9">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">
                Add New Place
              </h3>
            </div>

            <div className="p-6.5">
              <div className="flex gap-5 items-center">
                <InputGroup
                  label="Meal Name"
                  type="text"
                  name="mealname"
                  placeholder="Please Enter Meal Name!"
                  customClasses="w-full mb-4.5"
                  value={meal?.mealname}
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
                  name="mealduration"
                  placeholder="Please Enter Duration!"
                  customClasses="w-full mb-4.5"
                  value={meal?.mealduration}
                  onChange={handleChange}
                />
              </div>
              <InputGroup
                label="Meal Activity"
                type="text"
                name="mealactivity"
                placeholder="Please Enter Meal Activity!"
                customClasses="w-full mb-4.5"
                value={meal?.mealactivity}
                onChange={handleChange}
              />
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
