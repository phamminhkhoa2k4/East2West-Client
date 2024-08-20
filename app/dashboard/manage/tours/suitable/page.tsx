import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";


const columns = [
  { key: "suitableID", label: "ID", isNumeric: true },
  { key: "suitableName", label: "suitable Name" },
];

const data = [
  {
    suitableID: "/boat.png",
    suitableName: "Apple Watch Series 7 pham minh khoa dda dvsd dcs cdvsd ",
  },
];

const Suitable = () => {
  return (
    <>
      <DefaultLayout>
        <CustomTable
          columns={columns}
          data={data}
          title="Suitable"
          createUrl="/dashboard/manage/tours/suitable/add"
        />
      </DefaultLayout>
    </>
  );
};

export default Suitable;
