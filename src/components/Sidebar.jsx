import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useRecipe } from '../context/RecipeContext';
import { useData } from '../context/DataContext';
import Ingredient from './Ingredient';
import Instruction from './Instruction';
import Accordion from './Accordion';
import LoadingSpinner from './LoadingSpinner';

const Sidebar = ({ type }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { recipe } = useRecipe();
  const { lspices, lingredients, linstructions, isloading } = useData();
  const [isInstructionsOpen, setInstructionsOpen] = useState(false);
  const [isIngredientsOpen, setIngredientsOpen] = useState(false);
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSpicesIngredients = lspices.filter(
    (ingredient) =>
      ingredient.Iname.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  const filteredIngredients = lingredients.filter(
    (ingredient) =>
      ingredient.Iname.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredInstructions = linstructions.filter(
    (ingredient) =>
      ingredient.Iname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recipeSpices = lspices.filter(spice =>
    recipe.spices.includes(spice.Iname)
  );

  const filteredTrays = Object.entries(recipe.trays).map(([trayName, trayContents]) => {
    const trayIngredients = trayContents.map(trayItem => {
      const ingredient = filteredIngredients.find(ing => ing.Iname.toLowerCase() === trayItem.ingredient.toLowerCase());
      return ingredient;
    }).filter(ingredient => ingredient !== undefined);
    return trayIngredients;
  }).flat();

  const combinedIngredients = [
    ...recipeSpices,
    ...filteredTrays
  ];

  return (
    <div className="w-[27%] max-md:w-full bg-white border border-gray-300 rounded-3xl m-2 p-4 overflow-hidden">
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

        {/* search box */}
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
        {type === 'instructions' ? (
          <>
            {/* instructions list */}
            <Accordion
              title="Instructions"
              isOpen={isInstructionsOpen}
              onToggle={() => setInstructionsOpen(!isInstructionsOpen)}
            >
              {isloading ? (
                <LoadingSpinner />
              ) : (
                <div className="flex flex-col gap-2">
                  {filteredInstructions.map((ingredient) => (
                    <Instruction key={ingredient.Ingredientid} ingredient={ingredient} />
                  ))}
                </div>
              )}
            </Accordion>
            <hr />
            {/* ingredients & spices list */}
            <Accordion
              title="Ingredients & Spices"
              isOpen={isIngredientsOpen}
              onToggle={() => setIngredientsOpen(!isIngredientsOpen)}
            >
              {isloading ? (
                <LoadingSpinner />
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {combinedIngredients.map((ingredient) => (
                    <Ingredient key={ingredient.Ingredientid} ingredient={ingredient} />
                  ))}
                </div>
              )}
            </Accordion>
            <hr />
          </>
        ) : type === 'spices' ? (
          <>
            {isloading ? (
              <LoadingSpinner />
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {filteredSpicesIngredients.map((ingredient) => (
                  <Ingredient key={ingredient.Ingredientid} ingredient={ingredient} />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {isloading ? (
              <LoadingSpinner />
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {filteredIngredients.map((ingredient, index) => (
                  <Ingredient key={index} ingredient={ingredient} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Sidebar;
