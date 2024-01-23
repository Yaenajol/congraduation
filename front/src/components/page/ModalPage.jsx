import React, { useState } from 'react';

// 이미지 import /
import testImage from './Sample.PNG';

// ModalPage 컴포넌트 정의
const ModalPage = () => {
  // isModalOpen 상태와 setModalOpen 함수 생성 및 초기값은 false로 설정
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기 이벤트 핸들러
  const openModal = () => {
    // isModalOpen 상태를 true로 업데이트하여 모달을 엽니다.
    setIsModalOpen(true);
  };

  // 모달 닫기 이벤트 핸들러
  const closeModal = () => {
    // isModalOpen 상태를 false로 업데이트하여 모달을 닫습니다.
    setIsModalOpen(false);
  };

  // 모달 내용
  const modalContent = (
    <div className="modal-content">
      {/* 이미지 표시 */}
      <img
        src={testImage} // 이미지 import로 변경
        alt="Memory"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        onClick={closeModal} // 이미지 클릭 시 모달 닫기
      />
    </div>
  );

  // JSX 반환
  return (
    <div>
      {/* 작은 이미지를 보여주는 부분 */}
      <img
        src={testImage}
        alt="Thumbnail"
        style={{ width: '80px', height: '80px', objectFit: 'contain' }}
        onClick={openModal} // 작은 이미지 클릭 시 모달 열기
      />

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
