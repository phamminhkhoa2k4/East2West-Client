"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { IoMdPhotos } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UploadFiles from "../../../photos/UploadFile";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api, deleteData, getData, updateData } from "@/utils/axios";
import { AiOutlineClose } from "react-icons/ai";
import Sortable from "sortablejs";
import { useToast } from "@/components/ui/use-toast";
import { useMessage } from "@/store/MessageCotext";
interface FileWithPreview extends File {
  preview: string;
}
const AllPhotos = () => {
  const [tab, setTab] = useState("manage");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenn, setIsOpenn] = useState<boolean>(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isManage, setIsManage] = useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [homestay, setHomestay] = useState<Homestay>();
  const [reload, setReload] = useState<boolean>(false);
  const sortableRef = useRef<HTMLDivElement>(null);
  const { setMessage, message } = useMessage();
  const { toast } = useToast();

  const { id } = useParams();

   useEffect(() => {
     if (message) {
       toast({
         title: message?.title,
         description: message?.description,
         status : message?.status,
       });
       setMessage(null);
     }
   }, [message]);

  useEffect(() => {
    setIsOpenn(true);
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res: Homestay = await getData({ endpoint: `/homestays/${id}` });
        setPhotos(res.photos);
        setHomestay(res);
        setReload(true);
      } catch (error) {
        console.log(error);
      } finally {
        setReload(false);
        setOpenIndex(null);
      }
    };

    fetchPhotos();
  }, [id, reload]);
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
          id: homestay?.homestayid!,
          endpoint: "homestays/host",
          payload: {
            ...homestay,
            photos: [...homestay?.photos!, ...newImageUrls],
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

  const handleDeletePhotos = async (id: number, url: string) => {
    if(homestay?.photos.length! > 5){
try {

      setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo !== url));
      const res = await api.delete(`/homestays/host/deletePhotos`, {
        data: { id, url },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setReload(true);
    }
    }else{
      setOpenIndex(null);
      setMessage({
        title: "Warning",
        description: "You can not delete because need at least 5 photos",
        status:"warning"
      });
    }
    
  };

  useEffect(() => {
    let sortableInstance: any = null;

    if (sortableRef.current && isManage) {
      sortableInstance = Sortable.create(sortableRef.current, {
        animation: 150,
        onEnd: (event) => {
          const oldIndex = event.oldIndex ?? -1;
          const newIndex = event.newIndex ?? -1;

          if (oldIndex === -1 || newIndex === -1) return;

          const newOrder = [...photos];
          const [movedItem] = newOrder.splice(oldIndex, 1);
          newOrder.splice(newIndex, 0, movedItem);

          setPhotos(newOrder);

          const updateSort = async () => {
            try {
              console.log("Thứ tự mới:", newOrder);
              const response = await updateData({
                id: homestay?.homestayid!,
                endpoint: "homestays/host",
                payload: {
                  ...homestay,
                  photos: newOrder,
                },
              });
              console.log("Thứ tự ảnh đã được lưu:", response);
            } catch (error) {
              console.log("Lưu thứ tự ảnh thất bại:", error);
            }
          };

          updateSort();
        },

        disabled: false,
        sort: true,
        ghostClass: "sortable-ghost",
      });
    }

    return () => {
      if (sortableInstance) {
        sortableInstance.destroy(); // Xóa Sortable instance trước khi tạo mới
      }
    };
  }, [photos, isManage, homestay]); // Đảm bảo lắng nghe chính xác sự thay đổi của state

  return (
    <>
      <Dialog open={isOpenn} onOpenChange={setIsOpenn}>
        <DialogContent className="w-[375px] h-[490px] border  py-5">
          <div>
            <IoCloseOutline
              className="h-5 w-5"
              onClick={() => setIsOpenn(false)}
            />
            <div className="my-10">
              <div className="flex items-center relative mx-10">
                <div className="absolute top-0 left-17 rotate-[8deg] z-10 rounded-lg overflow-hidden  w-[108px] h-[108px] ">
                  <Image
                    src={photos[1]}
                    alt=""
                    height={400}
                    width={400}
                    className="object-center object-cover w-full h-full"
                  />
                </div>
                <div className="absolute top-0 left-[-15px] z-[11] rotate-[-8deg] rounded-lg overflow-hidden  w-[108px] h-[108px] ">
                  <Image
                    src={photos[0]}
                    alt=""
                    height={400}
                    width={400}
                    className="object-center object-cover w-full h-full"
                  />
                </div>
                <div className="absolute top-0 left-39 rotate-[-14] rounded-lg overflow-hidden  w-[108px] h-[108px] ">
                  <Image
                    src={photos[2]}
                    alt=""
                    height={400}
                    width={400}
                    className="object-center object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
            <div className="text-center mt-40 text-2xl font-medium">
              Put your best photos first
            </div>
            <div className="text-sm text-center my-5 font-medium text-[#666]">
              Organize your photo library so your best photos appear first.
            </div>
            <div
              className="bg-black mb-1 mt-3 text-white font-semibold py-3 rounded-lg text-lg text-center"
              onClick={() => {
                setIsManage(true);
                setIsOpenn(false);
              }}
            >
              Arrange photos
            </div>
            <div
              className="font-semibold py-3 rounded-lg text-lg text-center"
              onClick={() => setIsOpenn(false)}
            >
              No, Thank
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div>
        <div className="flex items-center justify-center border-b ">
          <div className="flex justify-between items-center gap-5">
            <div
              className={`text-base   ${
                tab === "today"
                  ? "font-bold py-5 text-blue-500 border-b-4 border-blue-500"
                  : "font-medium text-[#666] py-5"
              }  `}
              onClick={() => setTab("today")}
            >
              Today
            </div>
            <div
              className={`text-base   ${
                tab === "manage"
                  ? "font-bold py-5 text-blue-500 border-b-4 border-blue-500"
                  : "font-medium text-[#666] py-5"
              }  `}
              onClick={() => setTab("manage")}
            >
              Manage Homestay
            </div>
            <div
              className={`text-base   ${
                tab === "calendar"
                  ? "font-bold py-5 text-blue-500 border-b-4 border-blue-500"
                  : "font-medium text-[#666] py-5"
              }  `}
              onClick={() => setTab("calendar")}
            >
              Calendar
            </div>
          </div>
        </div>
      </div>
      <div className="mx-20">
        <div className="flex items-center justify-between my-10">
          <Link
            href={`/homestays/host/editor/${id}`}
            className=" w-12 h-12 flex p-4 items-center justify-center rounded-full bg-[#f7f7f7] hover:bg-[#ebebeb]"
          >
            <FaArrowLeft className="w-12 h-12" />
          </Link>
          <div>
            <div className="text-3xl font-bold pl-[9rem]">All Photos</div>
          </div>

          <div className="flex items-center gap-5">
            <div
              className="hover:bg-[#ebebeb] bg-[#f7f7f7] flex items-center gap-2 px-4 py-2  rounded-full"
              onClick={() => setIsManage((prev) => !prev)}
            >
              <IoMdPhotos />
              <span>Manage photos</span>
            </div>
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
        {!isManage && (
          <div className="grid grid-cols-5 gap-5">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="h-65 overflow-hidden rounded-lg relative"
              >
                {photo == photos[0] && (
                  <div className="bg-white rounded-full px-3 py-1 absolute top-3 left-3 font-medium">
                    cover
                  </div>
                )}

                <Image
                  src={photo}
                  alt=""
                  width={400}
                  height={400}
                  className=" object-cover object-center w-full h-full"
                />
              </div>
            ))}
          </div>
        )}
        {isManage && (
          <div ref={sortableRef} className="grid grid-cols-5 gap-5">
            {photos?.map((photo, index) => (
              <div
                key={index}
                className="h-65 overflow-hidden rounded-lg relative"
              >
                {index === 0 && (
                  <div className="bg-white rounded-full px-3 py-1 absolute top-3 left-3 font-medium">
                    cover
                  </div>
                )}

                <Image
                  src={photo}
                  alt=""
                  width={400}
                  height={400}
                  className=" object-cover object-center w-full h-full"
                />

                <Dialog
                  open={openIndex === index}
                  onOpenChange={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <DialogTrigger asChild>
                    <div className="p-2 rounded-xl absolute top-3 right-3 bg-white">
                      <FaRegTrashCan className="text-black" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-[375px] h-[475px]">
                    <div className="w-full h-full ">
                      <AiOutlineClose
                        className="w-4 h-4"
                        onClick={() => setOpenIndex(null)}
                      />

                      <div className="h-50 flex items-center justify-center my-5 mb-1">
                        <div className="w-30 h-30 rounded-lg overflow-hidden">
                          <Image
                            src={photo}
                            alt=""
                            height={400}
                            width={400}
                            className="object-cover object-center w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="mx-5 text-xl font-semibold text-center">
                        Want to permanently remove a photo from your listing?
                      </div>
                      <div
                        className="rounded-lg text-lg font-semibold py-3 bg-slate-900 mt-4 mb-2 text-white text-center"
                        onClick={() =>
                          handleDeletePhotos(homestay?.homestayid!, photo)
                        }
                      >
                        Delete
                      </div>
                      <div
                        className="rounded-lg text-lg font-semibold py-3 text-center"
                        onClick={() => setOpenIndex(null)}
                      >
                        Cancel
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllPhotos;
