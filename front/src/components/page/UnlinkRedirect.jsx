import axios from "axios"
import { useEffect,useState } from "react"
import { useNavigate,useParams} from "react-router-dom"
import { useRecoilState } from 'recoil';
import { isLoginAtom } from "../store/atom";

function UnlinkRedirect() {
  const API_URL = process.env.REACT_APP_BACKEND_API_URL
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom)
  const navigate = useNavigate()
  const code = new URL(window.location.href);
  const tokens = code.searchParams.get("code");


  useEffect(() => {
    sendToken(tokens)
  }, [])

  async function sendToken(token) {
    const URL = `${API_URL}/kakao/unlinkCallback?code=${token}`
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({ token}),
      })
      

      if (!response.ok) {
        throw new Error(response.status)
      } 
      if (response.ok) {
        setIsLogin(false)
        navigate('/');
      }

    } catch (error) {
      console.log(error)
    }
  }
}


export default UnlinkRedirect