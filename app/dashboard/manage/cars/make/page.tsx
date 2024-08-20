import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";

const columns = [
  { key: "makeID", label: "ID" },
  { key: "makeName", label: "Make Name" },
];

const data = [
  {
    makeID : "1",
    makeName: "Wisdom",
  },
];

const Makes = () => {
  return (
    <>
      <DefaultLayout>
        <CustomTable
          columns={columns}
          data={data}
          title="Make"
          createUrl="/dashboard/manage/cars/make/add"
        />
      </DefaultLayout>
    </>
  );
};

export default Makes;
