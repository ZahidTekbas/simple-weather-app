const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const cookieParser = require('cookie-parser');


const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.use(cookieParser())


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Zahid T'
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Zahid T'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help page.',
        title: 'Help',
        name: 'Zahid T'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a valid address'
        })
    }
    geocode(req.query.address,(error, {latitude, longitude, location})=>{
        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude,longitude, (error, forecastData,iconData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                lat: latitude,
                lng: longitude,
                location,
                address: req.query.address,
                icon: iconData
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Zahid T',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Zahid T',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})