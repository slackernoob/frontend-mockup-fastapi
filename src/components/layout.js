import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-64 h-screen bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-semibold mb-6">Weaviate Manager</h2>
        <nav className="space-y-4">
          <Link href="/collection">
            <a className="block p-2 rounded hover:bg-gray-700">Collection</a>
          </Link>
          <Link href="/objects">
            <a className="block p-2 rounded hover:bg-gray-700">Objects</a>
          </Link>
          <Link href="/search">
            <a className="block p-2 rounded hover:bg-gray-700">Search</a>
          </Link>
        </nav>
      </div>
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default Layout;
