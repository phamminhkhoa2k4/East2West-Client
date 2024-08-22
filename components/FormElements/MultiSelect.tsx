import React, { useState, useRef, useEffect } from "react";

// Interface cho từng tùy chọn
interface Option {
  value: number;
  text: string;
}

// Interface cho DropdownProps
interface DropdownProps {
  id: string;
  placeholder: string;
  label: string;
  options: Option[];
  onChange: (selectedOptions: Option[]) => void;
}

const MultiSelect: React.FC<DropdownProps> = ({ id, placeholder, label, options: propOptions, onChange }) => {
  const [options, setOptions] = useState<Option[]>(propOptions);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOptions(propOptions);
  }, [propOptions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShow(prev => !prev);
  };

  const handleSelect = (option: Option) => {
    let updatedOptions;
    if (selectedOptions.find(o => o.value === option.value)) {
      updatedOptions = selectedOptions.filter(o => o.value !== option.value);
    } else {
      updatedOptions = [...selectedOptions, option];
    }
    setSelectedOptions(updatedOptions);
    console.log("Updated Options:", updatedOptions); // Log dữ liệu
    onChange(updatedOptions);  // Gọi onChange với updatedOptions
  };
  

  const removeOption = (value: number) => {
    setSelectedOptions(selectedOptions.filter(o => o.value !== value));
    onChange(selectedOptions.filter(o => o.value !== value));
  };

  return (
    <div className="dropdown-wrapper relative w-full">
  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
    {label}
  </label>
  <div className="relative">
    <div className="dropdown-trigger flex flex-col items-center">
      <div
        ref={triggerRef}
        onClick={toggleDropdown}
        className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke py-[9px] pl-3 pr-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2"
      >
        <div className="flex flex-auto flex-wrap gap-3">
          {selectedOptions.length > 0 ? (
            selectedOptions.map(option => (
              <div
                key={option.value}
                className="flex items-center justify-center rounded-[5px] border-[.5px] border-stroke bg-gray-2 px-2.5 py-[3px] text-body-sm font-medium dark:border-dark-3 dark:bg-dark"
              >
                <span className="max-w-full flex-initial">{option.text}</span>
                <div
                  onClick={() => removeOption(option.value)}
                  className="cursor-pointer pl-1 hover:text-red"
                >
                  <svg
                    className="fill-current"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z"
                      fill=""
                    />
                  </svg>
                </div>
              </div>
            ))
          ) : (
            <input
              placeholder={placeholder}
              className="h-full w-full appearance-none bg-transparent p-1 px-2 text-dark-5 outline-none dark:text-dark-6"
              readOnly
              value=""
            />
          )}
        </div>
      </div>
      <div
        className={`dropdown-menu absolute left-0 top-full z-20 w-full max-h-select overflow-y-auto rounded bg-white shadow-1 dark:bg-dark-2 dark:shadow-card ${
          show ? "" : "hidden"
        }`}
        ref={dropdownRef}
      >
        {options.map(option => (
          <div
            key={option.value}
            className="w-full cursor-pointer rounded-t border-b border-stroke hover:bg-primary/5 dark:border-dark-3"
            onClick={() => handleSelect(option)}
          >
            <div className="relative flex w-full items-center border-l-2 border-transparent p-2 pl-2">
              <div className="flex w-full items-center">
                <div className="mx-2 leading-6">{option.text}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

  );
};

export default MultiSelect;
