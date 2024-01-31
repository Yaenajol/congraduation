import Countdown from 'react-countdown';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';

const Dday = () => {
    // const Completionist = () => <span>Congraduation!!</span>;
    // const [album, setAlbum] = useState([]);
    // const params = useParams();

    // useEffect(() => {
    //     axios.get(`https://congraduation.me/backapi/albums/${params.PK}`)
    //         .then(response => {
    //             console.log('Album Data:', response.data);
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

    const [album, setAlbum] = useState([]);
    const params = useParams();

    
    useEffect(() => {
        axios.get(`https://congraduation.me/backapi/albums/${params.PK}`)
        .then(response => {
            console.log('Album Data:', response.data);
            setAlbum(response.data);
        })
        .catch(error => {
            console.error('Error fetching album data:', error);
        });
    }, [params.PK]); // params.PK 값이 변경될 때마다 useEffect 호출
    
    const setDate = new Date(album.openAt);
    const now = new Date();

    const dis = setDate.getTime() - now.getTime();
    const min1 = 1000 * 60;

    const h = Math.floor(dis / (min1 * 60 * 24));
    const m = Math.floor((dis % (min1 * 60 * 24)) / (min1 * 60));
    const d = Math.floor((dis % (min1 * 60)) / min1);
    const s = Math.floor((dis % min1) / 1000)

    const [day, setDay] = useState(h);
    const [hour, setHour] = useState(m);
    const [minutes, setMinutes] = useState(d);
    const [seconds, setSeconds] = useState(s);

    useEffect(() => {
        const countdown = setInterval(() => {
            if(parseInt(seconds) > 0) setSeconds(parseInt(seconds) - 1)

            if(parseInt(seconds) === 0) {
                if(parseInt(minutes) === 0) {
                    if(parseInt(hour) === 0) {
                        if(parseInt(day) === 0) {
                            clearInterval(countdown);
                        } else {
                            setDay(parseInt(day) - 1);
                            setHour(23);
                            setMinutes(59);
                            setSeconds(59);
                        }
                    } else {
                        setDay(parseInt(day) - 1);
                        setMinutes(59);
                        setSeconds(59);
                    }
                } else {
                    setDay(parseInt(day) - 1);
                    setMinutes(59);
                }
            }
        }, 1000)
        return () => clearInterval(countdown);
    }, [day, hour, minutes, seconds])

    return (
        <>
            {day}
        </>
    );
}

export default Dday;