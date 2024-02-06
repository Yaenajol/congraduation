import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';

import { useRecoilState } from 'recoil';

import '../Feedback/Feedback.css';
import axios from 'axios';

function FeedbackPage() {
  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState('');

  const { chat_room_id } = useParams();
  const client = useRef({});

  const [ userInfo, setUserInfo ] = useState([]);

  useEffect(() => {
    if( sessionStorage.accessToken) {
        axios
            .get(`https://congraduation.me/backapi/members/myAlbum`, {
                headers: { accessToken: sessionStorage.accessToken },
            })
            .then((response) => {
                console.log("Album Data:", response.data);
                setUserInfo(response.data);
            });
    }
  },[])

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: 'ws://192.168.31.206:8001/backend/ws/chat',
      onConnect: () => {
        console.log('success');
        subscribe();
      },
    });
    client.current.activate();
  };

  const publish = (chat) => {
    if (!client.current.connected) return;

    client.current.publish({
      destination: '/pub/feedback',
      body: JSON.stringify({
        messageType : "TALK",
        chatRoomId : "adkd7n82qw-dkazbv",
        senderPk : "adkd7n82qw-dkazbv",
        content : chat
      }),
    });

    setChat('');
  };

  const subscribe = () => {
    client.current.subscribe('/sub/feedback/' + chat_room_id, (body) => {
      const json_body = JSON.parse(body.body);
      setChatList((_chat_list) => [
        ..._chat_list, json_body
      ]);
    });
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const handleChange = (event) => { // 채팅 입력 시 state에 값 설정
    setChat(event.target.value);
  };

  const handleSubmit = (event, chat) => { // 보내기 버튼 눌렀을 때 publish
    event.preventDefault();

    publish(chat);
  };
  
  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  return (
    <div>
        <div className={'chat-list'}>{chatList}</div>
        <form onSubmit={(event) => handleSubmit(event, chat)}>
        <div>
            <input type={'text'} name={'chatInput'} onChange={handleChange} value={chat} />
        </div>
        <input type={'submit'} value={'의견 보내기'} />
        </form>
    </div>
  );
}

export default FeedbackPage;