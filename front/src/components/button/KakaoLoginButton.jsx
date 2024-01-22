// 카카오 로그인 버튼
import PropTypes from "prop-types";

function KakaoLoginButton({ text, onClick, type = "button" }) {
  return (
    <button onClick={onClick} type={type}>
      {text}
    </button>
  );
}

KakaoLoginButton.propTypes = {
    text : PropTypes.string.isRequired,
    // onClick : PropTypes.func.isRequired
}
export default KakaoLoginButton;
