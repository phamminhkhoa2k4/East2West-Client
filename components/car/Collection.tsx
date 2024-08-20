<<<<<<< HEAD
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import api from "../../utils/axios";
import CardPopular from "./CardPopular";

=======
"use client"

import Image from "next/image";
import { useState } from "react";
import CardPopular from "./CardPopular";






>>>>>>> aa0544e38407cf1589e599ba818920f672357525
interface CarCardProps {
  img: string;
  title: string;
  desc: string;
  category: string;
  price: string;
  offPrice?: string;
}

<<<<<<< HEAD
interface Car {
  carId: number;
  carName: string;
  model: {
    modelId: number;
    modelName: string;
  };
  make: {
    makeId: number;
    makeName: string;
  };
  type: {
    typeId: number;
    typeName: string;
  };
  year: number;
  seatCapacity: number;
  airConditioned: boolean;
  pricePerDay: number;
  status: string;
  cargearbox: string;
  miles: string;
  fueltankcapacity: string;
  fuel: string;
  location: string;
}

interface CarType {
  typeId: number;
  typeName: string;
}

function Card({ img, category, title, desc, price, offPrice }: CarCardProps) {
=======
function Card({ img, category, title, desc, price, offPrice }: CarCardProps) {
    
>>>>>>> aa0544e38407cf1589e599ba818920f672357525
  return (
    <div className="bg-transparent shadow-none">
      <div className="bg-gray-700 rounded-lg overflow-hidden mb-6">
        <Image
          width={768}
          height={768}
          src={img}
          alt={title}
          className="h-full w-full scale-[1.1] object-cover object-center"
        />
      </div>
      <div className="p-0">
        <p className="text-blue-500 mb-2 text-xs font-semibold">{category}</p>
        <a href="#">
          <h5 className="text-blue-gray-800 mb-3 text-xl font-bold normal-case xl:w-64">
            {title}
          </h5>
        </a>
        <p className="text-gray-500 mb-4 font-normal">{desc}</p>
        <div className="flex gap-2">
          <p className={`text-xl ${offPrice ? "line-through" : ""}`}>{price}</p>
          <p className="text-xl text-red-500">{offPrice}</p>
        </div>
      </div>
    </div>
  );
}
<<<<<<< HEAD

const Collection = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [carTabs, setCarTabs] = useState<string[]>(["All Type"]);
  const [activeTab, setActiveTab] = useState<string>("All Type");
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    const fetchCarTypes = async () => {
      try {
        const response = await api.get("/cars/type");
        const types = response.data.map((type: CarType) => type.typeName);
        setCarTabs((prevTabs) => ["All Type", ...types]);
      } catch (error) {
        console.error("Error fetching car types:", error);
      }
    };

    fetchCars();
    fetchCarTypes();
  }, []);

  const filteredCars =
    activeTab === "All Type"
      ? cars
      : cars.filter((car) => car.type.typeName === activeTab);

  return (
    <section className="px-8 pt-20 pb-10">
      <div className="container mx-auto mb-20 text-center">
        <p className="mb-3 font-bold uppercase text-blue-500">Collection</p>
        <h1 className="mb-2 text-4xl font-bold text-blue-gray-800">
          Explore Our Collection Cars
=======
const Collection = () => {
    const [books, setBooks] = useState(
      Array(6)
        .fill(1)
        .map((_, index) => ({
          img: `/image/tours/RectangleBig5.svg`,
          category: "Lamborghini",
          title: "Lamborghini Veneno",
          desc: "ka ka ka ka ka ",
          price: "$99",
          offPrice: "$79",
        }))
    );

    const [carTabs, setCarTabs] = useState<string[]>([
      "All Type",
      "SUV",
      "Sedan",
      "Sport",
      "Electric",
    ]);
    const [activeTab, setActiveTab] = useState<string>("All Type");
    return ( 
        <> 
            <section className="px-8 pt-20 pb-10">
      <div className="container mx-auto mb-20 text-center">
        <p className="mb-3 font-bold uppercase text-blue-500">
          Collection
        </p>
        <h1 className="mb-2 text-4xl font-bold text-blue-gray-800">
          Explore Our Collection Cars 
>>>>>>> aa0544e38407cf1589e599ba818920f672357525
        </h1>
        <p className="mx-auto w-full px-4 text-lg text-gray-500 lg:w-9/12">
          Explore many cars you have never been to and experience new things,
          Go to any where, etc.
        </p>
        <div className="mt-20 flex items-center justify-center">
          <div className="w-full lg:w-8/12">
            <div className="flex justify-between bg-transparent h-12">
              {carTabs.map((car) => (
                <button
                  key={car}
                  onClick={() => setActiveTab(car)}
                  className={`capitalize transition-all duration-300 font-medium ${
                    activeTab === car
                      ? "text-white bg-gray-900 rounded-lg"
                      : "text-gray-800"
                  } px-4 py-2`}
                >
                  {car}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 items-start gap-x-6 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
<<<<<<< HEAD
        {filteredCars.map((car) => (
          <CardPopular
            img={`/path/to/car/image/${car.carId}.jpg`} 
            title={car.carName}
            desc={`Model: ${car.model.modelName}, Make: ${car.make.makeName}`}
            category={car.type.typeName}
            price={`$${car.pricePerDay}`}
            offPrice={undefined} 
            seat={car.seatCapacity}
            gear={car.cargearbox}
            fuel={car.fuel}
            carId={car.carId}
          />
=======
        {books.map((props, key) => (
        //   <Card key={key} {...props} />
        <CardPopular key={key} {...props}/>
>>>>>>> aa0544e38407cf1589e599ba818920f672357525
        ))}
      </div>
      <div className="grid place-items-center">
        <button className="mt-32 px-4 py-2 border border-gray-800 text-gray-800 rounded">
          Show more
        </button>
      </div>
    </section>
<<<<<<< HEAD
  );
};

export default Collection;
=======
        </>
    )
}


export default Collection;

>>>>>>> aa0544e38407cf1589e599ba818920f672357525
