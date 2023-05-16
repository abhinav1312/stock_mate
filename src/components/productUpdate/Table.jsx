import React from 'react';
import { useDispatch } from 'react-redux';
import { addProductToCurrentInventory } from '../../redux/slice/addToDbSlice';
import QRCode from 'qrcode.react';
import jsPDF from 'jspdf';
import { DownloadIcon, PrintIcon } from '../../assets/SVG';
import { useNavigate } from 'react-router-dom';
import { removeFromCurrInventory } from '../../redux/slice/sellProductSlice';

const Table = ({productList, currInventory, heading}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const downloadQRCode = (name, brand, expiryDate) => {
    const doc = new jsPDF();
    const qrCodeImgData = document
      .getElementById('qrCodeEl')
      .toDataURL('image/png');
    doc.addImage(qrCodeImgData, 'PNG', 10, 10, 50, 50); // add the image to the PDF
    doc.save(name + '_' + brand + '_' + expiryDate + '.pdf');
  };

  const printQRCode = () => {
    const doc = new jsPDF();
    const qrCodeImgData = document
      .getElementById('qrCodeEl')
      .toDataURL('image/png');
    doc.addImage(qrCodeImgData, 'PNG', 10, 10, 50, 50); // add the image to the PDF
    doc.output('dataurlnewwindow');
    doc.autoPrint();
  };

  const addToDb = () => {
    dispatch(addProductToCurrentInventory(navigate));
  };

  const sellFromDb = () => {
    dispatch(removeFromCurrInventory(navigate));
  }
  return (
    <section>
      <h1 className="text-4xl pb-2 font-medium">{heading}</h1>
      <div className="overflow-auto">
        <table className="w-full border-collapse py-4">
          <thead>
            <tr>
              <th className="w-1/12">Serial No.</th>
              <th className="w-3/12">Name</th>
              <th className="w-2/12">Brand</th>
              <th className="w-2/12">Category</th>
              <th className="w-1/12">Quantity</th>
              <th className="w-2/12">Expiry date</th>
              {
                currInventory ? 
                <th className="w-1/12">QR code</th> 
                :
                <th className="w-1/12">Product added at</th> 
                
              }
            </tr>
          </thead>
          <tbody>
            {productList.length > 0 &&
              productList.map((product, id) => {
                const { name, quantity, category, brand, expiryDate } = product;
                
                return (
                    <tr key={id}>
                      <td> {id + 1} </td>
                      <td> {name} </td>
                      <td> {brand} </td>
                      <td> {category} </td>
                      <td> {quantity} </td>
                      <td> {expiryDate} </td>
                      <td>
                        { currInventory ?
                        <>
                          <div className='flex gap-1 font-semibold items-center hover:bg-gray-100 rounded-full px-2 py-1 transition-all text-green-600'>
                          {DownloadIcon}
                          <button className='!p-0'
                            onClick={() =>
                              downloadQRCode(name, brand, expiryDate)
                            }
                          >
                            Download
                          </button>
                          
                        </div>
                        <span className='block text-center'> OR </span>
                        <div className='flex gap-1 justify-center font-semibold items-center hover:bg-gray-100 rounded-full px-2 py-1 transition-all text-green-600'>
                          {PrintIcon}
                          <button className='!p-0'
                            onClick={() => printQRCode(name, brand, expiryDate)}
                          >
                            Print
                          </button>
                        </div>
                        </>
                        :
                        <h1>{product.createdAt}</h1>
                        
                      }
                      </td>
                      <td className='hidden'>
                        <QRCode
                          id="qrCodeEl"
                          size={150}
                          value={JSON.stringify({...product, createdAt: new Date().toLocaleDateString(), expiryDate: product.expiryDate.split('-').join('/')})}
                        />
                      </td>
                    </tr>
                  
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        {
          currInventory ?
            <button
              onClick={addToDb}
              className="fill mt-4"
            >
              Add to database
            </button>
          :
          <button
              onClick={sellFromDb}
              className="fill mt-4"
            >
              Sell the products
            </button>
        }
      </div>
    </section>
  );
};

export default Table;
