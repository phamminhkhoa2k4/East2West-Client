import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { GoPlus } from "react-icons/go";
import { IoMdPhotos } from "react-icons/io";
import UploadFiles from "../../photos/UploadFile";
import { useEffect, useState } from "react";
import Image from "next/image";
import { createData, updateData } from "@/utils/axios";
interface FileWithPreview extends File {
  preview: string;
}

type PhotosType = {
  homestay: Homestay;
  setReload: (value : boolean) => void;
};

const Photos = ({ homestay, setReload }: PhotosType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

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
    const updatePhoto = async () => {
      try {
        const newImageUrls = imageUrls.filter(
          (url) => !homestay?.photos?.includes(url)
        );
        const response = await updateData({
          id: homestay.homestayid!,
          endpoint: "homestays/host",
          payload: {
            ...homestay,
            photos: [...homestay.photos!, ...newImageUrls],
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        if (imageUrls.length > 0) {
          setFiles([]);
        }
        setIsOpen(false);
        setReload(true);
      }
    };
    updatePhoto();
  }, [imageUrls]);
  return (
    <>
      <div className="my-8 mb-5">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-semibold">Overview Photos</div>
          <div className="flex items-center gap-5">
            <Link
              href={`/homestays/host/editor/${homestay?.homestayid}/allphotos`}
              className="hover:bg-[#ebebeb] bg-[#f7f7f7] flex items-center gap-5 px-4 py-2  rounded-full"
            >
              <IoMdPhotos />
              <span>All photos</span>
            </Link>
            <div>
              <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                <DialogTrigger asChild>
                  <GoPlus className="h-10 w-10 p-2 rounded-full bg-[#f7f7f7] hover:bg-[#ebebeb]" />
                </DialogTrigger>
                <DialogContent className="min-w-150">
                  <UploadFiles
                    imageUrls={imageUrls}
                    files={files}
                    setFiles={setFiles}
                    setIsOpen={setIsOpen}
                    handleUpload={handleUpload}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <div className="w-125 my-5">
          Manage photos and add information. Guests will only see your tour if
          each room has photos.
        </div>
        <div className="grid grid-cols-3 gap-5 mt-10">
          {homestay?.photos?.slice(0, 6).map((photo, index) => (
            <div key={index} className="h-50 rounded-lg overflow-hidden ">
              <Image
                src={photo ?? "/boat.png"}
                width={400}
                height={400}
                alt=""
                className="object-center object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Photos;
