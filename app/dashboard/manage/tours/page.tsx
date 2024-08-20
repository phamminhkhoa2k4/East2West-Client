import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";

const columns = [
  { key: "thumbnail", label: "Thumbnail" },
  { key: "title", label: "Title" },
  { key: "price", label: "Price", isNumeric: true },
  { key: "priceReduce", label: "Price Reduce",  isNumeric: true },
  { key: "groupSize", label: "Group Size" },
  { key: "deposit", label: "Deposit" },
  { key: "bookingHold", label: "Booking Hold" },
  { key: "bookingChange", label: "Booking Change" },
  { key: "themes", label: "Themes" },
  { key: "suitable", label: "Suitable" },
  { key: "category", label: "Category" },
  { key: "departure", label: "Departure Date" },
  { key: "itinerary", label: "Itinerary" },
];

const data = [
  {
    thumbnail: "/boat.png",
    title: "Apple Watch Series 7 pham minh khoa dda dvsd dcs cdvsd ",
    make: "Wisdom",
    model: "Cabin",
    price: "Cabin",
    priceReduce: "1234 Elm Street, Springfield, IL, 62704",
    groupSize: "1234 Elm Street, Springfield, IL, 62704",
    deposit: 1978,
    bookingHold: 7,
    bookingChange: "Manual",
    themes: "10000",
    suitable: "Company A",
    category: "Sales",
    departure: "60000",
    itinerary: "600L",
  },
];

const Theme = () => {
  return (
    <>
      <DefaultLayout>
        <CustomTable
          columns={columns}
          data={data}
          title="Tours"
          createUrl="/dashboard/manage/tours/add"
        />
      </DefaultLayout>
    </>
  );
};

export default Theme;
