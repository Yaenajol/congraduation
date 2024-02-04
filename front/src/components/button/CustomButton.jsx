import "./CustomButton.css";

function CustomButton({ clickCallback }) {
  return (
    <div className="settingButtonContainer">
      <div className="settingButton" onClick={clickCallback}>
        <a href="javascript:;">수정 완료</a>
      </div>
    </div>
  );
}

export default CustomButton;
