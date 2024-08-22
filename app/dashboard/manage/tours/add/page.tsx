"use client";
import InputGroup from "@/components/FormElements/InputGroup";
import MultiSelect from "@/components/FormElements/MultiSelect";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CardItinerary from "@/components/tour/CardItinerary";
import DateTimePicker from '@/components/FormElements/DatePicker/MultiDatePicker';
import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const data = [
  {
    value: "kaka",
    label: "kaka",
  },
];
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
const Create :React.FC= () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [formData, setFormData] = React.useState({
    title: '',
    price: '',
    priceReduce: '',
    groupSize: '',
    deposit: '',
    bookingHold: '',
    bookingChange: '',
    categoryTourId: [] as number[],
    themeTourId: [] as number[],
    suitableTourId: [] as number[],
    departureDates: [] as DateTimeOption[],  // Change this to match the DateTimeOption format
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
    // console.log("Selected Options:", selectedOptions); // Log data to check
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
        body: JSON.stringify(formData),
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
          <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
            <h3 className="font-semibold text-dark dark:text-white">
              Create Package
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <InputGroup
                label="Title"
                type="text"
                name="title"
                placeholder="Please Enter Title!"
                customClasses="w-full mb-4.5"
                onChange={handleChange}
              />
              <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                <InputGroup
                  label="Price"
                  type="text"
                  name="price"
                  placeholder="Enter price"
                  customClasses="w-full xl:w-1/2"
                  onChange={handleChange}
                />
                <InputGroup
                  label="Price Reduce"
                  type="text"
                  name="priceReduce"
                  placeholder="Enter price reduction"
                  customClasses="w-full xl:w-1/2"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                <InputGroup
                  label="Group Size"
                  type="text"
                  name="groupSize"
                  placeholder="Enter group size"
                  customClasses="mb-4.5 xl:w-1/2"
                  required
                  onChange={handleChange}
                />
                <InputGroup
                  label="Deposit"
                  type="text"
                  name="deposit"
                  placeholder="Enter deposit amount"
                  customClasses="mb-4.5 xl:w-1/2"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                <InputGroup
                  label="Booking Hold"
                  type="text"
                  name="bookingHold"
                  placeholder="Enter booking hold details"
                  customClasses="mb-4.5 xl:w-1/2"
                  onChange={handleChange}
                />
                <InputGroup
                  label="Booking Change"
                  type="text"
                  name="bookingChange"
                  placeholder="Enter booking change details"
                  customClasses="mb-4.5 xl:w-1/2"
                  onChange={handleChange}
                />
              </div>

              <MultiSelect
                id="categorySelect"
                placeholder="Please Choose Categories"
                label="Categories"
                options={categoryOptions}
                onChange={(selectedOptions) =>
                  handleMultiSelectChange("categoryTourId", selectedOptions)
                }
              />
              <MultiSelect
                id="themeSelect"
                placeholder="Please Choose Themes"
                label="Themes"
                options={themeOptions}
                onChange={(selectedOptions) =>
                  handleMultiSelectChange("themeTourId", selectedOptions)
                }
              />
              <MultiSelect
                id="suitableSelect"
                placeholder="Please Choose Suitable"
                label="Suitable"
                options={suitableOptions}
                onChange={(selectedOptions) =>
                  handleMultiSelectChange("suitableTourId", selectedOptions)
                }
              />
              <div className="form-group">
                <DateTimePicker
                  id="departureDates"
                  placeholder="Select date and time"
                  label="Departure Dates"
                  selectedDates={formData.departureDates}
                  onChange={handleDateTimeChange}
                />
              </div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Continue"}
              </button>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Create;
