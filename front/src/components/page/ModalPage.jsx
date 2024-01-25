import React, { useState } from 'react';

// 이미지 import /
import testImage from './Sample.PNG';

//mui modal test
import Modal from "@mui/material/Modal"

const ModalPage = () => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalContent = (
    <div className="modal-content">
      <img
        src={testImage} // 이미지 import로 변경
        alt="Memory"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        onClick={closeModal} // 이미지 클릭 시 모달 닫기
      />
    </div>
  );

  return (
    <div>
      {/* 작은 이미지를 보여주는 부분 */}
      <img
        src={testImage}
        alt="Thumbnail"
        style={{ width: '80px', height: '80px', objectFit: 'contain' }}
        onClick={openModal} // 작은 이미지 클릭 시 모달 열기
      />
      <Modal>
        <p>modal hi</p>
      </Modal>
      {/* isModalOpen이 true일 때 모달을 렌더링 */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          {/* 실제 모달 창 */}
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {/* 모달 닫기 버튼 */}
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {modalContent}
          </div>
        </div>
      )}
    </div>
  );
};

// ModalPage 컴포넌트를 내보내기
export default ModalPage;
