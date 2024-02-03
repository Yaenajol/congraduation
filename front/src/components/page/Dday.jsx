import Countdown from 'react-countdown';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';

// const Dday = () => {
    // const Completionist = () => <span>Congraduation!!</span>;
    // const [album, setAlbum] = useState([]);
    // const params = useParams();

    // useEffect(() => {
    //     axios.get(`https://congraduation.me/backapi/albums/${params.PK}`)
    //         .then(response => {
    //             console.log('Album Data:', response.data)s;
    //             setAlbum(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching album data:', error);
    //         });
    // }, [params.PK]); // params.PK 값이 변경될 때마다 useEffect 호출

    // const today = dayjs();
    // const openDate = dayjs(album.openAt);
    // console.log(openDate)

    // const result = openDate.diff(today, "day", true);

    // return(
    //     <Countdown daysInHours date={result}>
    //         <Completionist />
    //     </Countdown>
    // )

    // const [album, setAlbum] = useState([]);
    // const params = useParams();

    
    // useEffect(() => {
    //     axios.get(`https://congraduation.me/backapi/albums/${params.PK}`)
    //     .then(response => {
    //         console.log('Album Data:', response.data);
    //         setAlbum(response.data);
    //     })
    //     .catch(error => {
    //         console.error('Error fetching album data:', error);
    //     });
    // }, [params.PK]); // params.PK 값이 변경될 때마다 useEffect 호출
    
    // const dday = new Date(album.openAt);
    // const today = new Date();
    // const timeGap = dday.getTime() - today.getTime();
    // console.log("album.openAt : " + album.openAt);
    // console.log("dday : " + dday);
    // console.log("today : " + today);
    // const remainDay = Math.ceil(timeGap/(1000*60*60*24));
    // return(
    //     <div>{remainDay}</div>
    // )
// }

// export default Dday;