
import { Outlet } from "react-router-dom"

//NAVBAR
import SimpleBottomNavigation from "./components/navBar/NavBar";

//특정 페이지에만 navbar를 보이게 하기 위한 코드 

export default function AlbumLayout() {
  return (
    <div>
      <SimpleBottomNavigation />
      <Outlet />
    </div>
  )
}