import {cityFetching,
        cityFetched,
        cityFetchingError,
        cityTempSet,
        cityWeatherSet,
        setAutoCompleteInput,
        setDailyCast,
        cityWeatherSetFetching,
        cityWeatherSetError,
        cityTempSetFetching,
        cityTempSetError} from '../components/app/appSlice';
import { getForecast } from '../services/getForecast/getForecast';
import { reverseCoding, geoCode } from '../services/geocoding/geocoding';


export const fetchCity = () => (dispatch) => {
    dispatch(cityFetching());
    dispatch(cityWeatherSetFetching());
    dispatch(cityTempSetFetching());
    navigator.permissions.query({ name: 'geolocation' })
        .then(rez => {
            if(rez.state === 'denied') {
                console.log('geo denied');
                const localStorage = window.localStorage;
                if (localStorage.getItem('cities') !== null && localStorage.getItem('cities') !== ''){
                    const firstPos = localStorage.getItem('cities').indexOf(',');
                    const firstCity = localStorage.getItem('cities').slice(0, firstPos);
                    const firstCitySeparatorPos = firstCity.indexOf(' ');
                    const firstCitySliced = firstCity.slice(0, firstCitySeparatorPos); 
                    dispatch(setTheCity(firstCitySliced));
                } else {
                    dispatch(setTheCity('Los Angeles'));
                }
            }
        })
        .catch(() => dispatch(cityFetchingError()));
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position, 'navigator');
        getForecast(position.coords.latitude, position.coords.longitude)
            .then(res => {
                console.log(position.coords.latitude, position.coords.longitude, 'pos info');
                dispatch(cityTempSet(res.current.temp));
                dispatch(cityWeatherSet(res.current.weather[0].main));
                dispatch(setDailyCast(res.daily));
                console.log(res, 'temp info');
                reverseCoding(res.lat, res.lon)
                    .then(data => {
                        console.log(data, 'position info');
                        if (data.address.city){
                            dispatch(cityFetched(data.address.city));
                        } else{
                            dispatch(cityFetched(data.address.state));                        
                        }

                    })
                    .catch(() => dispatch(cityFetchingError()));
            })
            .catch(() => {
                dispatch(cityWeatherSetError());
                dispatch(cityTempSetError());
            });
    });
}

export const setTheCity = (city) => (dispatch) => {
    dispatch(cityFetched(city));
    dispatch(cityWeatherSetFetching());
    dispatch(cityTempSetFetching());
    geoCode(city)
            .then(res => {
                getForecast(res[0].lat, res[0].lon).then(data => {
                    dispatch(cityTempSet(data.current.temp));
                    dispatch(cityWeatherSet(data.current.weather[0].main));  
                    dispatch(setDailyCast(data.daily));                  
                })
            })
            .catch(() => {
                dispatch(cityWeatherSetError());
                dispatch(cityTempSetError());
            });
}

export const fetchAutoComplete = (text) => (dispatch) => {
    dispatch(setAutoCompleteInput(text));
}


