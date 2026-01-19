import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db'
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus, FiCreditCard } from 'react-icons/fi';
import { formatBarcode } from '../utils/formatBarcode';
import { useTranslation } from 'react-i18next'

const Wallet = () => {
    const cards = useLiveQuery(() => db.bonusCards.toArray());
    const { t } = useTranslation()

    return (
        <div className="min-h-screen bg-gray-50 p-4 pb-24 font-sans">
            {/* Header */}
            <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center tracking-tight">
                {t('wallet.title')}
            </h1>

            {/* Empty State Logic */}
            {cards && cards.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-500">
                        <FiCreditCard size={48} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{t('wallet.noCards')}</h2>
                    <p className="text-gray-500 mb-10 max-w-[260px] leading-relaxed">
                        {t('home.walletDesc')} <span className='text-blue-700 text-2xl'>+</span> {t('common.loading')}
                    </p>
                    
                    {/* Visual cue pointing towards the button */}
                    <div className="animate-bounce text-blue-600">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 5v14M19 12l-7 7-7-7"/>
                        </svg>
                    </div>
                </div>
            ) : (
                <div className="grid gap-3 max-w-md mx-auto">
                    {cards?.map((card) => (
                        <Link
                            to={`/card/${card.id}`}
                            key={card.id}
                            className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 active:scale-[0.97] hover:shadow-md transition-all border border-gray-100 group"
                        >
                            {/* Image Thumbnail */}
                            <div className="w-16 h-16 bg-blue-50 rounded-xl overflow-hidden flex-shrink-0 border border-blue-100 flex items-center justify-center">
                                {card.frontImage ? (
                                    <img
                                        src={URL.createObjectURL(card.frontImage)}
                                        className="w-full h-full object-cover"
                                        alt={card.name}
                                    />
                                ) : (
                                    <FiCreditCard size={24} className="text-blue-300" />
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 overflow-hidden">
                                <h3 className="font-bold text-gray-800 text-lg leading-tight truncate group-hover:text-blue-600 transition-colors">
                                    {card.name}
                                </h3>
                                <p className="text-gray-400 font-mono text-xs mt-1 tracking-wider uppercase">
                                    {formatBarcode(card.barcode)}
                                </p>
                            </div>

                            <div className="text-blue-600 opacity-40 group-hover:opacity-100 transition-opacity">
                                <FiArrowRight size={22}/>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Floating Action Button (Blue) */}
            <Link 
                to="/add-card" 
                className="fixed bottom-8 right-6 bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-90 transition-all z-50 cursor-pointer border-4 border-white"
            >
                <FiPlus strokeWidth={3} />
            </Link>
        </div>
    );
}

export default Wallet;