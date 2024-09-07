"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckboxTwo from "@/components/FormElements/Checkboxes/CheckboxTwo";
import InputGroup from "@/components/FormElements/InputGroup";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import SearchForm from "@/components/Header/SearchForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import StaffTable from "@/components/Tables/StaffTable";
import { DataRow } from "@/types/table";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

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
  { key: "action", label: "Action" } // Add Action column
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

interface FormattedTourData {
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
  action?: JSX.Element; // Use optional property if not always needed
}
const Staff = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<FormattedTourData[]>([]);
  const router = useRouter(); // Initialize useRouter

  const fetchData = async (query = "") => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/tours${query ? `/search/name?title=${query}` : ""}`
      );
      const result: TourPackage[] = await response.json();
      const formattedData: FormattedTourData[] = result.map((tour: TourPackage) => ({
        thumbnail: `/images/${tour.thumbnail}`,
        title: tour.title,
        price: tour.price,
        priceReduce: tour.pricereduce,
        groupSize: tour.groupsize,
        deposit: tour.deposit,
        bookingHold: tour.bookinghold,
        bookingChange: tour.bookingchange,
        themes: tour.themeTours.map((theme) => theme.themeTourName).join(", "),
        suitable: tour.suitableTours.map((suitable) => suitable.suitableName).join(", "),
        category: tour.categoryTours.map((category) => category.categoryTourName).join(", "),
        departure: tour.departureDate
          .map((date) => new Date(date.departuredate).toLocaleDateString())
          .join(", "),
        itinerary: tour.itineraries
          .map(
            (itinerary) =>
              `Day: ${new Date(itinerary.day).toLocaleDateString()} - ${itinerary.places
                .map((place) => place.placename)
                .join(", ")}`
          )
          .join(" | "),
        action: (
          <button
            className="bg-primary text-white py-1 px-3 rounded"
            onClick={() => router.push(`/dashboard/staff/tours/booking/${tour.packageid}`)} // Navigate to RentalStaff with tour id
          >
            Book
          </button>
        )
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchData(query);
  };

  useEffect(() => {
    fetchData(); // Fetch all data when the page loads
  }, []);

  return (
    <>
      <DefaultLayout>
        <div className="mx-auto w-full max-w-[1080px]">
          <Breadcrumb pageName="Staff" />
          <SearchForm onSearch={handleSearch} />
          <StaffTable columns={columns} data={data} title="Tours" />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Staff;
