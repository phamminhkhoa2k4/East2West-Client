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
  role: Set<string>;
  remember: boolean;
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
    role: new Set<string>(),
    remember: false,
  });

  const [errors, setErrors] = useState<SignupErrors>({});
  const [success, setSuccess] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement | HTMLSelectElement;

    if (type === "checkbox") {
      // Handle checkbox changes
      setData(prev => ({ ...prev, [name]: checked }));
    } else if (type === "select-multiple") {
      // Handle multi-select changes
      const target = e.target as HTMLSelectElement;
      const selectedOptions = Array.from(target.options)
        .filter(option => option.selected)
        .map(option => option.value);
      setData(prev => ({ ...prev, role: new Set(selectedOptions) }));
    } else {
      // Handle other input changes
      setData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (data.password !== data.confirmPassword) {
      setErrors((prev: any) => ({ ...prev, confirmPassword: "Passwords do not match!" }));
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
      role: null,
    };

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

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
          role: new Set<string>(),
          remember: false,
        });
        setErrors({});
      } else {
        const result = await response.json();
        setErrors(result);
        setSuccess("");
      }
    } catch (error) {
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
          className="w-full rounded-lg border py-[15px] pl-6 pr-11"
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
          className="w-full rounded-lg border py-[15px] pl-6 pr-11"
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
          className="w-full rounded-lg border py-[15px] pl-6 pr-11"
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
          className="w-full rounded-lg border py-[15px] pl-6 pr-11"
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
          className="w-full rounded-lg border py-[15px] pl-6 pr-11"
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
          className="w-full rounded-lg border py-[15px] pl-6 pr-11"
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
          className="w-full rounded-lg border py-[15px] pl-6 pr-11"
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
          className="w-full rounded-lg border py-[15px] pl-6 pr-11"
        />
        {errors.address && <p className="text-red-500">{errors.address}</p>}
      </div>

      {/* Role Selection */}
      {/* <div className="mb-4">
        <label className="mb-2.5 block font-medium text-dark">Role</label>
        <select
          name="role"
          multiple
          value={Array.from(data.role)}
          onChange={handleChange}
          className="w-full rounded-lg border py-[15px] pl-6 pr-11"
        >
          <option value="business">Business</option>
          <option value="mod">Moderator</option>
          <option value="employee">Employee</option>
          <option value="user">User</option>
        </select>
        {errors.role && <p className="text-red-500">{errors.role}</p>}
      </div> */}

      {/* Submit Button */}
      <button type="submit" className="btn-primary">
        Sign Up
      </button>

      {/* Success and Error Messages */}
      {success && <p className="text-green-500">{success}</p>}
      {errors.general && <p className="text-red-500">{errors.general}</p>}
    </form>
  );
};

export default SignUpForm;
