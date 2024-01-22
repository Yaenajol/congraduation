// 아직 실험 중 

import Proptypes from "prop-types"

function GridItem({ onClick }) {
  return (
    <div>
      <button onClick={onClick}></button>
    </div>
  )
}

GridItem.propTypes = {
  onClick : Proptypes.func.isRequired,
}

export default GridItem