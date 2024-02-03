import React from "react";
import { SyncLoader} from 'react-spinners'

const Spinner = () => {
  return (
    <div >
      <h3>잠시만 기다려주세요.</h3>
      <SyncLoader style={{ display: 'flex', justifyContent: 'center'}}/>
    </div>
  )
}

export default Spinner