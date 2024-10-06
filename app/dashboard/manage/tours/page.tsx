"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";
import { DataRow } from "@/types/table";
import { getData } from "@/utils/axios";

const columns = [
  { key: "packageid", label: "id" },
  { key: "thumbnail", label: "Thumbnail" },
  { key: "title", label: "Title" },
  { key: "price", label: "Price", isNumeric: true },
  { key: "groupSize", label: "Group Size" },
  { key: "deposit", label: "Deposit" },
  { key: "bookingHold", label: "Booking Hold" },
  { key: "bookingChange", label: "Booking Change" },
  { key: "themes", label: "Themes" },
  { key: "suitable", label: "Suitable" },
  { key: "category", label: "Category" },
  { key: "departure", label: "Departure Date" },
  { key: "itineraries", label: "Itinerary" },
  { key: "action", label: "Action" },
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
  isbreadkfast: boolean;
  accommodationthumbnail: string[];
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
  groupSize: string;
  deposit: string;
  bookingHold: string;
  bookingChange: string;
  themes: string;
  suitable: string;
  category: string;
  departure: string;
  itineraries: string;
}
const Tour = () => {
  const [data, setData] = useState<FormattedTourData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData({ endpoint: "/tours" });
        console.log(response);

        const formatDepartureDates = (dates: { departuredate: string }[]) => {
          return dates
            .map((date) => new Date(date.departuredate).toLocaleDateString())
            .join(", ");
        };

        // Inside your data mapping:
        const formattedData: FormattedTourData[] = response.map(
          (tour: TourPackage) => ({
            packageid: tour.packageid,
            thumbnail: tour.thumbnail[0],
            title: tour.title,
            price: tour.price,
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
              .map((date) => new Date(date.departuredate).toLocaleDateString())
              .join(", "),
            itineraries: tour.itineraries,
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
    <DefaultLayout>
      <CustomTable
        columns={columns}
        data={data}
        title="Tours"
        createUrl="/dashboard/manage/tours/add"
        editUrl="/dashboard/manage/tours/edit"
<<<<<<< HEAD
        deleteUrl="tours/admin"
=======
        deleteUrl="/tours/admin/{id}"
>>>>>>> 7ec56dd (add delete fetch)
      />
      <div></div>
    </DefaultLayout>
  );
};

export default Tour;
