import { Html5QrcodeScanner } from 'html5-qrcode'
import { useEffect } from 'react'

const BarcodeScanner = ({ onScan }: { onScan: (decodedText: string) => void }) => {

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('barcode-reader', {
            fps: 10,
            qrbox: 250
        }, false)

        scanner.render(onScan, (err) => {
            console.log(err);
        })
    }, [onScan])

    return (
        <div id="barcode-reader" className="overflow-hidden rounded-lg" />
    )
}

export default BarcodeScanner