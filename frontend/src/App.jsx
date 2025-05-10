import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [leads, setLeads] = useState([]);
  const [replies, setReplies] = useState([]);
  const [generatedMessages, setGeneratedMessages] = useState([]);

  const handleUploadLeads = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:8000/upload-leads', formData);
      toast.success(response.data.info);
    } catch (error) {
      toast.error('Error uploading leads.');
    }
  };

  const handleUploadReplies = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:8000/upload-replies', formData);
      toast.success(response.data.info);
    } catch (error) {
      toast.error('Error uploading replies.');
    }
  };

  const generateMessages = async () => {
    // Example logic to generate messages
    const exampleLead = { name: 'John Doe', industry: 'Marketing', specific_area: 'Social Media' };
    try {
      const response = await axios.post('http://localhost:8000/generate-message', exampleLead);
      setGeneratedMessages([...generatedMessages, response.data.message]);
    } catch (error) {
      toast.error('Error generating message.');
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <button onClick={generateMessages}>Generate Messages</button>
        <input type="file" onChange={handleUploadLeads} />
        <input type="file" onChange={handleUploadReplies} />
      </aside>
      <main className="content">
        <h1>Generated Messages</h1>
        <ul>
          {generatedMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
