// import React, { useState, useEffect } from "react";

// type Option = {
//   id: number;
//   name: string;
// };

// type SelectProps = {
//   label: string;
//   placeholder: string;
//   data: Option[];
//   value?: number; // Allow the component to receive a pre-selected value
//   onChange: (value: number) => void;
// };

// const SelectGroupOne: React.FC<SelectProps> = ({
//   label,
//   placeholder,
//   data,
//   value, 
//   onChange,
// }) => {
//   const [selectedOption, setSelectedOption] = useState<number | "">(value ?? "");
//   useEffect(() => {
//     if (value !== undefined) {
//       setSelectedOption(value);
//     }
//   }, [value]);
//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newValue = parseInt(e.target.value, 10);
//     setSelectedOption(newValue);
//     onChange(newValue); // Call the onChange callback with the selected value
//   };

//   return (
//     <div className="mb-4.5 w-full">
//       <label className="mb-3 block text-body-sm text-dark dark:text-white">
//         {label}
//       </label>
//       <div className="relative z-20 bg-transparent dark:bg-dark-2">
//         <select
//           value={selectedOption}
//           onChange={handleChange}
//           className={`relative z-20 w-full appearance-none rounded-[7px] border border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary ${
//             selectedOption ? "text-dark dark:text-white" : ""
//           }`}
//         >
//           <option value="" disabled className="text-dark-6">
//             {placeholder}
//           </option>
//           {data.map((item) => (
//             <option key={item.id} value={item.id} className="text-dark-6">
//               {item.name}
//             </option>
//           ))}
//         </select>
//         <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
//           <svg
//             className="fill-current"
//             width="18"
//             height="18"
//             viewBox="0 0 18 18"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M8.99922 12.8249C8.83047 12.8249 8.68984 12.7687 8.54922 12.6562L2.08047 6.2999C1.82734 6.04678 1.82734 5.65303 2.08047 5.3999C2.33359 5.14678 2.72734 5.14678 2.98047 5.3999L8.99922 11.278L15.018 5.34365C15.2711 5.09053 15.6648 5.09053 15.918 5.34365C16.1711 5.59678 16.1711 5.99053 15.918 6.24365L9.44922 12.5999C9.30859 12.7405 9.16797 12.8249 8.99922 12.8249Z"
//               fill=""
//             />
//           </svg>
//         </span>
//       </div>
//     </div>
//   );
// };

// export default SelectGroupOne;
import React from 'react';

interface SelectGroupOneProps {
  label: string;
  options: string[];
  value: string;
  name: string;
  onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
}

const SelectGroupOne: React.FC<SelectGroupOneProps> = ({
  label,
  options = [],
  value,
  onChange,
  name,
  placeholder
}) => {
  return (
    <div className="w-full mb-4.5">
      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
        {label}
      </label>
      <select
        value={value}
        name={name}
        onChange={onChange}
        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
      >
        <option value="" disabled className="text-[#9da3ae]">
          {placeholder}
        </option>
        {options.length > 0 ? (
          options.map((option, index) => (
            <option className="capitalize" key={index} value={option}>
              {option}
            </option>
          ))
        ) : (
          <option disabled>No options available</option>
        )}
      </select>
    </div>
  );
};

export default SelectGroupOne;