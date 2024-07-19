import { CollectionProvider } from '../context/CollectionContext';

const Home = () => {
  return (
    <CollectionProvider>
      <div>
        <h1 className="text-3xl font-bold mb-6">Welcome to Multimodal RAG</h1>
        <p>Use the sidebar to navigate through the different sections.</p>
      </div>
    </CollectionProvider>
  );
};

export default Home;
