  import Image from "next/image";

  const Invoice = () => {
      return (
        <>
          <div className="mx-20">
            <div className="rounded-2xl border">
              <div className="flex gap-3 flex-col">
                <div className="flex items-center gap-3 px-7">
                  <div className="h-20 w-20 overflow-hidden rounded-full p-4">
                    <Image
                      src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
                      alt=""
                      className="h-full w-full rounded-full object-cover object-center"
                      height={300}
                      width={300}
                    />
                  </div>
                  <div>
                    <div className="text-lg font-bold">Wisdom Pham</div>
                    <span className="rounded-full bg-blue-100 px-4 text-sm font-medium text-blue-950">
                      User
                    </span>
                  </div>
                </div>
                <div className="flex flex-col border-y">
                  <div className="flex gap-14 p-4 px-10">
                    <div className="text-sm font-semibold text-[#666] w-10 text-nowrap">
                      Full Name
                    </div>
                    <div className="flex gap-3 items-center">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                          />
                        </svg>
                      </span>
                      <div className="text-sm font-semibold text-[#222]">
                        khoapham280@gmail.com
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-14 px-10 pb-4">
                    <div className="text-sm font-semibold text-[#666] w-10">
                      Email
                    </div>
                    <div className="flex gap-3 items-center">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                          />
                        </svg>
                      </span>
                      <div className="text-sm font-semibold text-[#222]">
                        khoapham280@gmail.com
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-14 px-10 pb-4">
                    <div className="text-sm font-semibold text-[#666] w-10">
                      Phone
                    </div>
                    <div className="flex gap-3 items-center justify-center">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                          />
                        </svg>
                      </span>
                      <div className="text-sm font-semibold text-[#222]">
                        khoapham280@gmail.com
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-14 px-10 pb-4">
                    <div className="text-sm font-semibold text-[#666] w-10">
                      Address
                    </div>
                    <div className="flex gap-3 items-center justify-center">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                          />
                        </svg>
                      </span>
                      <div className="text-sm font-semibold text-[#222]">
                        khoapham280@gmail.com
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid  grid-cols-2 gap-5 px-10  py-6">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm font-semibold text-[#666]">
                        Check In
                      </div>
                      <div className="text-base font-semibold text-[#222]">
                        12/12/2334
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-sm font-semibold text-[#666]">
                        Check Out
                      </div>
                      <div className="text-base font-semibold text-[#222]">
                        12/12/2334
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-sm font-semibold text-[#666]">
                        Number Of Guest
                      </div>
                      <div className="text-base font-semibold text-[#222]">
                        12/12/2334
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-sm font-semibold text-[#666]">
                        Booking Date
                      </div>
                      <div className="text-base font-semibold text-[#222]">
                        12/12/2334
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t">
                  <div className="text-lg px-10 py-5 font-bold text-[#666]">
                    Information Homestay{" "}
                  </div>
                  <div>
                    <div className="flex  flex-col items-center px-7 mb-10">
                      <div className="border w-full rounded-2xl p-6">
                        <div className="flex mb-5 gap-4">
                          <div>
                            <div className="rounded-xl overflow-hidden w-60 h-40">
                              <Image
                                src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
                                alt=""
                                className="object-cover object-center w-full h-full"
                                height={300}
                                width={300}
                              />
                            </div>
                          </div>
                          <div className="">
                            <div className="text-base font-semibold">Title</div>
                            <div>Address</div>
                          </div>
                        </div>
                        <div className="px-4 py-2 pt-4 border-t text-xl font-semibold">
                          Price details
                        </div>
                        <div className=" px-4 py-2 flex items-start justify-between">
                          <div className="underline text-[#222]">
                            $100 x 7 night
                          </div>
                          <div className=" text-[#222]">$ 7000</div>
                        </div>
                        <div className=" px-4 py-2 flex items-start justify-between">
                          <div className="underline text-[#222]">
                            Cleaning Fee
                          </div>
                          <div className=" text-[#222]">$ 20</div>
                        </div>
                        <div className="pb-5 px-4 py-2 flex items-start justify-between">
                          <div className="underline text-[#222]">
                            East2West Service Fee
                          </div>
                          <div className=" text-[#222]">$ 30</div>
                        </div>
                        <div className="px-4 pt-5 py-2 border-t flex items-start justify-between">
                          <div className="text-base font-semibold">Total</div>
                          <div className="text-base font-semibold">$ 999</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t">
                  <button className="flex items-center gap-2 px-10 border rounded-lg py-2 mx-7 my-2 cursor-pointer bg-orange-400">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6 text-white"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        />
                      </svg>
                    </span>
                    <span className="text-base font-semibold text-white">
                      Download Receipt
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
  }
  export default Invoice;