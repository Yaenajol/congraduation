import { atom } from 'recoil'

const today = new Date();
const gradDate = new Date(today.getFullYear(), today.getMonth(), today.getDay()+15);
const openDate = new Date(today.getFullYear(), today.getMonth(), today.getDay()+16);
const closeDate = new Date(today.getFullYear(), today.getMonth(), today.getDay()+17);

// 연습용 dummy 데이터
export const albumState = atom({
    key: "album",
    default: {
        pk: 'asdfasdf',
        user_pk: 'dsfsdf',
        shared_url: 'sdfasdf',
        created_at: today,
        title: '민준',
        coverUrl: 'sdfs',
        graduationPlace: '싸피',
        graduationDate: gradDate,
        openAt : openDate,
        expiredAt : closeDate,
    },
});
