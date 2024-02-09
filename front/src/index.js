import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./globalStyle";
import { BrowserRouter } from "react-router-dom";
import ReactGA from "react-ga4";

const root = ReactDOM.createRoot(document.getElementById("root"));

const API_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;
console.log(
  "REACT_APP_GOOGLE_ANALYTICS: " + process.env.REACT_APP_GOOGLE_ANALYTICS
);

if (process.env.REACT_APP_GOOGLE_ANALYTICS) {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
}
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
