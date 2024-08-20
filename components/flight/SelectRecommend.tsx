import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import axios from "axios";


interface Airport {
  value: string;
  label: string;
  iataCode: string;
  name: string;
  address: {
    cityName: string;
    countryName: string;
  };
}

type selectRecommendProps = {
  placeholder: string;
  change: (value: string | null) => void;
};


const SelectRecommend = ({ placeholder, change }: selectRecommendProps) => {
  // const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<Airport>>(null);
  const [accessToken, setAccessToken] = useState("");
  const [inputValue, setInputValue] = useState("");


  useEffect(() => {
    if (selectedOption) {
      change(selectedOption.value);
    } else {
      change(null);
    }
  }, [selectedOption,change]);

  // useEffect(() => {
  //   const getAccessToken = async () => {
  //     try {
  //       const response = await axios.post(
  //         "https://test.api.amadeus.com/v1/security/oauth2/token",
  //         new URLSearchParams({
  //           grant_type: "client_credentials",
  //           client_id: "YOUR_API_KEY",
  //           client_secret: "YOUR_API_SECRET",
  //         })
  //       );

  //       setAccessToken(response.data.access_token);
  //     } catch (error) {
  //       console.error("Error getting access token:", error);
  //     }
  //   };

  //   getAccessToken();
  // }, []);

  // useEffect(() => {
  //   const fetchAirports = async () => {
  //     if (inputValue === "") {
  //       setOptions([]);
  //       return;
  //     }

  //     try {
  //       const response = await axios.get(
  //         "https://test.api.amadeus.com/v1/reference-data/locations",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //           params: {
  //             subType: "AIRPORT",
  //             keyword: inputValue,
  //             "page[limit]": 10,
  //           },
  //         }
  //       );

  //       const airports = response.data.data.map((airport: any) => ({
  //         value: airport.iataCode,
  //         label: `${airport.name} (${airport.iataCode}), ${airport.address.cityName}, ${airport.address.countryName}`,
  //       }));

  //       setOptions(airports);
  //     } catch (error) {
  //       console.error("Error fetching airports:", error);
  //     }
  //   };

  //   fetchAirports();
  // }, [inputValue, accessToken]);

  const options: Airport[] = [
    {
      value: "chocolate",
      label: "Chocolate",
      iataCode: "LAX",
      name: "Los Angeles International Airport",
      address: {
        cityName: "Los Angeles",
        countryName: "United States",
      },
    },
    {
      value: "strawberry",
      label: "Strawberry",
      iataCode: "NRT",
      name: "Narita International Airport",
      address: {
        cityName: "Tokyo",
        countryName: "Japan",
      },
    },
  ];

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  return (
    <Select
      value={selectedOption}
      onChange={setSelectedOption}
      onInputChange={handleInputChange}
      options={options}
      placeholder={placeholder}
      className="w-[300px] h-[60px] border-none outline-none ml-5 mb-10"
    />
  );
};

export default SelectRecommend;


