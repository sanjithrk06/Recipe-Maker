import React, { createContext, useContext, useState, useEffect } from 'react';
import { data } from '../data/data';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [lspices, setSpices] = useState([]);
  const [lingredients, setIngredients] = useState([]);
  const [linstructions, setInstructions] = useState([]);
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const spiceResponse = await fetch('https://mome.manoharmakarla.com/apiv2/save.php?ltype=spice');
        const ingredientResponse = await fetch('https://mome.manoharmakarla.com/apiv2/save.php?ltype=ingredient');

        if (!spiceResponse.ok || !ingredientResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const spiceData = await spiceResponse.json();
        const ingredientData = await ingredientResponse.json();
        const instructionData = data.filter(
          (ingredient) =>
            ingredient.Itype === 'instructions'
        );

        setSpices(spiceData.data || []);
        setIngredients(ingredientData.data || []);
        setInstructions(instructionData || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ lspices, lingredients, linstructions, isloading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
