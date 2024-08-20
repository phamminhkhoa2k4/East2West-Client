import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";

const columns = [
  { key: "categoryID", label: "ID" },
  { key: "CategoryName", label: "Category Name" },
  
];

const data = [
  {
    categoryID: "/boat.png",
    CategoryName: "Apple Watch Series 7 pham minh khoa dda dvsd dcs cdvsd ",
  },
];

const Tours = () => {
  return (
    <>
      <DefaultLayout>
        <CustomTable
          columns={columns}
          data={data}
          title="Category"
          createUrl="/dashboard/manage/tours/category/add"
        />
      </DefaultLayout>
    </>
  );
};

export default Tours;
