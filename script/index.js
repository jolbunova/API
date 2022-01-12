
// const inp = document.getElementById('input')
// const button = document.querySelector('.button')


// let API = 'http://api.openweathermap.org/data/2.5/weather?appid=705ee45f3b4daefa24ab5331c063f475&q='
// const getCity = async () => {
//     const request = await fetch(API + inp.value);
//     const response = await request.json();
//     // renderCity(response);
//     console.log(response);

// };

// button.addEventListener('click', () => {
//     getCity();
// });



// // const renderCity = (data) => {

// // }


const API = 'http://api.openweathermap.org/data/2.5/weather?&q='
const KEY = '&appid=705ee45f3b4daefa24ab5331c063f475'

const input = document.getElementById('input')
const form = document.getElementById('form')
const output = document.getElementById('output')


const getWeather = async () => {
    const url = API + input.value + KEY
    const request = await fetch(url)
    const response = await request.json()
    renderWeather(response);
    getMap(response.coord)
}

const renderWeather = (response) => {
    output.innerHTML = ''
    const name = document.createElement('h2')
    const temp = document.createElement('h3')

    name.textContent = response.name
    temp.textContent = (response.main.temp - 273.15).toFixed(2) + 'C'

    output.append(name, temp)
}



const getMap = (coord) => {
    let map = document.createElement('div')
    map.id = 'map'
    map.style.cssText = 'width: 500px; height: 400px;'
    DG.then(function () {
        map = DG.map('map', {
            center: [coord.lat, coord.lon],
            zoom: 13
        });

        DG.marker([coord.lat, coord.lon]).addTo(map).bindPopup('Вы кликнули по мне!');
    });

    output.append(map)
}







form.addEventListener('submit', (event) => {
    event.preventDefault()
    getWeather()
})