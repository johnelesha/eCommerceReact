import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UsersContext } from '../../Context/UserContext';

const ProtectedRoute = () => {
  const { currentUser } = useContext(UsersContext);

  if (!currentUser) {
    // Redirect to /login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render child routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;