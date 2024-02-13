import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button, Grid, Pagination} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const ImageDownload = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImages, setSelectedImages] = useState({});
  const imagesPerPage = 4; 
  const totalImages = Object.keys(images).length;
  const totalPages = Math.ceil(totalImages / imagesPerPage);

  const handleClickOpen = () => {
    setOpen(true);
    setCurrentPage(1); 
    setSelectedImages({});
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectImage = (key) => {
    setSelectedImages(prevSelectedImages => ({
      ...prevSelectedImages,
      [key]: !prevSelectedImages[key]
    }));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const downloadSelectedImages = () => {
    Object.keys(selectedImages).forEach((key) => {
      if (selectedImages[key]) {
        const imageUrl = images[key];
        const link = document.createElement('a');
        link.href = imageUrl;
        const filename = imageUrl.split('/').pop();
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
    handleClose();
  };

  
  const currentImages = Object.keys(images)
    .slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage)
    .reduce((result, key) => {
      result[key] = images[key];
      return result;
    }, {});

    return (
      <div>
        <div onClick={handleClickOpen} fontSize="small" style={{ alignItems: 'center' , display:'flex',}}>
          <DownloadIcon /> <p>앨범 다운로드</p>
        </div>
        
        <Dialog open={open} onClose={handleClose} maxWidth="md">
          <DialogContent>
            <Grid container spacing={2}>
              {Object.keys(currentImages).map((key) => (
                <Grid item xs={6} key={key} onClick={() => handleSelectImage(key)}>
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                    border: selectedImages[key] ? '2px solid blue' : 'none', 
                    cursor: 'pointer', 
                  }}>
                    <img src={currentImages[key]} alt={`Memory ${key}`} style={{ width: '80%', height: 'auto', opacity: selectedImages[key] ? 0.5 : 1 }} />
                    {selectedImages[key] && (
                      <div style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '24px',
                      }}>
                        ✓
                      </div>
                    )}
                  </div>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions style={{justifyContent: 'space-between'}}>
            <Button Button onClick={handleClose}>닫기</Button>
            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
            <Button onClick={downloadSelectedImages}>다운로드</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  


export default ImageDownload