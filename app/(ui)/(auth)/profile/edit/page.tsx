"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UserInfo {
  userId: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
}

const UpdateUser = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userId: 0,
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Lấy dữ liệu người dùng từ localStorage
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(`http://localhost:8080/api/auth/update/${userInfo.userId}`, userInfo);
      alert(response.data.message);

      // Cập nhật localStorage nếu cần
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (error: any) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.error('Error updating user', error);
        alert('Error updating user');
      }
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 mt-20'>
      <div className='w-full max-w-lg p-8 bg-white rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold mb-6'>Update User Information</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='username' className='block text-sm font-medium text-gray-700'>Username:</label>
            <input
              type='text'
              id='username'
              name='username'
              value={userInfo.username}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
            {errors.username && <p className='mt-1 text-sm text-red-600'>{errors.username}</p>}
          </div>
          <div>
            <label htmlFor='firstname' className='block text-sm font-medium text-gray-700'>First Name:</label>
            <input
              type='text'
              id='firstname'
              name='firstname'
              value={userInfo.firstname}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
            {errors.firstname && <p className='mt-1 text-sm text-red-600'>{errors.firstname}</p>}
          </div>
          <div>
            <label htmlFor='lastname' className='block text-sm font-medium text-gray-700'>Last Name:</label>
            <input
              type='text'
              id='lastname'
              name='lastname'
              value={userInfo.lastname}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
            {errors.lastname && <p className='mt-1 text-sm text-red-600'>{errors.lastname}</p>}
          </div>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={userInfo.email}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
            {errors.email && <p className='mt-1 text-sm text-red-600'>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>Phone:</label>
            <input
              type='text'
              id='phone'
              name='phone'
              value={userInfo.phone}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
            {errors.phone && <p className='mt-1 text-sm text-red-600'>{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor='address' className='block text-sm font-medium text-gray-700'>Address:</label>
            <input
              type='text'
              id='address'
              name='address'
              value={userInfo.address}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
            {errors.address && <p className='mt-1 text-sm text-red-600'>{errors.address}</p>}
          </div>
          <button type='submit' className='w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
