import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";

const columns = [
  { key: "themeID", label: "ID", isNumeric: true },
  { key: "themeName", label: "Theme Name" },
];

const data = [
  {
    themeID: "/boat.png",
    themeName: "Apple Watch Series 7 pham minh khoa dda dvsd dcs cdvsd ",
  },
];

const Themes = () => {
  return (
    <>
      <DefaultLayout>
        <CustomTable
          columns={columns}
          data={data}
          title="Theme"
          createUrl="/dashboard/manage/tours/theme/add"
        />
      </DefaultLayout>
    </>
  );
};

export default Themes;
