import React, { useState } from 'react';

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
        id: Date.now().toString(),  // Unique ID for each date-time option
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
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <div className="flex items-center space-x-2">
          <input
            id={id}
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            placeholder={placeholder}
            className="border border-gray-300 p-2 rounded"
          />
          <button
            type="button"
            onClick={handleAddDateTime}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
        {selectedDates.length > 0 && (
          <div className="mt-2">
            <ul className="list-disc pl-5">
              {selectedDates.map(date => (
                <li key={date.id} className="flex justify-between items-center py-1">
                  <span>{new Date(date.dateTime).toISOString()}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDateTime(date.id)}
                    className="text-red-500"
                  >
                    &times;
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
