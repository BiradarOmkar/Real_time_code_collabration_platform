function LeftAuth() {
  return (
    <div className="hidden md:flex  bg-linear-to-br from-[#0B1120] via-[#0F172A] to-[#1E3A8A] text-white p-10 flex-col justify-between rounded-2xl">

      <div>
        <h1 className="text-2xl font-bold tracking-wide">
          CodeSync
        </h1>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl shadow-blue-500/10 p-6 m-4">

        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-sm text-gray-400">interview.js</span>
        </div>

        <pre className="text-sm text-blue-400 leading-relaxed">
{`const room = createRoom()

socket.join(room.id)

collaborateInRealTime({
  users: ["Interviewer", "Candidate"],
  sync: true
})`}
        </pre>
      </div>

      {/* Tagline + Features */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold leading-snug p-1">
            Code Together. <br /> Interview Smarter.
          </h2>
          <p className="text-gray-300 mt-3 text-sm">
            Real-time collaborative coding platform built for
            technical interviews and pair programming.
          </p>
        </div>

        <ul className="space-y-2 text-gray-300 text-sm">
          <li>• Instant room creation</li>
          <li>• Multi-user live editing</li>
          <li>• Secure session access</li>
          <li>• Role-based participation</li>
        </ul>
      </div>

    </div>
  );
}

export default LeftAuth;