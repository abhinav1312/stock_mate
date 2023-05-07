import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCurrentInventory } from '../../redux/slice/addToDbSlice';
import QRCode from 'qrcode.react';
import jsPDF from 'jspdf';
import { DownloadIcon, PrintIcon } from '../../assets/SVG';

const Table = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => {
    console.log("Dhgasd", state)
    return state.addToDb;
  });

  const downloadQRCode = (name, brand, expiryDate) => {
    const doc = new jsPDF();
    const qrCodeImgData = document
      .getElementById('qrCodeEl')
      .toDataURL('image/png');
    doc.addImage(qrCodeImgData, 'PNG', 10, 10, 50, 50); // add the image to the PDF
    doc.save(name + '_' + brand + '_' + expiryDate + '.pdf');
  };

  const printQRCode = (name, brand, expiryDate) => {
    const doc = new jsPDF();
    const qrCodeImgData = document
      .getElementById('qrCodeEl')
      .toDataURL('image/png');
    doc.addImage(qrCodeImgData, 'PNG', 10, 10, 50, 50); // add the image to the PDF
    doc.output('dataurlnewwindow');
    doc.autoPrint();
  };

  const addToDb = () => {
    dispatch(addProductToCurrentInventory());
  };
  return (
    <section>
      <h1 className="text-3xl mb-2">Recently Added Products</h1>
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
              <th className="w-1/12">QR code</th>
            </tr>
          </thead>
          <tbody>
            {productList.length > 0 &&
              productList.map((product, id) => {
                const { name, quantity, category, brand, expiryDate } = product;
                return (
                  <>
                    <tr key={id}>
                      <td> {id + 1} </td>
                      <td> {name} </td>
                      <td> {brand} </td>
                      <td> {category} </td>
                      <td> {quantity} </td>
                      <td> {expiryDate} </td>
                      <td>
                        <div className='flex gap-1 font-semibold items-center hover:bg-gray-100 rounded-full px-2 py-1 transition-all text-green-600'>
                          {DownloadIcon}
                          <button
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
                          <button
                            onClick={() => printQRCode(name, brand, expiryDate)}
                          >
                            Print
                          </button>
                        </div>
                        {/* <button onClick={window.print()}>Downloaddd</button> */}
                      </td>
                    </tr>
                    <QRCode
                      id="qrCodeEl"
                      size={150}
                      value={JSON.stringify(product)}
                      className="hidden"
                    />
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <button
          onClick={addToDb}
          className="px-6 py-4 bg-green-600 hover:bg-green-700 transition-all rounded-md text-white font-medium mt-4"
        >
          Add to database
        </button>
      </div>
    </section>
  );
};

export default Table;
