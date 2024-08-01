import Layout from './Layout';
import FrontForm from './components/FrontForm';
import { RecipeProvider } from './context/RecipeContext';
import { DataProvider } from './context/DataContext';
import { useState } from 'react';

const App = () => {
  const [type, setType] = useState('form')
  
  const handleTypeChange = (newType) => {
    setType(newType);
  };

  return (
    <RecipeProvider>
      <DataProvider>
      {/* <Layout /> */}
      {type==='form' && <FrontForm handleTypeChange={handleTypeChange} /> }
      {type!=='form' && <Layout type={type} handleTypeChange={handleTypeChange} /> }
      </DataProvider>
    </RecipeProvider>
  );
};

export default App;
