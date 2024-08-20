import Image from "next/image";

type CardPackagesProps = {
  thumbnail: string;
  title: string;
  price: number;
};

const CardPackages = ({ thumbnail, title, price }: CardPackagesProps) => {
  return (
    <div className="relative">
      <div className="h-65 w-40 rounded-lg overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          width={300}
          height={300}
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div className="absolute top-52 left-4">
        <p className="font-bold text-base text-white">{title}</p>
        <p className="text-sm text-gray-300">${price}/person</p>
      </div>
    </div>
  );
};

export default CardPackages;
