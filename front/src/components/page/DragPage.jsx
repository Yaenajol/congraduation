import React, { useState, useRef } from 'react';
import {ReactCrop, centerCrop, makeAspectCrop, convertToPixelCrop} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import "./style.css"; 
import InputFileUpload from '../button/UploadButton';
import MemoryAdd from '../button/MemoryAdd'
import { useRecoilState } from "recoil";
import { albumPageMainImgAtom } from "../store/atom";
import axios from 'axios';
import Spinner from '../spinner/Spinner';

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

export default function App({selectedGridItem, setImages, setOpenModal, albumPk}) {
  const [imgSrc, setImgSrc] = useState('');
  const imgRef = useRef(null);
  const blobUrlRef = useRef('');
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [aspect, setAspect] = useState(1/1);
  const [albumPageMainImg, setAlbumPageMainImg] = useRecoilState(albumPageMainImgAtom)
  const [isLoading, setIsLoading] = useState(false);


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
    setIsLoading(true)
    try {
      const updateImage = (imageData) => {
        setImages((prevImages) => ({
          ...prevImages,
          [selectedGridItem]: imageData, // 선택된 그리드 아이템에 이미지 데이터 업데이트
        }));
      };
      
      const image = imgRef.current

      
      
      if (!image || !completedCrop) {
        throw new Error('Crop canvas does not exist')
      }
  
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
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        offscreen.width,
        offscreen.height,
      )
      // You might want { type: "image/jpeg", quality: <0 to 1> } to
      // reduce image size
      const blob = await offscreen.convertToBlob({
        type: 'image/jpeg',
        quality: 0.85
      })
  
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
      }
      blobUrlRef.current = URL.createObjectURL(blob)
      
      updateImage(blobUrlRef.current)
  
      if (page !== 'edit') {
        setAlbumPageMainImg(blobUrlRef.current)
        const formdata = new FormData()
        formdata.append('image', blob, 'image.jpeg')
        try {
          const response = await axios.put(
            `https://congraduation.me/backapi/albums/${albumPk}/coverImage`, 
            formdata,  
            {
              headers : {
                accessToken : sessionStorage.getItem('accessToken')
              },
            }
          );
          setImages(response.data)
        } catch (error) {
          console.error('Failed to update image:', error);
        }
      }
      setOpenModal(false)
    } catch(error) {
      console.log('사진 리사이징 에러')
    } finally {
      setIsLoading(false)
    }
  }
  


  return (
    <div className="App">
      
      <div className="upload" >
        
        <InputFileUpload onChange={onSelectFile} />
      
        <MemoryAdd isClickable={imgSrc !== '' && !!crop  && !!crop.width && !!crop.height} onClick={onDownloadCropClick} page={window.location.href.split('/')[window.location.href.split('/').length -1]} ></MemoryAdd>
      </div>
        
      <div>
      {!!imgSrc && (
        <div className='image-box'>
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
        {isLoading && (
          <div>
            <Spinner/>
          </div>
        )}
          <img
            className='img-size'
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{ objectFit: 'contain', maxHeight: '50vh' }}
            onLoad={onImageLoad}
          />
          </ReactCrop>
        </div>
      )}
      </div>
    </div>
  )
}

