import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';

const QRScanner = ({getProductInfo}) => {
    const [result, setResult] = useState('');

    const [qrScan, setQrScan] = useState(false);
    const handleError = (err) => {
			console.error(err);
    };
    const handleScan = (data) => {
			if (data) {
				setResult(JSON.parse(data.text));
				setQrScan(false);
			}
    };
    


  return (
    <section>
      <div>
      <button onClick={()=>setQrScan(!qrScan)}>Scan QR code</button>
			{
				qrScan &&
				<QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
				/>
			}

      {result && <p>Scanned result: {result}</p>}
    </div>
    </section>
  );
}

export default QRScanner;