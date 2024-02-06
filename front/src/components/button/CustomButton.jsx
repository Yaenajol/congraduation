import "./CustomButton.css";

function CustomButton({
  clickCallback,
  buttonName,
  customWidth,
  marginTop,
  marginBottom,
}) {
  let width = customWidth ? customWidth : "50%";
  let margin_top = marginTop ? marginTop : "35px";
  let margin_bottom = marginBottom ? marginBottom : "30px";
  
  return (
    <div
      style={{
        width: width,
        marginTop: margin_top,
        marginBottom: margin_bottom,
      }}
      className="settingButtonContainer"
    >
      <div className="settingButton" onClick={clickCallback}>
        <a href="javascript:;">{buttonName}</a>
      </div>
    </div>
  );
}

export default CustomButton;
