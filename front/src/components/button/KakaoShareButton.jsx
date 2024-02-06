// import React from 'react';

// export default function KakaoShareButton() {
//     sendkakao(() => {
//         window.Kakao.init('발급받은 JavaScript 키입력');
//         window.Kakao.Link.sendDefault({
//             objectType: 'feed',
//             content: {
//                 title: '공유할 될 제목',
//                 description: '공유될 내용',
//                 imageUrl: 'http://localhost:3000/test.png',
//                 link: {
//                     mobileWebUrl: 'http://localhost:3000',
//                     webUrl: 'http://localhost:3000',
//                 },
//             },
//             buttons: [
//                 {
//                     title: '웹으로 보기',
//                     link: {
//                         mobileWebUrl: 'http://localhost:3000',
//                         webUrl: 'http://localhost:3000',
//                     },
//                 },
//             ],
//         });
//     })

//     return (
//         <div>
//             <a className="kakao" onClick={this.sendkakao}>
//                 카카오톡
//             </a>
//         </div>
//     );
// }