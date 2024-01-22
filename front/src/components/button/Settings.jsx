// 앨범 및 나의 정보로 가는 설정 버튼
import { Navigate } from "react-router-dom"

export default function Settings() {
 
    function MyPage() {
        <Navigate replace to="/album/edit" />
    }

    return (
        <button onClick={MyPage}>설정 톱니바퀴</button>
    )
}