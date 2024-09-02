"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckboxTwo from "@/components/FormElements/Checkboxes/CheckboxTwo";
import InputGroup from "@/components/FormElements/InputGroup";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import StaffTable from "@/components/Tables/StaffTable";
import { DataRow } from "@/types/table";
import { useEffect, useState } from "react";


const columns = [
  { key: "thumbnail", label: "Thumbnail" },
  { key: "title", label: "Title" },
  { key: "price", label: "Price", isNumeric: true },
  { key: "priceReduce", label: "Price Reduce", isNumeric: true },
  { key: "groupSize", label: "Group Size" },
  { key: "deposit", label: "Deposit" },
  { key: "bookingHold", label: "Booking Hold" },
  { key: "bookingChange", label: "Booking Change" },
  { key: "themes", label: "Themes" },
  { key: "suitable", label: "Suitable" },
  { key: "category", label: "Category" },
  { key: "departure", label: "Departure Date" },
  { key: "itinerary", label: "Itinerary" },
];


interface Itinerary {
  itineraryId: number;
  accommodations: Accommodation[];
  meals: Meal[];
  places: Place[];
  day: string;
}

interface Accommodation {
  accommodationid: number;
  accommodationname: string;
  durationaccommodation: string;
  accommodationtype: string;
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

interface DepartureDate {
  departuredateid: number;
  departuredate: string;
}

interface TourPackage {
  packageid: number;
  title: string;
  thumbnail: string;
  price: number;
  pricereduce: number;
  groupsize: string;
  deposit: string;
  bookinghold: string;
  bookingchange: string;
  itineraries: Itinerary[];
  categoryTours: CategoryTour[];
  themeTours: ThemeTour[];
  suitableTours: SuitableTour[];
  departureDate: DepartureDate[];
}

interface FormattedTourData extends DataRow {
  thumbnail: string;
  title: string;
  price: number;
  priceReduce: number;
  groupSize: string;
  deposit: string;
  bookingHold: string;
  bookingChange: string;
  themes: string;
  suitable: string;
  category: string;
  departure: string;
  itinerary: string;
}
const Staff = () => {
    const [data, setData] = useState<FormattedTourData[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/tours");
          const result: TourPackage[] = await response.json();

          const formatDepartureDates = (dates: { departuredate: string }[]) => {
            return dates
              .map((date) => new Date(date.departuredate).toLocaleDateString())
              .join(", ");
          };

          // Inside your data mapping:
          const formattedData: FormattedTourData[] = result.map(
            (tour: TourPackage) => ({
              thumbnail: `/images/${tour.thumbnail}`, // Assuming images are in the public/images folder
              title: tour.title,
              price: tour.price,
              priceReduce: tour.pricereduce,
              groupSize: tour.groupsize,
              deposit: tour.deposit,
              bookingHold: tour.bookinghold,
              bookingChange: tour.bookingchange,
              themes: tour.themeTours
                .map((theme) => theme.themeTourName)
                .join(", "),
              suitable: tour.suitableTours
                .map((suitable) => suitable.suitableName)
                .join(", "),
              category: tour.categoryTours
                .map((category) => category.categoryTourName)
                .join(", "),
              departure: tour.departureDate
                .map((date) =>
                  new Date(date.departuredate).toLocaleDateString()
                )
                .join(", "),
              itinerary: tour.itineraries
                .map(
                  (itinerary) =>
                    `Day: ${new Date(
                      itinerary.day
                    ).toLocaleDateString()} - ${itinerary.places
                      .map((place) => place.placename)
                      .join(", ")}`
                )
                .join(" | "),
            })
          );

          setData(formattedData);
        } catch (error) {
          console.error("Error fetching tours:", error);
        }
      };

      fetchData();
    }, []);
  return (
    <>
      <DefaultLayout>
        <div className="mx-auto w-full max-w-[1080px]">
          <Breadcrumb pageName="Staff" />

          <StaffTable columns={columns} data={data} title="Tours" />
          
        </div>
      </DefaultLayout>
      
    </>
  );
};

export default Staff;










