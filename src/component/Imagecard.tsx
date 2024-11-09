import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ImageCardInterface {
  imageUrl: string;
  index: number;
  imageKey: number;
}

export function ImageCard({ imageUrl, index, imageKey }: ImageCardInterface) {
  const navigate = useNavigate();

  return (
    <div
      key={index}
      className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      <div className="aspect-square bg-gray-200 relative overflow-hidden">
        <img
          src={imageUrl}
          alt={`Search result ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
      </div>
      <button
        onClick={() => navigate(`/canvas/id=${imageKey}`)}
        className="absolute bottom-4 left-4 right-4 bg-white text-blue-600 py-2 px-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out shadow-lg hover:bg-blue-50"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Caption
      </button>
    </div>
  );
}
