import Layout from './Layout';
import FrontForm from './components/FrontForm';
import { RecipeProvider } from './context/RecipeContext';
import { useState } from 'react';

const App = () => {
  const [type, setType] = useState('form')
  
  const handleTypeChange = (newType) => {
    setType(newType);
  };

  return (
    <RecipeProvider>
    {/* <Layout /> */}
    {type==='form' && <FrontForm handleTypeChange={handleTypeChange} /> }
    {type!=='form' && <Layout type={type} handleTypeChange={handleTypeChange} /> }
    </RecipeProvider>
  );
};

export default App;
