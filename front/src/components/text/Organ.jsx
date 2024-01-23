// 기관명 설정 텍스트 컴포넌트
import { useRecoilState } from "recoil"
import { albumState } from "../store/atom"

export default function Organ() {
    const [album] = useRecoilState(albumState);

    const organ = album.graduationPlace;

    return (
        <div>{organ}대학교</div>
    )
}