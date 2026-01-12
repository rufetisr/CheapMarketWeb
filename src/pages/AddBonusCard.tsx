import { useState } from 'react'
import BarcodeScanner from '../components/BarcodeScanner';
import { toast, ToastContainer } from 'react-toastify';
import { db } from '../db';
import { useNavigate } from 'react-router';
import { BiBarcodeReader } from 'react-icons/bi';
import {formatBarcode, normalizeBarcode} from '../utils/formatBarcode'


const AddBonusCard = () => {
    const [name, setName] = useState('');
    const [barcode, setBarcode] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const navigate = useNavigate()

    const handleSave = async () => {
        if (!name || !barcode) {
            toast.warn('Please fill in the name and barcode. ')
            return
        }

        await db.bonusCards.add({
            name,
            barcode,
            frontImage: imageFile || undefined,
            createdAt: Date.now()
        })

        navigate('/my-wallet') // Redirect to wallet after saving
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
            <div className="w-full max-w-md space-y-6">
                <h1 className="text-2xl font-bold text-blue-600">Add New Card</h1>

                {/* Manual Input */}
                <div className="space-y-4">
                    <input
                        className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none"
                        placeholder="Card Name (e.g. Umico)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <div className="flex gap-2">
                        <input
                            className="flex-1 p-4 rounded-xl border border-gray-200 outline-none"
                            placeholder="Barcode Number"
                            type='text'
                            inputMode='numeric'
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
                        <BarcodeScanner onScan={(text) => {
                            setBarcode(normalizeBarcode(text));
                            setIsScanning(false);
                        }} />
                    </div>
                )}

                {/* Photo Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-white relative">
                    <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    />
                    <p className="text-gray-500">
                        {imageFile ? `Selected: ${imageFile.name}` : "Upload Card Photo (Optional)"}
                    </p>
                </div>

                <button
                    onClick={handleSave}
                    className="cursor-pointer w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition"
                >
                    SAVE TO WALLET
                </button>
            </div>
            <ToastContainer position="top-center" hideProgressBar={false} autoClose={2200} />

        </div>
    )
}

export default AddBonusCard