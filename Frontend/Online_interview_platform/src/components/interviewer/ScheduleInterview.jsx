import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ScheduleInterview = () => {
  const [formData, setFormData] = useState({
    title: "",
    candidate_email: "",
    date: "",
    time: "",
    duration: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Button Clicked");

  if (!formData.title || !formData.candidate_email || !formData.date || !formData.time) {
    toast.error("Please fill all required fields");
    return;
  }

  console.log("Button Clicked 2");

  try {
    const res = await fetch("http://localhost:5000/api/schedule-interview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    console.log("Button Clicked 3");

    let data = null;

    if (res.status !== 204) {
      data = await res.json();
    }

    if (!res.ok) {
      toast.error(data?.message || "Something went wrong");
      return;
    }
    toast.success("Interview Scheduled Successfully");
    setFormData({
      title: "",
      candidate_email: "",
      date: "",
      time: "",
      duration: ""
    });
  } catch (err) {
    console.error("Network error:", err);
    toast.error("Network error. Please try again.");
  }
};

// join logic

return (
    <div className="w-[70%] mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Schedule Interview
      </h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter interview title"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">Candidate Email</label>
          <input
            type="email"
            name="candidate_email"
            value={formData.candidate_email}
            onChange={handleChange}
            placeholder="Enter candidate email"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">Interview Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">Interview Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration || ""}
            onChange={handleChange}
            placeholder="Enter duration in minutes"
            min={15}
            max={180}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
        >
          Schedule Interview
        </button>
      </form>
    </div>
  );
};

export default ScheduleInterview;