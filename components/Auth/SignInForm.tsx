"use client";
import React, { useState } from "react";
import Link from "next/link";
import { createData } from "@/utils/axios";

export default function SignInForm() {
  const [data, setData] = useState({
    remember: false,
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Kiểm tra rỗng
    if (!data.username || !data.password) {
      setMessage("Vui lòng điền đầy đủ thông tin đăng nhập.");
      return;
    }
  
    try {
      const response = await createData({
        endpoint: "/auth/signin",
        payload: {
          username: data.username,
          password: data.password,
        },
      });
      if (!response.ok) {
        localStorage.setItem("userInfo", JSON.stringify(response)); // Lưu thông tin người dùng vào localStorage
        setMessage("Đăng nhập thành công!");
        console.log("User Info:", response);
      }
    } catch (error:any) {
      // Kiểm tra lỗi cụ thể từ server
      if (error.response) {
        console.error('Đăng nhập thất bại:', error.response.data.message);
        setMessage("Đăng nhập thất bại!");
      } else {
        console.error('Lỗi không xác định:', error.message);
        setMessage("Đăng nhập thất bại!");
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
  {/* Username Field */}
  <div className="mb-4">
    <label
      htmlFor="username"
      className="mb-2.5 block font-medium text-dark dark:text-white"
    >
      Username
    </label>
    <div className="relative">
      <input
        type="text"
        placeholder="Enter your username"
        name="username"
        value={data.username}
        onChange={handleChange}
        className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
      />
    </div>
    {!data.username && message && <p className="text-red-500">Vui lòng nhập username.</p>}
  </div>

  {/* Password Field */}
  <div className="mb-5">
    <label
      htmlFor="password"
      className="mb-2.5 block font-medium text-dark dark:text-white"
    >
      Password
    </label>
    <div className="relative">
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={data.password}
        onChange={handleChange}
        autoComplete="password"
        className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
      />
    </div>
    {!data.password && message && <p className="text-red-500">Vui lòng nhập password.</p>}
  </div>

  <div className="mb-4.5">
    <button
      type="submit"
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
    >
      Sign In
    </button>
  </div>

  {message && <div className="text-red-500">{message}</div>}
</form>

  );
}
