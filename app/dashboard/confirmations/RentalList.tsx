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
  const confirmRental = (rentalId: number) => {
<<<<<<< HEAD
    fetch(`/api/confirmations/rental/${rentalId}/confirm`, {
=======
    fetch(`http://localhost:8080/api/confirmations/rental/${rentalId}/confirm`, {
>>>>>>> 7ec56dd (add delete fetch)
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Rental confirmed');
        // Cập nhật danh sách hoặc tải lại dữ liệu ở đây nếu cần
      })
      .catch((error) => console.error('Error confirming rental:', error));
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
