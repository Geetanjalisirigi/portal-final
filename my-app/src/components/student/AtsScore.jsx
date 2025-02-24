import React, { useState } from "react";
import axios from "axios";

const ATSResumeAnalyzer = () => {
    const [jobDescription, setJobDescription] = useState("");
    const [file, setFile] = useState(null);
    const [result, setResult] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (analysisType) => {
        if (!file || !jobDescription) {
            alert("Please upload a resume and enter a job description.");
            return;
        }

        const formData = new FormData();
        formData.append("resume", file);
        formData.append("job_description", jobDescription);
        formData.append("analysis_type", analysisType);

        try {
            const response = await axios.post("http://localhost:8000/analyze-resume/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setResult(response.data.result);
        } catch (error) {
            console.error("Error:", error);
            setResult("Failed to analyze resume.");
        }
    };

    return (
        <div className="p-4 max-w-xl mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">ATS Resume Analyzer</h2>
            <textarea
                className="w-full p-2 border rounded mb-4"
                rows="4"
                placeholder="Enter job description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
            ></textarea>
            <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4" />
            <div className="flex space-x-4">
                <button onClick={() => handleSubmit("summary")} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Evaluate Resume
                </button>
                <button onClick={() => handleSubmit("match")} className="px-4 py-2 bg-green-500 text-white rounded">
                    Match Percentage
                </button>
            </div>
            {result && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                    <h3 className="font-semibold">Result:</h3>
                    <p>{result}</p>
                </div>
            )}
        </div>
    );
};

export default ATSResumeAnalyzer;
