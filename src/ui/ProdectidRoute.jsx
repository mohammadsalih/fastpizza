import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { username } = useSelector((state) => state.user);

  return username ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
