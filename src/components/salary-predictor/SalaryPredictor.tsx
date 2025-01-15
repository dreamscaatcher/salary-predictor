'use client';

import { useState } from 'react';

interface PredictionResponse {
  salary: number;
}

export default function SalaryPredictor() {
  const [formData, setFormData] = useState({
    experience_level: 'EN',
    company_size: 'S',
    employment_type: 'FT',
    job_title: 'Data_Engineer'
  });
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data: PredictionResponse = await response.json();
      setPrediction(data.salary);
    } catch (error) {
      console.error('Error making prediction:', error);
      alert('Error making prediction. Please try again.');
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Experience Level
          </label>
          <select
            name="experience_level"
            value={formData.experience_level}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="EN">Entry Level</option>
            <option value="MI">Mid Level</option>
            <option value="SE">Senior</option>
            <option value="EX">Executive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Size
          </label>
          <select
            name="company_size"
            value={formData.company_size}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Employment Type
          </label>
          <select
            name="employment_type"
            value={formData.employment_type}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="FT">Full Time</option>
            <option value="PT">Part Time</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <select
            name="job_title"
            value={formData.job_title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Data_Engineer">Data Engineer</option>
            <option value="Data_Manager">Data Manager</option>
            <option value="Data_Scientist">Data Scientist</option>
            <option value="Machine_Learning_Engineer">Machine Learning Engineer</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {loading ? 'Predicting...' : 'Predict Salary'}
        </button>
      </form>

      {prediction !== null && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Predicted Salary</h2>
          <p className="text-3xl font-bold text-blue-600">
            ${prediction.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      )}
    </div>
  );
}
