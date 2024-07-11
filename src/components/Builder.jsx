import { useDrop } from 'react-dnd';
import { useEffect, useState } from 'react';
import { FaPlusCircle, FaRedo } from 'react-icons/fa';
import { IoArrowRedoOutline, IoArrowUndoOutline } from "react-icons/io5";
import { RxZoomIn, RxZoomOut } from "react-icons/rx";
import { HiDotsVertical } from "react-icons/hi";
import PropTypes from 'prop-types';
import ItemModal from './ItemModal';
import { useRecipe } from '../context/RecipeContext';

const ItemTypes = {
  INGREDIENT: 'ingredient',
};



const Builder = ({ type, setSaveClicked }) => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [history, setHistory] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem ] = useState(null);
  const [droppedItemsPerTray, setDroppedItemsPerTray] = useState({});
  const { recipe, updateSpices, updateInstructions } = useRecipe();

  useEffect(() => {
    setDroppedItems([]);
    setDroppedItemsPerTray({});
  }, [type]);


  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.INGREDIENT,
    drop: (item) => {
      if(type==='instructions'){
        setCurrentItem(item.ingredient)
        setIsModalOpen(true)
        console.log(currentItem)
      }else{
        setDroppedItems((prevItems) => [...prevItems, item.ingredient]);
      }
      console.log(`Dropped ${item.ingredient.name}`);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  

  useEffect(() => {
    setSaveClicked(false)
  }, [droppedItems])

  const handleSave = () => {
    if (type === 'spices') {
      updateSpices(droppedItems.map(item => item.name));
    } else if (type === 'instructions') {
      updateInstructions(droppedItems.map(item => ({
        command: item.name,
        value: item.value,
        unit: item.unit,
      })));
    }
    console.log('Saved to context:', droppedItems.map(item => item.name));
    setSaveClicked(true)
    alert("Saved")
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 1.2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.4));
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
    setCurrentItem(null)
    setIsModalOpen(false)
  }

  const handleModalSave = (item) => {
    setDroppedItems((prevItem) => [...prevItem, item]);
    setIsModalOpen(false)
    setCurrentItem(null)
  }

  return (
    <div className="w-2/4 bg-white border border-gray-300 rounded-3xl m-2 p-4">
      <div className="flex-1 flex flex-col items-center justify-between h-full">
        <div className="flex justify-end gap-3 w-full h-[10%] px-2 py-4">
          <div className="flex flex-row gap-2">
            <button onClick={handleSave} className={`bg-blue-600 text-white p-2 px-4 py-1 pb-[0.4rem] w-auto rounded-xl flex items-center font-medium text-base ${(setSaveClicked == true || droppedItems.length<1) ? "opacity-50" : ""}`} disabled={droppedItems.length === 0} >
              Save
            </button>
            <button className="bg-white text-black p-2 rounded-lg text-lg">
              <HiDotsVertical />
            </button>
          </div>
        </div>


        
        <div
          ref={drop}
          id='drop-box'
          style={{ scrollbarWidth: 'none'}}
          className={`flex items-center overflow-y-auto justify-center border-2 border-dashed rounded-2xl ${isOver ? 'border-blue-500' : 'border-gray-300'} w-full h-[90%]`}
        >
          <div className="p-4 pt-0 w-[95%] h-[90%]" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}>
            {droppedItems.length < 1 && (
              <div className="flex flex-col items-center justify-center h-full">
                <FaPlusCircle className="text-gray-400 text-6xl mb-4" />
                <p className="text-gray-400 text-lg">Drop {type === 'ingredients' ? 'ingredients' : type === 'spices' ? 'spices' : 'instruction'} here</p>
              </div>
            )}
            {droppedItems.length > 0 && (
              <>
                <p className="text-center text-3xl font-bold m-2">{type === 'ingredients' ? 'Ingredients' : type === 'spices' ? 'Spices' : 'Instruction'}</p>
                <div className="mt-6 grid grid-cols-5 gap-5">
                  {droppedItems.map((item, index) => (
                    <div key={index} className="flex flex-col justify-end items-center">
                      <div className="flex flex-col items-center justify-center bg-gray-200 gap-3 rounded-3xl w-full p-2 pt-0">
                        <img src={item.image} alt={item.name} className={`w-[95%] h-28 ${item.type==='instructions' ? 'object-contain p-4': 'object-cover'} rounded-2xl m-2 mb-0`} />
                        <p className="text-center">{item.name}</p>
                      </div>
                      <p className="font-semibold text-base m-2">{type === 'ingredients' ? '' : type === 'spices' ? '' : `STEP-${index + 1}`}</p>
                    </div>
                  ))}
                </div>
              </>
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
            <div className="flex items-center gap-2 border border-gray-700 rounded-lg p-2">
              <button onClick={handleZoomOut} className="bg-transparent text-black leading-none rounded-lg text-lg">
                <RxZoomOut className="text-gray-700" />
              </button>
              <div className="px-2 font-semibold text-gray-700">
                <span>{Math.round(zoomLevel * 100)}%</span>
              </div>
              <button onClick={handleZoomIn} className="bg-transparent text-black leading-none rounded-lg text-lg">
                <RxZoomIn className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {type==='instructions' && isModalOpen && (
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
  setSaveClicked: PropTypes.func.isRequired
};

export default Builder;
