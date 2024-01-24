import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import ReactModal from 'react-modal';

// 이미지 import /
import testImage from './Sample.PNG';

const ModalPage = () => {
  // 모달이 열려있는지 여부를 state로 관리
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // 모달 열기 이벤트 핸들러
  const openModal = () => {
    setModalIsOpen(true);
  };

  // 모달 닫기 이벤트 핸들러
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      {/* 작은 이미지를 클릭하면 모달을 열 수 있도록 하는 부분 */}
      <img
        src={testImage}
        alt="smallimage"
        onClick={openModal}
        style={{
          width: '200px',
          height: '300px',
          objectFit: 'cover',
          // 모달이 열린 경우에만 블러 처리
          filter: modalIsOpen ? 'blur(5px)' : 'none',
        }}
      />

      {/* 모달이 열려 있는 경우에만 모달 컴포넌트를 렌더링하는 부분 */}
      {modalIsOpen && (
        <ReactModal
          // 모달이 열려 있는지 여부를 확인
          isOpen={modalIsOpen}
          // 모달 외부를 클릭하면 모달이 닫히도록 설정
          onRequestClose={closeModal}
          // 모달에 대한 설명 (접근성을 위해 필요한 속성)
          contentLabel="Modal Content"
          // 오버레이를 클릭하면 모달이 닫히도록 설정
          shouldCloseOnOverlayClick={true}
          // 모달의 스타일을 설정하는 부분
          style={{
            // 오버레이 스타일 설정
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            // 모달 내용 스타일 설정
            content: {
              width: '90%',
              height: '90%',
              margin: 'auto',
              // 배경 전체를 흰색으로 블러 처리
              background: 'rgba(255,255,255,0.7)',
              // 모달 테두리를 둥글게 만듦
              borderRadius: '50px',
            },
          }}
        >
          {/* 모달 내용을 렌더링하는 부분 */}
          <div>
            {/* 우측 상단에 위치한 'x' 표시로 모달을 닫을 수 있도록 하는 부분 */}
            <span
              style={{
                position: 'absolute',
                top: '10px',
                right: '30px',
                cursor: 'pointer',
                // 'x' 표시의 크기 조절
                fontSize: '77px',
                // 텍스트 색상을 검은색으로 설정
                color: 'yellow',
              }}
              onClick={closeModal}
            >
              &times;
            </span>
            {/* 실제 이미지를 렌더링하고, 이미지를 클릭하면 모달이 닫히도록 하는 부분 */}
            <img
              src={testImage}
              alt="Memory"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
              onClick={closeModal}
            />
          </div>
        </ReactModal>
      )}
    </div>
  );
};

// ModalPage 컴포넌트를 내보내기
export default ModalPage;