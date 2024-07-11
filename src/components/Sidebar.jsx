import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { data } from '../data/data';
import { useEffect, useState } from 'react';
import { useRecipe } from '../context/RecipeContext';

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

const Sidebar = ({ type }) => {
  const [ingredients, setIngredients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { recipe } = useRecipe()

  useEffect(() => {
    const fetchEvents = async () => {
      setIngredients(data);
    };

    fetchEvents();
  }, [type]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredIngredients = ingredients.filter(
    (ingredient) =>
      ingredient.type === type &&
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSpicesIngredients = ingredients.filter(
    (ingredient) =>
      ingredient.type === 'spices' &&
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      recipe.spices.some(spice => spice.toLowerCase() === ingredient.name.toLowerCase())
  );

  const filteredTrays = Object.entries(recipe.trays).map(([trayName, trayContents]) => {
    const trayIngredients = trayContents.map(trayItem => {
      const ingredient = ingredients.find(ing => ing.name.toLowerCase() === trayItem.ingredient.toLowerCase());
      return ingredient;
    }).filter(ingredient => ingredient !== undefined);
    return { trayName, trayIngredients };
  });
  

  return (
    <div className="w-1/4 bg-white border border-gray-300 rounded-3xl m-2 p-4 overflow-hidden">
      <div className="mb-4">
        {type === 'spices' && (
          <h1 className="text-3xl text-center italic font-semibold p-5">Spices</h1>
        )}
        {type === 'ingredients' && (
          <h1 className="text-3xl text-center italic font-semibold p-5">Ingredients</h1>
        )}
        {type === 'instructions' && (
          <h1 className="text-3xl text-center italic font-semibold p-5">Instructions</h1>
        )}
        <div className="pt-2 relative mx-auto text-gray-600 w-full">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
            type="search"
            name="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="absolute right-0 top-0 mt-5 mr-4 ml-0">
            <svg
              className="text-gray-600 h-4 w-4 fill-current"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              width="512px"
              height="512px"
            >
              <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="scroll-container">
        
          {type==='instructions' ? (
            <>
            {filteredIngredients.length>0 && <h2 className=' font-semibold italic text-xl p-2 my-2 mt-2'>Instructions</h2>}
            <div className="grid grid-cols-3 gap-2">
              {filteredIngredients.map((ingredient) => (
                  <Ingredient key={ingredient.id} ingredient={ingredient} />
                ))}
            </div>
            {filteredSpicesIngredients.length>0 && 
              <>
              <br />
              <hr />
              <h2 className=' font-semibold text-xl p-2 my-2 mt-2 italic'>Spices</h2>
              </>
            }
            <div className="grid grid-cols-3 gap-2">
              {filteredSpicesIngredients.map((ingredient) => (
                  <Ingredient key={ingredient.id} ingredient={ingredient} />
                ))}
            </div>
            {filteredTrays.length > 0 && 
  filteredTrays.map(({ trayName, trayIngredients }, trayIndex) => (
    <div key={trayIndex}>
      <br />
      <hr /> 
      <h2 className='font-semibold text-xl p-2 my-2 mt-2 italic'>{trayName}</h2>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {trayIngredients.map((ingredient) => (
          <Ingredient key={ingredient.id} ingredient={ingredient} />
        ))}
      </div>
    </div>
  ))
}

            
            </>
          ):(
          <div className="grid grid-cols-3 gap-2">
            {filteredIngredients.map((ingredient) => (
                <Ingredient key={ingredient.id} ingredient={ingredient} />
              ))}
          </div>
        
        )}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Sidebar;
