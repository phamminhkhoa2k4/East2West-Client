"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Meal {
  mealid: number;
  mealname: string;
  mealthumbnail: string;
  mealduration: string;
  mealactivity: string;
}

const MealManagement: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [formData, setFormData] = useState({
    mealname: '',
    mealthumbnail: '',
    mealduration: '',
    mealactivity: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/itineraries/meals');
      setMeals(response.data);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  const handleAddOrUpdate = async () => {
  try {
    const payload = {
      ...formData,
      mealid: isEditing && selectedMeal ? selectedMeal.mealid : undefined // Add mealId for updates
    };

    if (isEditing && selectedMeal) {
      await axios.post(`http://localhost:8080/api/itineraries/meals/createOrUpdate`, payload);
    } else {
      await axios.post('http://localhost:8080/api/itineraries/meals/createOrUpdate', payload);
    }

    fetchMeals();
    setFormData({
      mealname: '',
      mealthumbnail: '',
      mealduration: '',
      mealactivity: ''
    });
    setSelectedMeal(null);
    setIsEditing(false);
  } catch (error) {
    console.error('Error adding/updating meal:', error);
  }
};

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/itineraries/meals/${id}`);
      fetchMeals();
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  const handleEdit = (meal: Meal) => {
    setSelectedMeal(meal);
    setFormData({
      mealname: meal.mealname,
      mealthumbnail: meal.mealthumbnail,
      mealduration: meal.mealduration,
      mealactivity: meal.mealactivity
    });
    setIsEditing(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Meal Management</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Meal Name"
          value={formData.mealname}
          onChange={(e) => setFormData({ ...formData, mealname: e.target.value })}
          className="p-2 border rounded mr-2"
        />
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={formData.mealthumbnail}
          onChange={(e) => setFormData({ ...formData, mealthumbnail: e.target.value })}
          className="p-2 border rounded mr-2"
        />
        <input
          type="text"
          placeholder="Duration"
          value={formData.mealduration}
          onChange={(e) => setFormData({ ...formData, mealduration: e.target.value })}
          className="p-2 border rounded mr-2"
        />
        <input
          type="text"
          placeholder="Activity"
          value={formData.mealactivity}
          onChange={(e) => setFormData({ ...formData, mealactivity: e.target.value })}
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={handleAddOrUpdate}
          className="p-2 bg-blue-500 text-white rounded"
        >
          {isEditing ? 'Update Meal' : 'Add Meal'}
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Thumbnail</th>
            <th className="border border-gray-300 p-2">Duration</th>
            <th className="border border-gray-300 p-2">Activity</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((meal) => (
            <tr key={meal.mealid}>
              <td className="border border-gray-300 p-2">{meal.mealname}</td>
              <td className="border border-gray-300 p-2">
                <img src={meal.mealthumbnail} alt={meal.mealname} className="w-20 h-20 object-cover" />
              </td>
              <td className="border border-gray-300 p-2">{meal.mealduration}</td>
              <td className="border border-gray-300 p-2">{meal.mealactivity}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEdit(meal)}
                  className="p-1 bg-yellow-500 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(meal.mealid)}
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

export default MealManagement;
