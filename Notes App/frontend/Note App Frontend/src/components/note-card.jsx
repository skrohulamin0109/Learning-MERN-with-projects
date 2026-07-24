import { Trash2, Star } from 'lucide-react';

const NoteCard = ({ title, content, onFavorite, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col gap-2 w-64">
      <h3 className="font-bold text-lg truncate">{title}</h3>
      <p className="text-gray-600 text-sm h-12 overflow-hidden">{content}</p>
      
      <div className="flex justify-end gap-3 mt-2">
        <button onClick={onFavorite} className="text-gray-400 hover:text-yellow-500">
          <Star size={20} />
        </button>
        <button onClick={onDelete} className="text-gray-400 hover:text-red-500">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;