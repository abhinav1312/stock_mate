// import React, { useContext } from 'react'; //
// import Quagga from 'quagga';
// import AddProductContext from '../../context/addProduct/ProductContext';
// import AlertContext from '../../context/alert/AlertContext';


// const BarcodeScanner = ({setProductInfoModal, setUserModal}) => {
//   let flag = false;
//   const {showAlert} = useContext(AlertContext);
//   const {findProductInProductInfo, productInfo, setProductInfo} = useContext(AddProductContext);  

//   async function startScanner() {
//     const codeFound = await new Promise((resolve, reject) => {
//       Quagga.init(
//         {
//           inputStream: {
//             name: 'Live',
//             type: 'LiveStream',
//             target: document.querySelector('#barcode-scanner'),
//           },
//           decoder: {
//             readers: ['ean_reader'],
//           },
//         },
//         (err) => {
//           if (err) {
//             reject(err);
//             return;
//           }
//           Quagga.start();
//         }
//       );

//       Quagga.onDetected(async (result) => {
//         console.log("Detecting");
//           const productAlreadyPresent = await findProductInProductInfo(result.codeResult.code);
//           console.log(productAlreadyPresent)
//           if (productAlreadyPresent.present) {
//             flag = true;
//             Quagga.offDetected();
//             Quagga.stop();
//             resolve(result.codeResult.code);
//           }
//           Quagga.stop();
//           console.log("Stopped");
//           if(flag === false) {
//             setProductInfo((prev) => {
//               return { ...prev, barcode: result.codeResult.code };
//             });
//             setProductInfoModal(true);
//             // break;
//           }
//           else{
//             setProductInfo((prev) => {
//               return {
//                 ...prev,
//                 barcode: codeFound,
//                 name: productAlreadyPresent.data.name,
//                 brand: productAlreadyPresent.data.brand,
//                 category: productAlreadyPresent.data.category,
//               };
//             });
//           }
//         // }
//       });
//     });
//     showAlert('success', 'Product found');
//     setProductInfoModal(false);
//     setUserModal(true);
//   }

//   console.log(productInfo)
//   return (
//     <>
//       <div className="w-full flex justify-center gap-24">
//         <button
//           className="py-12 px-24 bg-grey text-2xl shadow-lg font-semibold hover:bg-darkGrey"
//           onClick={startScanner}
//         >
//           Scan barcode
//         </button>
//         <button
//           className="py-12 px-24 bg-grey text-2xl shadow-lg font-semibold hover:bg-darkGrey"
//           onClick={() => Quagga.stop()}
//         >
//           Stop scan
//         </button>
//       </div>
//       <div id="barcode-scanner"></div>
//     </> 
//   );
// };

// export default BarcodeScanner;


import React, { useState, useContext } from 'react';
import Quagga from 'quagga';
import AddProductContext from '../../context/addProduct/ProductContext';

const BarcodeScanner = ({getProductInfo}) => {
  const [canvas, setCanvas] = useState(false); // show or hide the div when barcode scanner opens or closes
  const [code, setCode] = useState(''); // set barcode on scanning
    const {findProductInProductInfo, productInfo, setProductInfo} = useContext(AddProductContext);  

  const stopScan = () => {
    Quagga.stop();
    setCanvas(false);
   }

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