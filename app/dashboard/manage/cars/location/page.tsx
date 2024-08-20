import DefaultLayout from "@/components/Layouts/DefaultLayout"
import CustomTable from "@/components/Tables/CustomTable";


const columns = [
  { key: "locationType", label: "Location Type" },
  { key: "locationTypeName", label: "Location Type Name" },
  
];

const data = [
  {
    locationType: "/boat.png",
    locationTypeName: "Apple Watch Series 7 pham minh khoa dda dvsd dcs cdvsd ",
  },
];
const LocationType = () => {
    return (
      <>
        <DefaultLayout>
            <CustomTable columns={columns} data={data} title="Location Type" createUrl="dashboard/manage/cars/location/add"/>
        </DefaultLayout>
      </>
    );
}

export default LocationType;