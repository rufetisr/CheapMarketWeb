import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface FabToggleProps {
  isVisible: boolean;
  onToggle: () => void;
}

const FabToggle = ({ isVisible, onToggle }: FabToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-l-2xl shadow-lg transition-all duration-300 cursor-pointer active:scale-95"
      title={isVisible ? 'Hide buttons' : 'Show buttons'}
    >
      {isVisible ? (
        <FiChevronRight className="text-xl" />
      ) : (
        <FiChevronLeft className="text-xl" />
      )}
    </button>
  );
};

export default FabToggle;
