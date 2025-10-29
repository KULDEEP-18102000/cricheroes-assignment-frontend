import React, { useState, useEffect } from "react";
import PointsTable from "./components/PointsTable";
import InputForm from "./components/InputForm";
import ResultDisplay from "./components/ResultDisplay";
import { getPointsTable, calculateNRR } from "./services/api";
import "./index.css";

function App() {
  const [tableData, setTableData] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null);

  // Fetch points table on component mount
  useEffect(() => {
    fetchPointsTable();
  }, []);

  const fetchPointsTable = async () => {
    try {
      const response = await getPointsTable();
      if (response.success) {
        setTableData(response.data);
      }
    } catch (err) {
      setError(
        "Failed to fetch points table. Please ensure backend is running."
      );
      console.error(err);
    }
  };

  const handleCalculate = async (data) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setFormData(data);

    try {
      const response = await calculateNRR(data);
      setResult(response);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to calculate NRR. Please try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const highlightTeams = formData ? [formData.yourTeam, formData.oppTeam] : [];

  return (
    <div className="min-h-screen py-8 px-4 flex justify-center items-center w-full">
      {/* Center everything with max-width container */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            🏏 IPL NRR Calculator
          </h1>
          <p className="text-white text-lg drop-shadow">
            Calculate what performance you need to reach your desired position
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <strong className="font-bold">Error: </strong>
            <span>{error}</span>
          </div>
        )}

        {/* Main Content Grid - Fixed Width */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left Column - Input Form */}
          <div className="w-full">
            <InputForm
              teams={tableData}
              onSubmit={handleCalculate}
              loading={loading}
            />
          </div>

          {/* Right Column - Result Display - Same Height as Input Form */}
          <div className="w-full">
            {result ? (
              <ResultDisplay result={result} formData={formData} />
            ) : (
              <div className="bg-white rounded-lg shadow-xl p-8 h-full w-full flex items-center justify-center min-h-[600px]">
                <div className="text-center text-gray-400">
                  <svg
                    className="mx-auto h-24 w-24 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-xl font-medium">No results yet</p>
                  <p className="text-sm mt-2">
                    Fill the form and calculate to see results
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Points Table - Full Width matching above grid */}
        <div className="w-full">
          {tableData.length > 0 ? (
            <PointsTable
              tableData={tableData}
              highlightTeams={highlightTeams}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-xl p-8 text-center">
              <p className="text-gray-500">Loading points table...</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {/* <div className="text-center text-white text-sm mt-8">
          <p className="drop-shadow">
            Built for CricHeroes Full Stack Developer Assessment
          </p>
          <p className="mt-2 drop-shadow">
            Made with ❤️ using React + Node.js + Tailwind CSS
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default App;
