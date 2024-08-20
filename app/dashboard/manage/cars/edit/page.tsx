"use client";
import CheckboxTwo from "@/components/FormElements/Checkboxes/CheckboxTwo";
import InputGroup from "@/components/FormElements/InputGroup";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import SelectGroupTwo from "@/components/FormElements/SelectGroup/SelectGroupTwo";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const Update = () => {
  return (
    <>
      <DefaultLayout>
        <div>
          <div className="flex flex-col gap-9">
            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                <h3 className="font-semibold text-dark dark:text-white">
                  Create rental Cars
                </h3>
              </div>
              <form action="#">
                <div className="p-6.5">
                  <InputGroup
                    label="Car Name"
                    type="text"
                    placeholder="Please Enter Car Name !"
                    customClasses="w-full mb-4.5"
                  />
                  <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                    <InputGroup
                      label="Price Per Day"
                      type="text"
                      placeholder="Enter your Price Per Day"
                      customClasses="w-full xl:w-1/2"
                    />
                    <InputGroup
                      label="Year"
                      type="text"
                      placeholder="Enter your Car Year"
                      customClasses="w-full xl:w-1/2"
                    />
                  </div>
                  <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                    <InputGroup
                      label="Seating Capacity"
                      type="text"
                      placeholder="Enter your email address"
                      customClasses="mb-4.5 xl:w-1/2"
                      required
                    />

                    <InputGroup
                      label="Location"
                      type="text"
                      placeholder="Enter your Location"
                      customClasses="mb-4.5 xl:w-1/2"
                    />
                  </div>
                  <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                    <SelectGroupOne
                      label="Make Name"
                      placeholder="Please select Make Name"
                      data={[{ id: 1, name: "kaka" }]}
                    />
                    <SelectGroupOne
                      label="Model Name"
                      placeholder="Please select Model Name"
                      data={[{ id: 1, name: "kaka" }]}
                    />
                  </div>
                  <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                    <SelectGroupOne
                      label="Type Name"
                      placeholder="Please select Type Name"
                      data={[{ id: 1, name: "kaka" }]}
                    />
                    <SelectGroupOne
                      label="Location Type Name"
                      placeholder="Please select Location Type Name"
                      data={[{ id: 1, name: "kaka" }]}
                    />
                  </div>
                  <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                    <SelectGroupOne
                      label="Gearbox"
                      placeholder="Please select Gearbox"
                      data={[{ id: 1, name: "kaka" }]}
                    />
                    <SelectGroupOne
                      label="Fuel"
                      placeholder="Please select Fuel"
                      data={[{ id: 1, name: "kaka" }]}
                    />
                  </div>

                  <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                    <InputGroup
                      label="Fuel Tank Capacity"
                      type="text"
                      placeholder="Enter your email address"
                      customClasses="mb-4.5 xl:w-1/2"
                      required
                    />

                    <InputGroup
                      label="Miles"
                      type="text"
                      placeholder="Enter your Location"
                      customClasses="mb-4.5 xl:w-1/2"
                    />
                  </div>
                  <div className="w-full flex justify-start">
                    <CheckboxTwo />
                  </div>

                  <div className="my-5">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      thumbnail 1
                    </label>
                    <input
                      type="file"
                      className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="my-5">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      thumbnail 2
                    </label>
                    <input
                      type="file"
                      className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="my-5">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      thumbnail 3
                    </label>
                    <input
                      type="file"
                      className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="my-5">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      thumbnail 4
                    </label>
                    <input
                      type="file"
                      className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="my-5">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      thumbnail 5
                    </label>
                    <input
                      type="file"
                      className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="my-5">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      thumbnail 6
                    </label>
                    <input
                      type="file"
                      className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="my-5">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      thumbnail 7
                    </label>
                    <input
                      type="file"
                      className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-6"></div>

                  <button className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Update;
