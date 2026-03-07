import SideNavBar from "../components/SideNavBar";
import Navbar from "../components/NavBar";
import { Outlet } from "react-router-dom";
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar */}
      <SideNavBar />

      {/* Right Side */}
      <div className="flex-1 flex flex-col">
        
        {/* Top Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
           <Outlet/>
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;