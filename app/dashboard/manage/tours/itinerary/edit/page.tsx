"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Accommodation {
  accommodationid: number;
  accommodationname: string;
  durationaccommodation: string;
  accommodationtype: string;
}

interface Meal {
  mealid: number;
  mealname: string;
  mealthumbnail: string;
  mealduration: string;
  mealactivity: string;
}

interface Place {
  placeid: number;
  placename: string;
  placethumbnail: string;
  description: string;
  placeduration: string;
}

interface Transfer {
  transferid: number;
  transfername: string;
  transferthumbnail: string;
  description: string;
  transferduration: string;
}

type Entity = 'accommodations' | 'meals' | 'places' | 'transfers';

const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<Entity>('accommodations');
  const [items, setItems] = useState<Accommodation[] | Meal[] | Place[] | Transfer[]>([]);
  const [editItem, setEditItem] = useState<Accommodation | Meal | Place | Transfer | null>(null);

  useEffect(() => {
    fetchItems(entityType);
  }, [entityType]);

  const fetchItems = async (type: Entity) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/itineraries/${type}`);
      setItems(response.data);
    } catch (error) {
      console.error(`Error fetching ${type} items:`, error);
    }
  };

  const handleEdit = (item: Accommodation | Meal | Place | Transfer) => {
    setEditItem(item);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/itineraries/${entityType}/${id}`);
      fetchItems(entityType);
    } catch (error) {
      console.error(`Error deleting ${entityType} item:`, error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editItem) {
      try {
        const url = `http://localhost:8080/api/itineraries/${entityType}/${editItem[`${entityType}id`]}`;
        if (editItem[`${entityType}id`]) {
          await axios.put(url, editItem);
        } else {
          await axios.post(url, editItem);
        }
        setEditItem(null);
        fetchItems(entityType);
      } catch (error) {
        console.error(`Error saving ${entityType} item:`, error);
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage {entityType.charAt(0).toUpperCase() + entityType.slice(1)}</h2>
      <div className="mb-4">
        <label htmlFor="entityType" className="block font-semibold mb-2">Select Entity Type:</label>
        <select
          id="entityType"
          value={entityType}
          onChange={e => setEntityType(e.target.value as Entity)}
          className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="accommodations">Accommodation</option>
          <option value="meals">Meal</option>
          <option value="places">Place</option>
          <option value="transfers">Transfer</option>
        </select>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Items</h3>
        <ul className="space-y-2">
          {items.length ? (
            items.map(item => (
              <li key={(item as any)[`${entityType}id`]} className="flex justify-between items-center p-2 border border-gray-200 rounded-lg">
                <span>{(item as any)[`${entityType}name`] || (item as any)[`name`]}</span>
                <div>
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete((item as any)[`${entityType}id`])}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No items found</li>
          )}
        </ul>
      </div>

      {editItem && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <h3 className="text-xl font-semibold mb-2">Edit {entityType.charAt(0).toUpperCase() + entityType.slice(1)}</h3>
          {/* Example input fields; customize according to entity type */}
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">{entityType.charAt(0).toUpperCase() + entityType.slice(1)} Name:</label>
            <input
              type="text"
              value={(editItem as any)[`${entityType}name`] || ''}
              onChange={e => setEditItem(prev => ({ ...prev, [`${entityType}name`]: e.target.value }))}
              className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${entityType} name`}
            />
          </div>
          {/* Add other input fields as necessary */}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default ManagementPage;
