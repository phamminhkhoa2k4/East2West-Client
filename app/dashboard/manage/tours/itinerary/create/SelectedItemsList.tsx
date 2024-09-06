// SelectedItemsList.tsx
import React from 'react';

interface SelectedItemsListProps<T> {
  items: T[];
  onRemove: (id: number) => void;
  getItemName: (item: T) => string;
  getItemId: (item: T) => number;
}

const SelectedItemsList = <T,>({ items, onRemove, getItemName, getItemId }: SelectedItemsListProps<T>) => {
  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Selected Items</h3>
      <ul className="space-y-2">
        {items.map(item => (
          <li key={getItemId(item)} className="flex justify-between items-center p-2 border border-gray-200 rounded-lg">
            <span>{getItemName(item)}</span>
            <button 
              type="button" 
              onClick={() => onRemove(getItemId(item))}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedItemsList;
