import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ItemModal = ({ isOpen, item, onSave, onCancel }) => {
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ ...item, value, unit });
  };

  const handleCancel = () => {
    onCancel()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4 text-center">Set Value and Unit</h2>
        <div className=" flex flex-row gap-5 m-8">
            <div className=" w-[40%]">
                <div className="flex flex-col items-center justify-center bg-gray-200 gap-3 rounded-3xl w-full p-2 pt-0">
                    <img src={item.image} alt={item.name} className={`w-[95%] h-28 ${item.type==='instructions' ? 'object-contain p-4': 'object-cover'} rounded-2xl m-2 mb-0`} />
                    <p className="text-center">{item.name}</p>
                </div>
            </div>
            <div className="w-[60%]">
                <div className="relative mt-3 w-full">
                    <input 
                        type="number" 
                        id="value" 
                        name="value" 
                        className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" 
                        placeholder=" " 
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <label 
                        htmlFor="value" 
                        className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
                    > 
                        Value 
                    </label>
                </div>
                <div className="relative mt-7 mb-2 w-full">
                    <input 
                        type="text" 
                        id="unit" 
                        name="unit" 
                        className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" 
                        placeholder=" " 
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    />
                    <label 
                        htmlFor="unit" 
                        className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
                    > 
                        Unit 
                    </label>
                </div>
                <div className="flex justify-between gap-2 mt-5">
                    <button
                        onClick={handleCancel}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-xl"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-xl"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

ItemModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ItemModal;
