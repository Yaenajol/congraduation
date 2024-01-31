import Countdown from 'react-countdown';
import { ReactDOM } from 'react';
const Dday = () => {
    const Completionist = () => <span>You are good to go!</span>;

    return(
        <Countdown date={Date.now() + 5000}>
            <Completionist />
        </Countdown>
    )
}

export default Dday;