"use client";
import { api } from "../../utils/axios";
import { useState, useEffect } from "react";
<<<<<<< HEAD
=======
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
>>>>>>> dd8cad0ec3b3111e20d0642dac9c58bbf9a83018
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
<<<<<<< HEAD
import Slider from "@/components/ui/Slider";

=======
>>>>>>> dd8cad0ec3b3111e20d0642dac9c58bbf9a83018
interface TourPackage {
  packageId: number;
  title: string;
  price: number;
<<<<<<< HEAD
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
=======
  // Add other relevant fields based on your API response
>>>>>>> dd8cad0ec3b3111e20d0642dac9c58bbf9a83018
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
<<<<<<< HEAD
  const [filters, setFilters] = useState<FilterParams>({
    minPrice: 0,
    maxPrice: 1000
  });
=======
  const [selectedCategory, setSelectedCategory] = useState<number[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<number[]>([]);
  const [selectedSuitable, setSelectedSuitable] = useState<number[]>([]);
  const [budget, setBudget] = useState<string>("");
>>>>>>> dd8cad0ec3b3111e20d0642dac9c58bbf9a83018

  useEffect(() => {
    const fetchTourPackage = async () => {
      try {
<<<<<<< HEAD
        const response = await api.get<TourPackage[]>("/tours");
        setTourPackage(response.data);
=======
        const response = await fetch("http://localhost:8080/api/tours");
        if (!response.ok) {
          throw new Error("Failed to fetch tour package");
        }
        const data: TourPackage[] = await response.json();
        setTourPackage(data);
>>>>>>> dd8cad0ec3b3111e20d0642dac9c58bbf9a83018
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

<<<<<<< HEAD
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

=======
    // Fetch categories
    api.get<Category[]>("http://localhost:8080/api/tours/category").then((response) => {
      setCategories(response.data);
    });

    // Fetch themes
    api.get<Theme[]>("http://localhost:8080/api/tours/theme").then((response) => {
      setThemes(response.data);
    });

    // Fetch suitables
    api.get<Suitable[]>("http://localhost:8080/api/tours/suitable").then((response) => {
      setSuitables(response.data);
    });

    fetchTourPackage();
  }, []);

>>>>>>> dd8cad0ec3b3111e20d0642dac9c58bbf9a83018
  const sortPackages = (value: string) => {
    if (!tourPackage) return;

    let sortedPackages: TourPackage[];
    switch (value) {
      case "price":
        sortedPackages = [...tourPackage].sort((a, b) => a.price - b.price);
        break;
      case "title":
<<<<<<< HEAD
        sortedPackages = [...tourPackage].sort((a, b) => a.title.localeCompare(b.title));
=======
        sortedPackages = [...tourPackage].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
>>>>>>> dd8cad0ec3b3111e20d0642dac9c58bbf9a83018
        break;
      default:
        sortedPackages = tourPackage;
    }
    setTourPackage(sortedPackages);
  };

<<<<<<< HEAD
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

=======
  const handleFilter = () => {
    const filterDTO: FilterParams = {
      categoryTourId: selectedCategory,
      themeTourId: selectedTheme,
      suitableTourId: selectedSuitable,
      budget: budget,
    };
  
    api
      .post("http://localhost:8080/api/tours/filter", filterDTO)
      .then((response) => {
        console.log(response.data); // handle the filtered data
      })
      .catch((error) => {
        console.error("Error fetching filtered tours:", error);
      });
  };

  useEffect(() => {
    sortPackages(selectedValue);
  }, [selectedValue]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
>>>>>>> dd8cad0ec3b3111e20d0642dac9c58bbf9a83018
  return (
    <>
      <div className="border rounded-3xl shadow-lg mb-6">
        <div className="flex border-b">
          <div className="p-5 w-1/4 border-r font-semibold">FILTERS</div>
          <div className="p-5 w-3/4 font-semibold">ALL PACKAGES</div>
        </div>
        <div className="flex">
          <div className="p-5 w-1/4 border-r">
<<<<<<< HEAD
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
=======
            <div>
              <Accordion
                type="multiple"
                defaultValue={[
                  "item-1",
                  "item-2",
                  "item-3",
                  "item-4",
                  "item-5",
                  "item-6",
                ]}
                className="w-full"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="text-lg font-bold my-2">Budget (per person)</div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <input
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="border p-2 w-full rounded-lg"
                      placeholder="Enter budget"
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <div className="text-lg font-bold my-2">Categories</div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {categories.map((category) => (
                      <div key={category.categoryTourId} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            value={category.categoryTourId}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCategory([...selectedCategory, category.categoryTourId]);
                              } else {
                                setSelectedCategory(
                                  selectedCategory.filter((id) => id !== category.categoryTourId)
                                );
                              }
                            }}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                          />
                          <label className="ml-2 text-sm font-medium text-gray-900">
                            {category.categoryTourName}
                          </label>
                        </div>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <div className="text-lg font-bold my-2">Themes</div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {themes.map((theme) => (
                      <div key={theme.themeTourId} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            value={theme.themeTourId}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedTheme([...selectedTheme, theme.themeTourId]);
                              } else {
                                setSelectedTheme(
                                  selectedTheme.filter((id) => id !== theme.themeTourId)
                                );
                              }
                            }}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                          />
                          <label className="ml-2 text-sm font-medium text-gray-900">
                            {theme.themeTourName}
                          </label>
                        </div>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    <div className="text-lg font-bold my-2">Suitable For</div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {suitables.map((suitable) => (
                      <div key={suitable.suitableTourId} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            value={suitable.suitableTourId}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedSuitable([...selectedSuitable, suitable.suitableTourId]);
                              } else {
                                setSelectedSuitable(
                                  selectedSuitable.filter((id) => id !== suitable.suitableTourId)
                                );
                              }
                            }}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                          />
                          <label className="ml-2 text-sm font-medium text-gray-900">
                            {suitable.suitableName}
                          </label>
                        </div>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <button
                onClick={handleFilter}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
              >
                Apply Filters
              </button>
>>>>>>> dd8cad0ec3b3111e20d0642dac9c58bbf9a83018
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
