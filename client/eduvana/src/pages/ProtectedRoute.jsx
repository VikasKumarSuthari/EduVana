import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import "./ProtectedRoute.css"; // Import the new styles

const ProtectedRoute = ({ children }) => {
  return (
    <div className="protected-route-container">
      <SignedIn>
        <div className="protected-route-content">{children}</div>
      </SignedIn>
      <SignedOut>
        <Navigate to="/login" />
      </SignedOut>
    </div>
  );
};

export default ProtectedRoute;
