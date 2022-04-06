const _apiKey = '5428fc73326fdfe9327f8db99b0c502d';

export const getForecast = async (lat = '50.450001', lon = '30.523333') => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely,alerts&appid=${_apiKey}`);
    
    if (!res.ok) {
        console.log(`Error, cannot get forecast, error status: ${res.status}`);
        return;
    }

    const data = await res.json();

    return data;
}
