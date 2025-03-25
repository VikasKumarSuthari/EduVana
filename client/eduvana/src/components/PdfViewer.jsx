


function PdfViewer({ pdfUrl }) {
 return(
  <iframe
  src={`https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
  width="100%"
  height="600px"
  title="PDF Viewer"
></iframe>

 )
}

export default PdfViewer;
