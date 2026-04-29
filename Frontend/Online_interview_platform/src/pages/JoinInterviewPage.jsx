import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import ChatPage from "../components/ChatPage";
import Editor from "../components/EditorPage";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  ControlBar,
  GridLayout,
  ParticipantTile,
  useTracks,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import "@livekit/components-styles";

// ✅ UPDATED: Custom Layout with role-based filtering
function CustomVideoLayout({ user }) {
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
    { source: Track.Source.ScreenShare, withPlaceholder: false },
  ]);

  // Hide self view ONLY for candidate
  const filteredTracks = tracks.filter((track) => {
    if (user?.role === "candidate" && track.participant.isLocal) {
      return false;
    }
    return true;
  });

  return (
    <GridLayout tracks={filteredTracks} style={{ height: "calc(100% - 54px)" }}>
      <ParticipantTile />
    </GridLayout>
  );
}

function JoinInterviewPage() {
  const { user } = useAuthStore();
  const { session_code } = useParams();

  const [liveKitToken, setLiveKitToken] = useState("");
  const serverUrl = "wss://veda-zjohzrnc.livekit.cloud";

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const participantName = user?.name || "Anonymous";
        const response = await fetch(
          `http://localhost:5000/api/livekit/token?roomName=${session_code}&participantName=${participantName}`
        );
        const data = await response.json();
        if (data.token) {
          setLiveKitToken(data.token);
        }
      } catch (e) {
        console.error("Failed to fetch LiveKit token", e);
      }
    };
    if (session_code && user) {
      fetchToken();
    }
  }, [session_code, user]);

  // dummy questions
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

  const handleSubmit = () => {
    console.log("Code Submitted Successfully");
    console.log(codes[currentIndex]);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currenttestcaseind, setCurrectTestCaseInd] = useState(0);

  const currentquestion = questions[currentIndex];
  const currenttestcase = currentquestion.testCases[currenttestcaseind];

  const [codes, setCodes] = useState({
    0: "",
    1: "",
    2: "",
  });

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* 🔷 Top Bar */}
      <div className="h-16 bg-gray-900/90 backdrop-blur-lg border-b border-gray-700 flex items-center justify-between px-6 shadow-lg z-10">
        <div className="font-bold text-xl tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
          <span>🚀</span> Live Interview Session
        </div>
        <button className="px-5 py-2 bg-red-600/90 text-white text-sm font-semibold rounded-lg hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300">
          End Session
        </button>
      </div>

      {/* 🔷 Main Panel */}
      <div className="flex flex-1 h-full overflow-hidden">
        {/* 🧑‍💼 Left Panel */}
        <div className="w-1/5 bg-gray-900/70 backdrop-blur-md border-r border-gray-700 p-4 flex flex-col gap-4">
          {liveKitToken === "" ? (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gray-700 mb-4"></div>
                <p>Connecting to video...</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 w-full h-full rounded-xl overflow-hidden shadow-2xl border border-gray-700 bg-gray-950 flex flex-col">
              <LiveKitRoom
                video={user?.role === "candidate"}
                audio={true}
                token={liveKitToken}
                serverUrl={serverUrl}
                data-lk-theme="default"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  width: "100%",
                }}
              >
                {/* ✅ UPDATED usage */}
                <CustomVideoLayout user={user} />

                <ControlBar
                  controls={{
                    camera: user?.role === "candidate",
                    microphone: true,
                    screenShare: false,
                    chat: false,
                    leave: false,
                  }}
                  style={{ height: "54px" }}
                />
                <RoomAudioRenderer />
              </LiveKitRoom>
            </div>
          )}
        </div>

        {/* 🧠 Middle Panel */}
        <div className="w-3/5 flex flex-col p-4 gap-3">
          {/* Question Navigation */}
          <div className="flex gap-3 mb-2 p-1 bg-gray-800/50 rounded-lg w-fit">
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(index)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                Question {index + 1}
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
                {currentquestion.description}
              </p>
            </div>

            {/* 💻 Editor Panel */}
            <div className="w-1/2 bg-gray-900 border border-gray-700 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-10 bg-gray-800 flex items-center justify-between px-4 border-b border-gray-700">
                <span className="text-sm">main.js</span>
                <button
                  className="bg-green-600 px-3 py-1 rounded text-sm hover:bg-green-700"
                  onClick={handleSubmit}
                >
                  ▶ Run
                </button>
              </div>

              <div className="absolute top-10 bottom-0 left-0 right-0">
                <Editor
                  code={codes[currentIndex]}
                  setCode={(value) =>
                    setCodes((prev) => ({
                      ...prev,
                      [currentIndex]: value,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* 🔽 Test Cases */}
          <div className="h-1/3 bg-gray-900 border border-gray-700 rounded-xl p-4 overflow-auto">
            <h3 className="font-medium mb-1">Test Cases</h3>

            <div className="flex gap-2 mb-3">
              {currentquestion.testCases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrectTestCaseInd(index)}
                  className={`px-2 py-1 rounded ${
                    index === currenttestcaseind
                      ? "bg-blue-600"
                      : "bg-gray-700"
                  }`}
                >
                  TC{index + 1}
                </button>
              ))}
            </div>

            <div className="bg-gray-800 p-3 rounded text-sm text-gray-300">
              <p><b>Input:</b> {currenttestcase.input}</p>
              <p><b>Output:</b> {currenttestcase.output}</p>
            </div>
          </div>
        </div>

        {/* 💬 Chat */}
        <div className="w-1/5 bg-gray-900/70 border-l border-gray-700 flex flex-col">
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