import { useState } from 'react';
import GlobalAxios from '../../Global/GlobalAxios';
import Cookies from 'js-cookie';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      const response = await GlobalAxios.post('/login', { username, password });
      if (response.data.status === 'success') {
        console.log('Login successful:', response.data);
        // Save the token in cookies
        Cookies.set('token', response.data.data.token, { expires: 1 }); // Token valid for 7 days
        Cookies.set('userId', response.data.data.userId, { expires: 1 }); 
        alert('Login successful!');
        navigate('/'); // Redirect to the home page or dashboard
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 'Login failed! Please check your credentials.'
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Login
        </h1>

        {/* Show error message */}
        {error && (
          <p className="text-red-500 text-center mb-4 font-semibold">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:from-blue-600 hover:to-indigo-600"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{' '}
          <NavLink
            to="/register"
            className="text-blue-500 hover:underline font-semibold"
          >
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
