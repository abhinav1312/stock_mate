import React, { useContext } from 'react'; //
import Quagga from 'quagga';
import AddProductContext from '../../context/addProduct/ProductContext';
import AlertContext from '../../context/alert/AlertContext';

let flag = false;

const BarcodeScanner = ({setProductInfoModal, setUserModal}) => {
  const {showAlert} = useContext(AlertContext);
  const {findProductInProductInfo, productInfo, setProductInfo} = useContext(AddProductContext);  

  async function startScanner() {
    const codeFound = await new Promise((resolve, reject) => {
      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: document.querySelector('#barcode-scanner'),
          },
          decoder: {
            readers: ['ean_reader'],
          },
        },
        (err) => {
          if (err) {
            reject(err);
            return;
          }
          Quagga.start();
        }
      );

      Quagga.onDetected(async (result) => {
        const productAlreadyPresent = await findProductInProductInfo(result.codeResult.code);
        console.log(productAlreadyPresent)
        if (productAlreadyPresent.present) {
          flag = true;
          Quagga.offDetected();
          Quagga.stop();
          resolve(result.codeResult.code);
        }
        Quagga.stop();
        if(flag === false) {
          setProductInfo((prev) => {
            return { ...prev, barcode: result.codeResult.code };
          });
          setProductInfoModal(true);
        }
        else{
          setProductInfo((prev) => {
            return {
              ...prev,
              barcode: codeFound,
              name: productAlreadyPresent.data.name,
              brand: productAlreadyPresent.data.brand,
              category: productAlreadyPresent.data.category,
            };
          });
        }
      });
    });
    showAlert('success', 'Product found');
    setProductInfoModal(false);
    setUserModal(true);
  }

  // console.log(productInfo)
  return (
    <>
      <div className="w-full flex justify-center gap-24">
        <button
          className="py-12 px-24 bg-grey text-2xl shadow-lg font-semibold hover:bg-darkGrey"
          onClick={startScanner}
        >
          Scan barcode
        </button>
        <button
          className="py-12 px-24 bg-grey text-2xl shadow-lg font-semibold hover:bg-darkGrey"
          onClick={() => Quagga.stop()}
        >
          Stop scan
        </button>
      </div>
      <div id="barcode-scanner"></div>
    </> 
  );
};

export default BarcodeScanner;
