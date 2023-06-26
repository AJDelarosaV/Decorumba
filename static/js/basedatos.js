const nameCity = document.querySelector('#city');

callAPI('Pilar', 'Argentina');

function callAPI(city){
    const apiId = '6ad1109e8672eea50916beabd5faf7aa';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}`;
    

    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            if (dataJSON.cod === '404') {
                showError('Ciudad no encontrada...');
            } else {
                clearHTML();
                showWeather(dataJSON);
            }
            //console.log(dataJSON);
        })
        .catch(error => {
            console.log(error);
        })
}