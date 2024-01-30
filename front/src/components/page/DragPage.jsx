import React, { useState } from "react";
import Main from "../assets/sample.jpg";
import { Resizable } from "re-resizable";
import Draggable from "react-draggable";
import html2canvas from "html2canvas";

const DragPage = ( { selectedImage, onUpdateImage }) => {
  const cropBoxSize = 150;
  const modalBox = 500;

  const showCropImage = () => {
    html2canvas(document.querySelector("#cropBox")).then((canvas) => {
      let canvas2 = document.getElementById("croppedBox");
      let context = canvas2.getContext("2d");
      let newImage = new Image();
      newImage.src = canvas.toDataURL();
      newImage.onload = () => {
        context.drawImage(
          newImage,
          canvas.width / 2 - cropBoxSize / 2,
          canvas.height / 2 - cropBoxSize / 2,
          cropBoxSize,
          cropBoxSize,
          0,
          0,
          cropBoxSize,
          cropBoxSize
        );
        onUpdateImage(canvas2.toDataURL())
      };
    });
  };
  return (
    <div>
      <h2>draggable</h2>
      <div
        id="cropBox"
        style={{
          border: "1px solid green",
          width: `${modalBox}px`,
          height: `${modalBox}px`,
          overflow: "auto",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="cropBox"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            margin: `-${cropBoxSize / 2}px 0 0 -${cropBoxSize / 2}px`,
            border: "3px solid green",
            width: `${cropBoxSize}px`,
            height: `${cropBoxSize}px`,
            zIndex: "3",
            pointerEvents: "none",
          }}
        ></div>
        <Draggable scale={2}>
          <Resizable
            defaultSize={{
              width: 100,
              height: 100,
            }}
            style={{
              backgroundImage: `url(${selectedImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
            lockAspectRatio={true}
          ></Resizable>
        </Draggable>
      </div>
      
      <button onClick={showCropImage}>완료</button>
      <canvas id="croppedBox"></canvas>
    </div>
  );
};

export default DragPage;
