import Layout from './Layout';
import { RecipeProvider } from './context/RecipeContext';

const App = () => {

  return (
    <RecipeProvider>
    <Layout />
    </RecipeProvider>
  );
};

export default App;
