import React, { useState } from 'react';
import Quagga from 'quagga';


const BarcodeScanner = ({getProductInfo}) => {
  const [showCanvas, setShowCanvas] = useState(false); // show or hide the div when barcode scanner opens or closes
  const [code, setCode] = useState(''); // set barcode on scanning

  // stop scan on buttonClick and remove showCanvas
  const stopScan = () => {
    
    Quagga.stop();
    setShowCanvas(false);
   }

  // start scan on button click and  open showCanvas
  const startScan = () => {
    setShowCanvas(true);
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
  }

  return (
    <section>
      <div className='flex justify-center gap-16'>
        <button onClick={startScan} className='outline'>Scan Barcode</button>
        <button onClick={stopScan} className='outline'>Stop Scan</button>
      </div>

        <div id="scanner-container" className='absolute top-0 w-[34rem]' style={showCanvas ? {display: "block"} : {display: "none"} }>
        </div>
      
    </section>
  );
}

export default BarcodeScanner;