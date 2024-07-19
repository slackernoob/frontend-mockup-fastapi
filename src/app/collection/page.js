import CreateCollection from '../../components/create-collection';
import DeleteCollection from '../../components/delete-collection';

const CollectionPage = () => {
  return (
    <div className="space-y-6">
      <CreateCollection />
      <DeleteCollection />
    </div>
  );
};

export default CollectionPage;
