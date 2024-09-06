"use client";
import React, { useState } from 'react';
import axios from 'axios';
import SelectedItemsList from './SelectedItemsList'; // Import the component

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

interface Itinerary {
  itineraryId: number | null;
  name: string;
  description: string;
  accommodationIds: number[];
  mealIds: number[];
  placeIds: number[];
  transferIds: number[];
}

const ItineraryForm: React.FC = () => {
  const [itineraryName, setItineraryName] = useState<string>('');
  const [itineraryDescription, setItineraryDescription] = useState<string>('');
  const [searchResults, setSearchResults] = useState<{
    accommodations: Accommodation[];
    meals: Meal[];
    places: Place[];
    transfers: Transfer[];
  }>({
    accommodations: [],
    meals: [],
    places: [],
    transfers: []
  });
  const [selectedItems, setSelectedItems] = useState<{
    accommodations: Accommodation[];
    meals: Meal[];
    places: Place[];
    transfers: Transfer[];
  }>({
    accommodations: [],
    meals: [],
    places: [],
    transfers: []
  });

  const [searchQuery, setSearchQuery] = useState<{ 
    accommodations: string; 
    meals: string; 
    places: string; 
    transfers: string; 
  }>({
    accommodations: '',
    meals: '',
    places: '',
    transfers: ''
  });

  const search = async (type: string, query: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/itineraries/${type}/search?search=${query}`);
      setSearchResults(prev => ({
        ...prev,
        [type]: response.data || [] // Ensure it's not null
      }));
    } catch (error) {
      console.error('Error searching for items:', error);
    }
  };

  const handleSearchChange = (type: string, query: string) => {
    setSearchQuery(prev => ({ ...prev, [type]: query }));
    search(type, query);
  };

  const handleAddItem = (type: string, id: number) => {
    const item = searchResults[type].find(i => i[`${type.slice(0, -1)}id`] === id);
    if (item) {
      setSelectedItems(prev => ({
        ...prev,
        [type]: [...prev[type], item]
      }));
    }
  };

  const handleRemoveItem = (type: string, id: number) => {
    setSelectedItems(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item[`${type.slice(0, -1)}id`] !== id)
    }));
  };

  const handleSubmit = async () => {
    if (!itineraryName || !itineraryDescription) {
      alert("Name and description are required");
      return;
    }

    const itineraryData: Itinerary = {
      itineraryId: null, // or an existing ID if updating
      name: itineraryName,
      description: itineraryDescription,
      accommodationIds: selectedItems.accommodations.map(a => a.accommodationid),
      mealIds: selectedItems.meals.map(m => m.mealid),
      placeIds: selectedItems.places.map(p => p.placeid),
      transferIds: selectedItems.transfers.map(t => t.transferid)
    };

    try {
      await axios.post('http://localhost:8080/api/itineraries/createOrUpdate', itineraryData);
      alert('Itinerary created/updated successfully');
      // Reset form and selections
      setItineraryName('');
      setItineraryDescription('');
      setSelectedItems({
        accommodations: [],
        meals: [],
        places: [],
        transfers: []
      });
      setSearchQuery({
        accommodations: '',
        meals: '',
        places: '',
        transfers: ''
      });
      setSearchResults({
        accommodations: [],
        meals: [],
        places: [],
        transfers: []
      });
    } catch (error) {
      console.error('Error submitting itinerary:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create or Update Itinerary</h2>
      <form className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Name:</label>
          <input 
            type="text" 
            value={itineraryName} 
            onChange={e => setItineraryName(e.target.value)} 
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter itinerary name"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Description:</label>
          <textarea 
            value={itineraryDescription} 
            onChange={e => setItineraryDescription(e.target.value)} 
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter itinerary description"
          />
        </div>
  
        {/* Search Inputs in a Row */}
        <div className="mt-4 flex flex-wrap gap-4">
          {['accommodations', 'meals', 'places', 'transfers'].map(type => (
            <div key={type} className="flex-1 min-w-[200px]">
              <input 
                type="text" 
                value={searchQuery[type]}
                placeholder={`Search ${type.slice(0, -1).toUpperCase() + type.slice(1)}`} 
                onChange={e => handleSearchChange(type, e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
  
        {/* Results and Selected Items */}
        {['accommodations', 'meals', 'places', 'transfers'].map(type => (
          <div key={type} className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Search {type.charAt(0).toUpperCase() + type.slice(1)}</h3>
            <ul className="mt-2 space-y-2">
              {searchResults[type].length ? (
                searchResults[type].map(item => (
                  <li key={item[`${type.slice(0, -1)}id`]} className="flex justify-between items-center p-2 border border-gray-200 rounded-lg">
                    <span>{item[`${type.slice(0, -1)}name`]}</span>
                    <button 
                      type="button" 
                      onClick={() => handleAddItem(type, item[`${type.slice(0, -1)}id`])}
                      className="text-blue-500 hover:underline"
                    >
                      Add
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No results found</li>
              )}
            </ul>
            <SelectedItemsList
              items={selectedItems[type]}
              onRemove={id => handleRemoveItem(type, id)}
              getItemName={item => item[`${type.slice(0, -1)}name`]}
              getItemId={item => item[`${type.slice(0, -1)}id`]}
            />
          </div>
        ))}
  
        <div className="mt-6">
          <button 
            type="button" 
            onClick={handleSubmit} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
  
};

export default ItineraryForm;
