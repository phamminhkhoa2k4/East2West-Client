"use client";
import InputGroup from "@/components/FormElements/InputGroup";
import MultiSelect from "@/components/FormElements/MultiSelect";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CardItinerary from "@/components/tour/CardItinerary";
import DateTimePicker from '@/components/FormElements/DatePicker/MultiDatePicker';
import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

const Create: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [formData, setFormData] = React.useState({
    title: '',
    price: '',
    pricereduce: '',
    groupsize: '',
    deposit: '',
    bookinghold: '',
    bookingchange: '',
    categoryTourId: [] as number[],
    themeTourId: [] as number[],
    suitableTourId: [] as number[],
    departureDates: [] as DateTimeOption[],  
  });

  const [categories, setCategories] = React.useState<CategoryTour[]>([]);
  const [themes, setThemes] = React.useState<ThemeTour[]>([]);
  const [suitables, setSuitables] = React.useState<SuitableTour[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesRes, themesRes, suitablesRes] = await Promise.all([
          fetch("http://localhost:8080/api/tours/category"),
          fetch("http://localhost:8080/api/tours/theme"),
          fetch("http://localhost:8080/api/tours/suitable"),
        ]);
        if (!categoriesRes.ok || !themesRes.ok || !suitablesRes.ok) {
          throw new Error("Failed to fetch data");
        }
        const categoriesData: CategoryTour[] = await categoriesRes.json();
        const themesData: ThemeTour[] = await themesRes.json();
        const suitablesData: SuitableTour[] = await suitablesRes.json();
        setCategories(categoriesData);
        setThemes(themesData);
        setSuitables(suitablesData);
      } catch (error) {
        setError("Failed to load data. Please try again later.");
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateTimeChange = (selectedDates: { id: string; dateTime: string }[]) => {
    setFormData(prev => ({
      ...prev,
      departureDates: selectedDates
    }));
  };

  const handleMultiSelectChange = (name: string, selectedOptions: any[]) => {
    const selectedValues = selectedOptions.map(option => option.value);
    setFormData(prev => ({ ...prev, [name]: selectedValues }));
  };

  const categoryOptions = categories.map((category) => ({
    value: category.categoryTourId,
    text: category.categoryTourName,
    selected: false,
  }));

  const themeOptions = themes.map((theme) => ({
    value: theme.themeTourId,
    text: theme.themeTourName,
    selected: false,
  }));

  const suitableOptions = suitables.map((suitable) => ({
    value: suitable.suitableTourId,
    text: suitable.suitableName,
    selected: false,
  }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formattedDepartureDates = formData.departureDates.map(date => date.dateTime);
    try {
      const response = await fetch("http://localhost:8080/api/tours/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, departureDates: formattedDepartureDates }),
      });

      if (!response.ok) {
        throw new Error("Failed to create tour package");
      }

      alert("Tour package created successfully!");
    } catch (ex) {
      setError("Failed to create tour package. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-9">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke py-4 px-7 dark:border-dark-3">
            <h3 className="font-medium text-black dark:text-white">
              Create Tour Package
            </h3>
          </div>
  
          <form onSubmit={handleSubmit} className="p-7">
            <InputGroup
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <InputGroup
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
            <InputGroup
              label="Price Reduce"
              name="pricereduce"
              type="number"
              value={formData.pricereduce}
              onChange={handleChange}
            />
            <InputGroup
              label="Group Size"
              name="groupsize"
              type="number"
              value={formData.groupsize}
              onChange={handleChange}
            />
            <InputGroup
              label="Deposit"
              name="deposit"
              type="number"
              value={formData.deposit}
              onChange={handleChange}
            />
            <InputGroup
              label="Booking Hold"
              name="bookinghold"
              type="text"
              value={formData.bookinghold}
              onChange={handleChange}
            />
            <InputGroup
              label="Booking Change"
              name="bookingchange"
              type="text"
              value={formData.bookingchange}
              onChange={handleChange}
            />
  
            <MultiSelect
              label="Category Tour"
            
              options={categoryOptions}
              onChange={(selectedOptions) =>
                handleMultiSelectChange("categoryTourId", selectedOptions)
              }
            />
            <MultiSelect
              label="Theme Tour"
          
              options={themeOptions}
              onChange={(selectedOptions) =>
                handleMultiSelectChange("themeTourId", selectedOptions)
              }
            />
            <MultiSelect
              label="Suitable Tour"
        
              options={suitableOptions}
              onChange={(selectedOptions) =>
                handleMultiSelectChange("suitableTourId", selectedOptions)
              }
            />
  
            <DateTimePicker
              id=""
              placeholder=""
              label="Departure Dates"
              selectedDates={formData.departureDates}
              onChange={handleDateTimeChange}
            />
  
            {error && (
              <div className="text-red-500 mb-4">
                {error}
              </div>
            )}
  
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Tour Package"}
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
  
};

export default Create;
