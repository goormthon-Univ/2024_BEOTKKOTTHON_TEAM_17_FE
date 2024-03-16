// import React, { useEffect, useState } from "react";
// import QrReader from "react-qr-scanner";
// import styled from "styled-components";

// function QrScan() {
//   const [facingMode, setFacingMode] = useState("rear");
//   const [result, setResult] = useState("No result");

//   let handleScan = (data) => {
//     if (data) {
//       setResult(data);
//     }
//   };

//   const QrStyle = {
//     width: "100%",
//     height: "100%",
//     // margin: "-50px",
//   };

//   const goBack = () => {
//     window.history.back(); // 뒤로 가기
//   };

//   const onError = (err) => {
//     console.log(err);
//   };

//   const onCameraButtonClick = () => {
//     if (facingMode === "rear") {
//       setFacingMode("front");
//     } else if (facingMode === "front") {
//       setFacingMode("rear");
//     }
//   };

//   return (
//     <div className="page">
//       <div className="center">
//         <div className="page-space">
//           <QRHeader>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="17"
//               height="17"
//               viewBox="0 0 17 17"
//               fill="none"
//               style={{ marginLeft: "16px", cursor: "pointer" }}
//               onClick={goBack}
//             >
//               <path
//                 d="M1 1L8.5 8.5L16 16M16 1L1 16"
//                 stroke="white"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </QRHeader>
//           <QRTotalPage>
//             <QrScanPage>
//               <QrReader
//                 delay={300}
//                 onScan={handleScan}
//                 onError={onError}
//                 facingMode={facingMode}
//                 style={QrStyle}
//               />
//             </QrScanPage>
//             <QRResult>
//               <p style={{ marginBottom: "5px" }}>{result.text}</p>
//               {result === "No result" ? <p></p> : <p>명함 등록이 완료되었습니다.</p>}
//             </QRResult>
//             <QRFooter>
//               <CameraButton onClick={onCameraButtonClick}></CameraButton>
//             </QRFooter>
//           </QRTotalPage>
//         </div>
//       </div>
//     </div>
//   );
// }

// const QRTotalPage = styled.div`
//   height: calc(100vh - 141px);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// const QrScanPage = styled.div`
//   height: 300px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   margin-top: -80px;
// `;

// const CameraButton = styled.button`
//   position: absolute;
//   bottom: 22px;

//   width: 54px;
//   height: 54px;

//   border: 5px solid #fff;
//   border-radius: 50%;

//   display: flex;
//   justify-content: center;
//   align-items: center;

//   cursor: pointer;

//   background-color: #000;
//   color: rgb(0,0,0,0);
//   }
// `;

// const QRHeader = styled.div`
//   width: 100vw;
//   height: 44px;
//   background-color: #000;

//   display: flex;
//   align-items: center;

//   position: relative;
//   z-index: 10;

//   @media (hover: hover) and (pointer: fine) {
//     width: 375px;
//   }
// `;

// const QRResult = styled.div`
//   font-family: Pretendard;
//   font-size: 14px;
//   font-style: normal;
//   font-weight: 500;
//   line-height: normal;

//   text-align: center;
//   position: absolute;
//   bottom: 120px;
// `;

// const QRFooter = styled.div`
//   width: 100vw;
//   height: 97px;
//   background-color: #000;

//   position: absolute;
//   bottom: 0;

//   display: flex;
//   justify-content: center;
//   align-items: center;

//   @media (hover: hover) and (pointer: fine) {
//     width: 375px;
//   }
// `;

// const QrResultPage = styled.div`
//   width: 100%;
//   height: 100%;

//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

// const CloseIcon = styled(CameraButton)``;

// const QrResultBox = styled.div`
//   width: 90%;

//   margin: 10px 0;

//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// // export default QrScan;

import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType } from "@zxing/library";

const QrScan = () => {
  const videoRef = useRef(null);
  const [text, setText] = useState("");
  const hints = new Map();
  const formats = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODABAR,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.CODE_39,
    BarcodeFormat.CODE_93,
  ];
  hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
  const codeReader = new BrowserMultiFormatReader(hints, 500);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: "environment" },
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          scan();
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      codeReader.reset();
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const scan = () => {
    codeReader.decodeFromVideoElement(videoRef.current, (result, err) => {
      if (result) {
        console.log(result);
        setText(result.text);
      } else if (err && err !== "NotFoundException") {
        console.error(err);
      }
    });
  };

  return (
    <div>
      <video
        ref={videoRef}
        style={{ width: "100%" }}
      />
      <div>결과: {text}</div>
    </div>
  );
};

export default QrScan;
