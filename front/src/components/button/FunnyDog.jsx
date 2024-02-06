import "./FunnyDog.css";
import dogHatImage from "../images/dogHat.png";
import dogBallImage from "../images/dogBall.png";
function FunnyDog() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "5px",
        width: "100%",
        height: "120px",
      }}
    >
      <input className="toggle" type="checkbox" id="ball" />
      <label
        style={{
          position: "relative",
          left: "30px",
          zIndex: "3",
          width: "65px",
        }}
        htmlFor="ball"
      >
        Ball
      </label>
      <input className="toggle" type="checkbox" id="feed" />
      <label
        style={{
          position: "relative",
          left: "30px",
          zIndex: "3",
          width: "65px",
        }}
        htmlFor="feed"
      >
        Food
      </label>
      <div className="dog">
        <div className="ball"></div>
        <div className="feed">
          <div className="feed__part"></div>
        </div>
        <img className="dog__hat" src={dogHatImage}></img>
        <div className="dog__ear"></div>
        <div className="dog__face">
          <div className="dog__eye dog__eye--left"></div>
          <div className="dog__eye dog__eye--right"></div>
          <div className="dog__nose"></div>
          <div className="dog__mouse"></div>
        </div>
        <div className="dog__body"></div>
        <div className="dog__foot dog__foot--left"></div>
        <div className="dog__foot dog__foot--right"></div>
        <div className="dog__tail"></div>
      </div>
    </div>
  );
}

export default FunnyDog;
