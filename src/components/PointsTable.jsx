import React from 'react';

/**
 * Component to display the IPL Points Table
 */
const PointsTable = ({ tableData, highlightTeams = [] }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">IPL 2022 Points Table</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Team
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                M
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                W
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                L
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                NRR
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                For
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Against
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Pts
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tableData.map((team, index) => {
              const isHighlighted = highlightTeams.includes(team.name);
              return (
                <tr
                  key={team.name}
                  className={`${
                    isHighlighted
                      ? 'bg-blue-50 border-l-4 border-blue-500'
                      : 'hover:bg-gray-50'
                  } transition-colors duration-150`}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {team.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">
                    {team.matches}
                  </td>
                  <td className="px-4 py-3 text-sm text-green-600 text-center font-semibold">
                    {team.won}
                  </td>
                  <td className="px-4 py-3 text-sm text-red-600 text-center font-semibold">
                    {team.lost}
                  </td>
                  <td className={`px-4 py-3 text-sm text-center font-semibold ${
                    team.nrr > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {team.nrr > 0 ? '+' : ''}{team.nrr.toFixed(3)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">
                    {team.for}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-center">
                    {team.against}
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-blue-600 text-center">
                    {team.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PointsTable;