import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCity } from '../../actions/index';
import Header from '../header/Header';
import Tempreture from '../tempreture/Tempreture';
import PopUp from '../popUp/PopUp';
import DailyCast from '../dailyCast/DailyCast';
import spinner from '../../assets/animatios/spinner.gif';

const App = () => {
    const dispatch = useDispatch();
    const city = useSelector(state => state.city.city);
    const cityLoadingStatus = useSelector(state => state.city.cityLoadingStatus);
    const tempLoadingStatus = useSelector(state => state.city.tempLoadingStatus);
    const weatherLoadingStatus = useSelector(state => state.city.weatherLoadingStatus);
    const [isPopUp, setIsPopUp] = useState(false);

    useEffect(() => {
        dispatch(fetchCity());
    }, []);
    console.log(city);

    const view = (cityLoadingStatus === 'idle') ? <View isPopUp={isPopUp} setIsPopUp={setIsPopUp}/> : <Loading/>;

    return(
        view
    )
}
const View = (props) => {
    return (
        <>
            <Header isPopUp={props.isPopUp} setIsPopUp={props.setIsPopUp}/>
            <Tempreture/>
            <PopUp isPopUp={props.isPopUp} setIsPopUp={props.setIsPopUp}/>
            <DailyCast/>
        </>        
    )
}
const Loading = () => {
    return(
        <img src={spinner} alt="loading..." className='spinner' />
    )
}

export default App;