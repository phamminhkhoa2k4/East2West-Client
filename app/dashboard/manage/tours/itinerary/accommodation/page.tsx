"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Accommodation {
  accommodationid: number;
  accommodationname: string;
  durationaccommodation: string;
  accommodationtype: string;
  isbreadkfast: boolean;
  accommodationthumbnail: string[];
  roomtype: string;
}

const AccommodationManagement: React.FC = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
  const [formData, setFormData] = useState({
    accommodationname: '',
    durationaccommodation: '',
    accommodationtype: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAccommodations();
  }, []);

  const fetchAccommodations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/itineraries/accommodations');
      setAccommodations(response.data);
    } catch (error) {
      console.error('Error fetching accommodations:', error);
    }
  };

  const handleAddOrUpdate = async () => {
    try {
      const payload = {
        ...formData,
        accommodationid: isEditing && selectedAccommodation ? selectedAccommodation.accommodationid : undefined
      };

      if (isEditing && selectedAccommodation) {
        await axios.post('http://localhost:8080/api/itineraries/accommodations/createOrUpdate', payload);
      } else {
        await axios.post('http://localhost:8080/api/itineraries/accommodations/createOrUpdate', payload);
      }

      fetchAccommodations();
      setFormData({
        accommodationname: '',
        durationaccommodation: '',
        accommodationtype: ''
      });
      setSelectedAccommodation(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error adding/updating accommodation:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/itineraries/accommodations/${id}`);
      fetchAccommodations();
    } catch (error) {
      console.error('Error deleting accommodation:', error);
    }
  };

  const handleEdit = (accommodation: Accommodation) => {
    setSelectedAccommodation(accommodation);
    setFormData({
      accommodationname: accommodation.accommodationname,
      durationaccommodation: accommodation.durationaccommodation,
      accommodationtype: accommodation.accommodationtype
    });
    setIsEditing(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Accommodation Management</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Accommodation Name"
          value={formData.accommodationname}
          onChange={(e) => setFormData({ ...formData, accommodationname: e.target.value })}
          className="p-2 border rounded mr-2"
        />
        <input
          type="text"
          placeholder="Duration"
          value={formData.durationaccommodation}
          onChange={(e) => setFormData({ ...formData, durationaccommodation: e.target.value })}
          className="p-2 border rounded mr-2"
        />
        <input
          type="text"
          placeholder="Type"
          value={formData.accommodationtype}
          onChange={(e) => setFormData({ ...formData, accommodationtype: e.target.value })}
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={handleAddOrUpdate}
          className="p-2 bg-blue-500 text-white rounded"
        >
          {isEditing ? 'Update Accommodation' : 'Add Accommodation'}
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Duration</th>
            <th className="border border-gray-300 p-2">Type</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {accommodations.map((accommodation) => (
            <tr key={accommodation.accommodationid}>
              <td className="border border-gray-300 p-2">{accommodation.accommodationname}</td>
              <td className="border border-gray-300 p-2">{accommodation.durationaccommodation}</td>
              <td className="border border-gray-300 p-2">{accommodation.accommodationtype}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEdit(accommodation)}
                  className="p-1 bg-yellow-500 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(accommodation.accommodationid)}
                  className="p-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccommodationManagement;
