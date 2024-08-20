import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";

const columns = [
  { key: "modelID", label: "ID" },
  { key: "model", label: "Model" },
];

const data = [
  {
    modelID:"1",
    model: "Cabin",
  },
];

const Model = () => {
  return (
    <>
      <DefaultLayout>
        <CustomTable
          columns={columns}
          data={data}
          title="Model"
          createUrl="/dashboard/manage/cars/model/add"
        />
      </DefaultLayout>
    </>
  );
};

export default Model;
