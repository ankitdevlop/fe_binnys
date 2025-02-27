import React from 'react';
import './index.css'

function Loader() {
  return (
    <div className="loader-container">
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default Loader;