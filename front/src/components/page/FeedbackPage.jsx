import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "../Feedback/Feedback.css";
import axios from "axios";
import StyledMemoryPage1 from "../styledComponents/StyledMemoryPage1";
import AlbumProfileImage from "./AlbumProfileImage";
import { Button } from "@mui/material";
import userAltImage from "../images/userAltImage.png";

function FeedbackPage() {
  const chatList = useRef([]);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [chat, setChat] = useState("");
  const { chat_room_id } = useParams();
  const client = useRef({});
  const [imageUrl, setImageUrl] = useState(userAltImage);

  const [userInfo, setUserInfo] = useState([]);

  const params = useParams();
  const accessToken = sessionStorage.getItem("accessToken");
  const API_URL = process.env.REACT_APP_BACKEND_API_URL;
  console.log(chatList);
  useEffect(() => {
    if (accessToken) {
      axios
        .get(`${API_URL}/members/myAlbum`, {
          headers: { accessToken: sessionStorage.accessToken },
        })
        .then((response) => {
          console.log("Album Data:", response.data);
          setUserInfo(response.data);
          setImageUrl(response.data.coverUrl);
          connect(response.data.albumPk);
        });
    }

    return () => disconnect();
  }, []);

  const connect = (albumPk) => {
    client.current = new StompJs.Client({
      brokerURL: "ws://codakcodak.site:8001/backend/ws/chat",
      onConnect: () => {
        console.log("success");
        subscribe(albumPk);
      },
    });
    client.current.activate();
  };

  const publish = (chat) => {
    if (!client.current.connected) return;

    client.current.publish({
      destination: "/pub/feedback",
      body: JSON.stringify({
        messageType: "QUESTION",
        accessToken: accessToken,
        chatRoomId: userInfo.albumPk,
        senderPk: "",
        albumPk: userInfo.albumPk,
        content: chat,
      }),
    });

    setChat("");
  };

  const subscribe = (albumPk) => {
    // chatList 에 수신을 담음
    client.current.subscribe("/sub/feedback/" + albumPk, (body) => {
      try {
        const json_body = JSON.parse(body.body);
        console.log(json_body);
        chatList.current.push({
          messageType: json_body.messageType,
          content: json_body.content,
        });
        setCurrentTime(Date.now());
      } catch (err) {
        console.log("Subscribe Error : " + err);
      }
    });
  };

  // const subscribe = client.current.subscribe('/sub/feedback/', callback, {id: userInfo.albumPk});

  // callback = function(message) {
  //   if(message.body) {
  //     alert("got message with body " + message.body);
  //   }
  //   else {
  //     alert("got empty message");
  //   }
  // }

  const disconnect = () => {
    client.current.deactivate();
  };

  const handleChange = (event) => {
    // 채팅 입력 시 state에 값 설정
    setChat(event.target.value);
  };

  /**
   * publish 작업 및 채팅 창에 띄우는 작업
   * @param {*} event
   * @param {*} chat
   */
  const handleSubmit = (event, chat) => {
    // 보내기 버튼 눌렀을 때 publish
    event.preventDefault();
    console.log(chat);
    publish(chat);

    // setChatList((prevChatList) => [...prevChatList, chat]); // 새로운 채팅을 chatList에 추가
  };

  return (
    <StyledMemoryPage1>
      <div className="chat-container">
        {/* 헤더 창 */}
        <div className="chat-container-header">
          <div className="chat-header-back" />
          <ArrowBackIcon />
          <div style={{ width: "10%" }}>
            <AlbumProfileImage
              imageUrl={imageUrl}
              setImageUrl={setUserInfo.ImageUrl}
              albumPk={params.PK}
              isClickable={false}
            />
          </div>
          <div className="chat-header-content">
            <div className="chat-header-nickname">{userInfo.nickname}</div>
          </div>
        </div>

        {/* 중앙 대화 창 */}
        <div className="chat-message-list cs-message-list">
          <div
            data-cs-message-list
            className="scrollbar-container cs-message-list__scroll-wrapper ps"
            style={{
              overscrollBehaviorY: "none",
              overflowAnchor: "auto",
              touchAction: "none",
            }}
          >
            {chatList.current.map((message, index) => (
              <section
                key={index}
                className="cs-message-group cs-message-group--incoming"
                data-cs-message-group
              >
                <div className="cs-message-group__content">
                  <div className="cs-message-group__messages">
                    <section className="cs-message" data-cs-message>
                      <div className="cs-message__content-wrapper">
                        <div className="cs-message__content">
                          <div className="chat-message">{message}</div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* 입력 창 */}
        <div className="chat-message-form-container">
          <div className="chat-message-form-input">
            <div
              className="chat-message-content"
              style={{ display: "flex", alignItems: "center" }}
            >
              <form onSubmit={(event) => handleSubmit(event, chat)}>
                <input
                  type={"text"}
                  name={"chatInput"}
                  onChange={handleChange}
                  value={chat}
                  className="chat-message-form-wrapper"
                />
              </form>
              <Button
                onClick={(event) => handleSubmit(event, chat)}
                className="chat-message-form-button"
              >
                <ArrowUpwardIcon />
              </Button>
            </div>
            <div className="chat-message-input-button"></div>
          </div>
        </div>
      </div>
    </StyledMemoryPage1>
  );
}

export default FeedbackPage;
