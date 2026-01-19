
import { useTranslation } from "react-i18next";

const DemoVideo = () => {
  const { t } = useTranslation();

  return (
    <div className="my-12 flex flex-col items-center">
      <h2 className="text-2xl mb-4 text-gray-800">{t('home.demoTitle')}</h2>
      <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white">
        <video
          className="w-full h-auto max-h-[600px]"
          // controls   
          autoPlay
          muted
          // playsInline       
          poster="/demo-thumbnail.png" // Optional: replace with your thumbnail image
        >
          <source src="/demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <p className="text-gray-500 text-sm mt-3">
        {t('home.demoDescription')}
      </p>
    </div>
  );
};

export default DemoVideo;