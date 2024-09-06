"use client";
import InputGroup from "@/components/FormElements/InputGroup";
import MultiSelect from "@/components/FormElements/MultiSelect";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DateTimePicker from '@/components/FormElements/DatePicker/MultiDatePicker';
import * as React from "react";
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

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

const Edit: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
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

        const [categoriesRes, themesRes, suitablesRes, packageRes] = await Promise.all([
          fetch("http://localhost:8080/api/tours/category"),
          fetch("http://localhost:8080/api/tours/theme"),
          fetch("http://localhost:8080/api/tours/suitable"),
          fetch(`http://localhost:8080/api/tours/${id}`)
        ]);

        if (!categoriesRes.ok || !themesRes.ok || !suitablesRes.ok || !packageRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const categoriesData: CategoryTour[] = await categoriesRes.json();
        const themesData: ThemeTour[] = await themesRes.json();
        const suitablesData: SuitableTour[] = await suitablesRes.json();
        const packageData = await packageRes.json();

        setCategories(categoriesData);
        setThemes(themesData);
        setSuitables(suitablesData);

        setFormData({
          title: packageData.title,
          price: packageData.price,
          pricereduce: packageData.pricereduce,
          groupsize: packageData.groupsize,
          deposit: packageData.deposit,
          bookinghold: packageData.bookinghold,
          bookingchange: packageData.bookingchange,
          categoryTourId: packageData.categoryTours.map((c: CategoryTour) => c.categoryTourId),
          themeTourId: packageData.themeTours.map((t: ThemeTour) => t.themeTourId),
          suitableTourId: packageData.suitableTours.map((s: SuitableTour) => s.suitableTourId),
          departureDates: packageData.departureDates.map((d: any) => ({
            id: d.departuredateid,
            dateTime: d.departuredate
          }))
        });
      } catch (error) {
        setError("Failed to load data. Please try again later.");
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
    selected: formData.categoryTourId.includes(category.categoryTourId),
  }));

  const themeOptions = themes.map((theme) => ({
    value: theme.themeTourId,
    text: theme.themeTourName,
    selected: formData.themeTourId.includes(theme.themeTourId),
  }));

  const suitableOptions = suitables.map((suitable) => ({
    value: suitable.suitableTourId,
    text: suitable.suitableName,
    selected: formData.suitableTourId.includes(suitable.suitableTourId),
  }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formattedDepartureDates = formData.departureDates.map(date => date.dateTime);
    try {
      const response = await fetch(`http://localhost:8080/api/tours/admin/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, departureDates: formattedDepartureDates }),
      });

      if (!response.ok) {
        throw new Error("Failed to update tour package");
      }

      alert("Tour package updated successfully!");
      //   router.push('/tour-packages');
    } catch (ex) {
      setError("Failed to update tour package. Please try again.");
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
              Edit Tour Package
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="p-7">
            <InputGroup
              type="text"
              placeholder=""
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <InputGroup
              placeholder=""
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
            <InputGroup
              placeholder=""
              label="Price Reduce"
              name="pricereduce"
              type="number"
              value={formData.pricereduce}
              onChange={handleChange}
            />
            <InputGroup
              placeholder=""
              label="Group Size"
              name="groupsize"
              type="number"
              value={formData.groupsize}
              onChange={handleChange}
            />
            <InputGroup
              placeholder=""
              label="Deposit"
              name="deposit"
              type="number"
              value={formData.deposit}
              onChange={handleChange}
            />
            <InputGroup
              placeholder=""
              label="Booking Hold"
              name="bookinghold"
              type="text"
              value={formData.bookinghold}
              onChange={handleChange}
            />
            <InputGroup
              placeholder=""
              label="Booking Change"
              name="bookingchange"
              type="text"
              value={formData.bookingchange}
              onChange={handleChange}
            />

            <MultiSelect
              id="categoryTours"
              label="Category Tours"
              placeholder="Select categories"
              options={categoryOptions}
              selectedOptions={formData.categoryTourId.map(id => ({ value: id, text: categories.find(c => c.categoryTourId === id)?.categoryTourName || "" }))}
              onChange={(selectedOptions) => handleMultiSelectChange("categoryTourId", selectedOptions)}
            />

            <MultiSelect
              id="themeTours"
              label="Theme Tours"
              placeholder="Select themes"
              options={themeOptions}
              selectedOptions={formData.themeTourId.map(id => ({ value: id, text: themes.find(t => t.themeTourId === id)?.themeTourName || "" }))}
              onChange={(selectedOptions) => handleMultiSelectChange("themeTourId", selectedOptions)}
            />

            <MultiSelect
              id="suitableTours"
              label="Suitable Tours"
              placeholder="Select suitable tours"
              options={suitableOptions}
              selectedOptions={formData.suitableTourId.map(id => ({ value: id, text: suitables.find(s => s.suitableTourId === id)?.suitableName || "" }))}
              onChange={(selectedOptions) => handleMultiSelectChange("suitableTourId", selectedOptions)}
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
              className="w-full bg-primary text-white py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Tour Package'}
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Edit;
