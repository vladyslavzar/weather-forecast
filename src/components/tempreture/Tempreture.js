import { useSelector } from 'react-redux';
import Clouds from '../../assets/images/CLOUDY.png';
import Rain from '../../assets/images/RAIN.png';
import Snow from '../../assets/images/SNOW.png';
import Sun from '../../assets/images/SUMMER.png';

const Tempreture = () => {
    const temp = useSelector(state => state.city.temp);
    const weather = useSelector(state => state.city.weather);

    return (
        <section className="tempreture" style={{backgroundImage: `url(${weather === 'Clouds' ? Clouds : weather === 'Rain' ? Rain : weather === 'Snow' ? Snow : weather === 'Sun' ? Sun : Snow})`}}>
            <div className="tempreture__container container">
                <h1>{Math.round(temp)}°C</h1>
                <h3>{weather}</h3>
            </div>
        </section>
    )
}

export default Tempreture;