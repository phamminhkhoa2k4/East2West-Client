// import Image from "next/image";
// import { FiPlus } from "react-icons/fi";
// import { IoImageOutline } from "react-icons/io5";
// import { GoPlus } from "react-icons/go";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import UploadFiles from "./UploadFile";
// import { useEffect, useState, useRef } from "react";
// import Sortable from "sortablejs";

// interface FileWithPreview extends File {
//   preview: string;
// }

// type GalleryProps = {
//   files: FileWithPreview[];
//   setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
//   imageUrls: string[];
//   handleUpload: () => void;
// };
// const Gallery = ({
//   files,
//   setFiles,
//   imageUrls,
//   handleUpload,
// }: GalleryProps) => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   useEffect(() => {
//     setIsOpen(false);
//   }, [imageUrls]);
//   return (
//     <>
//       <div>
//         <div className="flex items-center justify-between my-5 ">
//           <div className="flex flex-col">
//             <div className="text-2xl font-medium">Chọn ít nhất 5 bức ảnh</div>
//             <div className="text-base text-[#6a6a6a]">Kéo để sắp xếp lại</div>
//           </div>
//           <div>
//             <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
//               <DialogTrigger asChild>
//                 <FiPlus
//                   className="h-10 w-10 p-2 bg-[#ebebeb] rounded-full"
//                   onClick={() => setIsOpen(true)}
//                 />
//               </DialogTrigger>
//               <DialogContent>
//                 <UploadFiles
//                   imageUrls={imageUrls}
//                   files={files}
//                   setFiles={setFiles}
//                   setIsOpen={setIsOpen}
//                   handleUpload={handleUpload}
//                 />
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-5">
//           <div className="col-span-2 h-[470px] rounded-3xl overflow-hidden">
//             <Image
//               src={imageUrls[0]}
//               alt=""
//               width={1000}
//               height={1000}
//               className="object-center object-cover w-full h-full"
//             />
//           </div>
//           {imageUrls.slice(1).map((url, index) => (
//             <div key={index} className="h-[230px] rounded-3xl overflow-hidden">
//               <Image
//                 src={url}
//                 alt=""
//                 width={1000}
//                 height={1000}
//                 className="object-center object-cover w-full h-full"
//               />
//             </div>
//           ))}

//           {Array(4 - imageUrls.length)
//             .fill(1)
//             .map((_, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-center h-[230px] border border-[#6a6a6a] border-dashed rounded-3xl overflow-hidden"
//                 onClick={() => setIsOpen(true)}
//               >
//                 <IoImageOutline className="h-10 w-10 text-[#6a6a6a]" />
//               </div>
//             ))}

//           <div
//             className="flex items-center justify-center h-[230px] border border-[#6a6a6a] border-dashed rounded-3xl overflow-hidden"
//             onClick={() => setIsOpen(true)}
//           >
//             <div className="flex flex-col gap-3 justify-center items-center">
//               <GoPlus className="h-10 w-10 text-[#6a6a6a]" />
//               <span className="text-[#6a6a6a]">Thêm ảnh</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Gallery;

import Image from "next/image";
import { FiPlus } from "react-icons/fi";
import { IoImageOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UploadFiles from "./UploadFile";
import { useEffect, useState, useRef } from "react";
import Sortable from "sortablejs";

interface FileWithPreview extends File {
  preview: string;
}

type GalleryProps = {
  files: FileWithPreview[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
  imageUrls: string[];
  handleUpload: () => void;
};

const Gallery = ({
  files,
  setFiles,
  imageUrls,
  handleUpload,
}: GalleryProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sortableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [imageUrls]);

  useEffect(() => {
    if (sortableRef.current) {
      Sortable.create(sortableRef.current, {
        animation: 150,
        onEnd: (event) => {
          const oldIndex = event.oldIndex ?? -1;
          const newIndex = event.newIndex ?? -1;

          if (oldIndex === -1 || newIndex === -1) return;

          const newOrder = [...imageUrls];
          const [movedItem] = newOrder.splice(oldIndex, 1);
          newOrder.splice(newIndex, 0, movedItem);

          // Update the imageUrls state with the new order
          // Ensure to handle state update properly
          // Example: setImageUrls(newOrder);
        },
        // Disable sorting for placeholder elements to prevent layout shifts
        disabled: false,
        sort: true,
        // Keep placeholder visible
        ghostClass: "sortable-ghost",
        
      });
    }
  }, [imageUrls]);

  return (
    <>
      <div>
        <div className="flex items-center justify-between my-5">
          <div className="flex flex-col">
            <div className="text-2xl font-medium">Chọn ít nhất 5 bức ảnh</div>
            <div className="text-base text-[#6a6a6a]">Kéo để sắp xếp lại</div>
          </div>
          <div>
            <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
              <DialogTrigger asChild>
                <FiPlus
                  className="h-10 w-10 p-2 bg-[#ebebeb] rounded-full"
                  onClick={() => setIsOpen(true)}
                />
              </DialogTrigger>
              <DialogContent>
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
        <div ref={sortableRef} className="grid grid-cols-2 gap-5">
          <div
            className={` h-[470px] rounded-3xl overflow-hidden ${
              imageUrls[0] ? "col-span-2" : ""
            }`}
          >
            <Image
              src={imageUrls[0]}
              alt=""
              width={1000}
              height={1000}
              className="object-center object-cover w-full h-full"
            />
          </div>
          {imageUrls.slice(1).map((url, index) => (
            <div key={index} className="h-[230px] rounded-3xl overflow-hidden">
              <Image
                src={url}
                alt=""
                width={1000}
                height={1000}
                className="object-center object-cover w-full h-full"
              />
            </div>
          ))}
          {Array(Math.max(0, 4 - imageUrls.length))
            .fill(1)
            .map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-[230px] border border-[#6a6a6a] border-dashed rounded-3xl overflow-hidden"
                onClick={() => setIsOpen(true)}
              >
                <IoImageOutline className="h-10 w-10 text-[#6a6a6a]" />
              </div>
            ))}
          <div
            className="flex items-center justify-center h-[230px] border border-[#6a6a6a] border-dashed rounded-3xl overflow-hidden"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex flex-col gap-3 justify-center items-center">
              <GoPlus className="h-10 w-10 text-[#6a6a6a]" />
              <span className="text-[#6a6a6a]">Thêm ảnh</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
