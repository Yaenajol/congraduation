import axios from "axios"
import { useEffect } from "react"

function UnlinkRedirect() {
  const API_URL = process.env.REACT_APP_BACKEND_API_URL
  const Token = sessionStorage.getItem('accessToken')

  axios
      .post(`${API_URL}/kakao/unlinkCallback`, {
        
      })
      .then((response) => {
        console.log(response.data)
        
    })
}

export default UnlinkRedirect