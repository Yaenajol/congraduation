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
      <input class="toggle" type="checkbox" id="ball" />
      <label
        style={{
          position: "relative",
          left: "10px",
          zIndex: "3",
        }}
        for="ball"
      >
        Ball
      </label>
      <input class="toggle" type="checkbox" id="feed" />
      <label
        style={{
          position: "relative",
          left: "10px",
          zIndex: "3",
        }}
        for="feed"
      >
        Food
      </label>
      <div class="dog">
        <div class="ball"></div>
        <div class="feed">
          <div class="feed__part"></div>
        </div>
        <img className="dog__hat" src={dogHatImage}></img>
        <div class="dog__ear"></div>
        <div class="dog__face">
          <div class="dog__eye dog__eye--left"></div>
          <div class="dog__eye dog__eye--right"></div>
          <div class="dog__nose"></div>
          <div class="dog__mouse"></div>
        </div>
        <div class="dog__body"></div>
        <div class="dog__foot dog__foot--left"></div>
        <div class="dog__foot dog__foot--right"></div>
        <div class="dog__tail"></div>
      </div>
    </div>
  );
}

export default FunnyDog;
