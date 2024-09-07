"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  firstname: string;
  lastname: string;
  phone: string;
}

interface Booking {
  bookingTourId: number;
  tourTitle: string;
  user: User;
  status: string;
  bookingDate: string;
  totalAmount: number;
}

interface CancelDTO {
  bookingTourId: number;
  reasson: string;
}

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [refundReason, setRefundReason] = useState<string>('');
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);

  // Fetch bookings from API
  useEffect(() => {
    axios.get('http://localhost:8080/api/bookings')
      .then(response => setBookings(response.data))
      .catch(error => console.error('Error fetching bookings:', error));
  }, []);

  // Handle refund button click
  const handleRefund = (bookingId: number) => {
    setSelectedBookingId(bookingId);
  };

  // Submit refund request
  const processRefund = () => {
    if (selectedBookingId === null || refundReason.trim() === '') {
      alert('Please select a booking and provide a reason for the refund.');
      return;
    }

    const refundRequest: CancelDTO = {
      bookingTourId: selectedBookingId,
      reasson: refundReason
    };

    axios.post('http://localhost:8080/api/employee-bookings/refund', refundRequest)
      .then(response => {
        alert('Refund processed successfully');
        // Refresh bookings after refund
        setBookings(bookings.map(booking => 
          booking.bookingTourId === selectedBookingId ? 
            { ...booking, status: 'Refunded' } : booking
        ));
        setSelectedBookingId(null);
        setRefundReason('');
      })
      .catch(error => alert('Error processing refund: ' + error.response?.data || error.message));
  };

  return (
    <div>
      <h2>Booking List</h2>
      <table border="1" width="100%" style={{ textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Tour Title</th>
            <th>User</th>
            <th>Status</th>
            <th>Booking Date</th>
            <th>Total Amount</th>
            <th>Refund</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.bookingTourId}>
              <td>{booking.bookingTourId}</td>
              <td>{booking.tourTitle}</td>
              <td>{booking.user.firstname} {booking.user.lastname} ({booking.user.phone})</td>
              <td>{booking.status}</td>
              <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
              <td>${booking.totalAmount}</td>
              <td>
                {booking.status !== 'Refunded' ? (
                  <button onClick={() => handleRefund(booking.bookingTourId)}>Refund</button>
                ) : (
                  'Refunded'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Refund form */}
      {selectedBookingId !== null && (
        <div style={{ marginTop: '20px' }}>
          <h3>Refund Booking ID: {selectedBookingId}</h3>
          <textarea 
            placeholder="Enter reason for refund" 
            value={refundReason} 
            onChange={(e) => setRefundReason(e.target.value)} 
            rows={3} 
            style={{ width: '100%' }} 
          />
          <button onClick={processRefund} style={{ marginTop: '10px' }}>Process Refund</button>
        </div>
      )}
    </div>
  );
};

export default Bookings;
