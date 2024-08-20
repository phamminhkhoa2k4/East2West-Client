import { IoFastFoodOutline, IoBicycleOutline } from "react-icons/io5";
import { HiWifi } from "react-icons/hi";
import { BiCar } from "react-icons/bi";

const items = [
  {
    icon: IoFastFoodOutline,
    title: "Breakfast",
    text: "Everyone gets a breakfast plate every morning at the cabana behind the beach house.",
    color: "bg-green-50",
  },
  {
    icon: HiWifi,
    title: "Wi-Fi",
    text: "The beach house, and the wider area around it is covered by a 100mbps Wi-Fi network, free of charge.",
    color: "bg-red-50",
  },
  {
    icon: IoBicycleOutline,
    title: "Bicycles",
    text: "There are 10 bicycles available for all guests. Also, there is a beautiful hiking trail nearby.",
    color: "bg-blue-50",
  },
  {
    icon: BiCar,
    title: "Parking",
    text: "There are 3 parking spots in the shared campus parking lot available for the guests.",
    color: "bg-yellow-50",
  },
];

const WhatsIncluded = () => {
  return (
    <div className="flex flex-col space-y-6 my-8">
      <h2 className="text-lg font-bold">What&apos;s included?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
        {items.map(({ icon: IconComponent, color, text, title }) => (
          <div key={title} className="aspect-w-16 aspect-h-9 md:aspect-h-1">
            <div
              className={`flex flex-col h-full justify-between p-6 rounded-xl ${color}`}
            >
              <div className="flex justify-start w-full">
                <IconComponent className="text-3xl" />
              </div>
              <div className="flex flex-col flex-1 space-y-2 justify-end">
                <h3 className="text-sm font-bold">{title}</h3>
                <p className="text-sm">{text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatsIncluded;
