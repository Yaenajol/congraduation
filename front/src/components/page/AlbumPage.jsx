// 앨범 페이지 "/albums/{albums.pk}"

// 텍스트 임포트
import Dday from '../text/Dday'
import AlbumName from '../text/AlbumName'
import Organ from '../text/Organ'
import MemCount from '../text/MemCount'

// 버튼 임포트
import PageButton from '../button/PageButton'
import Settings from '../button/Settings'
import ShareButton from '../button/ShareButton'

// 커버 임포트
import Cover from '../albumCover/Cover'

// 메모리 임포트
import Memory from '../memories/Memory'

// 임시 임포트
import Main from "../../assets/Main.jpg"

export default function AlbumPage() {
  return (
    <div>
      <h1>AlbumPage</h1>

      <div>
        <Dday />
        <AlbumName />
        <Settings />
      </div>

      {/* <Cover /> */}
      <img src={Main}></img>

      <div>
        <Organ />
        <MemCount />
      </div>

      <Memory />
      <PageButton />
      <ShareButton />
    </div>
  )
}