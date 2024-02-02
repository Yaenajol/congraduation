import React, { useState, useRef } from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {ReactCrop, centerCrop, makeAspectCrop, convertToPixelCrop} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { canvasPreview } from './canvasPreview';
import { useDebounceEffect } from './useDebounceEffect';
import "./style.css"; 
import InputFileUpload from '../button/UploadButton';
import MemoryAdd from '../button/MemoryAdd'
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { albumPageMainImgAtom } from "../store/atom";
import axios from 'axios';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 50,
        height: 50,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function App({selectedGridItem, setImages, setOpenModal}) {
  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const hiddenAnchorRef = useRef(null);
  const blobUrlRef = useRef('');
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(1/1);
  const params = useParams()
  const [albumPageMainImg, setAlbumPageMainImg] = useRecoilState(albumPageMainImgAtom)

  // ... (rest of the code remains same as in your TS file)
  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  async function onDownloadCropClick(page) {

    const updateImage = (imageData) => {
      setImages((prevImages) => ({
        ...prevImages,
        [selectedGridItem]: imageData, // 선택된 그리드 아이템에 이미지 데이터 업데이트
      }));
      
    };
    
    const image = imgRef.current
    
    const previewCanvas = previewCanvasRef.current
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist')
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    )
    const ctx = offscreen.getContext('2d')
    if (!ctx) {
      throw new Error('No 2d context')
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    )
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: 'image/png',
    })

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current)
    }
    blobUrlRef.current = URL.createObjectURL(blob)
    
    updateImage(blobUrlRef.current)
    console.log(blobUrlRef.current)
    // if (hiddenAnchorRef.current) {
    //   hiddenAnchorRef.current.href = blobUrlRef.current
    //   hiddenAnchorRef.current.click()
    // }
    if (page !== 'edit') {
      setAlbumPageMainImg(blobUrlRef.current)
      const formdata = new FormData()
      formdata.append('image', blob, 'image.png')
      try {
        const response = await axios.put(
          `https://congraduation.me/backapi/albums/${params.PK}/coverImage`, 
          formdata,  
          {
            headers : {
              accessToken : sessionStorage.getItem('accessToken')
              // 'Content-Type': 'multipart/form-data',
            },
          }
        );
        // 요청 성공시의 처리, 예를 들어 상태 업데이트 또는 사용자에게 알림
        console.log('Image updated successfully:', response.data);
      } catch (error) {
        // 에러 처리, 예를 들어 에러 메시지 출력
        console.error('Failed to update image:', error);
      }
      // axios.put(
      //   `https://congraduation.me/backapi/albums/${params.PK}/coverIamge`, 
      //   formdata,  
      //   {
      //     headers : {
      //       accessToken : localStorage.getItem('accessToken')
      //     }
      // })
    }
    setOpenModal(false)
  }
  
  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )
      }
    },
    100,
    [completedCrop, scale, rotate],
  )

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined)
    } else {
      setAspect(1/1)

      if (imgRef.current) {
        const { width, height } = imgRef.current
        const newCrop = centerAspectCrop(width, height, 16 / 9)
        setCrop(newCrop)
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, width, height))
      }
    }
  }

  return (
    <div className="App">
      <div className="upload">
        <InputFileUpload  onChange={onSelectFile}/>
        {/* <input type="file"  accept="image/*" onChange={onSelectFile} /> */}
        
        {/* 사진 스케일 */}
        {/* <div>
          <label htmlFor="scale-input">Scale: </label>
          <input
            id="scale-input"
            type="number"
            step="0.1"
            value={scale}
            disabled={!imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div> */}

        {/* 사진 회전  */}
        {/* <div>
          <label htmlFor="rotate-input">Rotate: </label>
          <input
            id="rotate-input"
            type="number"
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }
          />
        </div> */}

        {/* 크롭박스 비율이 바뀜 */}
        {/* <div>
          <button onClick={handleToggleAspectClick}>
            Toggle aspect {aspect ? 'off' : 'on'}
          </button>
        </div> */}

      </div>
      <div className='upload'>
      {!!imgSrc && (
        <ReactCrop
          
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
          minWidth={100}
          minHeight={100}
          locked={false}
          // circularCrop
        >
          <img
          
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      </div>
      
      {!!completedCrop && (
        <>
          <div className="upload">
            <canvas
              ref={previewCanvasRef}
              style={{
                border: '1px solid black',
                objectFit: 'contain',
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </div>
          <div className="upload">
            
            <MemoryAdd onClick={onDownloadCropClick} page={window.location.href.split('/')[window.location.href.split('/').length -1]} ></MemoryAdd>
            <div style={{ fontSize: 12, color: '#666' }}>
              
            </div>
            <a
              href="#hidden"
              ref={hiddenAnchorRef}
              download
              style={{
                position: 'absolute',
                top: '-200vh',
                visibility: 'hidden',
              }}
            >
              Hidden download
            </a>
          </div>
        </>
      )}
    </div>
  )
}

