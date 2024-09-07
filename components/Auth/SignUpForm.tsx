import { ChangeEvent, FormEvent, useState } from "react";

interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
  phone: string;
  address: string;
  role: string[];
  remember: boolean;
  isBusiness: boolean;
}

interface SignupErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  address?: string;
  role?: string;
  general?: string;
}

const SignUpForm: React.FC = () => {
  const [data, setData] = useState<SignupFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    role: ["user"],
    remember: false,
    isBusiness: false,
  });

  const [errors, setErrors] = useState<SignupErrors>({});
  const [success, setSuccess] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setData(prev => ({
        ...prev,
        [name]: checked,
        role: name === "isBusiness" && checked ? ["business"] : ["user"],
      }));
    } else if (type === "select-multiple") {
      const target = e.target as HTMLSelectElement;
      const selectedOptions = Array.from(target.options)
        .filter(option => option.selected)
        .map(option => option.value);
      setData(prev => ({ ...prev, role: selectedOptions }));
    } else {
      setData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    if (data.password !== data.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match!" }));
      return;
    }

    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      phone: data.phone,
      address: data.address,
      role: data.role,
    };

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    
      const result = await response.json();
    
      if (response.ok) {
        setSuccess("Account created successfully!");
        setData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          firstname: "",
          lastname: "",
          phone: "",
          address: "",
          role: ["user"],
          remember: false,
          isBusiness: false,
        });
        setErrors({});
      } else {
        const fieldErrors: SignupErrors = {};
        if (result.password) {
          fieldErrors.password = result.password;
        }
        if (result.username) {
          fieldErrors.username = result.username;
        }
        if (result.phone) {
          fieldErrors.phone = result.phone;
        }
        if (result.email) {
          fieldErrors.email = result.email;
        }
        if (result.confirmPassword) {
          fieldErrors.confirmPassword = result.confirmPassword;
        }
        if (result.firstname) {
          fieldErrors.firstname = result.firstname;
        }
        if (result.lastname) {
          fieldErrors.lastname = result.lastname;
        }
        if (result.address) {
          fieldErrors.address = result.address;
        }
      
        setErrors(fieldErrors);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setErrors({ general: "An error occurred. Please try again." });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Username Field */}
      <div className="mb-4">
        <label htmlFor="username" className="mb-2.5 block font-medium text-dark">
          Username
        </label>
        <input
          type="text"
          placeholder="Enter your username"
          name="username"
          value={data.username}
          onChange={handleChange}
          className={`w-full rounded-lg border py-[15px] pl-6 pr-11 ${errors.username ? 'border-red-500' : ''}`}
        />
        {errors.username && <p className="text-red-500">{errors.username}</p>}
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label htmlFor="email" className="mb-2.5 block font-medium text-dark">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          value={data.email}
          onChange={handleChange}
          className={`w-full rounded-lg border py-[15px] pl-6 pr-11 ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      {/* Password Field */}
      <div className="mb-4">
        <label htmlFor="password" className="mb-2.5 block font-medium text-dark">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={data.password}
          onChange={handleChange}
          className={`w-full rounded-lg border py-[15px] pl-6 pr-11 ${errors.password ? 'border-red-500' : ''}`}
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>

      {/* Confirm Password Field */}
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="mb-2.5 block font-medium text-dark">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Confirm your password"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={handleChange}
          className={`w-full rounded-lg border py-[15px] pl-6 pr-11 ${errors.confirmPassword ? 'border-red-500' : ''}`}
        />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
      </div>

      {/* First Name Field */}
      <div className="mb-4">
        <label htmlFor="firstname" className="mb-2.5 block font-medium text-dark">
          First Name
        </label>
        <input
          type="text"
          placeholder="Enter your first name"
          name="firstname"
          value={data.firstname}
          onChange={handleChange}
          className={`w-full rounded-lg border py-[15px] pl-6 pr-11 ${errors.firstname ? 'border-red-500' : ''}`}
        />
        {errors.firstname && <p className="text-red-500">{errors.firstname}</p>}
      </div>

      {/* Last Name Field */}
      <div className="mb-4">
        <label htmlFor="lastname" className="mb-2.5 block font-medium text-dark">
          Last Name
        </label>
        <input
          type="text"
          placeholder="Enter your last name"
          name="lastname"
          value={data.lastname}
          onChange={handleChange}
          className={`w-full rounded-lg border py-[15px] pl-6 pr-11 ${errors.lastname ? 'border-red-500' : ''}`}
        />
        {errors.lastname && <p className="text-red-500">{errors.lastname}</p>}
      </div>

      {/* Phone Field */}
      <div className="mb-4">
        <label htmlFor="phone" className="mb-2.5 block font-medium text-dark">
          Phone
        </label>
        <input
          type="text"
          placeholder="Enter your phone number"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          className={`w-full rounded-lg border py-[15px] pl-6 pr-11 ${errors.phone ? 'border-red-500' : ''}`}
        />
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}
      </div>

      {/* Address Field */}
      <div className="mb-4">
        <label htmlFor="address" className="mb-2.5 block font-medium text-dark">
          Address
        </label>
        <input
          type="text"
          placeholder="Enter your address"
          name="address"
          value={data.address}
          onChange={handleChange}
          className={`w-full rounded-lg border py-[15px] pl-6 pr-11 ${errors.address ? 'border-red-500' : ''}`}
        />
        {errors.address && <p className="text-red-500">{errors.address}</p>}
      </div>

      {/* Business Account Checkbox */}
      <div className="mb-4">
        <label htmlFor="isBusiness" className="inline-flex items-center">
          <input
            type="checkbox"
            name="isBusiness"
            checked={data.isBusiness}
            onChange={handleChange}
            className="form-checkbox"
          />
          <span className="ml-2">Register as a business account</span>
        </label>
      </div>

      {/* Remember Me Checkbox */}
      <div className="mb-4">
        <label htmlFor="remember" className="inline-flex items-center">
          <input
            type="checkbox"
            name="remember"
            checked={data.remember}
            onChange={handleChange}
            className="form-checkbox"
          />
          <span className="ml-2">Remember me</span>
        </label>
      </div>

      {/* Submit Button */}
      <div>
        <button type="submit" className="w-full rounded-lg bg-primary py-4 text-white">
          Sign Up
        </button>
      </div>

      {/* Success Message */}
      {success && <p className="text-green-500 mt-4">{success}</p>}

      {/* General Error Message */}
      {errors.general && <p className="text-red-500 mt-4">{errors.general}</p>}
    </form>
  );
};

export default SignUpForm;
