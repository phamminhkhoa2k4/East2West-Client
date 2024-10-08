"use client"
import React, { useState, useEffect } from 'react';
import RentalList from './RentalList';
import RefundList from './RefundList';
import BookingTourList from './BookingTourList';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { getData } from '@/utils/axios';

// Your types
// import { Rental, Refund, BookingTour } from './types'; // Assume types are in a separate file
export interface User {
  firstname: string;
  lastname: string;
  phone: string;
}
  
  export interface BookingTour {
    bookingTourId: number;
    tourTitle: string;
    status: string;
    user: User;
    bookingDate: string;
    totalAmount: number;
    refundAmount: number;
  }
type RefundFetch = {
  bookingTourId: number;
  tourTitle: string;
  status: string;
  user: User;
  bookingDate: string;
  totalAmount: number;
  refundAmount: number;
  reason: string;
  refundDate: string;
};
  
  export interface Rental {
    rentalId: number;
    tourTitle: string;
    carName: string;
    user: User;
    status: string;
    rentalDate: string; // Ngày thuê xe
    totalAmount: number; // Tổng số tiền của thuê xe
    reabson: string;
    refundDate: string;
    refundAmount: number;
  }
  
  export interface Refund {
    bookingTourId: number;
    tourTitle: string;
    status: string;
    refundAmount: number; // Số tiền hoàn tiền
    refundDate: string; // Ngày hoàn tiền
    user: User;
    bookingDate: string;
    totalAmount: number;
    reason: string;
  }
 
  
  const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('rental');
    const [rentals, setRentals] = useState<Rental[]>([]);
    const [refunds, setRefunds] = useState<Refund[]>([]);
    const [bookingTours, setBookingTours] = useState<BookingTour[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const rentalsData = await getData({ endpoint: '/rental' });
          setRentals(rentalsData);
          const refundsData = await getData({ endpoint: '/bookings/refund' });
          setRefunds(refundsData);
          const bookingToursData = await getData({ endpoint: '/bookings' });
          setBookingTours(bookingToursData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      fetchData();
    }, []);
    
  
    return (
      <DefaultLayout>
        {" "}
        <div className="p-6">
          {/* Navigation Tabs */}
          <div className="flex mb-4 space-x-4">
            <button
              className={`py-2 px-4 rounded ${
                activeTab === "rental"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveTab("rental")}
            >
              Rentals
            </button>
            <button
              className={`py-2 px-4 rounded ${
                activeTab === "refund"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveTab("refund")}
            >
              Refunds
            </button>
            <button
              className={`py-2 px-4 rounded ${
                activeTab === "bookingTour"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveTab("bookingTour")}
            >
              Booking Tours
            </button>
          </div>

          {/* Conditional Rendering Based on Active Tab */}
          {activeTab === "rental" && <RentalList rentals={rentals!} />}
          {activeTab === "refund" && <RefundList refunds={refunds} />}
          {activeTab === "bookingTour" && (
            <BookingTourList bookingTours={bookingTours} />
          )}
        </div>
      </DefaultLayout>
    );
  };
  
  export default Dashboard;