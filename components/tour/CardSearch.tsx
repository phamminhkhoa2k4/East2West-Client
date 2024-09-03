import Image from "next/image";

const CardSearch = ({tourPackage}) => {
  return (
    <div className="border rounded-xl overflow-hidden">
      <div className="w-full h-50">
        <Image
          src={`/${tourPackage.thumbnail}`}
          alt={tourPackage.title}
          height={300}
          width={300}
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div>
        <div className="p-4 ">
          <div className="border-b">
            <div className="flex items-center justify-between ">
              <div className="text-base font-extrabold">
                {tourPackage.title}
              </div>
              <ul className="grid grid-cols-2 list-disc p-4 ">
                <li className="text-gray-6">data test</li>
                <li className="text-gray-6">data test</li>
                <li className="text-gray-6">data test</li>
                <li className="text-gray-6">data test</li>
                <li className="text-gray-6">data test</li>
                <li className="text-gray-6">data test</li>
              </ul>
              <div className="flex border border-[#e5e5e5] items-center justify-between p-4 bg-[#f9f9f9] rounded-lg">
                <p className="text-[#4a4a4a">some thing</p>
                <div className="flex items-center">
                    <span className="text-black font-bold text-lg">$51,588</span>
                    <p>/Person</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}


export default CardSearch;