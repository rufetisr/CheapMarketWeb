import { useEffect, useState } from 'react';
import { FiDownload, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const InstallPWA = () => {
    const [installPrompt, setInstallPrompt] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handler = (e: any) => {
            // Prevent the default browser mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setInstallPrompt(e);
            setIsVisible(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        // Check if the app is already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsVisible(false);
        }

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (!installPrompt) return;

        // Show the native install prompt
        installPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await installPrompt.userChoice;
        
        if (outcome === 'accepted') {
            // console.log('User accepted the install prompt');
            setIsVisible(false);
        } 
        // else {
        //     console.log('User dismissed the install prompt');
        // }
        
        setInstallPrompt(null);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    className="fixed top-4 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none"
                >
                    <div className="bg-white shadow-2xl border border-blue-100 rounded-2xl p-4 flex items-center gap-4 max-w-md w-full pointer-events-auto">
                        <div className="bg-blue-100 p-3 rounded-xl text-blue-600 hidden sm:block">
                            <FiDownload size={24} />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-800 text-sm">Tətbiqi quraşdırın</h4>
                            <p className="text-xs text-gray-500">Bonus kartlarınıza oflayn rejimdə daxil olmaq və sürətli giriş üçün ana ekrana əlavə et.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={handleInstallClick}
                                className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-blue-700 transition active:scale-95 whitespace-nowrap"
                            >
                                QURAŞDIR
                            </button>
                            <button 
                                onClick={() => setIsVisible(false)} 
                                className="text-gray-400 p-2 hover:bg-gray-50 rounded-full transition"
                            >
                                <FiX />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InstallPWA;