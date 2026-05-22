import {
  createContext,
  useEffect,
  useState
} from 'react';

import {
  getProfile,
  loginUser,
  registerUser
} from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadUser = async () => {

      try {

        const token = localStorage.getItem('token');

        if (!token) {
          setLoading(false);
          return;
        }

        const data = await getProfile();

        setUser(data.user);

      } catch (error) {

        localStorage.removeItem('token');

      } finally {

        setLoading(false);
      }
    };

    loadUser();

  }, []);

  const register = async (formData) => {

    const data = await registerUser(formData);

    return data;
  };

  const login = async (formData) => {

    const data = await loginUser(formData);

    localStorage.setItem('token', data.token);

    setUser(data.user);

    return data;
  };

  const logout = () => {

    localStorage.removeItem('token');

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};