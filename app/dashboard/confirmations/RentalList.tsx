import { updateData } from '@/utils/axios';
import React from 'react';
type RentalFetch = {
  rentalId: number
  tourTitle: string;
  status: string;
  user: User;
  rentalDate: string;
  totalAmount: number;
  refundAmount: number;
  reabson: string;
  refundDate: string;
  carName: string;
};

type User = {
  firstname: string;
  lastname: string;
  phone: string;
};

interface RentalCarListProps {
  rentals: RentalFetch[];
}

const RentalCarList: React.FC<RentalCarListProps> = ({ rentals }) => {
  const confirmRental = async (rentalId: number) => {
    try {
      const data = await updateData({
        id: rentalId,
        endpoint: '/confirmations/rental',
        payload: {},
      });
      alert('Rental confirmed');
    } catch (error) {
      console.error('Error confirming rental:', error);
    }
  };
  

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Rental Car List</h2>
      {rentals.map((rental) => (
        <div 
          key={rental.rentalId} 
          className="border border-gray-300 rounded-lg p-4 mb-4 shadow-md"
        >
          <p><strong>Car Name:</strong> {rental.carName}</p>
          <p><strong>User:</strong> {rental.user.firstname} {rental.user.lastname}</p>
          <p><strong>Phone:</strong> {rental.user.phone}</p>
          <p><strong>Status:</strong> {rental.status}</p>
          <p><strong>Rental Date:</strong> {rental.rentalDate ? new Date(rental.rentalDate).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Total Amount:</strong> ${rental.totalAmount ? rental.totalAmount.toFixed(2) : 'N/A'}</p>
          {rental.status === 'Waiting' && (
            <button 
              className="mt-2 py-1 px-4 bg-green-500 text-white rounded"
              onClick={() => confirmRental(rental.rentalId)}
            >
              Confirm Rental
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default RentalCarList;
