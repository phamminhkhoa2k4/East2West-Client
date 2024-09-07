"use client";
import InputGroup from "@/components/FormElements/InputGroup";
import MultiSelect from "@/components/FormElements/MultiSelect";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DateTimePicker from '@/components/FormElements/DatePicker/MultiDatePicker';
import * as React from "react";

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

const Create: React.FC = () => {
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
    thumbnail: [] as string[],
  });

  const [files, setFiles] = React.useState<FileWithPreview[]>([]);
  const [imageUrls, setImageUrls] = React.useState<string[]>([]);
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

  const handleUpload = async () => {
    if (files.length === 0) {
      console.error("No files selected");
      return;
    }

    setLoading(true);

    // Filter out the files that are already in imageUrls
    const filesToUpload = files.filter(file => !imageUrls.includes(file.preview));

    if (filesToUpload.length === 0) {
      setLoading(false);
      return;
    }

    const uploadPromises = filesToUpload.map(async (file) => {
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
    const newImageUrls = uploadedUrls.filter((url) => url !== null) as string[];
    setImageUrls(prev => [...prev, ...newImageUrls]);
    setFormData(prev => ({ ...prev, thumbnail: [...prev.thumbnail, ...newImageUrls] }));

    setLoading(false);
  };


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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).map((file) => {
        const preview = URL.createObjectURL(file);
        return Object.assign(file, { preview });
      });

      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const handleMultiSelectChange = (name: string, selectedOptions: any[]) => {
    const selectedValues = selectedOptions.map(option => option.value);
    setFormData(prev => ({ ...prev, [name]: selectedValues }));
  };

  const handleImageRemove = async (index: number) => {
    const imageUrlToRemove = imageUrls[index];

    // Nếu cần xóa ảnh trên máy chủ, thực hiện yêu cầu xóa ở đây
    try {
      const publicId = imageUrlToRemove.split('/').pop()?.split('.').shift();
      if (publicId) {
        await fetch(`https://api.cloudinary.com/v1_1/djddnvjpi/image/destroy`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            public_id: publicId,
            upload_preset: 'homestays',
          }),
        });
      }
    } catch (error) {
      console.error('Failed to delete image from server:', error);
    }

    // Cập nhật trạng thái ảnh
    setImageUrls(prev => prev.filter((_, idx) => idx !== index));
    setFormData(prev => ({
      ...prev,
      thumbnail: prev.thumbnail.filter((_, idx) => idx !== index),
    }));
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

    try {
      // First, ensure that images are uploaded
      await handleUpload();

      // Now, submit the form data along with the uploaded image URLs
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
      console.error("Failed to create tour package", ex);
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
              type="text"
              placeholder=""
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <InputGroup
              placeholder="number"
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
              label="Category Tour"
              id=""
              placeholder=""
              selectedOptions={ }
              options={categoryOptions}
              onChange={(selectedOptions) =>
                handleMultiSelectChange("categoryTourId", selectedOptions)
              }
            />
            <MultiSelect
              label="Category Tour"
              id=""
              placeholder=""
              selectedOptions={ }
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

            <InputGroup
              label="Thumbnails"
              name="thumbnails"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />

            {imageUrls.length > 0 && (
              <div className="my-4">
                <h4 className="text-lg font-semibold">Uploaded Images:</h4>
                <div className="flex flex-wrap gap-2">
                  {imageUrls.map((url, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={url}
                        alt={`Uploaded Image ${idx}`}
                        className="w-24 h-24 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageRemove(idx)}
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="text-red-500 mb-4">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium">Upload Images</label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="mt-1 block w-full"
              />
              <button
                type="button"
                onClick={handleUpload}
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Upload Images
              </button>
            </div>

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
