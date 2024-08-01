import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { FaPlusCircle, FaRedo } from 'react-icons/fa';
import { IoArrowRedoOutline, IoArrowUndoOutline } from "react-icons/io5";
import ItemModal from './ItemModal';
import { useRecipe } from '../context/RecipeContext';
import Alert from '@mui/material/Alert';

const ItemTypes = {
  INGREDIENT: 'ingredient',
};

const Builder = ({ type, setSaveClicked }) => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [history, setHistory] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const { updateSpices, updateInstructions } = useRecipe();

  useEffect(() => {
    setDroppedItems([]);
    setShowWarning(false);
    setZoomLevel(1);
  }, [type]);

  useEffect(() => {
    setSaveClicked(false);
  }, [droppedItems]);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.INGREDIENT,
    drop: (item) => {
      const alreadyDropped = droppedItems.some(ingredient => ingredient.Iname === item.ingredient.Iname);
      if (alreadyDropped) {
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000);
      } else {
        if (type === 'instructions') {
          setCurrentItem(item.ingredient);
          setIsModalOpen(true);
        } else {
          setDroppedItems((prevItems) => [...prevItems, item.ingredient]);
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleSave = () => {
    if (type === 'spices') {
      updateSpices(droppedItems.map(item => item.Iname));
    } else if (type === 'instructions') {
      updateInstructions(droppedItems.map(item => ({
        command: item.Iname,
        value: item.value,
        unit: item.unit,
      })));
    }
    setSaveClicked(true);
  };

  const handleReset = () => {
    setDroppedItems([]);
    setHistory([]);
  };

  const handleRedo = () => {
    if (history.length > 0) {
      const addItem = history[0];
      setHistory(history.slice(1));
      setDroppedItems([...droppedItems, addItem]);
    }
  };

  const handleUndo = () => {
    if (droppedItems.length > 0) {
      const prevItem = droppedItems[droppedItems.length - 1];
      setHistory([prevItem, ...history]);
      setDroppedItems(droppedItems.slice(0, -1));
    }
  };

  const handleModalCancel = () => {
    setCurrentItem(null);
    setIsModalOpen(false);
  };

  const handleModalSave = (item) => {
    setDroppedItems((prevItems) => [...prevItems, item]);
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 1.2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.4));
  };

  return (
    <div className="w-2/4 max-md:w-full bg-white border border-gray-300 rounded-3xl m-2 p-4">
      {showWarning && (
        <Alert severity="warning" className="absolute top-4 left-4">
          This ingredient is already added!
        </Alert>
      )}
      <div className="flex-1 flex flex-col items-center justify-between h-full">
        <div
          ref={drop}
          id='drop-box'
          style={{ scrollbarWidth: 'none' }}
          className={`flex items-center mt-5 overflow-y-auto justify-center border-2 border-dashed rounded-2xl ${isOver ? 'border-blue-500' : 'border-gray-300'} w-full h-[90%]`}
        >
          <div className="p-4 pt-0 w-[95%] h-[90%]" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}>
            {droppedItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <FaPlusCircle className="text-gray-400 text-6xl mb-4" />
                <p className="text-gray-400 text-lg">Drop {type === 'ingredients' ? 'ingredients' : type === 'spices' ? 'spices' : 'instructions'} here</p>
              </div>
            ) : (
              <div className='mb-5'>
                <p className="text-center text-3xl font-bold m-2">{type === 'ingredients' ? 'Ingredients' : type === 'spices' ? 'Spices' : 'Instructions'}</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {droppedItems.map((item, index) => (
                    <div key={item.Ingredientid || index} className="flex flex-col justify-end items-center mb-2">
                      <div className="flex flex-row items-center justify-center bg-gray-200 gap-1 rounded-3xl w-full p-2 pt-0">
                        <div className="flex flex-col w-1/3">
                          <img src={item.Itype === 'instructions' ? (`${item.img_path}`) : (`https://mome.manoharmakarla.com/${item.img_path}`)} alt={item.Iname} className={`w-full h-[5rem] ${item.Itype === 'instructions' ? 'object-contain p-4' : 'object-cover'} rounded-2xl m-2 mb-0`} />
                        </div>
                        <div className="flex flex-col w-2/3">
                          <p className="text-center text-lg font-semibold">{item.Iname}</p>
                          {type === 'instructions' && (
                            <>
                              <p className="text-center">{`${item.value} ${item.unit}`}</p>
                              <p className="text-center">{`${item.variety}`}</p>
                            </>
                          )}
                        </div>
                      </div>
                      {type === 'instructions' && <p className="font-semibold text-base m-2">STEP-{index + 1}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-3 w-full h-[10%] px-3 py-4">
          <div className="item-left flex flex-row gap-2">
            <button onClick={handleReset} className="bg-white border border-gray-700 text-black p-2 px-4 w-auto rounded-lg flex items-center">
              <span className="mr-2 font-semibold text-gray-700">Reset</span>
              <FaRedo className="text-gray-700" />
            </button>
            <button onClick={handleUndo} className="bg-white border border-gray-700 text-black p-2 rounded-lg text-lg">
              <IoArrowUndoOutline className="text-gray-900" />
            </button>
            <button onClick={handleRedo} className="bg-white border border-gray-700 text-black p-2 rounded-lg text-lg">
              <IoArrowRedoOutline className="text-gray-900" />
            </button>
          </div>
          <div className="item-right">
            <button onClick={handleSave} className={`bg-blue-600 text-white p-2 px-4 py-1.5 pb-[0.5rem] w-auto rounded-xl flex items-center font-medium text-base ${setSaveClicked == false ? "opacity-50" : ""}`} disabled={droppedItems.length === 0}>
              Save & continue
            </button>
          </div>
        </div>
      </div>
      {type === 'instructions' && isModalOpen && (
        <ItemModal
          isOpen={isModalOpen}
          item={currentItem}
          onSave={handleModalSave}
          onCancel={handleModalCancel}
        />
      )}
    </div>
  );
};

Builder.propTypes = {
  type: PropTypes.string.isRequired,
  setSaveClicked: PropTypes.func.isRequired,
};

export default Builder;
