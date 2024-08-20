import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";

const columns = [
  { key: "TypeID", label: "ID" },
  { key: "TypeName", label: "Type Name" },
];

const data = [
  {
    TypeID: "1",
    TypeName: "Cabin",
  },
];

const Types = () => {
  return (
    <>
      <DefaultLayout>
        <CustomTable
          columns={columns}
          data={data}
          title="Types"
          createUrl="/dashboard/manage/cars/type/add"
        />
      </DefaultLayout>
    </>
  );
};

export default Types;
