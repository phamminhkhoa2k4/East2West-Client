
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Transfer {
  transferid: number;
  transfername: string;
  transferthumbnail: string;
  description: string;
  transferduration: string;
}

const TransferManagement: React.FC = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null);
  const [formData, setFormData] = useState({
    transfername: '',
    transferthumbnail: '',
    description: '',
    transferduration: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/itineraries/transfers');
      setTransfers(response.data);
    } catch (error) {
      console.error('Error fetching transfers:', error);
    }
  };

  const handleAddOrUpdate = async () => {
    try {
      const payload = {
        ...formData,
        transferid: isEditing && selectedTransfer ? selectedTransfer.transferid : undefined
      };

      if (isEditing && selectedTransfer) {
        await axios.post('http://localhost:8080/api/itineraries/transfers/createOrUpdate', payload);
      } else {
        await axios.post('http://localhost:8080/api/itineraries/transfers/createOrUpdate', payload);
      }

      fetchTransfers();
      setFormData({
        transfername: '',
        transferthumbnail: '',
        description: '',
        transferduration: ''
      });
      setSelectedTransfer(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error adding/updating transfer:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/itineraries/transfers/${id}`);
      fetchTransfers();
    } catch (error) {
      console.error('Error deleting transfer:', error);
    }
  };

  const handleEdit = (transfer: Transfer) => {
    setSelectedTransfer(transfer);
    setFormData({
      transfername: transfer.transfername,
      transferthumbnail: transfer.transferthumbnail,
      description: transfer.description,
      transferduration: transfer.transferduration
    });
    setIsEditing(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transfer Management</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Transfer Name"
          value={formData.transfername}
          onChange={(e) => setFormData({ ...formData, transfername: e.target.value })}
          className="p-2 border rounded mr-2"
        />
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={formData.transferthumbnail}
          onChange={(e) => setFormData({ ...formData, transferthumbnail: e.target.value })}
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
          value={formData.transferduration}
          onChange={(e) => setFormData({ ...formData, transferduration: e.target.value })}
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={handleAddOrUpdate}
          className="p-2 bg-blue-500 text-white rounded"  >
          {isEditing ? 'Update Transfer' : 'Add Transfer'}
        </button>
      </div>
      
      {/* Table to display transfers */}
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
          {transfers.map((transfer) => (
            <tr key={transfer.transferid}>
              <td className="border border-gray-300 p-2">{transfer.transfername}</td>
              <td className="border border-gray-300 p-2">
                <img src={transfer.transferthumbnail} alt={transfer.transfername} className="w-16 h-16" />
              </td>
              <td className="border border-gray-300 p-2">{transfer.description}</td>
              <td className="border border-gray-300 p-2">{transfer.transferduration}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEdit(transfer)}
                  className="p-1 bg-yellow-500 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(transfer.transferid)}
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

export default TransferManagement;
