import { updateData } from '@/utils/axios';
import React from 'react';


type BookingTourFetch = {
  bookingTourId: number;
  tourTitle: string;
  status: string;
  user: User;
  bookingDate: string;
  totalAmount: number;
  refundAmount : number;
};

type User = {
  firstname: string;
  lastname: string;
  phone: string;
  

};
interface BookingTourListProps {
  bookingTours: BookingTourFetch[];
}

const BookingTourList: React.FC<BookingTourListProps> = ({ bookingTours }) => {
  const confirmBookingTour = async (bookingTourId: number) => {
    try {
      const endpoint = `/confirmations/tour/${bookingTourId}/confirm`;
      await updateData({ id: bookingTourId, endpoint, payload: {} });
      alert('Booking Tour confirmed');
    } catch (error) {
      console.error('Error confirming booking tour:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Booking Tour List</h2>
      {bookingTours.map((bookingTour) => (
        <div 
          key={bookingTour.bookingTourId} 
          className="border border-gray-300 rounded-lg p-4 mb-4 shadow-md"
        >
          <p><strong>Tour Title:</strong> {bookingTour.tourTitle}</p>
          <p><strong>User:</strong> {bookingTour.user.firstname} {bookingTour.user.lastname}</p>
          <p><strong>Phone:</strong> {bookingTour.user.phone}</p>
          <p><strong>Status:</strong> {bookingTour.status}</p>
          <p><strong>Booking Date:</strong> {bookingTour.bookingDate ? new Date(bookingTour.bookingDate).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Total Amount:</strong> ${bookingTour.totalAmount ? bookingTour.totalAmount.toFixed(2) : 'N/A'}</p>
          {bookingTour.refundAmount !== null && (
            <p><strong>Refund Amount:</strong> ${bookingTour.refundAmount ? bookingTour.refundAmount.toFixed(2) : 'N/A'}</p>
          )}
          {bookingTour.status === 'Waiting' && (
            <button 
              className="mt-2 py-1 px-4 bg-green-500 text-white rounded"
              onClick={() => confirmBookingTour(bookingTour.bookingTourId)}
            >
              Confirm Booking
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingTourList;
