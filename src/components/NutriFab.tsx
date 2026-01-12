import { RiCameraAiFill } from "react-icons/ri";
import FloatingActionButton from './FloatingActionButton';

interface NutriFabProps {
  visible?: boolean;
}

const NutriFab = ({ visible = true }: NutriFabProps) => {
  return (
    <FloatingActionButton
      icon={RiCameraAiFill}
      to="/nutrition-analyzer"
      title="Analyze NutriScore"
      bgColor="bg-green-600"
      hoverColor="hover:bg-green-700"
      bottomOffset="bottom-18"
      visible={visible}
    />
  );
};

export default NutriFab;