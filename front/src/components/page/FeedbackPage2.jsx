import React, { useState, useEffect, useRef } from "react";
// import styles from "./styles/ChatRoom.module.css";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as StompJs from "@stomp/stompjs";

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";


export default function ChatRoom() {
  let navigate = useNavigate();

  const accessToken = sessionStorage.getItem('accessToken');

  const client = useRef(null); // useRef로 client 변수 선언

  const [chat, setChat] = useState(""); // 입력된 chat을 받을 변수
  const [chatList, setChatList] = useState([]); // 채팅 기록
  const [ userInfo, setUserInfo ] = useState([]);


  const userId = userInfo.albumPk;

  //컴포넌트가 변경될 때 객체가 유지되어야하므로 'ref'로 저장

  // 내가 보낸 메시지, 받은 메시지에 각각의 스타일을 지정해 주기 위함
  const msgBox = chatList.map((item, idx) => {
    console.log("String(item.senderPk) : " + String(item.accessToken));
    if (item.albumPk !== userId) {
      return (
        <div key={idx} style={{textAlign: 'center'}}>
          <div>
            <img src={userInfo.imageUrl} alt="" />
          </div>
          <div>
            <span>{item.content}</span>
          </div>
          <span>{item.content}</span>
        </div>
      );
    } else {
      return (
        <div key={idx}>
          <div >
            <span>{item.content}</span>
          </div>
          <span>{item.content}</span>
        </div>
      );
    }
  });

  const connect = () => {
    // 소켓 연결
    client.current = new StompJs.Client({
        brokerURL: 'ws://codakcodak.site:8001/backend/ws/chat',
        onConnect: () => {
          console.log('success');
          subscribe();
        },
      });
      client.current.activate();
  };

  const subscribe = () => {
    client.current.subscribe('/sub/feedback/' + userInfo.albumPk, (body) => {
      const json_body = JSON.parse(body.body);
      setChatList((_chat_list) => [
        ..._chat_list, json_body
      ]);
    });
  };

  const disConnect = () => {
    // 연결 끊기
    if (client === null) {
      return;
    }
    client.deactivate();
  };

  const sendChat = () => {
    if (chat === "") {
      return;
    }

    client.current.publish({
        destination: '/pub/feedback',
        body: JSON.stringify({
          messageType : "TALK",
          accessToken : accessToken,
          chatRoomId : "adkd7n82qw-dkazbv",
          senderPk : "adkd7n82qw-dkazbv",
          albumPk : userInfo.albumPk,
          content : chat
        }),
    });

    setChat("");
  };

  useEffect(() => {
    // 최초 렌더링 시 , 웹소켓에 연결
    // 우리는 사용자가 방에 입장하자마자 연결 시켜주어야 하기 때문에,,
    connect();

    if( accessToken) {
        axios
          .get(`https://congraduation.me/backapi/members/myAlbum`, {
              headers: { accessToken: sessionStorage.accessToken },
          })
          .then((response) => {
            console.log("Album Data:", response.data);
            setUserInfo(response.data);
          });
      }

    return () => disConnect();
  }, []);

  const onChangeChat = (e) => {
    setChat(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {/* {JSON.stringify(user)} */}
      {/* <GlobalStyle/> */}
      <div>
        {/* 상단 네비게이션 */}
        <div>
          <ArrowBackIcon
            onClick={() => {
              navigate("/myalbum ");
            }}
          />
          <span>1 대 1 상담실</span>
          {/* <MegaphoneIcon onClick={() => navigate(`/report/1`)} /> */}
        </div>

        {/* 채팅 리스트 */}
        <div >{msgBox}</div>

        {/* 하단 입력폼 */}
        <form  onSubmit={handleSubmit}>
          {/* <input type="file" accept='image/*'/>  */}
          <div >
            <div>
              <input
                type="text"
                id="msg"
                value={chat}
                placeholder="메시지 보내기"
                // className={styles.input}
                onChange={onChangeChat}
                onKeyDown={(ev) => {
                  if (ev.keyCode === 13) {
                    sendChat();
                  }
                }}
              />
            </div>
            <ArrowUpwardIcon
              value="전송"
            //   className={styles.sendbtn}
              onClick={sendChat}
            />
          </div>
        </form>
      </div>
    </>
  );
}