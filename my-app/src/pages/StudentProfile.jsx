import React from 'react';
import { useNavigate } from 'react-router-dom';

function StudentProfile() {
  const navigate = useNavigate();

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Student Profile</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button 
          className="p-3 bg-teal-500 text-white rounded-lg shadow-lg hover:bg-teal-600 transition"
          onClick={() => navigate('/hackathons')}
        >
          Hackathons - Participate in coding challenges
        </button>
        <button 
          className="p-3 bg-emerald-500 text-white rounded-lg shadow-lg hover:bg-emerald-600 transition"
          onClick={() => navigate('/mocktests')}
        >
          Mock Tests - Test your knowledge
        </button>
        <button 
          className="p-3 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 transition"
          onClick={() => navigate('/interviews')}
        >
          Virtual Interviews - Prepare for real-world interviews
        </button>
        <button 
          className="p-3 bg-rose-500 text-white rounded-lg shadow-lg hover:bg-rose-600 transition"
          onClick={() => navigate('/jobs')}
        >
          Jobs - Explore and apply for jobs
        </button>
        <button 
          className="p-3 bg-cyan-500 text-white rounded-lg shadow-lg hover:bg-cyan-600 transition"
          onClick={() => navigate('/profile')}
        >
          Profile - View and edit your profile
        </button>
        <button 
          className="p-3 bg-violet-500 text-white rounded-lg shadow-lg hover:bg-violet-600 transition"
          onClick={() => navigate('/ats-score')}
        >
          ATS Score Checker - Analyze your resume's ATS compatibility
        </button>
      </div>
    </div>
  );
}

export default StudentProfile;
