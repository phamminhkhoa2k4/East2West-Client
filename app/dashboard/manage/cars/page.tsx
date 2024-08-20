
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";

const columns = [
  { key: "thumbnail", label: "Thumbnail" },
  { key: "carName", label: "Name" },
  { key: "make", label: "Make" },
  { key: "model", label: "Model" },
  { key: "type", label: "Type" },
  { key: "locationType", label: "Location Type" },
  { key: "year", label: "Year", isNumeric: true },
  { key: "seatingCapacity", label: "Seating Capacity", isNumeric: true },
  { key: "airConditioned", label: "Air Conditioned" },
  { key: "pricePerDay", label: "Price Per Day" },
  { key: "gearbox", label: "Gearbox" },
  { key: "status", label: "Status" },
  { key: "mileages", label: "Mileages" },
  { key: "fuelTankCapacity", label: "Fuel Tank Capacity" },
  { key: "fuel", label: "Fuel" },
  { key: "location", label: "Location" },
];

const data = [
  {
    thumbnail: "/boat.png",
    carName: "Apple Watch Series 7 pham minh khoa dda dvsd dcs cdvsd ",
    make: "Wisdom",
    model: "Cabin",
    type: "Cabin",
    locationType: "1234 Elm Street, Springfield, IL, 62704",
    location: "1234 Elm Street, Springfield, IL, 62704",
    year: 1978,
    seatingCapacity: 7,
    gearbox: "Manual",
    description: "Company A",
    pricePerDay: "10000",
    status: "Sales",
    mileages: "60000",
    fuelTankCapacity: "600L",
    fuel: "Diesel",
    airConditioned: "false",
  },
];

const Cars = () => {
  return (
    <>
      <DefaultLayout>
        <CustomTable
          columns={columns}
          data={data}
          title="Cars"
          createUrl="/dashboard/manage/cars/add"
        />
      </DefaultLayout>
    </>
  );
};

export default Cars;
