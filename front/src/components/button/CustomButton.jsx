import "./CustomButton.css";

function CustomButton({ clickCallback, buttonName, customWidth }) {
  let width = customWidth ? customWidth : "50%";
  console.log(width);
  return (
    <div style={{ width: width }} className="settingButtonContainer">
      <div className="settingButton" onClick={clickCallback}>
        <a href="javascript:;">{buttonName}</a>
      </div>
    </div>
  );
}

export default CustomButton;
