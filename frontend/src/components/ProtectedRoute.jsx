
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {
  const tokenFromRedux = useSelector((state) => state.auth.token);
  const tokenFromStorage = localStorage.getItem('token');

  const token = tokenFromRedux || tokenFromStorage;


  if (!token) return <Navigate to="/login" replace />;

  return children;
}
