const path =  require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicPath))

//route handler
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Hasibur Rahman' 
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Hasibur Rahman' 
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text',
        name: 'Hasibur Rahman'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide location!'
        })
    }

 geocode(req.query.address, (error, {location, latitude, longitude} = {} ) => {
        if(error){
            return res.send({ error }) 
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error }) 
            }
            
            res.send({
                forecast: forecastData,
                location, 
                //address: req.query.address 
            })        
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        errorMessage: 'Help article not found',
        name: 'Hasibur Rahman'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        errorMessage: 'Page not found',
        name: 'Hasibur Rahman'
    })
})

app.listen(port, () => {
    console.log('server is up on port port', +port);
})

/*
1. npm install --save-dev nodemon
2. npx nodemon
3. "run commend: " npx nodemon -e js,hbs
*/