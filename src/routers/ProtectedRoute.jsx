import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authenticationContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  console.log('user', user);
  if (!user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;