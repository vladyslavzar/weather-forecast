const _apiKey = 'pk.9929ae79513cbc755ced7ebe7a8d5bc8';

export const reverseCoding = async (lat = 48.2555, lon = 25.9505) => {
    const res = await fetch(`https://us1.locationiq.com/v1/reverse.php?key=${_apiKey}&lat=${lat}&lon=${lon}&format=json`);

    if (!res.ok) {
        console.log('Error, cannot reverse geo code.');

        return;
    }

    const data = await res.json();

    return data;
}

export const autoComplete = async (text) => {
    const res = await fetch(`https://api.locationiq.com/v1/autocomplete.php?key=${_apiKey}&q=${text}&limit=5`);

    if (!res.ok) {
        console.log('Error, cannot auto complete geo code.');

        return;
    }

    const data = await res.json();

    return data;
}

export const geoCode = async (city) => {
    const res = await fetch(`https://us1.locationiq.com/v1/search.php?key=${_apiKey}&q=${city}&format=json`);

    if (!res.ok) {
        console.log('Error, cannot geo code.');

        return;
    }

    const data = await res.json();

    return data;
}