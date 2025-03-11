import React from "react";
import "./PdfViewer.css";

function PdfViewer({ pdfUrl }) {
  return (
    <div className="pdf-viewer">
      <h3>PDF Notes</h3>
      <div className="pdf-container">
        {/* Replace with actual PDF viewer component */}
        <div className="placeholder-pdf">
          <p>PDF Viewer</p>
          <p>URL: {pdfUrl}</p>
        </div>
      </div>
    </div>
  );
}

export default PdfViewer;