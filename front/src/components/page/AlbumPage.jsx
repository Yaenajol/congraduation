/*
  ****************************************************************
  현재 진행 사항
  npm install axios 해야함~~
  임의의 페이지를 활용하여 DB 접속 및 활용 되는 지 확인 완료
  https://jsonplaceholder.typicode.com/photos - 참고 DB
  
  BE 에서 REST API 까지 만들어 주면 해당 변수명(?) 만 바꿔주면 적용
  다 될 것으로 판단됨
  ****************************************************************
*/

// 앨범 페이지 "/albums/{albums.pk}"
import { useEffect, useState } from 'react'
import axios from 'axios'

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

// const REST_API_KEY = "http://localhost:3000/";

export default function AlbumPage() {
  
  // 특정 앨범 조회용
  const [album, setAlbum] = useState([]);

  // 특정 앨범의 메모리 리스트 조회
  const [albumMemories, setAlbumMemories] = useState([]);

  // 특정 앨범 조회용 - 하나의 객체만 가져왔을 때
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/photos/1')
         .then(response => setAlbum(response.data))
  }, [])

  // 특정 앨범의 메모리 리스트 조회
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/photos')
         .then(response => setAlbumMemories(response.data))
  }, [albumMemories])


  // 앨범의 유저pk와 유저의 pk 가 같으면 (1로 고정 , 수정 필)
  function settingButton() {
    if(album.id === 1) {
      return <div>set</div>
    }
  }
  
  // 커버 이미지가 있으면 커버 이미지를 보여주고 없으면 기본 이미지로 대체
  function existCover() {
    if(album.thumbnailUrl !== null) {
      return <div><img src= {album.thumbnailUrl}></img></div>
    }
    
    return <div>기본 이미지 나오게 설정</div>
  }

  // 특정 앨범의 메모리 수
  function AlbumMemoriesCountByAlbumId(albumMemories, albumId) {
    const albumMemoriesWithAlbumId = albumMemories.filter((albumMemory) => albumMemory.albumId === albumId);
    return albumMemoriesWithAlbumId.length;
  }

  const count = AlbumMemoriesCountByAlbumId(albumMemories, 1);  //albumId 1로 고정 수정 필

  function BasicGrid() {
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            {
              albumMemories && albumMemories.filter((val) => val.albumId === 1).map((val, index) => {
                return (
                  <Grid item xs={4} key={index}>
                    <Item><img src={val.thumbnailUrl}></img></Item>
                  </Grid>
                )
              })
            }
        </Grid>
      </Box>
    );
  }

  return (
    <div>
      <div>
        <div>D - {album.id}</div>   {/* 특정 앨범 조회 */}
        <div>{album.title}</div>    {/* 특정 앨범 조회 */}
      </div>

      {settingButton()}

      {existCover()}

      <div>
        <div>{album.id} 대학교</div> {/* 특정 앨범 조회 */}
        <div>{count} 개 도착</div>  {/* 특정 앨범의 메모리 리스트 조회*/}
      </div>
      <BasicGrid />
      <button onClick={() => {
        window.location.href = "https://www.naver.com";
      }}>공유하러 가기</button>
    </div>
  )
}

{/* <div>
  {
    albumMemories && albumMemories.map((val) => {
      return (
        val.albumId === 1 ? <img src={val.thumbnailUrl}></img> : null
      )
    })
  }
</div> */}
