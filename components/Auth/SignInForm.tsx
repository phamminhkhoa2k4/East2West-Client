"use client";
import React, { useState } from "react";
import Link from "next/link";

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
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
        credentials: 'include', // Đảm bảo cookie được gửi cùng với yêu cầu
      });
  
      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("userInfo", JSON.stringify(result));
        setMessage("Đăng nhập thành công!");
        console.log("User Info:", result);
      } else {
        setMessage("Đăng nhập thất bại!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Đã xảy ra lỗi.");
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
