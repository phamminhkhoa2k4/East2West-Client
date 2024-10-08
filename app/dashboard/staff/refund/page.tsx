"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { createData, getData } from '@/utils/axios';

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

  // Fetch bookings from API using custom axios
  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getData({ endpoint: 'bookings' });
      if (data) {
        setBookings(data);
      }
    };

    fetchBookings();
  }, []);

  // Handle refund button click
  const handleRefund = (bookingId: number) => {
    setSelectedBookingId(bookingId);
  };

  // Submit refund request using custom axios
  const processRefund = async () => {
    if (selectedBookingId === null || refundReason.trim() === '') {
      alert('Please select a booking and provide a reason for the refund.');
      return;
    }

    const refundRequest: CancelDTO = {
      bookingTourId: selectedBookingId,
      reasson: refundReason
    };

    try {
      const response = await createData({
        endpoint: '/employee-bookings/refund',
        payload: refundRequest
      });
  
      if (response) {
        alert('Refund processed successfully');
        // Refresh bookings after refund
        setBookings(bookings.map(booking =>
          booking.bookingTourId === selectedBookingId ?
            { ...booking, status: 'Refunded' } : booking
        ));
        setSelectedBookingId(null);
        setRefundReason('');
      } else {
        alert('Error processing refund');
      }
    } catch (error) {
      // Log the error response for more details
      
      alert('Error processing refund: ');
    }
  };

  return (
    <DefaultLayout>
      <div>
        <h2>Booking List</h2>
        <table width="100%" style={{ textAlign: "left" }}>
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
            {bookings.map((booking) => (
              <tr key={booking.bookingTourId}>
                <td>{booking.bookingTourId}</td>
                <td>{booking.tourTitle}</td>
                <td>
                  {booking.user.firstname} {booking.user.lastname} (
                  {booking.user.phone})
                </td>
                <td>{booking.status}</td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>${booking.totalAmount}</td>
                <td>
                  {booking.status !== "Refunded" ? (
                    <button onClick={() => handleRefund(booking.bookingTourId)}>
                      Refund
                    </button>
                  ) : (
                    "Refunded"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Refund form */}
        {selectedBookingId !== null && (
          <div style={{ marginTop: "20px" }}>
            <h3>Refund Booking ID: {selectedBookingId}</h3>
            <textarea
              placeholder="Enter reason for refund"
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              rows={3}
              style={{ width: "100%" }}
            />
            <button onClick={processRefund} style={{ marginTop: "10px" }}>
              Process Refund
            </button>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Bookings;
