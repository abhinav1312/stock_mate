import React, { useState } from 'react';
import Quagga from 'quagga';


const BarcodeScanner = ({getProductInfo}) => {
  const [canvas, setCanvas] = useState(false); // show or hide the div when barcode scanner opens or closes
  const [code, setCode] = useState(''); // set barcode on scanning

  // stop scan on buttonClick and remove canvas
  const stopScan = () => {
    Quagga.stop();
    setCanvas(false);
   }

  // start scan on button click and  open canvas
  const startScan = () => {
    setCanvas(true);
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#scanner-container')
      },
      decoder: {
        readers: ["ean_reader"]
      }
    }, function (err) {
        if (err) {
            console.log(err);
            return
        }
        Quagga.start();
    });

    Quagga.onDetected((result) => {
      setCode(result.codeResult.code);
      stopScan();
    });
  };

  // if barcode scanned, find it in database
  if(code !== ''){
    getProductInfo(code);
    setCode('');
    console.log('called')
  }

  return (
    <div>
      <div className='flex justify-center gap-16'>
        <button onClick={startScan} className='px-16 py-8 border rounded-xl text-2xl font-medium hover:bg-darkGrey'>Scan Barcode</button>
        <button onClick={stopScan} className='px-16 py-8 border rounded-xl text-2xl font-medium hover:bg-darkGrey'>Scan Barcode</button>
      </div>
      <div id="scanner-container" className='absolute top-0' style={canvas ? {display: "block"} : {display: "none"} }>
      </div>
      {code && <p> Scanned code: {code}</p>}
    </div>
  );
}

export default BarcodeScanner;