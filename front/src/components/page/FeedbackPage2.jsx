import { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import '../Feedback/Feedback.css';
import axios from 'axios';
import StyledMemoryPage1 from "../styledComponents/StyledMemoryPage1";
import AlbumProfileImage from './AlbumProfileImage';
import { Button } from '@mui/material';
import userAltImage from "../images/userAltImage.png";


function FeedbackPage2() {
  // 상태 변수 목록
  const [chatList, setChatList] = useState([]);   // 채팅 기록
  const [chat, setChat] = useState('');           // 입력 채팅
  const [ userInfo, setUserInfo ] = useState([]); // 유저 정보
  
  const params = useParams();
  
  const accessToken = sessionStorage.getItem('accessToken');  // 로그인 사용자 토큰
  
  let [client, changeClient] = useState(null);
  
  const chat_room_id = params.PK;     // 로그인한 유저의 albumPk
  const userId = userInfo.albumPk;    // 현재 로그인된 사용자의 albumPk

  const msgBox = chatList.map((item, idx) => {
    if(chat_room_id !== userId) {
      
      console.log("Admin : " + item);

      return (
        <div key={idx}>
          <div>
            <img src={userAltImage} alt="" />
          </div>
          <span>{item}</span>
        </div>
      )
    } else {
      
      console.log("loginUser : " + item);
      
      return (
        <div key={idx}>
          <div>
            <img src={userInfo.imageUrl} alt="" />
          </div>
          <span>{item}</span>
        </div>
      )
    }
  })

  /**
   * 소켓 연결
   */
  const connect = () => {
    try {
      const clientdata = new StompJs.Client({
          brokerURL: 'ws://codakcodak.site:8001/backend/ws/chat',
          debug: function(str) {
              console.log(str);
          },
      });

      // 구독
      clientdata.onConnect = function() {
          console.log('success');
          client.current.subscribe('/sub/feedback/' + userInfo.albumPk, callback);
      };

      clientdata.activate();  // 클라이언트 활성화
      changeClient(clientdata);   // 클라이언트 갱신
    } catch(err) {
      console.log(err);
    }
  };

  /**
   * 연결 끊기
   */
  const disconnect = () => {
    if(client === null) {
      return;
    }
    client.current.deactivate();
  };

  const callback = function (message) {
    console.log(message);
    if (message.body) {
      const msg = JSON.parse(message.body);
      console.log("Received message:", msg); // 받은 메시지 로그로 출력
      setChatList((chats) => [...chats, msg]);
      console.log("Updated chatList:", chatList); // 업데이트된 chatList 로그로 출력
    }
  };

  /**
   * 채팅을 서버에 보내기
   * @returns 
   */
  const sendChat = () => {
    if(chat === "") {
      return;
    }
    
    client.publish({
      destination: '/pub/feedback',   // + chatroomid?
      body: JSON.stringify({
        messageType : "TALK",
        accessToken : accessToken,
        chatRoomId : "adkd7n82qw-dkazbv",
        senderPk : "adkd7n82qw-dkazbv",
        albumPk : userInfo.albumPk,
        content : chat,
      }),
    });
    
    setChat('');
  };

  useEffect(() => {
    connect();

    // 현재 로그인한 유저의 정보를 조회
    if(accessToken) {
      axios
        .get(`https://congraduation.me/backapi/members/myAlbum`, {
            headers: { accessToken: sessionStorage.accessToken },
        })
        .then((response) => {
            console.log("Album Data:", response.data);
            setUserInfo(response.data);
        });
    }

    return () => disconnect();
  },[]);

  /**
   * 채팅창 글 쓰는 기능
   * @param {*} event 
   */
  const onChangeChat = (event) => {
    setChat(event.target.value);
  }

  /**
   * 제출 기능
   * @param {*} event 
   */
  const handleSubmit = (event) => {
    console.log("handleSubmit chatList: " + chatList);
    event.preventDefault();
  }


  return (
    <StyledMemoryPage1>
      <div className='chat-container'>
        {/* 헤더 창 */}
        <div className='chat-container-header'>
          <div className='chat-header-back' />
          <ArrowBackIcon />
          <div style={{ width: "10%" }}>
            <AlbumProfileImage 
              imageUrl={userInfo.imageUrl}
              setImageUrl={setUserInfo.ImageUrl}
              albumPk={params.PK}
              isClickable={false}
            />
          </div>  
          <div className='chat-header-content'>
            <div className='chat-header-nickname'>
              {userInfo.nickname}
            </div>
          </div>
        </div>

        {/* 중앙 대화 창 */}
        <div> {msgBox}</div>

        {/* 입력 창 */}
        <div className='chat-message-form-container'>
          <div className='chat-message-form-input'>
            <div className='chat-message-content'>
              <form onSubmit={(event) => handleSubmit(event, chat)}>
                <input 
                  type={'text'} 
                  name={'chatInput'} 
                  onChange={onChangeChat} 
                  value={chat}
                  onKeyDown={(ev) => {
                    if (ev.keyCode === 13) {
                      sendChat();
                    }
                  }} 
                  className='chat-message-form-wrapper'
                />
              </form>
              <Button onClick={sendChat} className='chat-message-form-button'>
                <ArrowUpwardIcon />
              </Button>
            </div>
            <div className='chat-message-input-button'>
            </div>
          </div>
        </div>
      </div>
    </StyledMemoryPage1>
  );
}

export default FeedbackPage2;