import { useEffect, useState } from 'react';
import BarcodeScanner from '../components/BarcodeScanner';
import { toast, ToastContainer } from 'react-toastify';
import { db } from '../db';
import { useNavigate } from 'react-router';
import { BiBarcodeReader } from 'react-icons/bi';
import { formatBarcode, normalizeBarcode } from '../utils/formatBarcode';
import { useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { useTranslation } from 'react-i18next'

const EditBonusCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation()

  const card = useLiveQuery(
    () => (id ? db.bonusCards.get(Number(id)) : undefined),
    [id]
  );

  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (card) {
      setName(card.name || '');
      setBarcode(card.barcode || '');
      // We intentionally don't prefill the file input; browsers don't allow it.
      // Existing image will be kept unless user uploads a new one.
    }
  }, [card]);

  const handleSave = async () => {
    if (!card || !card.id) return;

    if (!name || !barcode) {
      toast.warn(t('editCard.fillWarning'));
      return;
    }

    const updates: any = {
      name,
      barcode,
    };

    if (imageFile) {
      updates.frontImage = imageFile;
    }

    await db.bonusCards.update(card.id, updates);

    navigate('/my-wallet');
  };

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        {t('common.loading')}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-blue-600">{t('editCard.title')}</h1>

        {/* Manual Input */}
        <div className="space-y-4">
          <input
            className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none"
            placeholder={t('editCard.cardNamePlaceholder')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex gap-2">
            <input
              className="flex-1 p-4 rounded-xl border border-gray-200 outline-none"
              placeholder={t('editCard.barcodePlaceholder')}
              type="text"
              inputMode="numeric"
              value={formatBarcode(barcode)}
              onChange={(e) => setBarcode(normalizeBarcode(e.target.value))}
            />
            <button
              onClick={() => setIsScanning(!isScanning)}
              className="cursor-pointer bg-gray-200 text-2xl p-4 rounded-xl active:scale-94 transition"
            >
              <BiBarcodeReader />
            </button>
          </div>
        </div>

        {/* Scanner Component */}
        {isScanning && (
          <div className="rounded-2xl overflow-hidden border-2 border-blue-600">
            <BarcodeScanner
              onScan={(text) => {
                setBarcode(normalizeBarcode(text));
                setIsScanning(false);
              }}
            />
          </div>
        )}

        {/* Photo Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-white relative space-y-2">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
          <p className="text-gray-500">
            {imageFile
              ? `${t('editCard.selected')} ${imageFile.name}`
              : card.frontImage
              ? t('editCard.existingPhoto')
              : t('editCard.photoPlaceholder')}
          </p>
        </div>

        <button
          onClick={handleSave}
          className="cursor-pointer w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition"
        >
          {t('editCard.save')}
        </button>
      </div>
      <ToastContainer
        position="top-center"
        hideProgressBar={false}
        autoClose={2200}
      />
    </div>
  );
};

export default EditBonusCard;

