import React from "react";
import "./PdfViewer.css";

function PdfViewer({ pdfUrl }) {
  return (
    <div className="pdf-viewer">
      <h3>PDF Notes</h3>
      <div className="pdf-container">
        <iframe 
          src={pdfUrl} 
          width="100%" 
          height="600px"
          title="PDF Viewer"
        ></iframe>
      </div>
    </div>
  );
}

export default PdfViewer;
