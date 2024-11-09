import { useState } from "react";
import { Search } from "lucide-react";
import Nosearch from "./component/Nosearch";
import { searchImages } from "./utils/searchImage";
import { ImageCard } from "./component/Imagecard";
import { ImageData } from "./utils/types";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ImageData[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const imageResults = await searchImages(query);
      setResults(imageResults);
    } catch (error) {
      console.error("Error searching images:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div
        className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 `}
      >
        <div className="max-w-4xl mx-auto p-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for images..."
              className="w-full py-3 px-4 pr-12 text-gray-900 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              disabled={isSearching}
            >
              <Search className="w-5 h-5" />
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
      </div>

      {results.length === 0 ? <Nosearch /> : null}

      <div className="max-w-[90%] mx-auto p-4 pt-24">
        {isSearching ? (
          <div className="text-center text-gray-600 mt-8">Searching...</div>
        ) : (
          results.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 mt-8">
              {results.map((imageUrl, index) => (
                <ImageCard
                  key={index}
                  imageUrl={imageUrl.previewURL}
                  index={index}
                  imageKey={imageUrl.id}
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
