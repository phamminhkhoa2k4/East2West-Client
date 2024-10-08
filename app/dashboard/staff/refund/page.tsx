"use client"
import React, { useEffect, useState } from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { getData, createData } from '@/utils/axios';
import { Button } from "@/components/ui/button";

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

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getData({ endpoint: 'bookings' });
      if (data) {
        setBookings(data);
      }
    };

    fetchBookings();
  }, []);

  const handleRefund = (bookingId: number) => {
    setSelectedBookingId(bookingId);
  };

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
      alert('Error processing refund');
    }
  };

  return (
    <DefaultLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Booking List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3">Booking ID</th>
                <th className="px-4 py-3">Tour Title</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Booking Date</th>
                <th className="px-4 py-3">Total Amount</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.bookingTourId} className="border-t">
                  <td className="px-4 py-3">{booking.bookingTourId}</td>
                  <td className="px-4 py-3">{booking.tourTitle}</td>
                  <td className="px-4 py-3">
                    <div>
                      <div>{`${booking.user.firstname} ${booking.user.lastname}`}</div>
                      <div className="text-sm text-gray-500">{booking.user.phone}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      booking.status === 'Refunded' ? 'bg-gray-200' :
                      booking.status === 'Confirmed' ? 'bg-green-200' :
                      'bg-yellow-200'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3">${booking.totalAmount}</td>
                  <td className="px-4 py-3">
                    {booking.status !== "Refunded" ? (
                      <Button 
                        variant="outline"
                        onClick={() => handleRefund(booking.bookingTourId)}
                      >
                        Refund
                      </Button>
                    ) : (
                      <span className="text-gray-500">Refunded</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedBookingId !== null && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Refund Booking ID: {selectedBookingId}</h3>
            <textarea
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Enter reason for refund"
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              rows={3}
            />
            <Button onClick={processRefund}>
              Process Refund
            </Button>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Bookings;