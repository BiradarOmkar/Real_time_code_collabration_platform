import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import axios from 'axios'
function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout =   async() => {
     await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
    logout();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-white px-6 py-4 shadow">
      
      <h1 className="text-lg font-semibold">
        Welcome, {user?.name}
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600 capitalize">
          {user?.role}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 cursor-pointer"
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default Navbar;