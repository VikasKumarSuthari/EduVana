import React, { useEffect } from 'react';

const SummerizerDashboard = () => {
  useEffect(() => {
    // This function will run when the component mounts
    const iframe = document.getElementById('streamlit-iframe');
    if (iframe) {
      iframe.onload = () => {
        console.log('Streamlit app loaded');
      };
    }
  }, []);

  return (
    <div className="streamlit-container">
      <iframe
        id="streamlit-iframe"
        src="http://192.168.153.171:8501"
        width="100%"
        height="800px"
        title="Streamlit Summarizer"
        frameBorder="0"
      />
    </div>
  );
};

export default SummerizerDashboard;