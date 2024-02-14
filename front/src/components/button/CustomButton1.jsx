import "./CustomButton.css";
import kakao from "../images/kakao.png";

function CustomButton({
  clickCallback,
  buttonName,
  customWidth,
  marginTop,
  marginBottom,
  isImage,
  ShareUrl,
}) {
  const kakaoButton = () => {

    const requestUrl = ShareUrl;
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "얘들아 나 졸업해!!",
        description: "나만의 졸업앨범을 꾸며줘 :)",
        imageUrl: "https://ifh.cc/g/O5Yb9r.png",
        link: {
          mobileWebUrl: requestUrl,
          webUrl: requestUrl,
        },
      },
    });
  };

  let width = customWidth ? customWidth : "50%";
  let margin_top = marginTop ? marginTop : "35px";
  let margin_bottom = marginBottom ? marginBottom : "30px";
  const imageUrl = kakao;

  return (
    <div
      style={{
        width: width,
        marginTop: margin_top,
        marginBottom: margin_bottom,
      }}
      className="settingButtonContainer"
      onClick={kakaoButton}
    >
      <div className="settingButton">
        {/* <button type="button">{buttonName}</button> */}
        {/* <img src={imageUrl} alt="" /> */}
        <a href="javascript:;">
          {buttonName}
          {/* {isImage? (
            <img src={imageUrl} style={{ width: "40%", marginBottom:margin_bottom }}></img>
          ) : (
            buttonName
          )} */}
        </a>
        {/* <span>{buttonName}</span> */}
      </div>
    </div>
  );
}

export default CustomButton;
