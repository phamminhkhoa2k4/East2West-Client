import Image from "next/image";
type PhotosProps = {
  photos : string[] ;
}

const Gallery = ({ photos }: PhotosProps) => {
  

  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-3 md:grid-cols-4 md:grid-rows-3 my-8">
      <div className="col-span-3 row-span-3">
        <div className="relative w-full h-0 pt-[100%]">
          <Image
            className="absolute inset-0 w-full h-full object-cover rounded-xl md:rounded-3xl"
            src={photos[0]}
            alt="Beach House Photo"
            width={1000}
            height={1000}
          />
        </div>
      </div>
      {photos.slice(1).map((image, index) => (
        <div
          key={image}
          className={`col-span-1 row-span-1 ${
            index === 0 ? "md:row-start-1" : "md:row-start-2"
          } md:col-start-4`}
        >
          <div className="relative w-full h-0 pt-[100%]">
            <Image
              className="absolute inset-0 w-full h-full object-cover rounded-xl md:rounded-3xl"
              src={image}
              alt="Beach House Photo"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      ))}
      <div className="col-span-1 row-span-1 md:col-start-4 md:row-start-3">
        <div className="relative w-full h-0 pt-[100%]">
          <button className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl md:rounded-3xl">
            <span className="text-xs md:text-xl text-gray-500">
              View {photos.length - 3}+ photos
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
