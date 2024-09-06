"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Place {
  placeid: number;
  placename: string;
  placethumbnail: string;
  description: string;
  placeduration: string;
}

const PlaceManagement: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [formData, setFormData] = useState({
    placename: '',
    placethumbnail: '',
    description: '',
    placeduration: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/itineraries/places');
      setPlaces(response.data);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const handleAddOrUpdate = async () => {
    try {
      if (isEditing && selectedPlace) {
        await axios.post(`http://localhost:8080/api/itineraries/places/createOrUpdate`, {
          placeid: selectedPlace.placeid,
          ...formData
        });
      } else {
        await axios.post('http://localhost:8080/api/itineraries/places/createOrUpdate', formData);
      }
      fetchPlaces();
      setFormData({
        placename: '',
        placethumbnail: '',
        description: '',
        placeduration: ''
      });
      setSelectedPlace(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error adding/updating place:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/itineraries/places/${id}`);
      fetchPlaces();
    } catch (error) {
      console.error('Error deleting place:', error);
    }
  };

  const handleEdit = (place: Place) => {
    setSelectedPlace(place);
    setFormData({
      placename: place.placename,
      placethumbnail: place.placethumbnail,
      description: place.description,
      placeduration: place.placeduration
    });
    setIsEditing(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Place Management</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Place Name"
          value={formData.placename}
          onChange={(e) => setFormData({ ...formData, placename: e.target.value })}
          className="p-2 border rounded mr-2"
        />
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={formData.placethumbnail}
          onChange={(e) => setFormData({ ...formData, placethumbnail: e.target.value })}
          className="p-2 border rounded mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="p-2 border rounded mr-2"
        />
        <input
          type="text"
          placeholder="Duration"
          value={formData.placeduration}
          onChange={(e) => setFormData({ ...formData, placeduration: e.target.value })}
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={handleAddOrUpdate}
          className="p-2 bg-blue-500 text-white rounded"
        >
          {isEditing ? 'Update Place' : 'Add Place'}
        </button>
      </div>
      
      {/* Table to display places */}
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Thumbnail</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Duration</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {places.map((place) => (
            <tr key={place.placeid}>
              <td className="border border-gray-300 p-2">{place.placename}</td>
              <td className="border border-gray-300 p-2">
                <img src={place.placethumbnail} alt={place.placename} className="w-20 h-20 object-cover" />
              </td>
              <td className="border border-gray-300 p-2">{place.description}</td>
              <td className="border border-gray-300 p-2">{place.placeduration}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEdit(place)}
                  className="p-1 bg-yellow-500 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(place.placeid)}
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

export default PlaceManagement;
