import axios from 'axios'

export const get_weather_data = (id1 = 31.963158, id2 = 35.930359) => {
    return axios
        .get('https://weather-api-backend.herokuapp.com/weather-data/' + id1 + '/' + id2)
        .then(response => {
            return response.data
        })
}

export const get_elevation_data = (id1, id2) => {
    return axios
        .get('https://weather-api-backend.herokuapp.com/elevation-data/' + id1 + '/' + id2)
        .then(response => {
            return response.data
        })
}
