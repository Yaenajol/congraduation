function UnlinkRedirect() {
  const API_URL = process.env.REACT_APP_BACKEND_API_URL
  const Token = sessionStorage.getItem('accessToken')

  console.log(Token)
}

export default UnlinkRedirect