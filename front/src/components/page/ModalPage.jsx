// 디데이 당일 / 해당 썸네일 클릭 시 / 모달로 띄워줌("/albums/{albums.Pk}/memories")

// function ModalPage() {
//   return (
//     <div>
//       <h1>Modal Page</h1>
//       <h2>Test</h2>
//     </div>
//   )
// }

// export default ModalPage

import React, { useState } from 'react';

// ModalPage 컴포넌트 정의
const ModalPage = () => {
  // isModalOpen 상태와 setModalOpen 함수 생성 및 초기값은 false로 설정
  const [isModalOpen, setModalOpen] = useState(false);

  // 모달 열기 이벤트 핸들러
  const openModal = () => {
    // isModalOpen 상태를 true로 업데이트하여 모달을 엽니다.
    setModalOpen(true);
  };

  // 모달 닫기 이벤트 핸들러
  const closeModal = () => {
    // isModalOpen 상태를 false로 업데이트하여 모달을 닫습니다.
    setModalOpen(false);
  };

  // JSX 반환
  return (
    <div>
      {/* "Open Modal" 버튼 클릭 시 openModal 함수 호출 */}
      <button onClick={openModal}>Open Modal</button>

      {/* isModalOpen이 true일 때 모달을 렌더링 */}
      {isModalOpen && (
        <div className="modal-overlay">
          {/* 실제 모달 창 */}
          <div className="modal">
            {/* 모달 닫기 버튼 */}
            <span className="close" onClick={closeModal}>&times;</span>
            {/* 모달 내용 */}
            <div className="modal-content">
              <p>Modal Content</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ModalPage 컴포넌트를 내보내기
export default ModalPage;