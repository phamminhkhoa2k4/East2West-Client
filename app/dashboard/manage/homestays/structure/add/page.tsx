"use client"
import InputGroup from "@/components/FormElements/InputGroup";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useMessage } from "@/store/MessageCotext";
import { createData } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type StructureType = {
  structureid: number | null;
  structurename: string;
};
const Create = () => {
  const [structure, setStructure] = useState<StructureType>();
  const { message ,setMessage } = useMessage();
  const router = useRouter();
  
  const handleSubmit = async () => {
    if (structure?.structurename.length! > 0) {
      try {
        const response = await createData({
          endpoint: "/homestays/host/structure",
          payload: structure,
        });
        setMessage({title : "ka" , description: "dflg",status:"success"});
        router.push("/dashboard/manage/homestays/structure");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <DefaultLayout>
        <div>
          <div className="flex flex-col gap-9">
            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                <h3 className="font-semibold text-dark dark:text-white">
                  Create Structure
                </h3>
              </div>
            
                <div className="p-6.5">
                  <InputGroup
                    label="Structure Name"
                    type="text"
                    placeholder="Please Enter Structure Name !"
                    customClasses="w-full mb-4.5"
                    value={structure?.structurename}
                    onChange={(e) => setStructure({structureid: null,structurename:e.target.value})}
                  /> 

                  <div className="mb-6"></div>

                  <button onClick={handleSubmit} className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
                    Create
                  </button>
                </div>
           
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Create;
