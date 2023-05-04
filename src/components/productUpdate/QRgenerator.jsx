import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const QRgenerator = () => {
  const [value, setValue] = useState('');
  const [qrVisible, setQrVisible] = useState(false);
  const generateQRCode = () => {
    if (!value) {
      return;
    }
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(value)}.p`;
    setValue(qrCodeUrl);
    // setQrVisible(true);
  };

const qrCodeRef = useRef();

const handleDownload = () => {
    console.log(qrCodeRef.current) 
  html2canvas(qrCodeRef.current).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    console.log("Img data: ", imgData);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('qrcode.pdf');
  });
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
          <img src={value} alt="qr-code" />
          <a href={value} download>
          {/* <a href={value}> */}
            Download
          </a>
          <button href={value} download="qrcode.png" className='bg-black text-white py-6 px-4 m-16'>Download button</button>
        </>
      )}

    </section>
    // <>
    //     <div>
    //   <QRCode value="Hello world" size={256} ref={qrCodeRef} />
    //   <button onClick={handleDownload}>Download QR Code as PDF</button>
    // </div>

    // </>
  );
};

export default QRgenerator;
