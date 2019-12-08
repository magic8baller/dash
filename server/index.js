require('dotenv').config()
const express = require('express')
const app = express()
const rp = require('request-promise-native')
const cors = require('cors')
const API_KEY = process.env.DARK_SKY
app.use(express.static(__dirname + '/public'))
app.use(cors())

app.get('/', (req, res, next) => {
	res.send('Hit the API!')
})



app.get('/current/:lat/:lon', (req, res, next) => {
	const {lat, lon} = req.params
	rp(`https://api.darksky.net/forecast/${API_KEY}/${lat},${lon}?exclude=minutely,hourly,daily&units=auto`)
		.then(response => JSON.parse(response))
		.then(data => res.json(data))
		.catch(err => console.error(err))
})
app.listen(4000, err => {
	if (err) return console.error(err)
	console.log(`now listening on http://localhost:4000`)
})