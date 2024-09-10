import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";


interface Airport {
  name: string;
  airportCode: string;
  location: string;
}

type SelectRecommendProps = {
  placeholder: string;
  change: (value: string | null) => void;
};

const SelectRecommend = ({ placeholder, change }: SelectRecommendProps) => {
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<Airport>>(null);

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (selectedOption) {
      change(selectedOption.airportCode);
    } else {
      change(null);
    }
  }, [selectedOption, change]);

  const options: Airport[] = [
    // Danh sách sân bay
    {
      name: "Noi Bai International Airport",
      airportCode: "HAN",
      location: "Phu Minh Commune, Soc Son District, Hanoi",
    },
    {
      name: "Tan Son Nhat International Airport",
      airportCode: "SGN",
      location: "Ward 2, Tan Binh District, Ho Chi Minh City",
    },
    {
      name: "Da Nang International Airport",
      airportCode: "DAD",
      location: "Hoa Thuan Tay Ward, Hai Chau District, Da Nang",
    },
    {
      name: "Cam Ranh International Airport",
      airportCode: "CXR",
      location: "Cam Nghia Commune, Cam Lam District, Khanh Hoa",
    },
    {
      name: "Phu Quoc International Airport",
      airportCode: "PQC",
      location: "Duong To Commune, Phu Quoc District, Kien Giang",
    },
    {
      name: "Can Tho International Airport",
      airportCode: "VCA",
      location: "Tra Noc Commune, Binh Thuy District, Can Tho",
    },
    {
      name: "Hue Phu Bai International Airport",
      airportCode: "HUI",
      location: "Thuy Bieu Ward, Hue City, Thua Thien Hue",
    },
    {
      name: "Pleiku Airport",
      airportCode: "PXU",
      location: "Tra Da Commune, Pleiku City, Gia Lai",
    },
    {
      name: "Tuy Hoa Airport",
      airportCode: "UIH",
      location: "Ward 9, Tuy Hoa City, Phu Yen",
    },
    {
      name: "Rach Gia Airport",
      airportCode: "VKG",
      location: "Vinh Bao Ward, Rach Gia City, Kien Giang",
    },
    {
      name: "Vinh Airport",
      airportCode: "VII",
      location: "Nghi Phu Commune, Vinh City, Nghe An",
    },
    {
      name: "Dong Hoi Airport",
      airportCode: "VDH",
      location: "Dong Son Ward, Dong Hoi City, Quang Binh",
    },
    {
      name: "Indira Gandhi International Airport",
      airportCode: "DEL",
      location: "Delhi",
    },
    {
      name: "Chhatrapati Shivaji Maharaj International Airport",
      airportCode: "BOM",
      location: "Mumbai, Maharashtra",
    },
    {
      name: "Kempegowda International Airport",
      airportCode: "BLR",
      location: "Bengaluru, Karnataka",
    },
    {
      name: "Rajiv Gandhi International Airport",
      airportCode: "HYD",
      location: "Hyderabad, Telangana",
    },
    {
      name: "Netaji Subhas Chandra Bose International Airport",
      airportCode: "CCU",
      location: "Kolkata, West Bengal",
    },
    {
      name: "Chennai International Airport",
      airportCode: "MAA",
      location: "Chennai, Tamil Nadu",
    },
    {
      name: "Cochin International Airport",
      airportCode: "COK",
      location: "Kochi, Kerala",
    },
    {
      name: "Goa International Airport",
      airportCode: "GOI",
      location: "Goa",
    },
    {
      name: "Jaipur International Airport",
      airportCode: "JAI",
      location: "Jaipur, Rajasthan",
    },
    {
      name: "Bagdogra Airport",
      airportCode: "IXB",
      location: "Bagdogra, West Bengal",
    },
    {
      name: "Trivandrum International Airport",
      airportCode: "TRV",
      location: "Thiruvananthapuram, Kerala",
    },
    {
      name: "Srinagar Airport",
      airportCode: "SXR",
      location: "Srinagar, Jammu and Kashmir",
    },
    {
      name: "Amritsar Sri Guru Ram Dass Jee International Airport",
      airportCode: "ATQ",
      location: "Amritsar, Punjab",
    },
    {
      name: "Varanasi Airport",
      airportCode: "VNS",
      location: "Varanasi, Uttar Pradesh",
    },
    {
      name: "Pune Airport",
      airportCode: "PNQ",
      location: "Pune, Maharashtra",
    },
  ];

  const filteredOptions = options.filter(
    (option) =>
      option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      option.airportCode.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  return (
    <Select
      value={selectedOption}
      onChange={setSelectedOption}
      onInputChange={handleInputChange}
      options={filteredOptions}
      getOptionLabel={(option) => `${option.name} (${option.airportCode})`}
      getOptionValue={(option) => option.airportCode}
      placeholder={placeholder}
      className="w-[300px] h-[60px] border-none outline-none ml-5 mb-10"
    />
  );
};

export default SelectRecommend;
