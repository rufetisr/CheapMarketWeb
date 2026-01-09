import Barcode from 'react-barcode'

interface Props {
    value: string;
    name: string;
}

const BarcodeDisplay = ({ name, value }: Props) => {
    return (
        <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center">
            <h3 className="text-gray-800 font-bold mb-3 uppercase tracking-wide">{name}</h3>
            <div className="bg-white p-2 rounded-lg">
                <Barcode
                    value={value}
                    width={2}
                    height={80}
                    displayValue={true}
                    fontSize={14}
                    background="#fff"
                />
            </div>
        </div>
    )
}

export default BarcodeDisplay