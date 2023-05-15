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
        dispatch(sellProduct(JSON.parse(data.text)));
				setQrScan(false);
			}
    };
  return (
    <section>
      <div className='flex justify-center gap-16'>
      <button className='outline' onClick={()=>setQrScan(true)}>Scan QR Code</button>
			{
				qrScan &&
				<QrReader
        className="absolute -top-12 w-96 h-96 left-56"
        delay={300}
        onError={handleError}
        onScan={handleScan}
				/>
			}
      <button className='outline' onClick={()=>setQrScan(false)}>Stop QR Scan</button>
    </div>
    </section>
  );
}

export default QRScanner;