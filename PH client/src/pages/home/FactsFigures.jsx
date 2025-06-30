export default function FactsFigures() {
  return (
    <div className="w-11/12 lg:w-[80%] mt-20 mx-auto py-16 px-8 bg-white">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">Facts & Figures About Us</h2>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {/* Speakers */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24" style={{ color: "#720000" }}>
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              <circle cx="18" cy="8" r="2" />
              <path d="M18 12c-1.33 0-2.67.33-3.67 1H22v-2c0-1.33-2.67-2-4-2z" />
              <circle cx="6" cy="8" r="2" />
              <path d="M6 12c1.33 0 2.67.33 3.67 1H2v-2c0-1.33 2.67-2 4-2z" />
            </svg>
          </div>
          <div className="text-6xl font-bold mb-2" style={{ color: "#D80000" }}>
            45
          </div>
          <div className="text-lg text-gray-600 font-medium">Active Events</div>
        </div>

        {/* Topics */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: "#720000" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div className="text-6xl font-bold mb-2" style={{ color: "#D80000" }}>
            32
          </div>
          <div className="text-lg text-gray-600 font-medium">Topics</div>
        </div>

        {/* Sponsors */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: "#720000" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
              />
            </svg>
          </div>
          <div className="text-6xl font-bold mb-2" style={{ color: "#D80000" }}>
            145
          </div>
          <div className="text-lg text-gray-600 font-medium">Sponsor</div>
        </div>

        {/* Countries */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24" style={{ color: "#720000" }}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          <div className="text-6xl font-bold mb-2" style={{ color: "#D80000" }}>
            11
          </div>
          <div className="text-lg text-gray-600 font-medium">Countries</div>
        </div>
      </div>
    </div>
  )
}
