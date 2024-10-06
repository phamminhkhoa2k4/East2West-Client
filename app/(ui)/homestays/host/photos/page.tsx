"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OpenButton from "./OpenButton";
import Gallery from "./Gallery";
import { useHostContext } from "@/store/Hostcontext";

interface FileWithPreview extends File {
  preview: string;
}
const Photos = () => {
  const { state, setState } = useHostContext();
  const router = useRouter();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>(
    state?.data.photos ?? []
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClick = () => {
    if (imageUrls.length >= 5) {
      setState({
        data: {
          ...state?.data!,
          photos: imageUrls,
        },
      });
      router.push("/homestays/host/title");
    }
  };

  const handleBack = () => {
    router.back();
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
  const handleUpload = async () => {
    if (files.length === 0) {
      console.error("No files selected");
      return;
    }

    const uploadPromises = files.map(async (file) => {
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
    const newImageUrl = uploadedUrls.filter((url) => url !== null) as string[];
    setImageUrls((url) => [...url, ...newImageUrl]);
  };

  useEffect(() => {
    if (imageUrls.length > 0) {
      setFiles([]);
    }
  }, [imageUrls]);
  return (
    <div>
      <div className="bg-white fixed right-0 left-0 top-0  px-15 pt-5 pb-5 z-9 border-b">
        <div className="flex items-center justify-between">
          <div className="w-20 h-20">
            <Image
              src={"/Logo.png"}
              alt=""
              height={300}
              width={300}
              className="object-center object-cover w-full h-full"
            />
          </div>
          <div>
            <Link href={"/"} className="border px-4 py-2 rounded-full">
              Exit
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-36 mb-30">
        {imageUrls.length === 0 && (
          <>
            <div className="w-[640px]">
              <div className="text-3xl font-medium py-5">
                {/* Bổ sung một số bức ảnh chụp chỗ ở thuộc danh mục nhà của bạn */}
                Add some photos of your property in your home category
              </div>
              <div className="text-lg font-medium text-[#666]">
                {/* Bạn sẽ cần 5 bức ảnh để bắt đầu. Về sau, bạn vẫn có thể đăng
                thêm hoặc thay đổi ảnh. */}
                You will need 5 photos to start. You can always add or change
                photos later.
              </div>
            </div>
            <div className="w-[640px]  mt-5">
              <OpenButton
                files={files}
                setFiles={setFiles}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                handleUpload={handleUpload}
                imageUrls={imageUrls}
              />
            </div>
          </>
        )}
        {imageUrls.length > 0 && (
          <div className="w-[700px]">
            <Gallery
              handleUpload={handleUpload}
              imageUrls={imageUrls}
              files={files}
              setFiles={setFiles}
            />
          </div>
        )}
      </div>
      <div className=" bg-white border-t-4 flex fixed left-0 right-0 bottom-0 items-center justify-between">
        <button
          onClick={handleBack}
          className="px-5 py-3 my-5 ml-5 rounded-xl text-lg font-bold text-white bg-slate-300"
        >
          Back
        </button>
        <button
          onClick={handleClick}
          className={`px-5 py-3 my-5 mr-5 rounded-xl text-lg font-bold text-white bg-blue-500 ${
            imageUrls.length < 5 ? "opacity-30 cursor-not-allowed" : ""
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Photos;
