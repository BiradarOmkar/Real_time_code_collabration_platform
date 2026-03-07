import { Link } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

function SideNavBar() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="w-64 bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-8">Interview App</h2>

      <nav className="flex flex-col gap-4">

        {user?.role === "candidate" && (
          <>
            <Link to="/candidateDashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
            <Link to="/myInterviews" className="hover:text-gray-300">
              My Interviews
            </Link>
          </>
        )}

        {user?.role === "interviewer" && (
          <>
            <Link to="/interviewerDashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
            <Link to="scheduleInterview" className="hover:text-gray-300">
              Schedule Interview
            </Link>
          </>
        )}

      </nav>
    </div>
  );
}

export default SideNavBar;