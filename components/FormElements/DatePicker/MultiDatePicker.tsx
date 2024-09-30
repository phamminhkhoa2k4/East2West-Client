import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";

interface DateTimeOption {
  id: string;
  dateTime: string;
}

interface DateTimePickerProps {
  id?: string;
  placeholder?: string;
  label: string;
  selectedDates: DateTimeOption[];
  onChange: (selectedDates: DateTimeOption[]) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ id, placeholder, label, selectedDates, onChange }) => {
  const [dateTime, setDateTime] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAddDateTime = () => {
    if (dateTime) {
      const newDateTime: DateTimeOption = {
        id: Date.now().toString(), 
        dateTime,
      };
      
      const updatedDates = [...selectedDates, newDateTime];
      onChange(updatedDates);
      setDateTime('');
    }
  };

  const handleRemoveDateTime = (id: string) => {
    const updatedDates = selectedDates.filter(date => date.id !== id);
    onChange(updatedDates);
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  return (
    <div className="date-time-picker">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        <div className="flex items-center space-x-2">
          <input
            id={id}
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            placeholder={placeholder}
            className="border pl-5 border-gray-300 p-2 rounded w-5/6"
          />
          <button
            type="button"
            onClick={handleAddDateTime}
            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded w-1/6"
          >
            Add
          </button>
        </div>
        {selectedDates?.length > 0 && (
          <div className="mt-5">
            <ul className="pl-5">
              {selectedDates.map((date) => (
                <li
                  key={date.id}
                  className="flex justify-between items-center py-1"
                >
                  <span>
                    {new Date(date.dateTime).toLocaleString("vi-VN", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: false,
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    })}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleRemoveDateTime(date.id)}
                    className="text-white font-semibold px-3 py-2 rounded-lg bg-slate-500"
                  >
                    <IoMdClose className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateTimePicker;
