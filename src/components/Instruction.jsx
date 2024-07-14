import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  INGREDIENT: 'ingredient',
};

const Instruction = ({ ingredient }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.INGREDIENT,
    item: { ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-gray-100 p-2 cursor-move rounded-2xl flex ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="w-1/4">
        <img src={ingredient.image} alt={ingredient.name} className="w-full h-20 object-contain p-2 rounded-2xl" />
      </div>
      <div className="w-3/4 flex items-center pl-2">
        <p className="text-sm font-medium">{ingredient.name}</p>
      </div>
    </div>
  );
};

Instruction.propTypes = {
  ingredient: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default Instruction;
