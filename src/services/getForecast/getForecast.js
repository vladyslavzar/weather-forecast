const _apiKey = 'e13ded9d1a064725825637cb6f59e90a';

export const getForecast = async (lat = '50.450001', lon = '30.523333') => {
    const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely,alerts&appid=${_apiKey}`);
    
    if (!res.ok) {
        console.log(`Error, cannot get forecast, error status: ${res.status}`);
        return;
    }

    const data = await res.json();

    return data;
}
