import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, redirectPath = "/auth/login", children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
export default ProtectedRoute;
export const P = (Wrapped) => {
  return (props) => {
    console.log(props);
    if (!props?.user) {
      return <Navigate to={props?.redirectPath ?? "/auth/login"} replace />;
    } else {
      return <Wrapped {...props} />;
    }
  };
};
