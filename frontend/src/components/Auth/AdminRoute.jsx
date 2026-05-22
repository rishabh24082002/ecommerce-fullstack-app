import { Navigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import Loading from '../Common/Loading';

const AdminRoute = ({ children }) => {

  const { user, loading } = useAuth();

  if (loading) {
    return <h1><Loading/></h1>;
  }

  if (!user || user.role !== 'admin') {

    return <Navigate to='/' />;
  }

  return children;
};

export default AdminRoute;