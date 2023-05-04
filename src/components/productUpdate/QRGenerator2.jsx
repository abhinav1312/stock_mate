import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import jsPDF from 'jspdf';

function QRgenerator2() {

  const [inputText, setInputText] = useState('');
  const [qrCodeText, setQRCodeText] = useState('');

  // generate QR code
  const generateQRCode = () => {
    setQRCodeText(inputText);
  }

  // download QR code
  const downloadQRCode = () => {
    const doc = new jsPDF();
    const qrCodeImgData = document.getElementById('qrCodeEl').toDataURL("image/png");
    doc.addImage(qrCodeImgData, 'PNG', 10, 10, 50, 50); // add the image to the PDF
    doc.save('qrCode.pdf');
  }

  return (
    <div>
      <div className="qr-input">
        <input
          type="text"
          placeholder="Enter input"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
        <input
          type="button"
          value="Generate"
          onClick={generateQRCode}
        />
      </div>
      <QRCode
        id="qrCodeEl"
        size={150}
        value={qrCodeText}
        className='hidden'
      />
      <br />
      <input
        type="button"
        className="download-btn"
        value="Download"
        onClick={downloadQRCode}
      />
    </div>
  );
}

export default QRgenerator2;
