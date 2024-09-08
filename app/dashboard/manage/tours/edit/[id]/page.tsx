"use client"
import InputGroup from "@/components/FormElements/InputGroup";
import MultiSelect from "@/components/FormElements/MultiSelect";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DateTimePicker from '@/components/FormElements/DatePicker/MultiDatePicker';
import * as React from "react";
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import UploadFiles from "./UploadFiles"; // Assuming you have this component
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
          })),
          thumbnail: packageData.thumbnail || []  // Assuming the API returns existing image URLs
        });
        setImageUrls(packageData.thumbnail || []);
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

  
  const handleImageRemove = (index: number) => {
    const removedImageUrl = imageUrls[index];
  
    // Xóa ảnh từ imageUrls
    setImageUrls(prev => prev.filter((_, idx) => idx !== index));
  
    // Xóa ảnh từ thumbnail của formData
    setFormData(prev => ({
      ...prev,
      thumbnail: prev.thumbnail.filter((url) => url !== removedImageUrl)
    }));
  
    // Xóa ảnh từ files
    setFiles(prev => prev.filter(file => file.preview !== removedImageUrl));
  };
  
  const handleUpload = async (): Promise<string[]> => {
    if (files.length === 0) {
      console.error("No files selected");
      return [];
    }
  
    // Lọc ra các ảnh chưa được tải lên
    const newFiles = files.filter(file => !imageUrls.includes(file.preview));
  
    if (newFiles.length === 0) {
      console.log("No new files to upload");
      return [];
    }
  
    const uploadPromises = newFiles.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "homestays");
  
      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/djddnvjpi/image/upload`, // Thay thế bằng cloud name của bạn
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
  
    // Cập nhật mảng imageUrls và formData.thumbnail
    setImageUrls((prevUrls) => [...prevUrls, ...newImageUrls]);
  
    return newImageUrls;
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).map((file) => {
        const preview = URL.createObjectURL(file);
        return Object.assign(file, { preview });
      });
  
      setFiles(prevFiles => [
        ...prevFiles.filter(file => !selectedFiles.some(newFile => newFile.preview === file.preview)),
        ...selectedFiles
      ]);
    }
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

    try {
      // First, ensure that images are uploaded
      await handleUpload();

      const response = await fetch(`http://localhost:8080/api/tours/admin/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, thumbnail: imageUrls }),
      });

      if (!response.ok) {
        throw new Error("Failed to update tour package");
      }

      alert("Tour package updated successfully!");
      // router.push('/tour-packages');
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
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleChange}
            />

            <InputGroup
              type="number"
              name="price"
              label="Price"
              value={formData.price}
              onChange={handleChange}
            />

            <InputGroup
              type="number"
              name="pricereduce"
              label="Price Reduce"
              value={formData.pricereduce}
              onChange={handleChange}
            />

            <InputGroup
              type="text"
              name="groupsize"
              label="Group Size"
              value={formData.groupsize}
              onChange={handleChange}
            />

            <InputGroup
              type="text"
              name="deposit"
              label="Deposit"
              value={formData.deposit}
              onChange={handleChange}
            />

            <InputGroup
              type="text"
              name="bookinghold"
              label="Booking Hold"
              value={formData.bookinghold}
              onChange={handleChange}
            />

            <InputGroup
              type="text"
              name="bookingchange"
              label="Booking Change"
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
        
            <UploadFiles
              files={files}
              setFiles={setFiles}
              handleUpload={handleUpload}
              imageUrls={imageUrls}
              setIsOpen={function (value: boolean): void {
                throw new Error('Function not implemented.');
              }} />


            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 font-medium text-white transition hover:bg-opacity-90"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Edit;
