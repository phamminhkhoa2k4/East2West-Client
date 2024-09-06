// import React from "react";

// interface InputGroupProps {
//   customClasses?: string;
//   label: string;
//   type: string;
//   placeholder: string;
//   required?: boolean;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   value?: string | null | undefined;
// }
// const InputGroup: React.FC<InputGroupProps> = ({
//   customClasses,
//   label,
//   type,
//   placeholder,
//   required,
//   onChange,
//   value,
// }) => {
//   return (
//     <>
//       <div className={customClasses}>
//         <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
//           {label}
//           {required && <span className="text-red">*</span>}
//         </label>
//         <input
//           type={type}
//           placeholder={placeholder}
//           onChange={(e) => onChange(e)} 
//         //  onChange={onChange}
//           value={value ?? ""}
//           className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
//         />
//       </div>
//     </>
//   );
// };

// export default InputGroup;
import React from "react";

interface InputGroupProps {
  customClasses?: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  value?: string | null | undefined;
  name?: string; // Add name to the props
}

const InputGroup: React.FC<InputGroupProps> = ({
  customClasses,
  label,
  type,
  placeholder,
  required,
  onChange,
  value,
  name // Destructure name
}) => {
  return (
    <div className={customClasses}>
      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
        {label}
        {required && <span className="text-red">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value ?? ""}
        name={name} // Pass the name to the input
        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
      />
    </div>
  );
};

export default InputGroup;
