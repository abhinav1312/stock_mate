import React, { useState } from 'react';
import QRCode from 'react-qr-code';
const QRgenerator = () => {
  const [value, setValue] = useState('');
  const [qrVisible, setQrVisible] = useState(false);
  const generateQRCode = () => {
    if (!value) {
      return;
    }
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(value)}`;
    setValue(qrCodeUrl);
    setQrVisible(true);
  };
  return (
    <section>
      <h1>Qr Code Generator</h1>

      <textarea
        value={value}
        placeholder="Enter the details here..."
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={generateQRCode}>Generate QR Code</button>

      {qrVisible && (
        <div className="qr-code-container">
          <QRCode value={value} size={200} />
        </div>
      )}
      {value && (
        <>
          {/* <img src={value} /> */}
          {/* <a href={value} download="qrcode.png"> */}
            {/* Download */}
          {/* </a> */}
        </>
      )}
    </section>
  );
};

export default QRgenerator;
