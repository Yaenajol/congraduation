// 텍스트 컴포넌트 -> 00 님의 졸업 앨범
import { useRecoilState } from "recoil"
import { albumState } from "../store/atom"

export default function AlbumName() {

    const[album] = useRecoilState(albumState);

    const name = album.title;

    return (
        <div>{name}님의 졸업 앨범</div>
    )
}