import Image from "next/image";

const Gallery = () => {
  const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
    (index) => `/homestay/${index}.jpg`
  );

  const first = images[0];
  const nextTwo = [images[1], images[2]];

  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-3 md:grid-cols-4 md:grid-rows-3 my-8">
      <div className="col-span-3 row-span-3">
        <div className="relative w-full h-0 pt-[100%]">
          <Image
            className="absolute inset-0 w-full h-full object-cover rounded-xl md:rounded-3xl"
            src={first}
            alt="Beach House Photo"
            width={1000}
            height={1000}
          />
        </div>
      </div>
      {nextTwo.map((image, index) => (
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
              View {images.length - 3}+ photos
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
