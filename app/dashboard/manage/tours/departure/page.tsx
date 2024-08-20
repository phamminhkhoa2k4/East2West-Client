import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";


const columns = [
  { key: "departureDateID", label: "ID", isNumeric:true },
  { key: "departureDate", label: "Departure Date" },
];

const data = [
  {
    departureDateID: "/boat.png",
    departureDate: "Apple Watch Series 7 pham minh khoa dda dvsd dcs cdvsd ",
  },
];

const Departure = () => {
  return (
    <>
      <DefaultLayout>
        <CustomTable
          columns={columns}
          data={data}
          title="Departure"
          createUrl="/dashboard/manage/tours/category/add"
        />
      </DefaultLayout>
    </>
  );
};

export default Departure;
