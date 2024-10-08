"use client";
import { api } from "../../utils/axios";
import { useState, useEffect, useCallback, Suspense } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CardSearch from "./CardSearch";
import Loading from "../Loading";
import { useLoading } from "@/store/loadingContext";
// import Slider from "@/components/ui/Slider";
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
interface TourPackage {
  packageId: number;
  title: string;
  price: number;
  groupsize: string;
  deposit: string;
  bookinghold: string;
  bookingchange: string;
  categoryTourId: number[];
  themeTourId: number[];
  suitableTourId: number[];
  thumbnail: string[];
  itineraries: ItineraryDataType[];
}

interface ItineraryDataType {
  day: number;
  accommodations: Accommodation[];
  meals: Meal[];
  transfers: Transfer[];
  places: Place[];
}

interface Category {
  categoryTourId: number;
  categoryTourName: string;
}

interface Theme {
  themeTourId: number;
  themeTourName: string;
}

interface Suitable {
  suitableTourId: number;
  suitableName: string;
}

interface FilterParams {
  title?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: number;
  themeId?: number;
  suitableId?: number;
}

const PackageSearchResult = () => {
  const [tourPackage, setTourPackage] = useState<TourPackage[]>([]);
    const { isLoading, setIsLoading } = useLoading();

  const [error, setError] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [suitables, setSuitables] = useState<Suitable[]>([]);
  const [filters, setFilters] = useState<FilterParams>({
    minPrice: 0,
    maxPrice: 1000,
  });

 useEffect(() => {
   const fetchData = async () => {
     setIsLoading(true); 
     try {
       const [tourResponse, categoryResponse, themeResponse, suitableResponse] =
         await Promise.all([
           api.get<TourPackage[]>("/tours"),
           api.get<Category[]>("/tours/category"),
           api.get<Theme[]>("/tours/theme"),
           api.get<Suitable[]>("/tours/suitable"),
         ]);

       setTourPackage(tourResponse.data);
       setCategories(categoryResponse.data);
       setThemes(themeResponse.data);
       setSuitables(suitableResponse.data);
     } catch (error) {
       setError(error instanceof Error ? error.message : "Unknown error");
       console.error("Error fetching data:", error);
     } finally {
       setIsLoading(false); 
     }
   };

   fetchData();
 }, []);


  const sortPackages = useCallback(
    (value: string) => {
      if (!tourPackage) return;

      let sortedPackages: TourPackage[];
      switch (value) {
        case "price":
          sortedPackages = [...tourPackage].sort((a, b) => a.price - b.price);
          break;
        case "title":
          sortedPackages = [...tourPackage].sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          break;
        default:
          sortedPackages = tourPackage;
      }
      setTourPackage(sortedPackages);
    },
    [tourPackage]
  );
  useEffect(() => {
    if (selectedValue) {
      sortPackages(selectedValue);
    }
  }, [selectedValue, tourPackage, sortPackages]);

 

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = async () => {
    try {
      const response = await api.get<TourPackage[]>("/tours/search", {
        params: filters,
      });
      setTourPackage(response.data);
    } catch (error) {
      console.error("Error fetching filtered tours:", error);
    }
  };

  const handleClearAll = () => {
    setFilters({
      title: "",
      minPrice: 0,
      maxPrice: 1000,
      categoryId: undefined,
      themeId: undefined,
      suitableId: undefined,
    });
    setTourPackage([]); // Clear current packages if necessary
  };

  return (
    <>
      {isLoading && <Loading />}{" "}
      {!isLoading && (
        <div className="border rounded-3xl shadow-lg mb-6">
          <div className="flex border-b">
            <div className="p-5 w-1/4 border-r font-semibold">FILTERS</div>
            <div className="p-5 w-3/4 font-semibold">ALL PACKAGES</div>
          </div>
          <div className="flex">
            <div className="p-5 w-1/4 border-r">
              <div className="filters">
                <div className="flex items-center gap-2">
                  <label className="text-nowrap">Tour Name:</label>
                  <input
                    type="text"
                    name="title"
                    className="border rounded-lg w-full my-5 py-2 px-4 outline-none"
                    value={filters.title || ""}
                    onChange={handleFilterChange}
                    placeholder="Search by tour name"
                  />
                </div>
                <div>
                  <label>Category</label>
                  <Select
                    name="categoryId"
                    onValueChange={(value) =>
                      setFilters({ ...filters, categoryId: Number(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {filters.categoryId
                          ? categories.find(
                              (c) => c.categoryTourId === filters.categoryId
                            )?.categoryTourName
                          : "Select Category"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.categoryTourId}
                            value={category.categoryTourId.toString()}
                          >
                            {category.categoryTourName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label>Theme</label>
                  <Select
                    name="themeId"
                    onValueChange={(value) =>
                      setFilters({ ...filters, themeId: Number(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {filters.themeId
                          ? themes.find(
                              (t) => t.themeTourId === filters.themeId
                            )?.themeTourName
                          : "Select Theme"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Themes</SelectLabel>
                        {themes.map((theme) => (
                          <SelectItem
                            key={theme.themeTourId}
                            value={theme.themeTourId.toString()}
                          >
                            {theme.themeTourName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label>Suitable</label>
                  <Select
                    name="suitableId"
                    onValueChange={(value) =>
                      setFilters({ ...filters, suitableId: Number(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {filters.suitableId
                          ? suitables.find(
                              (s) => s.suitableTourId === filters.suitableId
                            )?.suitableName
                          : "Select Suitable"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Suitables</SelectLabel>
                        {suitables.map((suitable) => (
                          <SelectItem
                            key={suitable.suitableTourId}
                            value={suitable.suitableTourId.toString()}
                          >
                            {suitable.suitableName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {/* <div>
                <label>Price Range</label>
                <Slider
                  step={1}
                  min={0}
                  max={1000}
                  values={[filters.minPrice || 0, filters.maxPrice || 1000]}
                  onChange={(values) =>
                    setFilters({
                      ...filters,
                      minPrice: values[0],
                      maxPrice: values[1],
                    })
                  }
                />
              </div> */}
                <div className="flex items-center justify-between my-5">
                  <button
                    onClick={handleSearch}
                    className="bg-blue-500 rounded px-4 py-2"
                  >
                    Search
                  </button>
                  <button
                    onClick={handleClearAll}
                    className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
            <div className="p-5 w-3/4">
              {tourPackage.length === 0 ? (
                <div>No packages found with the selected filters.</div>
              ) : (
                tourPackage.map((pkg) => (
                  <CardSearch key={pkg.packageId} tourPackage={pkg} />
                ))
              )}
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
};

export default PackageSearchResult;
