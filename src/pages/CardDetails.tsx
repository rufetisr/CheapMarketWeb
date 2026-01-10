import { useParams, useNavigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import Barcode from 'react-barcode';
import { useState } from 'react';
import { FiZoomIn, FiZoomOut, FiTrash2, FiArrowLeft, FiMaximize2, FiX, FiCreditCard } from 'react-icons/fi';
import { formatBarcode } from '../utils/formatBarcode';

export const CardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [barcodeWidth, setBarcodeWidth] = useState(2);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const card = useLiveQuery(() => db.bonusCards.get(Number(id)), [id]);

  if (!card) return <div className="p-10 text-center text-gray-500">Loading card...</div>;

  return (
    <div className="min-h-screen bg-white pb-5">
      {/* 1. FULL SCREEN VERTICAL OVERLAY */}
      {isFullScreen && (
        <div
          className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsFullScreen(false)}
        >
          <button className="absolute top-6 right-6 p-2 text-gray-500 cursor-pointer">
            <FiX size={32} />
          </button>

          {/* The Vertical Barcode */}
          <div className="transform rotate-90 scale-[1.5] md:scale-[2]">
            <Barcode
              value={card.barcode}
              width={barcodeWidth}
              // format='
              height={120} // Slightly taller for vertical mode
              displayValue={true}
              fontSize={14}
              margin={0}
            />
          </div>

          <p className="absolute bottom-10 text-gray-400 text-sm italic">Tap anywhere to close</p>
        </div>
      )}

      {/* 2. REGULAR PAGE CONTENT */}
      <header className="p-4 flex items-center justify-between border-b sticky top-0 bg-white z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-700 cursor-pointer hover:bg-gray-100 rounded-full transition">
          <FiArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-lg flex-1 ml-2 truncate">{card.name}</h1>

        <button
          onClick={async () => {
            if (confirm("Delete this card?")) {
              await db.bonusCards.delete(card.id!);
              navigate('/my-wallet');
            }
          }}
          className="p-2 text-red-500 cursor-pointer hover:bg-red-50 rounded-full transition active:scale-90"
        >
          <FiTrash2 size={22} />
        </button>
      </header>

      <main className="p-6 flex flex-col items-center max-w-md mx-auto">
        {/* IMAGE OR VIRTUAL CARD PLACEHOLDER */}
        <div className="w-full mb-8 rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 h-[220px] relative">
          {card.frontImage ? (
            <img
              src={URL.createObjectURL(card.frontImage)}
              className="w-full h-full object-contain"
              alt="Card front"
            />
          ) : (
            /* VIRTUAL CARD DESIGN */
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 p-8 flex flex-col justify-between text-white relative overflow-hidden">
              {/* Decorative background icon */}
              <FiCreditCard size={120} className="absolute -bottom-4 -right-4 opacity-10 rotate-12" />

              <div className="flex justify-between items-start z-10">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                  <FiCreditCard size={24} />
                </div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">Bonus Card</span>
              </div>

              <div className="z-10">
                <h2 className="text-2xl font-black uppercase tracking-tight truncate">{card.name}</h2>
                <p className="text-blue-100 font-mono tracking-[0.3em] text-sm mt-1">{formatBarcode(card.barcode)}</p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">{card.name}</h2>
          <p className="text-gray-500 font-mono tracking-widest text-sm">{formatBarcode(card.barcode)}</p>
        </div>

        {/* Clickable Barcode Area */}
        <div className="w-full flex flex-col items-center space-y-4">
          <div
            onClick={() => setIsFullScreen(true)}
            className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[190px] w-full cursor-zoom-in hover:border-purple-200 transition-colors relative group"
          >
            <div className="absolute top-2 right-3 text-gray-300 group-hover:text-[#173a8d] transition-colors">
              <FiMaximize2 size={18} />
            </div>
            <Barcode
              value={card.barcode}
              width={barcodeWidth}
              height={100}
              displayValue={false}
              margin={0}
            />
            <span className="text-[10px] text-gray-400 mt-4 font-bold tracking-tighter uppercase">Tap to enlarge & rotate</span>
          </div>

          {/* Size Controls */}
          <div className="flex gap-4 items-center bg-gray-50 p-2 rounded-2xl border border-gray-200">
            <button
              onClick={(e) => { e.stopPropagation(); setBarcodeWidth(prev => Math.max(1.3, prev - 0.2)) }}
              className="p-3 bg-white rounded-xl shadow-sm text-gray-700 cursor-pointer hover:text-red-500 active:scale-90 transition"
            >
              <FiZoomOut size={20} />
            </button>
            <span className="text-xs font-bold text-gray-400 w-16 text-center">Size: {barcodeWidth.toFixed(1)}</span>
            <button
              onClick={(e) => { e.stopPropagation(); setBarcodeWidth(prev => Math.min(2.4, prev + 0.2)) }}
              className="p-3 bg-white rounded-xl shadow-sm text-gray-700 cursor-pointer hover:text-green-500 active:scale-90 transition"
            >
              <FiZoomIn size={20} />
            </button>
          </div>
        </div>


      </main>
    </div>
  );
};