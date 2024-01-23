// D-00 <- 텍스트 컴포넌트
import { useRecoilState } from "recoil";
import { albumState } from "../store/atom";

export default function Dday() {
  const [album] = useRecoilState(albumState);

  const dday = album.openAt;

  const daysLeft = dday.getDate() - new Date().getDate();   //뭔가 이상한데 정신이 없네
  //const daysLeft = new Date().getDate() - dday.getDate();

  return (
    <div>D{daysLeft}</div>
  );
}