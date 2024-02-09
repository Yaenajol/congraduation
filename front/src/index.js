import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./globalStyle";
import ReactGa from "react-ga";
import { BrowserRouter } from "react-router-dom";
const gaTrackingID = process.env.REACT_APP_GA_TRACKING_APP;
console.log("index  " + gaTrackingID);
const root = ReactDOM.createRoot(document.getElementById("root"));
const API_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;

window.Kakao.init(API_KEY);
window.Kakao.isInitialized();

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <RecoilRoot>
      <GlobalStyle />
      <App />
    </RecoilRoot>
    {/* // </React.StrictMode> */}
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
