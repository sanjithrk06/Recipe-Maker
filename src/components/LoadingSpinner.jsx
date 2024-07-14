import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M3.635 12c0-5.799 4.711-10.508 10.508-10.508V.635C7.115.635.635 7.115.635 15.508h2.13A10.493 10.493 0 013.635 12z"></path>
      </svg>
      <span className="ml-2 text-blue-500">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
