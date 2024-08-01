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

  if (!ingredient.Ingredientid) {
    console.warn('Ingredient is missing an id:', ingredient);
  }

  return (
    <div
      ref={drag}
      className={`bg-gray-100 p-2 cursor-move rounded-2xl ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="w-full">
        <img src={`https://mome.manoharmakarla.com/${ingredient.img_path}`} alt={ingredient.Iname} className={` w-full h-32 ${ingredient.Itype==='instructions' ? 'object-contain p-4 h-20': 'object-cover'} rounded-2xl `} />
      </div>
      <p className="text-center mt-1 p-2 text-sm font-medium">
        {ingredient.Iname}
      </p>
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    Ingredientid: PropTypes.number,
    Iname: PropTypes.string.isRequired,
    img_path: PropTypes.string.isRequired,
    Itype: PropTypes.string,
  }),
};

export default Ingredient;
