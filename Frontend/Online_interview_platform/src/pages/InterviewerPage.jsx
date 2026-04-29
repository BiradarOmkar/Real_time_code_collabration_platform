import React, { useEffect, useState } from "react";
import { Navigate ,useNavigate} from "react-router-dom";
function InterviewerPage() {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/interviews", {
          credentials: "include",
        });
        const data = await res.json();
        setInterviews(data.data);
        console.log(data.data);

      } catch (e) {
        console.log("Server Error");
      }
    };
    fetchInterviews();
  }, []);

  const completed = interviews.filter((i) => i.status === "completed").length;
  const scheduled = interviews.filter((i) => i.status === "scheduled").length;

  // handle Join button
  const handlejoinbutton = (Session_id) => {
    console.log("button Clicked", Session_id);
    navigate(`/interview-session/${Session_id}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-9">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Interviewer Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-xl p-6">
            <p className="text-gray-500 text-sm">Total Interviews</p>
            <p className="text-2xl font-bold">{interviews.length}</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <p className="text-gray-500 text-sm">Completed</p>
            <p className="text-2xl font-bold text-green-600">{completed}</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <p className="text-gray-500 text-sm">Scheduled</p>
            <p className="text-2xl font-bold text-yellow-600">{scheduled}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden ">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Candidate</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {interviews.map((i) => (
                <tr key={i._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {i.title}
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">
                      {i.candidate.user_name}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {i.candidate.email}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {new Date(i.scheduledAt).toLocaleDateString()} <br />
                    <span className="text-xs text-gray-400">
                      {new Date(i.scheduledAt).toLocaleTimeString()}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-600">{i.duration} min</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${i.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : i.status === "scheduled"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {i.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {(() => {
                      const interviewTime = new Date(i.scheduledAt);
                      const now = new Date();
                      const canJoin =
                        (i.status === "scheduled" || i.status === "ongoing") &&
                        now >= new Date(interviewTime.getTime() - 5 * 60000);
                      return (
                        <button
                          disabled={!canJoin}
                          onClick={() => handlejoinbutton(i.sessionCode)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            canJoin
                              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md cursor-pointer"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          Join Session
                        </button>
                      );
                    })()}
                  </td>
                  {/* <td className="px-6 py-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition">
                      View
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InterviewerPage;
