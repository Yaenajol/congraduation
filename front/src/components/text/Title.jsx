// 로그인 위에 띄울 주제 이름 : 현재 얘나졸
import PropTypes from "prop-types"

function Title({text}) {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

Title.propTypes = {
  text : PropTypes.string.isRequired
}

export default Title