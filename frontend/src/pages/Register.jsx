import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors');
      return;
    }

    try {
      await register(formData);
      toast.success('Registration Successful');
      navigate('/login');
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        'Registration Failed'
      );
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-lg shadow-lg w-96'
      >
        <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>

        <div className='mb-4'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={formData.name}
            className={`w-full border p-3 rounded focus:outline-none focus:ring-2 ${
              errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            onChange={handleChange}
          />
          {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
        </div>

        <div className='mb-4'>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            className={`w-full border p-3 rounded focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            onChange={handleChange}
          />
          {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
        </div>

        <div className='mb-6'>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            className={`w-full border p-3 rounded focus:outline-none focus:ring-2 ${
              errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            onChange={handleChange}
          />
          {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password}</p>}
        </div>

        <button
          type='submit'
          className='w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition'
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;