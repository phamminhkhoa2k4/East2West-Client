"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaPlus } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";

interface FileWithPreview extends File {
  preview: string;
}

type UploadFilesProps = {
  files: FileWithPreview[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
  setIsOpen: (value: boolean) => void;
  handleUpload: () => void;
  imageUrls: string[];
};

const UploadFiles: React.FC<UploadFilesProps> = ({
  files,
  setFiles,
  setIsOpen,
  handleUpload,
  imageUrls,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isProgress, setIsProgress] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filesWithPreview = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );

    setFiles((prevFiles) => [
      ...prevFiles.filter(file => !filesWithPreview.some(newFile => newFile.preview === file.preview)),
      ...filesWithPreview
    ]);
  }, [files]);

  const removeFile = (fileName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const handlePlusClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 95 ? prev + 1 : 95));
    }, 100);

    if (imageUrls.length > 0) {
      setProgress(100);
    }

    return () => clearInterval(timer);
  }, [imageUrls]);

  return (
    <>
      <div className="flex justify-between items-center">
        <IoCloseSharp className="h-5 w-5" onClick={() => setIsOpen(false)} />
        <div className="flex flex-col justify-center items-center pb-5">
          <div className="text-base font-medium">Tải ảnh lên</div>
          <div className="text-xs text-[#6a6a6a6a]">
            {files.length === 0
              ? "Chưa có mục nào được chọn"
              : `Đã chọn ${files.length} mục`}
          </div>
        </div>
        <FaPlus className="h-5 w-5" onClick={handlePlusClick} />
      </div>
      {isProgress && (
        <div className="w-full bg-gray-200 h-[1px]">
          <div
            className="bg-blue-500 h-1 transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      <div
        id="FileUpload"
        className={`relative mb-5.5 block w-full cursor-pointer appearance-none rounded-xl ${
          files.length > 0
            ? ""
            : "border border-dashed border-gray-4 bg-gray-2 px-4 py-14 sm:py-20 hover:border-primary"
        }`}
        {...getRootProps()}
      >
        <input
          type="file"
          name="profilePhoto"
          id="profilePhoto"
          accept="image/png, image/jpg, image/jpeg"
          {...getInputProps()}
          ref={fileInputRef}
          className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
        />

        {files.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <span className="flex h-13.5 w-13.5 items-center justify-center rounded-full border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.4613 2.07827C10.3429 1.94876 10.1755 1.875 10 1.875C9.82453 1.875 9.65714 1.94876 9.53873 2.07827L6.2054 5.7241C5.97248 5.97885 5.99019 6.37419 6.24494 6.6071C6.49969 6.84002 6.89502 6.82232 7.12794 6.56756L9.375 4.10984V13.3333C9.375 13.6785 9.65482 13.9583 10 13.9583C10.3452 13.9583 10.625 13.6785 10.625 13.3333V4.10984L12.8721 6.56756C13.105 6.82232 13.5003 6.84002 13.7551 6.6071C14.0098 6.37419 14.0275 5.97885 13.7946 5.7241L10.4613 2.07827Z"
                  fill="#5750F1"
                />
                <path
                  d="M3.125 12.5C3.125 12.1548 2.84518 11.875 2.5 11.875C2.15482 11.875 1.875 12.1548 1.875 12.5V12.5457C1.87498 13.6854 1.87497 14.604 1.9721 15.3265C2.07295 16.0765 2.2887 16.7081 2.79029 17.2097C3.29189 17.7113 3.92345 17.9271 4.67354 18.0279C5.39602 18.125 6.31462 18.125 7.45428 18.125H12.5457C13.6854 18.125 14.604 18.125 15.3265 18.0279C16.0766 17.9271 16.7081 17.7113 17.2097 17.2097C17.7113 16.7081 17.9271 16.0765 18.0279 15.3265C18.125 14.604 18.125 13.6854 18.125 12.5457V12.5C18.125 12.1548 17.8452 11.875 17.5 11.875C17.1548 11.875 16.875 12.1548 16.875 12.5C16.875 13.6962 16.8737 14.5304 16.789 15.1599C16.7068 15.7714 16.5565 16.0952 16.3258 16.3258C16.0952 16.5565 15.7714 16.7068 15.1599 16.789C14.5304 16.8737 13.6962 16.875 12.5 16.875H7.5C6.30382 16.875 5.46956 16.8737 4.8401 16.789C4.22862 16.7068 3.90481 16.5565 3.67418 16.3258C3.44354 16.0952 3.29317 15.7714 3.21096 15.1599C3.12638 14.5304 3.125 13.6962 3.125 12.5Z"
                  fill="#5750F1"
                />
              </svg>
            </span>
            <div className="mt-5 text-sm text-gray-400">
              Kéo thả hoặc nhấp để chọn hình ảnh
            </div>
          </div>
        )}
        {files.length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file) => (
              <div
                key={file.name}
                className="relative border rounded-lg overflow-hidden"
              >
                <Image
                  src={file.preview}
                  alt={file.name}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
                <button
                  className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1"
                  onClick={(event) => removeFile(file.name, event)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UploadFiles;
