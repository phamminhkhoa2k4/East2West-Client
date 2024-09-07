"use client"
import InputGroup from "@/components/FormElements/InputGroup";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { createData, getData, updateData } from "@/utils/axios";
import { useEffect, useState } from "react";


type StructureType = {
  structureid: number;
  structurename: string;
};
const Update = ({params} : {params : {id :string}}) => {
  const [structures, setStructures] = useState<StructureType>();
  const [structure, setStructure] = useState<StructureType>();

  useEffect(() => {
    const fetchStructures = async () => {
      try {
        const structures = await getData({
          endpoint: `/homestays/host/structure/${params.id}`,
        });
        setStructure(structures);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStructures();
  }, []);

  useEffect(() => {
    setStructures(structure);
  }, [structure]);

  const handleSave = async () => {
    try {
      const response = await createData({
        endpoint: "/homestays/host/structure",
        payload: structures,
      });
    } catch (error) {
      console.log(error);
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
                  Edit Structure
                </h3>
              </div>
   
                <div className="p-6.5">
                  <InputGroup
                    label="Structure Name"
                    type="text"
                    placeholder="Please Enter Structure Name !"
                    customClasses="w-full mb-4.5"
                    value={structures?.structurename}
                    onChange={(e) =>
                      setStructures({
                        structureid: Number(params.id),
                        structurename: e.target.value,
                      })
                    }
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
    