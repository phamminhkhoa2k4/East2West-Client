"use client"
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import UploadFiles from "./UploadFile";

interface FileWithPreview extends File {
  preview: string;
}

type OpenButtonProps = {
  files: FileWithPreview[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  handleUpload: () => void;
  imageUrls : string[];
};
const OpenButton: React.FC<OpenButtonProps> = ({
  files,
  setFiles,
  isOpen,
  setIsOpen,
  handleUpload,
  imageUrls,
}) => {
  return (
    <>
      <div className="flex justify-center items-center w-[640px]  h-[455px] border-dashed border border-[#b0b0b0b0] bg-[#f7f7f7f7] rounded-3xl">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 flex justify-center items-center mb-20">
            <Image
              src={"/camera.png"}
              alt=""
              height={400}
              width={400}
              className="object-center object-cover  w-full h-full"
            />
          </div>
          <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <DialogTrigger asChild>
              <button className="border px-6 py-2 rounded-md bg-white">
                Add Photos
              </button>
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
    </>
  );
};

export default OpenButton;
