import { Search } from "lucide-react";

export default function Nosearch() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className={`text-center transition-opacity duration-1000 `}>
        <Search className="w-16 h-16 mx-auto mb-4 text-blue-500 animate-bounce" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Ready to explore?
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Please search for some images
        </p>
      </div>
    </div>
  );
}
