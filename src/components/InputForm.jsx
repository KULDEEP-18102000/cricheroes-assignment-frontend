import React, { useState } from 'react';

/**
 * Component for user input form
 */
const InputForm = ({ teams, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    yourTeam: '',
    oppTeam: '',
    overs: 20,
    desiredPosition: '',
    tossResult: 'batting',
    runs: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.yourTeam) {
      newErrors.yourTeam = 'Please select your team';
    }

    if (!formData.oppTeam) {
      newErrors.oppTeam = 'Please select opposition team';
    }

    if (formData.yourTeam === formData.oppTeam) {
      newErrors.oppTeam = 'Opposition must be different from your team';
    }

    if (!formData.desiredPosition || formData.desiredPosition < 1 || formData.desiredPosition > 5) {
      newErrors.desiredPosition = 'Position must be between 1 and 5';
    }

    if (!formData.runs || formData.runs < 0) {
      newErrors.runs = 'Please enter valid runs';
    }

    if (!formData.overs || formData.overs <= 0) {
      newErrors.overs = 'Please enter valid overs';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl min-h-[600px] flex flex-col">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 rounded-t-lg">
        <h2 className="text-2xl font-bold text-white">Match Scenario Input</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-5">
        {/* Your Team */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Your Team *
          </label>
          <select
            name="yourTeam"
            value={formData.yourTeam}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.yourTeam ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select your team</option>
            {teams.map(team => (
              <option key={team.name} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
          {errors.yourTeam && (
            <p className="mt-1 text-sm text-red-600">{errors.yourTeam}</p>
          )}
        </div>

        {/* Opposition Team */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Opposition Team *
          </label>
          <select
            name="oppTeam"
            value={formData.oppTeam}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.oppTeam ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select opposition team</option>
            {teams.map(team => (
              <option key={team.name} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
          {errors.oppTeam && (
            <p className="mt-1 text-sm text-red-600">{errors.oppTeam}</p>
          )}
        </div>

        {/* Overs */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Match Overs *
          </label>
          <input
            type="number"
            name="overs"
            value={formData.overs}
            onChange={handleChange}
            min="1"
            max="50"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.overs ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.overs && (
            <p className="mt-1 text-sm text-red-600">{errors.overs}</p>
          )}
        </div>

        {/* Desired Position */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Desired Position in Table *
          </label>
          <input
            type="number"
            name="desiredPosition"
            value={formData.desiredPosition}
            onChange={handleChange}
            min="1"
            max="5"
            placeholder="Enter position (1-5)"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.desiredPosition ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.desiredPosition && (
            <p className="mt-1 text-sm text-red-600">{errors.desiredPosition}</p>
          )}
        </div>

        {/* Toss Result */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Toss Result *
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="tossResult"
                value="batting"
                checked={formData.tossResult === 'batting'}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">Batting First</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="tossResult"
                value="bowling"
                checked={formData.tossResult === 'bowling'}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">Bowling First</span>
            </label>
          </div>
        </div>

        {/* Runs */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {formData.tossResult === 'batting' ? 'Runs Scored *' : 'Runs to Chase *'}
          </label>
          <input
            type="number"
            name="runs"
            value={formData.runs}
            onChange={handleChange}
            min="0"
            placeholder={formData.tossResult === 'batting' ? 'Enter runs scored' : 'Enter target'}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.runs ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.runs && (
            <p className="mt-1 text-sm text-red-600">{errors.runs}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Calculating...
            </span>
          ) : (
            'Calculate NRR Requirements'
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;