import {GET_FORECAST, GET_CURRENT_WEATHER, GET_GEOLOCATION, SIGN_IN, SIGN_OUT} from './actionTypes'
import axios from 'axios'
const {REACT_APP_OPEN_WEATHER_KEY} = process.env
const API = 'http://api.openweathermap.org/data/2.5/weather'
// ?lat=${data.lat}&lon=${data.lng}&cnt=10&appid=${OPEN_WEATHER_KEY}&units=metric`
export const getGeolocation = () => dispatch => {
	navigator.geolocation.getCurrentPosition((position => {
console.log(position.coords)
const {longitude, latitude} = position.coords
		dispatch({type: GET_GEOLOCATION, payload: {longitude, latitude}})
	}))
}

// export const getGeolocation = () => async dispatch => {const geolocation = navigator.geolocation; geolocation.getCurrentPosition(position => {dispatch({type: GET_GEOLOCATION, payload: position.coords});}, error => {if (error.code === 1) {dispatch({type: GEOLOCATION_DENIED, payload: false});} });};

export const fetchCurrentWeather = (coords) => async (dispatch) => {
	try {
		let weatherResponse = await axios.get(`${API}?lat=${coords.latitude}&lon=${coords.longitude}&cnt=10&appid=${REACT_APP_OPEN_WEATHER_KEY}&units=imperial`)
		dispatch({type: GET_CURRENT_WEATHER, payload: weatherResponse.data})

	} catch (err) {
		console.error(err)
	}
}