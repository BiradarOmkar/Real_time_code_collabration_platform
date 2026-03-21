import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import ChatPage from "../components/ChatPage";
import Editor from "../components/EditorPage";
function JoinInterviewPage() {
  const { user } = useAuthStore();
  const { session_code } = useParams();
  //  dummy questions
  const questions = [
    {
      id: 1,
      title: "Reverse a string",
      description: "given a string return its reverse",
      testCases: [
        { input: "hello", output: "olleh" },
        { input: "abc", output: "cba" },
      ],
    },
    {
      id: 2,
      title: "Find maximum in array",
      description: "Return the largest element in the array.",
      testCases: [
        { input: "[1,2,3]", output: "3" },
        { input: "[5,2,9]", output: "9" },
      ],
    },
    {
      id: 3,
      title: "Check palindrome",
      description: "Check if a string is palindrome.",
      testCases: [
        { input: "madam", output: "true" },
        { input: "hello", output: "false" },
      ],
    },
  ];

  // store current question
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currenttestcaseind,setCurrectTestCaseInd]=useState(0);
  const currentquestion = questions[currentIndex];
  const currenttestcase=currentquestion.testCases[currenttestcaseind]

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* 🔷 Top Bar */}
      <div className="h-14 bg-gray-900/80 backdrop-blur-md border-b border-gray-700 flex items-center justify-between px-6 shadow-md">
        <div className="font-semibold text-lg tracking-wide">
          🚀 Round 2 - Frontend Engineer
        </div>
        <button className="px-4 py-1.5 bg-red-600 rounded-md hover:bg-red-700 transition duration-200 shadow-md">
          End Session
        </button>
      </div>
      {/* 🔷 Main Panel */}
      <div className="flex flex-1 h-full overflow-hidden">
        {/* 🧑‍💼 Left Panel */}
        <div className="w-1/5 bg-gray-900/70 backdrop-blur-md border-r border-gray-700 p-4 flex flex-col gap-4">
          <div className="bg-gray-800 p-3 rounded-lg shadow hover:bg-gray-700 transition">
            <p className="text-sm text-gray-400">Interviewer</p>
            <p className="font-medium">Alice</p>
          </div>

          <div className="bg-gray-800 p-3 rounded-lg shadow hover:bg-gray-700 transition">
            <p className="text-sm text-gray-400">Candidate</p>
            <p className="font-medium">Bob</p>
          </div>

          <div className="bg-gray-800 p-3 rounded-lg shadow">
            <p className="text-sm text-gray-400">Status</p>
            <p className="text-green-400 font-medium">● In Progress</p>
          </div>
        </div>
        <div className="w-3/5 flex flex-col p-4 gap-3">
          {/* adding question navigation */}
          <div className="flex gap-2 mb-3">
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(index)}
                className={`px-3 py-1 rounded ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                Q{index + 1}
              </button>
            ))}
          </div>

          {/* 🔝 Top Split */}
          <div className="flex gap-3 h-2/3">
            {/* 📘 Problem Panel */}
            <div className="w-1/2 bg-gray-900 border border-gray-700 rounded-xl p-4 overflow-auto">
              <h2 className="text-lg font-semibold mb-2">
                {currentquestion.title}
              </h2>
              <p className="text-sm text-gray-300">
                {/* Given an array of integers nums and a target, return indices of the two numbers such that they add up to target. */}
                {currentquestion.description}
              </p>

              <div className="mt-4 text-sm text-gray-400">
                <p>
                  <b>Constraints:</b>
                </p>
                <ul className="list-disc ml-5">
                  <li>2 ≤ nums.length ≤ 10⁴</li>
                  <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
                </ul>
              </div>
            </div>

            {/* 💻 Editor Panel */}
            <div className="w-1/2 bg-gray-900 border border-gray-700 rounded-xl relative overflow-hidden">
              {/* Editor Header */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-gray-800 flex items-center justify-between px-4 border-b border-gray-700">
                <span className="text-sm">main.js</span>
                <button className="bg-green-600 px-3 py-1 rounded text-sm hover:bg-green-700">
                  ▶ Run
                </button>
              </div>

              {/* Monaco Editor */}
              <div className="absolute top-10 bottom-0 left-0 right-0">
                <Editor />
              </div>
            </div>
          </div>

          {/* 🔽 Bottom Test Cases Panel */}
          <div className="h-1/3 bg-gray-900 border border-gray-700 rounded-xl p-4 overflow-auto">
           <h3 className="font-medium mb-1">Test Cases</h3>
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-2 overflow-x-auto">
                     {
                currentquestion.testCases.map((tc,index)=>(
                       <button
                key={index}
                onClick={() => setCurrectTestCaseInd(index)}
                className={`px-2 py-1 rounded ${
                  index === currenttestcaseind ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                TC{index + 1}
              </button>
                ))
              }
              </div>

              <span className="text-xs text-gray-400 whitespace-nowrap ml-2">Custom Input</span>
            </div>
            {/* <div className="bg-gray-800 p-3 rounded text-sm text-gray-300">
      <p><b>Input:</b>{currentquestion.testCases}</p>
      <p><b>Output:</b> [0,1]</p>
    </div> */}
            {/* {currentquestion.testCases.map((tc, i) => ( */}
              <div
                // key={i}
                className="bg-gray-800 p-3 rounded text-sm text-gray-300 mb-2"
              >
                <p>
                  <b>Input:   </b>
                      {currenttestcase.input}
                </p>
                <p>
                  <b>Output:  </b>
                  {currenttestcase.output}
                </p>
              </div>
            {/* ))} */}
          </div>
        </div>

        {/* 💬 Right Panel */}
        <div className="w-1/5 bg-gray-900/70 backdrop-blur-md border-l border-gray-700 flex flex-col">
          <div className="p-3 border-b border-gray-700 font-medium">
            💬 Live Chat
          </div>

          <div className="flex-1 overflow-hidden">
            <ChatPage
              sessionId={session_code}
              userName={user.name}
              user_role={user.role}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinInterviewPage;
