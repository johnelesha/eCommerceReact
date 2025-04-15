import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UsersContext } from '../../context/UserContext';

const ProtectedRoute = () => {
  const { currentUser } = useContext(UsersContext);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;