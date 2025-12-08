import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const userGuide = "/userGuide.pdf";

const SupportTab = () => {
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onDocumentLoadError = (err) => {
    console.error("Failed to load PDF:", err);
    setError("Failed to load the user guide. Please try again later.");
  };

  return (
    <div className="pt-4">
      <h2 className="ff-gotham-medium fs_24">User Guide</h2>
      <div className="d-flex justify-content-center my-4">
        <Card style={{ width: "80%", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
          <Card.Body
            style={{
              height: "70vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <Document
                file={userGuide}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                options={{
                  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
                }}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={850}
                    renderAnnotationLayer={true}
                    renderTextLayer={true}
                  />
                ))}
              </Document>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default SupportTab;
