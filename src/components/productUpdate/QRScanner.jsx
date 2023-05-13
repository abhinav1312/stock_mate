import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import { useDispatch } from 'react-redux';
import { sellProduct } from '../../redux/slice/sellProductSlice';

const QRScanner = ({getProductInfo}) => {
  const dispatch = useDispatch();

    const [qrScan, setQrScan] = useState(false);
    const handleError = (err) => {
			console.error(err);
    };
    const handleScan = (data) => {
			if (data) {
        console.log("Prd data: ", JSON.parse(data.text))
        dispatch(sellProduct(JSON.parse(data.text)));
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
    </div>
    </section>
  );
}

export default QRScanner;