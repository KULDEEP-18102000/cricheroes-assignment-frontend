import React from 'react';

/**
 * Component to display calculation results
 */
const ResultDisplay = ({ result, formData }) => {
  if (!result) return null;

  const { success, message, possible, runsRange, oversRange, nrrRange } = result;

  return (
    <div className={`rounded-lg shadow-xl overflow-hidden min-h-[600px] ${
      possible ? 'bg-white' : 'bg-red-50'
    }`}>
      <div className={`px-6 py-4 ${
        possible 
          ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
          : 'bg-gradient-to-r from-red-500 to-pink-600'
      }`}>
        <h2 className="text-2xl font-bold text-white">
          {possible ? '✅ Calculation Results' : '❌ Not Possible'}
        </h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Scenario Summary */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3 text-lg">Match Scenario</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-600">Your Team:</span>
              <span className="ml-2 font-semibold text-gray-900">{formData.yourTeam}</span>
            </div>
            <div>
              <span className="text-gray-600">Opposition:</span>
              <span className="ml-2 font-semibold text-gray-900">{formData.oppTeam}</span>
            </div>
            <div>
              <span className="text-gray-600">Match Overs:</span>
              <span className="ml-2 font-semibold text-gray-900">{formData.overs}</span>
            </div>
            <div>
              <span className="text-gray-600">Target Position:</span>
              <span className="ml-2 font-semibold text-gray-900">#{formData.desiredPosition}</span>
            </div>
            <div>
              <span className="text-gray-600">Toss:</span>
              <span className="ml-2 font-semibold text-gray-900 capitalize">{formData.tossResult} First</span>
            </div>
            <div>
              <span className="text-gray-600">{formData.tossResult === 'batting' ? 'Runs Scored:' : 'Target:'}</span>
              <span className="ml-2 font-semibold text-gray-900">{formData.runs}</span>
            </div>
          </div>
        </div>

        {/* Main Result Message */}
        <div className={`rounded-lg p-4 ${
          possible ? 'bg-blue-50 border border-blue-200' : 'bg-red-100 border border-red-300'
        }`}>
          <p className={`text-base ${possible ? 'text-blue-900' : 'text-red-900'}`}>
            {message}
          </p>
        </div>

        {/* Detailed Results - Only show if possible */}
        {possible && (
          <>
            {/* Runs/Overs Range */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">
                {formData.tossResult === 'batting' ? '🎯 Runs to Restrict' : '⏱️ Overs to Chase'}
              </h3>
              
              {formData.tossResult === 'batting' ? (
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{runsRange.min}</div>
                    <div className="text-sm text-gray-600 mt-1">Minimum Runs</div>
                  </div>
                  <div className="text-4xl text-gray-400">→</div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{runsRange.max}</div>
                    <div className="text-sm text-gray-600 mt-1">Maximum Runs</div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{oversRange.min}</div>
                    <div className="text-sm text-gray-600 mt-1">Minimum Overs</div>
                  </div>
                  <div className="text-4xl text-gray-400">→</div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{oversRange.max}</div>
                    <div className="text-sm text-gray-600 mt-1">Maximum Overs</div>
                  </div>
                </div>
              )}
            </div>

            {/* NRR Range */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">📊 Revised NRR Range</h3>
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${nrrRange.min >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {nrrRange.min >= 0 ? '+' : ''}{nrrRange.min.toFixed(3)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Minimum NRR</div>
                </div>
                <div className="text-4xl text-gray-400">→</div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${nrrRange.max >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {nrrRange.max >= 0 ? '+' : ''}{nrrRange.max.toFixed(3)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Maximum NRR</div>
                </div>
              </div>
            </div>

            {/* Interpretation */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <span className="text-2xl mr-3">💡</span>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">What does this mean?</h4>
                  <p className="text-sm text-gray-700">
                    {formData.tossResult === 'batting' ? (
                      <>
                        If <strong>{formData.yourTeam}</strong> scores <strong>{formData.runs}</strong> runs,
                        they need to restrict <strong>{formData.oppTeam}</strong> to any score between{' '}
                        <strong>{runsRange.min}</strong> and <strong>{runsRange.max}</strong> runs
                        to reach position <strong>#{formData.desiredPosition}</strong> in the points table.
                      </>
                    ) : (
                      <>
                        To chase <strong>{formData.runs}</strong> runs and reach position{' '}
                        <strong>#{formData.desiredPosition}</strong>, <strong>{formData.yourTeam}</strong>{' '}
                        needs to complete the chase between <strong>{oversRange.min}</strong> and{' '}
                        <strong>{oversRange.max}</strong> overs.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Not Possible - Show Explanation */}
        {!possible && (
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">Why is this not possible?</h4>
            <p className="text-sm text-gray-700">
              Based on the current points table and the scenario provided, it's mathematically
              impossible for <strong>{formData.yourTeam}</strong> to reach position{' '}
              <strong>#{formData.desiredPosition}</strong>. This could be because:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
              <li>The target position requires a higher NRR than achievable</li>
              <li>Other teams have better points/NRR that cannot be overtaken</li>
              <li>The match scenario doesn't provide enough NRR improvement</li>
            </ul>
            <p className="text-sm text-gray-700 mt-3">
              Try adjusting the desired position or match parameters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;