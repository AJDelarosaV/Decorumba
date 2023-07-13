// const result = document.querySelector('.c_weather');

// const nameCity = document.querySelector('#city');

// callAPI('Pilar', 'Argentina');

// function callAPI(city){
//     const apiId = '6ad1109e8672eea50916beabd5faf7aa';
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}`;
    

//     fetch(url)
//         .then(data => {
//             return data.json();
//         })
//         .then(dataJSON => {
//             if (dataJSON.cod === '404') {
//                 showError('Ciudad no encontrada...');
//             } else {
//                 clearHTML();
//                 showWeather(dataJSON);
//             }
//             //console.log(dataJSON);
//         })
//         .catch(error => {
//             console.log(error);
//         })
// }

// function showWeather(data){
//     const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;

//     const degrees = kelvinToCentigrade(temp);
//     const min = kelvinToCentigrade(temp_min);
//     const max = kelvinToCentigrade(temp_max);

//     const content = document.createElement('div');
//     content.innerHTML = `
//         <h5>Clima en ${name}</h5>
//         <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon" width = "30px">
//         <h2>${degrees}°C</h2>
//         <p>Max: ${max}°C</p>
//         <p>Min: ${min}°C</p>
//     `;

//     result.appendChild(content);

//     /* console.log(name);
//     console.log(temp);
//     console.log(temp_max);
//     console.log(temp_min);
//     console.log(arr.icon); */
// }

// function showError(message){
//     //console.log(message);
//     const alert = document.createElement('p');
//     alert.classList.add('alert-message');
//     alert.innerHTML = message;

//     form.appendChild(alert);
//     setTimeout(() => {
//         alert.remove();
//     }, 3000);
// }
// function kelvinToCentigrade(temp){
//     return parseInt(temp - 273.15);
// }
// function clearHTML(){
//     result.innerHTML = '';
// }
const is_active = document.getElementById('user_activo').innerText;
var userLog = false;

if (is_active !== ''){
    userLog = true;
    check_login(userLog);
}else{
    userLog = false;
    check_login(userLog);
}

//Función para comprobar usuario
function check_login(userLog){
    if (userLog === true){   
        document.getElementById('nav_carrito').classList.add('nav_carrito-inactivo');
        document.getElementById('close_session').classList.add('close_session-activo');
       
    }else{
       
        document.getElementById('nav_carrito').classList.remove('nav_carrito-inactivo');
        document.getElementById('close_session').classList.remove('close_session-activo');
    }
   
}