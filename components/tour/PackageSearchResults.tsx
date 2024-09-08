"use client";
import { api } from "../../utils/axios";
import { useState, useEffect } from "react";
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
import Slider from "@/components/ui/Slider";

interface TourPackage {
  packageId: number;
  title: string;
  price: number;
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
  categoryTourId: number[];
  themeTourId: number[];
  suitableTourId: number[];
  budget: string;
}
const PackageSearchResult = () => {
  const [tourPackage, setTourPackage] = useState<TourPackage[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [suitables, setSuitables] = useState<Suitable[]>([]);
  const [filters, setFilters] = useState<FilterParams>({minPrice: 0,maxPrice: 1000});

  useEffect(() => {
    const fetchTourPackage = async () => {
      try {
        const response = await api.get<TourPackage[]>("/tours");
        setTourPackage(response.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get<Category[]>("/tours/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchThemes = async () => {
      try {
        const response = await api.get<Theme[]>("/tours/theme");
        setThemes(response.data);
      } catch (error) {
        console.error("Error fetching themes:", error);
      }
    };

    const fetchSuitables = async () => {
      try {
        const response = await api.get<Suitable[]>("/tours/suitable");
        setSuitables(response.data);
      } catch (error) {
        console.error("Error fetching suitables:", error);
      }
    };

    fetchCategories();
    fetchThemes();
    fetchSuitables();
    fetchTourPackage();
  }, []);

  useEffect(() => {
    if (selectedValue) {
      sortPackages(selectedValue);
    }
  }, [selectedValue, tourPackage]);

  const sortPackages = (value: string) => {
    if (!tourPackage) return;

    let sortedPackages: TourPackage[];
    switch (value) {
      case "price":
        sortedPackages = [...tourPackage].sort((a, b) => a.price - b.price);
        break;
      case "title":
        sortedPackages = [...tourPackage].sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        sortedPackages = tourPackage;
    }
    setTourPackage(sortedPackages);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = async () => {
    try {
      const response = await api.get<TourPackage[]>('/tours/search', { params: filters });
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
      suitableId: undefined
    });
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="border rounded-3xl shadow-lg mb-6">
        <div className="flex border-b">
          <div className="p-5 w-1/4 border-r font-semibold">FILTERS</div>
          <div className="p-5 w-3/4 font-semibold">ALL PACKAGES</div>
        </div>
        <div className="flex">
          <div className="p-5 w-1/4 border-r">
            <div className="filters">
              <div>
              <div>
                <label>Tour Name</label>
                <input
                  type="text"
                  name="title"
                  value={filters.title || ""}
                  onChange={handleFilterChange}
                  placeholder="Search by tour name"
                />
              </div>
                <label>Category</label>
                <Select
                  name="categoryId"
                  onValueChange={(value) => setFilters({ ...filters, categoryId: Number(value) })}
                >
                  <SelectTrigger>
                    <SelectValue>
                      {filters.categoryId ? categories.find(c => c.categoryTourId === filters.categoryId)?.categoryTourName : "Select Category"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories.map((category) => (
                        <SelectItem key={category.categoryTourId} value={category.categoryTourId.toString()}>
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
                  onValueChange={(value) => setFilters({ ...filters, themeId: Number(value) })}
                >
                  <SelectTrigger>
                    <SelectValue>
                      {filters.themeId ? themes.find(t => t.themeTourId === filters.themeId)?.themeTourName : "Select Theme"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Themes</SelectLabel>
                      {themes.map((theme) => (
                        <SelectItem key={theme.themeTourId} value={theme.themeTourId.toString()}>
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
                  onValueChange={(value) => setFilters({ ...filters, suitableId: Number(value) })}
                >
                  <SelectTrigger>
                    <SelectValue>
                      {filters.suitableId ? suitables.find(s => s.suitableTourId === filters.suitableId)?.suitableName : "Select Suitable"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Suitables</SelectLabel>
                      {suitables.map((suitable) => (
                        <SelectItem key={suitable.suitableTourId} value={suitable.suitableTourId.toString()}>
                          {suitable.suitableName}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label>Price Range</label>
                <Slider
                  step={1}
                  min={0}
                  max={1000}
                  values={[filters.minPrice || 0, filters.maxPrice || 1000]}
                  onChange={(values) => setFilters({ ...filters, minPrice: values[0], maxPrice: values[1] })}
                />
              </div>
              <button onClick={handleSearch}>Search</button>
              <button onClick={handleClearAll} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">Clear All</button>
            </div>
          </div>
          <div className="p-5 w-3/4 h-[1032px] overflow-y-scroll scroll-transparent">
            <div className="flex items-center justify-between ml-5 mb-5">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 py-1 px-2 bg-blue-200 border-blue rounded-lg">
                  Customizable{" "}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </span>
                </div>
                <div className="font-bold text-blue">Clear All</div>
              </div>
              <div>
                <Select
                  value={selectedValue}
                  onValueChange={(value) => setSelectedValue(value)}
                >
                  <SelectTrigger className="w-[180px] border outline-none">
                    <SelectValue>
                      {selectedValue
                        ? `Sort By: ${selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)
                        }`
                        : "Sort By:"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sort Options</SelectLabel>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="title">Title</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {tourPackage && tourPackage.map((pkg) => (
              <CardSearch key={pkg.packageId} tourPackage={pkg} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageSearchResult;
