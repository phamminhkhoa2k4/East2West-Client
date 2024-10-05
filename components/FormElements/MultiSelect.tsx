import React, { useState, useRef, useEffect } from "react";

// Interface for each option
interface Option {
  value: number;
  text: string;
}

// Interface for DropdownProps
interface DropdownProps {
  id?: string;
  placeholder?: string;
  label?: string;
  options: Option[];
  selectedOptions?: Option[];
  onChange: (selectedOptions: Option[]) => void;
}

const MultiSelect: React.FC<DropdownProps> = ({
  id,
  placeholder,
  label,
  options: propOptions,
  selectedOptions: propSelectedOptions,
  onChange,
}) => {
  const [options, setOptions] = useState<Option[]>(propOptions);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    propSelectedOptions ?? []
  );
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOptions(propOptions);
  }, [propOptions]);

  useEffect(() => {
    if (propSelectedOptions) {
      setSelectedOptions(propSelectedOptions);
    }
  }, [propSelectedOptions]);

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

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  const toggleDropdown = () => setShow((prev) => !prev);

  const handleSelect = (option: Option) => {
    const updatedOptions = selectedOptions.some((o) => o.value === option.value)
      ? selectedOptions.filter((o) => o.value !== option.value)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  const removeOption = (value: number) => {
    const updatedOptions = selectedOptions.filter((o) => o.value !== value);
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  return (
    <div className="dropdown-wrapper relative w-full">
      {label && (
        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="dropdown-trigger flex flex-col items-center">
          <div
            ref={triggerRef}
            onClick={toggleDropdown}
            className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke py-[9px] pl-3 pr-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2"
          >
            <div className="flex flex-auto flex-wrap gap-3">
              {selectedOptions.length > 0 ? (
                selectedOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center justify-center rounded-[5px] border-[.5px] border-stroke bg-gray-2 px-2.5 py-[3px] text-body-sm font-medium dark:border-dark-3 dark:bg-dark"
                  >
                    <span className="max-w-full flex-initial">
                      {option.text}
                    </span>
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
                        <path d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z" />
                      </svg>
                    </div>
                  </div>
                ))
              ) : (
                <span className="text-placeholder text-gray-400">
                  {placeholder || "Select options"}
                </span>
              )}
            </div>
          </div>
        </div>
        {show && (
          <div
            ref={dropdownRef}
            className="dropdown-menu absolute z-10 mt-2 w-full bg-white shadow-lg"
          >
            <ul>
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className="cursor-pointer px-3 py-2 hover:bg-gray-200"
                >
                  {option.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
