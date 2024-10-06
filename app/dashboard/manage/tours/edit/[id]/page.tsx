"use client";
import InputGroup from "@/components/FormElements/InputGroup";
import MultiSelect from "@/components/FormElements/MultiSelect";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DateTimePicker from "@/components/FormElements/DatePicker/MultiDatePicker";

import UploadFiles from "./UploadFiles";
import { createData, getData, updateData } from "@/utils/axios";
import { ChangeEvent, useEffect, useState } from "react";
import Itinerary from "../../add/Itinerary";
import { useParams, useRouter } from "next/navigation";

interface FileWithPreview extends File {
  preview: string;
}

interface CategoryTour {
  categoryTourId: number;
  categoryTourName: string;
}

interface ThemeTour {
  themeTourId: number;
  themeTourName: string;
}

interface SuitableTour {
  suitableTourId: number;
  suitableName: string;
}

interface DateTimeOption {
  id: string;
  dateTime: string;
}

type ToursInfoType = {
  title: string;
  price: number;
  groupsize: string;
  deposit: string;
  bookinghold: string;
  bookingchange: string;
  categoryTourId: number[];
  themeTourId: number[];
  suitableTourId: number[];
  departureDates: DateTimeOption[];
  thumbnail: string[];
  itineraries: ItinerarType[];
};
interface Accommodation {
  accommodationid: number;
  accommodationname: string;
  durationaccommodation: string;
  accommodationtype: string;
  isbreadkfast: boolean;
  accommodationthumbnail: string;
  roomtype: string;
}

interface Meal {
  mealid: number;
  mealname: string;
  mealthumbnail: string;
  mealduration: string;
  mealactivity: string;
}

interface Place {
  placeid: number;
  placename: string;
  placethumbnail: string;
  description: string;
  placeduration: string;
}

interface Transfer {
  transferid: number;
  transfername: string;
  transferthumbnail: string;
  description: string;
  transferduration: string;
}

interface ItinerarType {
  itineraryId?: number;
  tourPackageId?: number;
  accommodationIds?: number[];
  mealIds?: number[];
  placeIds?: number[];
  transferIds?: number[];
  day: number;
}

// Interface cho departure date
interface DepartureDate {
  departuredateid: string;
  departuredate: string;
}

// Interface cho accommodation
interface Accommodation {
  accommodationid: number;
  accommodationname: string;
}

// Interface cho itinerary
interface ItineraryDataType {
  day: number;
  accommodations: Accommodation[];
  meals:Meal[];
  transfers:Transfer[];
  places:Place[]
}

interface PackageTourInfo {
  packageid: number;
  title: string;
  bookingchange: string;
  bookinghold: string;
  categoryTours: CategoryTour[];
  departureDates: DepartureDate[];
  deposit: string;
  groupsize: string;
  itineraries: ItineraryDataType[];
  price: number;
  suitableTours: SuitableTour[];
  themeTours: ThemeTour[];
  thumbnail: string[];
}

const Update = () => {
  const { id } = useParams();
  const router = useRouter();
  const [toursInfo, setToursInfo] = useState<ToursInfoType>({
    title: "",
    price: 0,
    groupsize: "",
    deposit: "",
    bookinghold: "",
    bookingchange: "",
    categoryTourId: [],
    themeTourId: [],
    suitableTourId: [],
    departureDates: [],
    thumbnail: [],
    itineraries: [],
  });


  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [categories, setCategories] = useState<CategoryTour[]>([]);
  const [themes, setThemes] = useState<ThemeTour[]>([]);
  const [suitable, setSuitable] = useState<SuitableTour[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isItinerary, setItinerary] = useState<boolean>(true);
  const [packageId,setPackageId] = useState<number>(0)
  const [thumbnailUrl,setThumbnailUrl] = useState<string[]>([])
  const [days, setDays] = useState<number[]>([1]);

  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [places, setPlaces] = useState<Place[]>();
  const [accommodation, setAccommodation] = useState<Accommodation[]>([]);
  const [meals, setMeals] = useState<Meal[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tours: PackageTourInfo = await getData({
          endpoint: `/tours/${id}`,
        });
        setToursInfo((prev) => ({
          ...prev,
          bookingchange: tours?.bookingchange,
          bookinghold: tours?.bookinghold,
          departureDates: tours?.departureDates.map((dd) => ({
            id: dd.departuredateid,
            dateTime: dd.departuredate,
          })),
          deposit: tours?.deposit,
          groupsize: tours?.groupsize,
          price: tours?.price,
          title: tours?.title,
          thumbnail: tours?.thumbnail,
          itineraries: 
              tours?.itineraries.map((itin) => ({
              transferIds: itin?.transfers?.map((transfer) => transfer.transferid),
              placeIds:itin?.places?.map((place) => place.placeid),
              accommodationIds: itin?.accommodations?.map((acc) => acc.accommodationid ),
              mealIds:itin?.meals?.map((meal) => meal.mealid),
              day: itin?.day!
            })),
          
          categoryTourId: 
          tours?.categoryTours.map((ca) => ca.categoryTourId),
          
          suitableTourId: 
            tours?.suitableTours.map((su) => su.suitableTourId),
          
          themeTourId: tours?.themeTours.map((th) => th.themeTourId),
        }));
        setSuitable(tours?.suitableTours);
        setCategories(tours?.categoryTours);
        setThemes(tours?.themeTours);
        setDays([...tours?.itineraries.map((itin) => itin.day)]);
        setPackageId(tours?.packageid);   
        setThumbnailUrl(tours?.thumbnail)     

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    console.log("kaka", toursInfo);
  }, [toursInfo]);


  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          categories,
          themes,
          suitable,
          transfers,
          meals,
          places,
          accommodations,
        ] = await Promise.all([
          getData({ endpoint: "/tours/category" }),
          getData({ endpoint: "/tours/theme" }),
          getData({ endpoint: "/tours/suitable" }),
          getData({ endpoint: "/itineraries/transfers" }),
          getData({ endpoint: "/itineraries/meals" }),
          getData({ endpoint: "/itineraries/places" }),
          getData({ endpoint: "/itineraries/accommodations" }),
        ]);
        setCategories(categories);
        setThemes(themes);
        setSuitable(suitable);
        setTransfers(transfers);
        setMeals(meals);
        setPlaces(places);
        setAccommodation(accommodations);
      } catch (error) {
        setError("Failed to load data. Please try again later.");
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpload = async (): Promise<string[]> => {
    if (files.length === 0) {
      console.log("sdsd", thumbnailUrl);
      update(thumbnailUrl);
      
      return [];

    }else{
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "homestays");

        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/djddnvjpi/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          const result = await response.json();
          return result.secure_url;
        } catch (error) {
          console.error("Upload failed:", error);
          return null;
        }
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const newImageUrls = uploadedUrls.filter(
        (url) => url !== null
      ) as string[];
      return newImageUrls;
    }

    
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setToursInfo((prev) => ({ ...prev!, [name]: value }));
  };

  const handleDateTimeChange = (
    selectedDates: { id: string; dateTime: string }[]
  ) => {
    setToursInfo((prev) => ({
      ...prev!,
      departureDates: selectedDates,
    }));
  };

  const handleMultiSelectChange = (name: string, selectedOptions: any[]) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setToursInfo((prev) => ({ ...prev!, [name]: selectedValues }));
  };

  const categoryOptions = categories?.map((category) => ({
    value: category.categoryTourId,
    text: category.categoryTourName,
    selected: false,
  }));

  const themeOptions = themes?.map((theme) => ({
    value: theme.themeTourId,
    text: theme.themeTourName,
    selected: false,
  }));

  const suitableOptions = suitable?.map((suitable) => ({
    value: suitable.suitableTourId,
    text: suitable.suitableName,
    selected: false,
  }));

  const handleUpdate = async () => {
    await handleUpload()
      .then(async (data) => {
        if (data.length > 0) {
              console.log("kakaka",[...thumbnailUrl, ...data]);
              
              update([...thumbnailUrl,...data]);
          
        } else {    
          console.log("upload fail !!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const update = async (url : string[]) => {
        await updateData({
          id: packageId,
          endpoint: "tours/admin",
          payload: {
            ...toursInfo,
            thumbnail: url,
          },
        })
          .then((data) => {
            if (data) {
              router.push("/dashboard/manage/tours");
            }
          })
          .catch((error) => {
            console.log(error);
          });
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-9 mb-5">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke py-4 px-7 dark:border-dark-3">
            <h3 className="font-medium text-black dark:text-white">
              Create Tour Package
            </h3>
          </div>

          <div className="p-7">
            <div className="flex items-center gap-5 mb-5">
              <InputGroup
                type="text"
                placeholder=""
                customClasses="w-2/3"
                label="Title"
                name="title"
                value={toursInfo?.title}
                onChange={handleChange}
              />
              <InputGroup
                placeholder="number"
                label="Price"
                name="price"
                customClasses="w-1/3"
                type="number"
                value={String(toursInfo?.price!)}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center gap-5 mb-5">
              <InputGroup
                placeholder=""
                label="Group Size"
                name="groupsize"
                type="number"
                value={toursInfo?.groupsize}
                onChange={handleChange}
              />
              <InputGroup
                placeholder=""
                label="Deposit"
                name="deposit"
                type="number"
                value={toursInfo?.deposit}
                onChange={handleChange}
              />
              <InputGroup
                placeholder=""
                label="Booking Hold"
                name="bookinghold"
                type="text"
                value={toursInfo?.bookinghold}
                onChange={handleChange}
              />
              <InputGroup
                placeholder=""
                label="Booking Change"
                name="bookingchange"
                type="text"
                value={toursInfo?.bookingchange}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center gap-5 mb-5">
              <MultiSelect
                label="Category Tour"
                options={categoryOptions}
                selectedOptions={toursInfo?.categoryTourId?.map((id) => ({
                  value: id,
                  text:
                    categories.find(
                      (category) => category.categoryTourId === id
                    )?.categoryTourName || "",
                }))}
                onChange={(selectedOptions) =>
                  handleMultiSelectChange("categoryTourId", selectedOptions)
                }
              />

              <MultiSelect
                label="Theme Tour"
                id=""
                placeholder=""
                selectedOptions={toursInfo?.themeTourId?.map((id) => ({
                  value: id,
                  text:
                    themes.find((theme) => theme.themeTourId === id)
                      ?.themeTourName || "",
                }))}
                options={themeOptions}
                onChange={(selectedOptions) =>
                  handleMultiSelectChange("themeTourId", selectedOptions)
                }
              />
              <MultiSelect
                label="Suitable Tour"
                selectedOptions={toursInfo?.suitableTourId?.map((id) => ({
                  value: id,
                  text:
                    suitable.find((sui) => sui.suitableTourId === id)
                      ?.suitableName || "",
                }))}
                options={suitableOptions}
                onChange={(selectedOptions) =>
                  handleMultiSelectChange("suitableTourId", selectedOptions)
                }
              />
            </div>
            <div className="flex gap-10 ">
              <div className="w-1/2">
                <DateTimePicker
                  id=""
                  placeholder=""
                  label="Departure Dates"
                  selectedDates={toursInfo?.departureDates || []}
                  onChange={handleDateTimeChange}
                />
              </div>
              <div className="w-1/2">
                <UploadFiles
                  files={files}
                  setFiles={setFiles}
                  handleUpload={handleUpload}
                  imageUrls={[]}
                  // imageUrls={imageUrls}
                  setIsOpen={function (value: boolean): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>
            </div>

            <button
              className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
              onClick={() => {
                // if (!toursInfo) {
                setItinerary(true);
                // }
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {isItinerary && (
        <Itinerary
          handleCreate={handleUpdate}
          days={days}
          setDays={setDays}
          transfers={transfers!}
          places={places!}
          accommodation={accommodation!}
          meals={meals!}
          setTransfers={setTransfers}
          setPlaces={setPlaces}
          setAccommodation={setAccommodation}
          setMeals={setMeals}
          toursInfo={toursInfo}
          setToursInfo={setToursInfo}
        />
      )}
    </DefaultLayout>
  );
};

export default Update;
