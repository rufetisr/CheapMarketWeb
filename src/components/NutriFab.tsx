import { RiCameraAiFill } from "react-icons/ri";
import { useNavigate } from 'react-router';

const NutriFab = () => {   
  const navigate = useNavigate();

    return (
        <div title="Analyze NutriScore">           

            <button
                onClick={()=> navigate('/nutrition-analyzer')}
                className="fixed right-6 bottom-18 cursor-pointer bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-xl text-xl transition-transform hover:scale-110 z-49"
            >
                <RiCameraAiFill />
            </button>
        </div>
    )
}

export default NutriFab