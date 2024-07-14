import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  INGREDIENT: 'ingredient',
};

const Ingredient = ({ ingredient }) => {
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
      className={`bg-gray-100 p-2 cursor-move rounded-2xl ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="w-full">
        <img src={ingredient.image} alt={ingredient.name} className={` w-full h-32 ${ingredient.type==='instructions' ? 'object-contain p-4 h-20': 'object-cover'} rounded-2xl `} />
      </div>
      <p className="text-center mt-1 p-2 text-sm font-medium">
        {ingredient.name}
      </p>
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default Ingredient;
