import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const DailyCast = () => {
    const dailyCast = useSelector(state => state.city.dailyCast);
    const [view, setView] = useState([]);

    useEffect(() => {
        const newArr = dailyCast.map((item, i) => {
            if(i === 0 || i > 5) return null;

            let utcSeconds = item.dt;
            let d = new Date(0);
            d.setUTCSeconds(utcSeconds);
            const forrmatedDate = `${d}`.slice(0, 3);
            console.log(forrmatedDate);

            return (
                <div className="dailyCast__container__item" key={i}>
                    <h4>{forrmatedDate}</h4>
                    <h5>{`${Math.round(item.temp.day)}°C, ${item.weather[0].main}`}</h5>
                </div>
            )
        });

        setView(newArr);
    }, [dailyCast])


    return (
        <section className="dailyCast">
            <div className="dailyCast__container container">
                <h3>Next 5 days:</h3>
                {view}
            </div>
        </section>
    )
}

export default DailyCast;