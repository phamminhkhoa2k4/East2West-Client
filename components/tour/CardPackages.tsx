import Image from "next/image";

const CardPackages = () => {
    return (
        <>
            <div className="relative">
                <div className="h-65 w-40 rounded-lg overflow-hidden">
                    <Image src={"/boat.png"} alt="" width={300} height={300} className="object-cover object-center w-full h-full" />
                </div>
                <div className="absolute top-52 left-4">
                    <p className="font-bold text-base text-white">Vietnam</p>
                    <p className="text-sm text-gray-30">$5.400/person</p>
                </div>
            </div>
        </>
    )
}

export default CardPackages;