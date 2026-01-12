import { useNavigate } from 'react-router';
import type { IconType } from 'react-icons';

interface FloatingActionButtonProps {
  icon: IconType;
  to: string;
  title?: string;
  bgColor?: string;
  hoverColor?: string;
  bottomOffset?: string;
  visible?: boolean;
}

const FloatingActionButton = ({
  icon: Icon,
  to,
  title,
  bgColor = 'bg-blue-600',
  hoverColor = 'hover:bg-blue-700',
  bottomOffset = 'bottom-18',
  visible = true,
}: FloatingActionButtonProps) => {
  const navigate = useNavigate();

  return (
    <div 
      title={title}
      className={`fixed right-6 ${bottomOffset} z-49 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        onClick={() => navigate(to)}
        className={`cursor-pointer ${bgColor} ${hoverColor} text-white p-4 rounded-full shadow-xl text-xl transition-transform hover:scale-110`}
      >
        <Icon />
      </button>
    </div>
  );
};

export default FloatingActionButton;
