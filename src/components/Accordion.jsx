import PropTypes from 'prop-types';
import { useRef } from 'react';

const Accordion = ({ id, title, children, isOpen, onToggle }) => {
  const contentRef = useRef(null);

  return (
    <div className="my-2">
      <button
        onClick={() => onToggle(id)}
        className="w-full flex justify-between items-center text-left p-4 bg-transparent hover:bg-gray-300 rounded-2xl font-semibold"
      >
        {title}
        <svg
          className={`h-4 w-4 transition-transform transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen && contentRef.current ? contentRef.current.scrollHeight : 0,
          transition: 'max-height 0.3s ease',
        }}
        className="overflow-hidden transition-max-height duration-300 ease-in-out"
      >
        <div className="mt-2 p-0">
          {children}
        </div>
      </div>
    </div>
  );
};

Accordion.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Accordion;
