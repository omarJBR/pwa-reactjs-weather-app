import axios from 'axios'

export const get_weather_data = (id1 = 31.963158, id2 = 35.930359) => {
    return axios
        .get('http://localhost:4000/weather-data/' + id1 + '/' + id2)
        .then(response => {
            return response.data
        })
}

export const get_elevation_data = (id1, id2) => {
    return axios
        .get('http://localhost:4000/elevation-data/' + id1 + '/' + id2)
        .then(response => {
            return response.data
        })
}
